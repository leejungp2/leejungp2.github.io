import fs from "node:fs";
import path from "node:path";

const SOURCE_DIR = "/private/tmp";
const OUTPUT_DIR = "_posts";
const BLOG_URL = "https://silhumin9.tistory.com";
const POST_IDS = Array.from({ length: 19 }, (_, index) => index + 1);

const ENTITY_MAP = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&nbsp;": " ",
};

function stripTags(html) {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&(?:amp|lt|gt|quot|#39|nbsp);/g, (entity) => ENTITY_MAP[entity] ?? entity)
    .replace(/\s+/g, " ")
    .trim();
}

function yamlString(value) {
  return `"${String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

function slugFor(id) {
  return `tistory-${id}`;
}

function parseTistoryDate(value) {
  const match = value.match(/(\d{4})\.\s*(\d{1,2})\.\s*(\d{1,2})\.\s*(\d{1,2}):(\d{2})/);
  if (!match) {
    throw new Error(`Could not parse date: ${value}`);
  }

  const [, year, month, day] = match;
  const y = year;
  const m = month.padStart(2, "0");
  const d = day.padStart(2, "0");

  return {
    fileDate: `${y}-${m}-${d}`,
    frontMatterDate: `${y}-${m}-${d} 12:00:00`,
  };
}

function extractBody(html) {
  const marker = '<div class="tt_article_useless_p_margin contents_style">';
  const start = html.indexOf(marker);
  if (start === -1) {
    throw new Error("Could not find Tistory content container");
  }

  let cursor = start + marker.length;
  let depth = 1;

  while (depth > 0) {
    const nextOpen = html.indexOf("<div", cursor);
    const nextClose = html.indexOf("</div>", cursor);

    if (nextClose === -1) {
      throw new Error("Could not find end of Tistory content container");
    }

    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth += 1;
      cursor = nextOpen + 4;
    } else {
      depth -= 1;
      if (depth === 0) {
        return html.slice(start + marker.length, nextClose).trim();
      }
      cursor = nextClose + 6;
    }
  }

  throw new Error("Could not extract Tistory content");
}

function cleanBody(html) {
  return html
    .replace(/<p data-ke-size="size16">&nbsp;<\/p>/g, "")
    .replace(/<h2 data-ke-size="size26">&nbsp;<\/h2>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function readPost(id) {
  const html = fs.readFileSync(path.join(SOURCE_DIR, `silhumin9-post-${id}.html`), "utf8");
  const title = stripTags(html.match(/<h2 class="title-article">(.*?)<\/h2>/s)?.[1] ?? "");
  const category = stripTags(html.match(/<p class="category">(.*?)<\/p>/s)?.[1] ?? "");
  const dateText = stripTags(html.match(/<span class="date">(.*?)<\/span>/s)?.[1] ?? "");
  const body = cleanBody(extractBody(html));

  if (!title || !category || !dateText || !body) {
    throw new Error(`Missing required fields for post ${id}`);
  }

  return {
    id,
    title,
    category: category === "카테고리 없음" ? "uncategorized" : category,
    ...parseTistoryDate(dateText),
    body,
  };
}

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

for (const post of POST_IDS.map(readPost)) {
  const isLecture = post.title.startsWith("[강의]");
  const isPaperReview = post.title.startsWith("[논문 리뷰]");
  const isArchive = isLecture || isPaperReview;
  const archiveKind = isPaperReview ? "paper_review" : isLecture ? "lecture" : "";
  const tags = ["tistory", ...post.category.split("/").filter(Boolean)];
  const frontMatter = [
    "---",
    "layout: post",
    `title: ${yamlString(post.title)}`,
    `date: ${post.frontMatterDate}`,
    "lang: ko",
    `translation_key: ${slugFor(post.id)}`,
    `original_url: ${yamlString(`${BLOG_URL}/${post.id}`)}`,
    `archive: ${isArchive}`,
    ...(archiveKind ? [`archive_kind: ${archiveKind}`] : []),
    ...(isLecture ? ["noindex: true", "sitemap: false"] : []),
    `tags: [${tags.map(yamlString).join(", ")}]`,
    "---",
    "",
  ].join("\n");

  const fileName = `${post.fileDate}-${slugFor(post.id)}.md`;
  fs.writeFileSync(path.join(OUTPUT_DIR, fileName), `${frontMatter}${post.body}\n`);
  console.log(fileName);
}
