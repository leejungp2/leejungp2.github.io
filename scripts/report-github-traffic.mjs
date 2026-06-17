const API_ROOT = "https://api.github.com";
const REPORT_TITLE = process.env.REPORT_ISSUE_TITLE || "Traffic report";

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing ${name}`);
  }
  return value;
}

async function request(path, { token, method = "GET", body } = {}) {
  const response = await fetch(`${API_ROOT}${path}`, {
    method,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`${method} ${path} failed: ${response.status} ${text}`);
  }

  if (response.status === 204) return null;
  return response.json();
}

function metricLine(label, value) {
  return `| ${label} | ${Number(value || 0).toLocaleString("en-US")} |`;
}

function markdownCell(value) {
  return String(value).replace(/\|/g, "\\|");
}

function tableRows(items, columns, emptyText) {
  if (!items.length) {
    const cells = [emptyText, ...Array.from({ length: columns.length - 1 }, () => "-")];
    return `| ${cells.join(" | ")} |`;
  }

  return items
    .map((item) => {
      const values = columns.map(({ key }) => markdownCell(item[key] ?? "-"));
      return `| ${values.join(" | ")} |`;
    })
    .join("\n");
}

function formatReport({ views, paths, referrers }) {
  const generatedAt = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Seoul",
  }).format(new Date());

  return [
    `## Traffic report - ${generatedAt} KST`,
    "",
    "GitHub only keeps repository traffic details for about 14 days, so this report is a rolling snapshot.",
    "",
    "### Summary",
    "",
    "| Metric | Count |",
    "| --- | ---: |",
    metricLine("Views", views.count),
    metricLine("Unique visitors", views.uniques),
    "",
    "### Popular pages",
    "",
    "| Path | Views | Unique visitors |",
    "| --- | ---: | ---: |",
    tableRows(paths, [{ key: "path" }, { key: "count" }, { key: "uniques" }], "No page data"),
    "",
    "### Referrers",
    "",
    "| Referrer | Views | Unique visitors |",
    "| --- | ---: | ---: |",
    tableRows(referrers, [{ key: "referrer" }, { key: "count" }, { key: "uniques" }], "No referrer data"),
  ].join("\n");
}

async function findReportIssue(repo, token) {
  const issues = await request(`/repos/${repo}/issues?state=open&per_page=100`, { token });
  return issues.find((issue) => issue.title === REPORT_TITLE && !issue.pull_request) || null;
}

async function ensureReportIssue(repo, token) {
  const existing = await findReportIssue(repo, token);
  if (existing) return existing;

  return request(`/repos/${repo}/issues`, {
    token,
    method: "POST",
    body: {
      title: REPORT_TITLE,
      body: "Automated GitHub traffic reports will be posted here.",
    },
  });
}

async function main() {
  const repo = requiredEnv("GITHUB_REPOSITORY");
  const issueToken = requiredEnv("GITHUB_TOKEN");
  const trafficToken = process.env.TRAFFIC_TOKEN || issueToken;

  const [views, paths, referrers] = await Promise.all([
    request(`/repos/${repo}/traffic/views`, { token: trafficToken }),
    request(`/repos/${repo}/traffic/popular/paths`, { token: trafficToken }),
    request(`/repos/${repo}/traffic/popular/referrers`, { token: trafficToken }),
  ]);

  const issue = await ensureReportIssue(repo, issueToken);
  const body = formatReport({ views, paths, referrers });

  await request(`/repos/${repo}/issues/${issue.number}/comments`, {
    token: issueToken,
    method: "POST",
    body: { body },
  });

  console.log(`Posted traffic report to #${issue.number}`);
}

main().catch((error) => {
  console.error(error.message);
  console.error(
    "If the traffic API returns 403, add a TRAFFIC_TOKEN repository secret from an account with push access to this repository.",
  );
  process.exitCode = 1;
});
