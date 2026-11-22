/**
 * Screenshot harness for local visual review.
 * Connects to headless Edge over CDP, scrolls through a page, and
 * writes viewport screenshots. Not part of the site build.
 */
const fs = require("fs");
const http = require("http");

const PORT = Number(process.env.CDP_PORT || 9222);
const OUT = ".shots";

function getJson(url) {
  return new Promise((resolve, reject) => {
    http
      .get(url, (res) => {
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => {
          try {
            resolve(JSON.parse(body));
          } catch (error) {
            reject(error);
          }
        });
      })
      .on("error", reject);
  });
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  const [url, prefix, widthArg, heightArg, maxShotsArg, theme] =
    process.argv.slice(2);
  const width = Number(widthArg || 1440);
  const height = Number(heightArg || 1000);
  const maxShots = Number(maxShotsArg || 8);

  const targets = await getJson(`http://127.0.0.1:${PORT}/json`);
  const page = targets.find((target) => target.type === "page");
  if (!page) throw new Error("No page target found");

  const socket = new WebSocket(page.webSocketDebuggerUrl);
  const pending = new Map();
  let nextId = 1;

  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) reject(new Error(JSON.stringify(message.error)));
      else resolve(message.result);
    }
  });

  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });

  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const id = nextId++;
      pending.set(id, { resolve, reject });
      socket.send(JSON.stringify({ id, method, params }));
    });

  await send("Page.enable");
  await send("Runtime.enable");
  if (theme) {
    await send("Emulation.setEmulatedMedia", {
      features: [{ name: "prefers-color-scheme", value: theme }],
    });
  }
  await send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: width < 600,
  });
  await send("Page.navigate", { url });
  await sleep(theme ? 4500 : 6500);
  if (theme) {
    const label =
      theme === "light" ? "Switch to light theme" : "Switch to dark theme";
    const clicked = await send("Runtime.evaluate", {
      expression: `(() => { const button = document.querySelector('button[aria-label="${label}"]'); if (button) { button.click(); return "clicked"; } return document.documentElement.getAttribute("data-theme"); })()`,
      returnByValue: true,
    });
    console.log(`theme ${theme}: ${clicked.result.value}`);
    await sleep(900);
  }

  if (process.env.SCROLL_TO) {
    await send("Runtime.evaluate", {
      expression: `document.querySelector(${JSON.stringify(
        process.env.SCROLL_TO
      )})?.scrollIntoView({ block: "start" })`,
    });
    await sleep(1800);
    const measure = await send("Runtime.evaluate", {
      expression: `JSON.stringify({ innerWidth: window.innerWidth, scrollWidth: document.documentElement.scrollWidth, cards: Array.from(document.querySelectorAll('#github .card, #github .holo-card')).map((el) => Math.round(el.getBoundingClientRect().width)) })`,
      returnByValue: true,
    });
    console.log(measure.result.value);
    const shot = await send("Page.captureScreenshot", {
      format: "png",
      fromSurface: true,
    });
    fs.writeFileSync(`${OUT}/${prefix}-00.png`, Buffer.from(shot.data, "base64"));
    console.log(`wrote ${prefix}-00.png (scrolled)`);
    socket.close();
    return;
  }

  const metrics = await send("Runtime.evaluate", {
    expression: `JSON.stringify({ h: document.documentElement.scrollHeight, w: document.documentElement.scrollWidth, vh: window.innerHeight })`,
    returnByValue: true,
  });
  const { h, w, vh } = JSON.parse(metrics.result.value);
  console.log(`page ${w}x${h}, viewport ${width}x${vh}`);

  const count = Math.min(maxShots, Math.max(1, Math.ceil(h / (vh * 0.9))));
  for (let index = 0; index < count; index++) {
    const y = Math.min(index * Math.round(vh * 0.9), h - vh);
    await send("Runtime.evaluate", {
      expression: `window.scrollTo({ top: ${y}, behavior: "instant" })`,
    });
    await sleep(1800);
    const shot = await send("Page.captureScreenshot", {
      format: "png",
      fromSurface: true,
    });
    const name = `${prefix}-${String(index).padStart(2, "0")}.png`;
    fs.writeFileSync(`${OUT}/${name}`, Buffer.from(shot.data, "base64"));
    console.log(`wrote ${name} at y=${y}`);
  }

  socket.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
