const fs = require("fs");
const path = require("path");

function parseArgs(argv) {
  const args = {
    input: path.join(process.cwd(), "reports", "search-console-export.csv"),
    output: path.join(process.cwd(), "reports", "seo-ctr-test-plan.md"),
    minImpressions: 200,
    top: 30
  };
  const positional = [];

  for (let index = 2; index < argv.length; index += 1) {
    const token = argv[index];
    const next = argv[index + 1];

    if (token === "--input" && next) {
      args.input = path.resolve(next);
      index += 1;
      continue;
    }

    if (token === "--output" && next) {
      args.output = path.resolve(next);
      index += 1;
      continue;
    }

    if (token === "--min-impressions" && next) {
      args.minImpressions = Number(next);
      index += 1;
      continue;
    }

    if (token === "--top" && next) {
      args.top = Number(next);
      index += 1;
      continue;
    }

    positional.push(token);
  }

  if (positional[0]) args.input = path.resolve(positional[0]);
  if (positional[1]) args.output = path.resolve(positional[1]);
  if (positional[2] && Number.isFinite(Number(positional[2]))) args.top = Number(positional[2]);

  if (!Number.isFinite(args.minImpressions) || args.minImpressions <= 0) {
    args.minImpressions = 200;
  }

  if (!Number.isFinite(args.top) || args.top <= 0) {
    args.top = 30;
  }

  return args;
}

function parseCsvLine(line) {
  const values = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];

    if (char === '"' && inQuotes && next === '"') {
      current += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === "," && !inQuotes) {
      values.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  values.push(current.trim());
  return values;
}

function parseCsv(content) {
  const lines = content
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(Boolean);

  if (lines.length < 2) return [];

  const headers = parseCsvLine(lines[0]).map(value => value.toLowerCase());
  const rows = [];

  for (let index = 1; index < lines.length; index += 1) {
    const values = parseCsvLine(lines[index]);
    const row = {};

    headers.forEach((header, headerIndex) => {
      row[header] = values[headerIndex] || "";
    });

    rows.push(row);
  }

  return rows;
}

function toNumber(value) {
  if (value === undefined || value === null) return 0;

  const cleaned = String(value).replace(/[%,$]/g, "").trim();
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
}

function expectedCtrForPosition(position) {
  if (position <= 1) return 0.28;
  if (position <= 3) return 0.16;
  if (position <= 5) return 0.1;
  if (position <= 10) return 0.05;
  if (position <= 20) return 0.025;
  return 0.015;
}

function sanitizePage(url) {
  try {
    const parsed = new URL(url);
    return parsed.pathname || "/";
  } catch (_error) {
    return url || "/";
  }
}

function ctrToPercent(ctrDecimal) {
  return `${(ctrDecimal * 100).toFixed(2)}%`;
}

