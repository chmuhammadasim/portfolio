/** One-off light-theme hydration check over CDP. */
const http = require("http");

const PORT = Number(process.env.CDP_PORT || 9224);
const URL = process.argv[2] || "http://localhost:3000/";

function getJson(url) {
  return new Promise((resolve, reject) => {
    http
      .get(url, (res) => {
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => resolve(JSON.parse(body)));
      })
      .on("error", reject);
  });
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

(async () => {
  const targets = await getJson(`http://127.0.0.1:${PORT}/json`);
  const page = targets.find((target) => target.type === "page");
  if (!page) throw new Error("no page target");

  const socket = new WebSocket(page.webSocketDebuggerUrl);
  const pending = new Map();
  const errors = [];
  let nextId = 1;

  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (message.method === "Runtime.exceptionThrown") {
      errors.push(
        `exception: ${message.params.exceptionDetails.text} ${message.params.exceptionDetails.exception?.description || ""}`
      );
    }
    if (
      message.method === "Runtime.consoleAPICalled" &&
      message.params.type === "error"
    ) {
      errors.push(
        `console.error: ${message.params.args
          .map((arg) => arg.value ?? arg.description ?? "")
          .join(" ")}`
      );
    }
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
  await send("Log.enable");
  await send("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-color-scheme", value: "light" }],
  });
  await send("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 1000,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await send("Page.navigate", { url: URL });
  await sleep(6000);

  const result = await send("Runtime.evaluate", {
    expression: `JSON.stringify({
      theme: document.documentElement.getAttribute("data-theme"),
      prefersLight: window.matchMedia("(prefers-color-scheme: light)").matches,
      label: document.querySelector('button[aria-label*="theme"]')?.getAttribute("aria-label") || null,
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth
    })`,
    returnByValue: true,
  });

  console.log(result.result.value);
  console.log(errors.length ? errors.join("\n") : "no console/runtime errors");
  socket.close();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
