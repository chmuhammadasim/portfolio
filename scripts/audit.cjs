/**
 * Local SEO/HTML audit. Fetches every sitemap URL from the running
 * production server and checks titles, descriptions, canonicals,
 * heading counts, structured data, and social metadata.
 */
const BASE = "http://localhost:3000";

const routes = [
  "/",
  "/projects",
  "/skills",
  "/experience",
  "/github",
  "/resume",
  "/blogs",
  "/llms.txt",
  "/robots.txt",
  "/sitemap.xml",
];

function stripTags(value) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function match(html, regex) {
  const result = html.match(regex);
  return result ? result[1] : "";
}

async function audit(path) {
  const response = await fetch(BASE + path);
  const html = await response.text();
  const isText = path.endsWith(".txt") || path.endsWith(".xml");

  if (isText) {
    return {
      path,
      status: response.status,
      note: `${html.length} bytes`,
      issues: response.status === 200 ? [] : ["non-200"],
    };
  }

  const title = stripTags(match(html, /<title>([\s\S]*?)<\/title>/));
  const description = match(
    html,
    /<meta name="description" content="([^"]*)"/i
  );
  const canonical = match(
    html,
    /<link rel="canonical" href="([^"]*)"/i
  );
  const h1Matches = html.match(/<h1[\s>]/g) || [];
  const ogImage = match(html, /<meta property="og:image" content="([^"]*)"/i);
  const twitterCard = match(
    html,
    /<meta name="twitter:card" content="([^"]*)"/i
  );
  const jsonLdBlocks = [
    ...html.matchAll(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g
    ),
  ].map((item) => item[1]);

  const issues = [];
  if (response.status !== 200) issues.push(`status ${response.status}`);
  if (!title) issues.push("missing title");
  else if (title.length > 75) issues.push(`title ${title.length} chars`);
  if (!description) issues.push("missing description");
  else if (description.length < 70) issues.push(`description short (${description.length})`);
  else if (description.length > 170) issues.push(`description long (${description.length})`);
  if (!canonical) issues.push("missing canonical");
  if (h1Matches.length !== 1) issues.push(`h1 count ${h1Matches.length}`);
  if (!ogImage) issues.push("missing og:image");
  if (!twitterCard) issues.push("missing twitter card");
  if (/YOUR_GOOGLE_VERIFICATION_CODE/.test(html)) issues.push("placeholder verification");
  if (/Application error|__next_error__/.test(html)) issues.push("render error marker");

  const schemaTypes = [];
  for (const block of jsonLdBlocks) {
    try {
      const parsed = JSON.parse(block);
      const nodes = parsed["@graph"] || [parsed];
      for (const node of nodes) {
        const type = node["@type"];
        if (Array.isArray(type)) schemaTypes.push(...type);
        else if (type) schemaTypes.push(type);
      }
    } catch {
      issues.push("invalid JSON-LD");
    }
  }

  return {
    path,
    status: response.status,
    title: `${title.length}c`,
    desc: `${description.length}c`,
    h1: h1Matches.length,
    schema: schemaTypes.join(","),
    issues,
  };
}

async function main() {
  const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
  const locs = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
    (item) => item[1]
  );
  const urls = Array.from(
    new Set([
      ...routes,
      ...locs.map((loc) => new URL(loc).pathname),
    ])
  );

  console.log(`Auditing ${urls.length} routes...\n`);
  const results = [];
  for (let index = 0; index < urls.length; index += 6) {
    const batch = urls.slice(index, index + 6);
    results.push(...(await Promise.all(batch.map(audit))));
  }

  for (const result of results) {
    const flag = result.issues.length ? "FAIL" : "ok  ";
    console.log(
      `${flag} ${String(result.status).padEnd(3)} ${result.path.padEnd(46)} ${
        result.title || result.note || ""
      } ${result.desc || ""} h1=${result.h1 ?? "-"}`
    );
    if (result.issues.length) console.log(`     → ${result.issues.join("; ")}`);
    if (result.schema) console.log(`     schema: ${result.schema}`);
  }

  const failures = results.filter((result) => result.issues.length);
  console.log(`\n${results.length - failures.length}/${results.length} clean`);
  if (failures.length) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