function suggestTitle(query, pagePath) {
  const normalizedQuery = query.trim().replace(/\s+/g, " ");
  const pageLabel = pagePath === "/" ? "autoBlogger" : pagePath.replace(/\//g, " ").trim();
  const keyword = normalizedQuery.length > 68 ? `${normalizedQuery.slice(0, 65)}...` : normalizedQuery;
  return `${keyword} | ${pageLabel} Guide`;
}

function suggestMetaDescription(query, pagePath) {
  const prefix = `Improve results for "${query}" with a focused ${pagePath} workflow.`;
  const suffix = "Get practical steps, examples, and a clear next action.";
  return `${prefix} ${suffix}`.slice(0, 156);
}

function buildCandidates(rows, minImpressions) {
  const normalized = rows
    .map(row => {
      const query = row.query || row.queries || row.keyword || "";
      const page = row.page || row.url || row.landing_page || "";
      const impressions = toNumber(row.impressions);
      const clicks = toNumber(row.clicks);
      const ctrRaw = row.ctr || row["site ctr"] || row["ctr (%)"] || row["ctr %"];
      const position = toNumber(row.position || row.pos || row["avg position"]);
      const ctr = ctrRaw ? toNumber(ctrRaw) / (String(ctrRaw).includes("%") ? 100 : 1) : impressions > 0 ? clicks / impressions : 0;

      return {
        query,
        page: sanitizePage(page),
        impressions,
        clicks,
        ctr,
        position,
        benchmarkCtr: expectedCtrForPosition(position || 99)
      };
    })
    .filter(item => item.query && item.page && item.impressions >= minImpressions);

  const underperformers = normalized
    .map(item => ({
      ...item,
      ctrGap: item.benchmarkCtr - item.ctr,
      opportunityScore: item.impressions * Math.max(item.benchmarkCtr - item.ctr, 0)
    }))
    .filter(item => item.ctr < item.benchmarkCtr * 0.75 && item.ctrGap > 0)
    .sort((left, right) => right.opportunityScore - left.opportunityScore);

  return underperformers;
}

function groupByPage(candidates) {
  const grouped = new Map();

  candidates.forEach(candidate => {
    if (!grouped.has(candidate.page)) grouped.set(candidate.page, []);
    grouped.get(candidate.page).push(candidate);
  });

  return grouped;
}

function buildReport(candidates, args) {
  const date = new Date().toISOString().slice(0, 10);
  const grouped = groupByPage(candidates);
  const topCandidates = candidates.slice(0, args.top);

  const summaryRows = topCandidates
    .map((item, index) => {
      const expectedClicks = Math.round(item.impressions * item.benchmarkCtr);
      const clickDelta = Math.max(expectedClicks - Math.round(item.clicks), 0);
      return `${index + 1}. \`${item.query}\` | Page: \`${item.page}\` | CTR: ${ctrToPercent(item.ctr)} vs benchmark ${ctrToPercent(
        item.benchmarkCtr
      )} | Impr: ${Math.round(item.impressions)} | Potential extra clicks: ${clickDelta}`;
    })
    .join("\n");

  const testPlans = Array.from(grouped.entries())
    .slice(0, 12)
    .map(([page, items], groupIndex) => {
      const topQuery = items[0];
      const title = suggestTitle(topQuery.query, page);
      const description = suggestMetaDescription(topQuery.query, page);
      return `### ${groupIndex + 1}. ${page}\n- Primary query: \`${topQuery.query}\`\n- Current CTR gap: ${ctrToPercent(topQuery.ctr)} vs benchmark ${ctrToPercent(
        topQuery.benchmarkCtr
      )}\n- Title test candidate: \`${title}\`\n- Meta description test candidate: \`${description}\`\n- Measurement window: 7 days, then keep winner for 14 additional days.\n`;
    })
    .join("\n");

  return `# Weekly SEO CTR Test Plan\nGenerated: ${date}\n\n## How To Use\n1. Export query-level Search Console data and save as CSV.\n2. Run \`npm run seo:ctr -- --input <path-to-csv>\`.\n3. Implement title/meta tests for the top opportunities below.\n4. Re-run weekly and track winners in your SEO changelog.\n\n## Top Query Opportunities\n${summaryRows || "No qualifying opportunities found."}\n\n## Suggested Title and Meta Tests\n${testPlans || "No test plans generated."}\n`;
}

function ensureDirectory(targetPath) {
  const directory = path.dirname(targetPath);
  fs.mkdirSync(directory, { recursive: true });
}

function run() {
  const args = parseArgs(process.argv);

  if (!fs.existsSync(args.input)) {
    console.error(`Input CSV not found at: ${args.input}`);
    console.error("Provide a Search Console export with columns like query, page, clicks, impressions, ctr, and position.");
    process.exit(1);
  }

  const content = fs.readFileSync(args.input, "utf8");
  const rows = parseCsv(content);
  const candidates = buildCandidates(rows, args.minImpressions);
  const report = buildReport(candidates, args);

  ensureDirectory(args.output);
  fs.writeFileSync(args.output, report, "utf8");

  console.log(`Generated CTR report: ${args.output}`);
  console.log(`Opportunities found: ${candidates.length}`);
}

run();
