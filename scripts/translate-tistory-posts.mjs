import fs from "node:fs";
import path from "node:path";

const POSTS_DIR = "_posts";
const CACHE_DIR = ".translation-cache";
const MODEL = process.env.OPENAI_TRANSLATION_MODEL || "gpt-4.1-mini";

loadEnv();

function loadEnv() {
  if (!fs.existsSync(".env")) return;

  for (const line of fs.readFileSync(".env", "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match) continue;

    const [, key, rawValue] = match;
    if (process.env[key]) continue;

    process.env[key] = rawValue.replace(/^["']|["']$/g, "");
  }
}

function parseArgs() {
  const onlyIndex = process.argv.indexOf("--only");
  return {
    only: onlyIndex === -1 ? null : process.argv[onlyIndex + 1],
    includeArchives: process.argv.includes("--include-archives"),
  };
}

function parsePost(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error("Missing front matter");

  const frontMatter = {};
  for (const line of match[1].split("\n")) {
    const pair = line.match(/^([^:]+):\s*(.*)$/);
    if (!pair) continue;

    const [, key, value] = pair;
    frontMatter[key] = parseYamlValue(value);
  }

  return { frontMatter, body: match[2].trimEnd() };
}

function parseYamlValue(value) {
  if (value === "true") return true;
  if (value === "false") return false;
  if (value.startsWith('"') && value.endsWith('"')) {
    return value.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\");
  }
  if (value.startsWith("[") && value.endsWith("]")) {
    return [...value.matchAll(/"((?:\\"|[^"])*)"/g)].map((match) =>
      match[1].replace(/\\"/g, '"').replace(/\\\\/g, "\\"),
    );
  }
  return value;
}

function yamlValue(value) {
  if (typeof value === "boolean") return String(value);
  if (Array.isArray(value)) return `[${value.map(yamlString).join(", ")}]`;
  return yamlString(value);
}

function yamlString(value) {
  return `"${String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

function serializePost(frontMatter, body) {
  const orderedKeys = [
    "layout",
    "title",
    "date",
    "lang",
    "original_lang",
    "translation_key",
    "translation_url",
    "original_url",
    "archive",
    "archive_kind",
    "hidden",
    "tags",
  ];
  const keys = [
    ...orderedKeys.filter((key) => Object.hasOwn(frontMatter, key)),
    ...Object.keys(frontMatter).filter((key) => !orderedKeys.includes(key)),
  ];

  return `---\n${keys.map((key) => `${key}: ${yamlValue(frontMatter[key])}`).join("\n")}\n---\n${body.trim()}\n`;
}

function postUrl(date, slug) {
  const [year, month, day] = date.slice(0, 10).split("-");
  return `/blog/${year}/${month}/${day}/${slug}/`;
}

function tistorySlug(fileName) {
  return fileName.match(/^\d{4}-\d{2}-\d{2}-(tistory-\d+)\.md$/)?.[1] ?? null;
}

function extractOutputText(response) {
  if (response.output_text) return response.output_text;

  const text = [];
  for (const item of response.output ?? []) {
    for (const content of item.content ?? []) {
      if (content.type === "output_text" || content.type === "text") {
        text.push(content.text);
      }
    }
  }
  return text.join("");
}

async function translatePost(slug, title, body) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
  const cachePath = path.join(CACHE_DIR, `${slug}.json`);

  if (fs.existsSync(cachePath)) {
    return JSON.parse(fs.readFileSync(cachePath, "utf8"));
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      input: [
        {
          role: "system",
          content:
            "You translate Korean blog posts into natural, polished English. Preserve HTML tags, attributes, links, images, lists, and code blocks exactly. Translate only human-readable Korean prose. Return only valid JSON.",
        },
        {
          role: "user",
          content: JSON.stringify({
            title,
            body_html: body,
            output_shape: {
              title: "English title",
              body_html: "English HTML body with original markup preserved",
            },
          }),
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "translated_post",
          schema: {
            type: "object",
            additionalProperties: false,
            required: ["title", "body_html"],
            properties: {
              title: { type: "string" },
              body_html: { type: "string" },
            },
          },
          strict: true,
        },
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI request failed for ${slug}: ${response.status} ${await response.text()}`);
  }

  const data = await response.json();
  const translated = JSON.parse(extractOutputText(data));
  fs.writeFileSync(cachePath, `${JSON.stringify(translated, null, 2)}\n`);
  return translated;
}

async function main() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing OPENAI_API_KEY. Add it to .env or export it in your shell.");
  }

  const { only, includeArchives } = parseArgs();
  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((fileName) => tistorySlug(fileName))
    .filter((fileName) => !only || tistorySlug(fileName) === `tistory-${only}` || tistorySlug(fileName) === only)
    .sort();

  for (const fileName of files) {
    const slug = tistorySlug(fileName);
    const sourcePath = path.join(POSTS_DIR, fileName);
    const source = parsePost(fs.readFileSync(sourcePath, "utf8"));

    if (source.frontMatter.lang !== "ko") {
      console.log(`skip ${fileName}: already ${source.frontMatter.lang}`);
      continue;
    }
    if (source.frontMatter.archive === true && !includeArchives) {
      console.log(`skip ${fileName}: archive`);
      continue;
    }

    console.log(`translate ${slug} with ${MODEL}`);
    const translated = await translatePost(slug, source.frontMatter.title, source.body);
    const date = source.frontMatter.date;
    const koreanSlug = `${slug}-ko`;
    const koreanFileName = fileName.replace(/\.md$/, "-ko.md");

    const englishFrontMatter = {
      ...source.frontMatter,
      title: translated.title,
      lang: "en",
      original_lang: "ko",
      translation_url: postUrl(date, koreanSlug),
      hidden: false,
    };
    const koreanFrontMatter = {
      ...source.frontMatter,
      translation_url: postUrl(date, slug),
      hidden: true,
      noindex: true,
      sitemap: false,
    };

    fs.writeFileSync(sourcePath, serializePost(englishFrontMatter, translated.body_html));
    fs.writeFileSync(path.join(POSTS_DIR, koreanFileName), serializePost(koreanFrontMatter, source.body));
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
