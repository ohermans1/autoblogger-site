import React, { useEffect, useMemo, useState } from "react";
import ReactGA from "react-ga4";
import PageResourceSection from "./PageResourceSection";
import pageAssetsByRoute from "../seo/pageAssets.json";

const STORAGE_KEY = "autoblogger_seo_checklist_progress_v3";
const STATUS_OPTIONS = ["Not started", "In progress", "Blocked", "Done"];
const PRIORITY_OPTIONS = ["P0", "P1", "P2", "P3"];
const CHECKLIST_PAGE_ASSETS = pageAssetsByRoute["/free-seo-checklist"] || {};

const APP_LINKS = {
  autoblogger: { label: "autoBlogger", url: "https://apps.shopify.com/autoblogger" },
  autoschema: { label: "autoSchema", url: "https://apps.shopify.com/autoschema-google-structures" },
  autollms: { label: "autoLLMs", url: "https://apps.shopify.com/autollm" },
  autoship: { label: "autoShip", url: "https://apps.shopify.com/autoshippingbar" },
  autostockist: { label: "autoStockist", url: "https://apps.shopify.com/autostockist" },
  autobuy: { label: "autoBuy", url: "https://apps.shopify.com/autobuy-1" }
};

const CHECKLISTS = {
  shopify: [
    t("S1", "Foundation", "Set up GA4 and Search Console", "P0", "S", "Once", "Tracking baseline captured", 8),
    t("S2", "Foundation", "Submit sitemap and review index coverage", "P0", "S", "Weekly", "Valid indexed pages trend up", 8),
    t("S3", "Technical", "Fix broken links and 404s", "P0", "M", "Monthly", "Broken internal links below 1%", 9),
    t("S4", "Technical", "Improve Core Web Vitals on mobile", "P0", "L", "Monthly", "CWV pass rate above 75%", 10),
    t("S5", "Technical", "Validate schema for product, article, and FAQ", "P1", "M", "Monthly", "Schema errors at zero", 8),
    t("S6", "On-page", "Optimize title tags and meta descriptions", "P0", "S", "Weekly", "CTR uplift on optimized pages", 8),
    t("S7", "On-page", "Standardize H1 to H3 heading structure", "P1", "S", "Weekly", "Heading structure compliance", 6),
    t("S8", "Content", "Publish one product-focused SEO blog post", "P0", "M", "Weekly", "One quality post published", 9),
    t("S9", "Content", "Add internal links from blogs to products and collections", "P0", "S", "Always on", "Internal link depth improves", 9),
    t("S10", "Content", "Refresh stale posts with updated facts and links", "P1", "M", "Monthly", "Recovered traffic on old posts", 7),
    t("S11", "Product pages", "Expand thin product and collection copy", "P0", "M", "Weekly", "Thin page count reduced", 8),
    t("S12", "Authority", "Build backlinks from relevant partner sites", "P0", "L", "Monthly", "New referring domains", 10),
    t("S13", "Authority", "Repurpose blogs to social channels", "P1", "M", "Weekly", "Referral clicks increase", 6),
    t("S14", "Authority", "Create one pillar page for major topic cluster", "P0", "L", "Quarterly", "Pillar page published", 9)
  ],
  wix: [
    t("W1", "Foundation", "Set up GA4 and Search Console", "P0", "S", "Once", "Tracking baseline captured", 8),
    t("W2", "Foundation", "Submit Wix sitemap and review coverage", "P0", "S", "Weekly", "Indexed pages trend up", 8),
    t("W3", "Technical", "Fix crawl errors and broken links", "P0", "M", "Monthly", "Broken internal links below 1%", 9),
    t("W4", "Technical", "Improve mobile speed and page weight", "P0", "L", "Monthly", "Mobile performance trend up", 10),
    t("W5", "Technical", "Validate schema on service and blog pages", "P1", "M", "Monthly", "Schema warnings at zero", 8),
    t("W6", "On-page", "Optimize title tags and meta descriptions", "P0", "S", "Weekly", "CTR uplift on optimized pages", 8),
    t("W7", "On-page", "Apply clear heading hierarchy on key pages", "P1", "S", "Weekly", "Heading structure compliance", 6),
    t("W8", "Content", "Publish one intent-focused SEO post", "P0", "M", "Weekly", "One quality post published", 9),
    t("W9", "Content", "Link new posts to priority service pages", "P0", "S", "Always on", "Internal link depth improves", 9),
    t("W10", "Content", "Refresh old pages with updated examples", "P1", "M", "Monthly", "Recovered traffic on old pages", 7),
    t("W11", "Wix pages", "Improve homepage and service page copy", "P0", "M", "Monthly", "Engagement and conversions increase", 9),
    t("W12", "Wix pages", "Improve image alt text and context blocks", "P1", "S", "Weekly", "Alt text coverage above 95%", 6),
    t("W13", "Authority", "Build backlinks via PR, directories, and partnerships", "P0", "L", "Monthly", "New referring domains", 10),
    t("W14", "Authority", "Review top pages and improve weak snippets", "P1", "M", "Monthly", "CTR uplift on top pages", 8)
  ]
};

function t(id, section, action, priority, effort, frequency, kpi, weight) {
  return { id, section, action, priority, effort, frequency, kpi, weight };
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { shopify: {}, wix: {} };
    const parsed = JSON.parse(raw);
    return { shopify: parsed.shopify || {}, wix: parsed.wix || {} };
  } catch (_error) {
    return { shopify: {}, wix: {} };
  }
}

const SEOChecklist = props => {
  const [platform, setPlatform] = useState("shopify");
  const [progressByPlatform, setProgressByPlatform] = useState(loadProgress);
  const [expandedRows, setExpandedRows] = useState({});
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [sectionFilter, setSectionFilter] = useState("All");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progressByPlatform));
  }, [progressByPlatform]);

  const rows = useMemo(() => {
    const source = CHECKLISTS[platform] || [];
    const progress = progressByPlatform[platform] || {};

    return source.map(item => ({
      ...item,
      status: progress[item.id]?.status || "Not started",
      notes: progress[item.id]?.notes || "",
      guide: buildGuide(item, platform),
      resources: buildResources(item, platform)
    }));
  }, [platform, progressByPlatform]);

  const sections = useMemo(() => Array.from(new Set(rows.map(row => row.section))), [rows]);

  const filteredRows = useMemo(() => {
    const query = searchText.trim().toLowerCase();

    return rows.filter(row => {
      if (statusFilter !== "All" && row.status !== statusFilter) return false;
      if (priorityFilter !== "All" && row.priority !== priorityFilter) return false;
      if (sectionFilter !== "All" && row.section !== sectionFilter) return false;
      if (!query) return true;

      return [row.action, row.section, row.kpi].some(value => value.toLowerCase().includes(query));
    });
  }, [rows, searchText, statusFilter, priorityFilter, sectionFilter]);

  const stats = useMemo(() => {
    const total = rows.length;
    const done = rows.filter(row => row.status === "Done").length;
    const inProgress = rows.filter(row => row.status === "In progress").length;
    const blocked = rows.filter(row => row.status === "Blocked").length;
    const p0Remaining = rows.filter(row => row.priority === "P0" && row.status !== "Done").length;
    const weightedTotal = rows.reduce((sum, row) => sum + row.weight, 0);
    const weightedDone = rows.reduce((sum, row) => sum + (row.status === "Done" ? row.weight : 0), 0);

    return {
      total,
      done,
      inProgress,
      blocked,
      p0Remaining,
      completionPct: total ? Math.round((done / total) * 100) : 0,
      weightedPct: weightedTotal ? Math.round((weightedDone / weightedTotal) * 100) : 0
    };
  }, [rows]);

  const updateTask = (id, patch) => {
    setProgressByPlatform(previous => {
      const currentPlatform = previous[platform] || {};
      return {
        ...previous,
        [platform]: {
          ...currentPlatform,
          [id]: {
            ...currentPlatform[id],
            ...patch
          }
        }
      };
    });
  };

  const toggleExpanded = id => {
    setExpandedRows(previous => ({
      ...previous,
      [id]: !previous[id]
    }));
  };

  const switchPlatform = nextPlatform => {
    setPlatform(nextPlatform);
    setExpandedRows({});
    ReactGA.event({ category: "SEO Checklist", action: "Switch Platform", label: nextPlatform });
  };

  const resetProgress = () => {
    if (!window.confirm(`Reset all ${platform === "shopify" ? "Shopify" : "Wix"} checklist progress and notes?`)) return;

    setProgressByPlatform(previous => ({
      ...previous,
      [platform]: {}
    }));
    setExpandedRows({});

    ReactGA.event({ category: "SEO Checklist", action: "Reset Checklist", label: platform });
  };

  const clearFilters = () => {
    setSearchText("");
    setStatusFilter("All");
    setPriorityFilter("All");
    setSectionFilter("All");
  };

  return (
    <section className="py-16 px-4 md:px-10 bg-gradient-to-b from-slate-100 via-white to-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-3xl border border-slate-200 bg-white shadow-xl p-6 md:p-8 mb-8">
          {props.home ? (
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-3">Interactive SEO Checklist Playbook</h3>
          ) : (
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-3">Interactive SEO Checklist Playbook</h1>
          )}

          <p className="text-center text-slate-700 max-w-4xl mx-auto mb-5">Run your SEO from one board. Pick Shopify or Wix, follow the playbook steps for each task, and save progress in-browser.</p>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 mb-5">
            <h2 className="text-xl font-bold text-slate-900 mb-2">Free Shopify SEO Checklist and Free Wix SEO Checklist</h2>
            <p className="text-slate-700 mb-2">
              This page is built to be a practical free Shopify SEO checklist for ecommerce stores and a free Wix SEO checklist for website owners who want more organic traffic.
              You can follow each step directly on-page, track progress in-browser, and download the spreadsheet versions if you want an offline copy for planning or handoff.
            </p>
            <p className="text-slate-700">
              If you searched for a free Shopify SEO checklist, start with P0 tasks, complete indexing and performance fixes first, then move to content publishing and authority building.
              For Wix users, choose the Wix tab to get the same structured workflow adapted for Wix SEO.
            </p>
          </div>

          <div className="mb-5">
            <PageResourceSection
              title={CHECKLIST_PAGE_ASSETS.resourceSectionTitle || "Checklist downloads"}
              intro={CHECKLIST_PAGE_ASSETS.resourceSectionIntro}
              cards={CHECKLIST_PAGE_ASSETS.resourceCards || []}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold text-slate-900 mb-2">How this board works</p>
              <ol className="list-decimal list-inside space-y-1 text-slate-700">
                <li>Start with P0 tasks and complete those first.</li>
                <li>Click "How to do it" on each task and follow the steps.</li>
                <li>Mark status and write notes as you execute.</li>
                <li>Review completion and weighted score weekly.</li>
              </ol>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold text-slate-900 mb-2">App shortcuts</p>
              <div className="flex flex-wrap gap-2">
                {Object.values(APP_LINKS).map(link => (
                  <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-full border border-slate-300 bg-white px-3 py-1 text-slate-700 hover:border-primary hover:text-primary transition">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white shadow-lg p-4 md:p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="inline-flex rounded-xl bg-slate-100 p-1">
              <button type="button" onClick={() => switchPlatform("shopify")} className={`px-5 py-2 rounded-lg text-sm font-semibold transition ${platform === "shopify" ? "bg-primary text-white" : "text-slate-700 hover:bg-white"}`}>
                Shopify Checklist
              </button>
              <button type="button" onClick={() => switchPlatform("wix")} className={`px-5 py-2 rounded-lg text-sm font-semibold transition ${platform === "wix" ? "bg-primary text-white" : "text-slate-700 hover:bg-white"}`}>
                Wix Checklist
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={clearFilters} className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 text-sm font-medium">Clear Filters</button>
              <button type="button" onClick={resetProgress} className="px-4 py-2 rounded-lg bg-rose-600 text-white hover:bg-rose-700 text-sm font-semibold">Reset Progress</button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <StatCard title="Completion" value={`${stats.completionPct}%`} subtitle={`${stats.done} of ${stats.total} done`} tone="primary" />
          <StatCard title="In Progress" value={stats.inProgress} subtitle="Active tasks" tone="blue" />
          <StatCard title="Blocked" value={stats.blocked} subtitle="Needs attention" tone="rose" />
          <StatCard title="P0 Left" value={stats.p0Remaining} subtitle="Critical tasks left" tone="amber" />
          <StatCard title="Weighted" value={`${stats.weightedPct}%`} subtitle="Impact score" tone="emerald" />
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white shadow-lg p-4 md:p-6 mb-6">
          <div className="flex items-center justify-between mb-2">
            <p className="font-semibold text-slate-800">Overall progress</p>
            <p className="text-sm text-slate-600">{stats.completionPct}%</p>
          </div>
          <div className="h-3 rounded-full bg-slate-200 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary via-sky-500 to-cyan-500 transition-all duration-500" style={{ width: `${stats.completionPct}%` }} />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white shadow-lg p-4 md:p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <input type="text" value={searchText} onChange={event => setSearchText(event.target.value)} placeholder="Search task, section, KPI" className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />

            <select value={statusFilter} onChange={event => setStatusFilter(event.target.value)} className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="All">All status</option>
              {STATUS_OPTIONS.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>

            <select value={priorityFilter} onChange={event => setPriorityFilter(event.target.value)} className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="All">All priorities</option>
              {PRIORITY_OPTIONS.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>

            <select value={sectionFilter} onChange={event => setSectionFilter(event.target.value)} className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="All">All sections</option>
              {sections.map(section => (
                <option key={section} value={section}>{section}</option>
              ))}
            </select>
          </div>
          <p className="text-sm text-slate-600 mt-3">
            Showing <span className="font-semibold text-slate-900">{filteredRows.length}</span> of <span className="font-semibold text-slate-900">{rows.length}</span> tasks
          </p>
        </div>

        <div className="hidden lg:block rounded-2xl border border-slate-200 overflow-hidden shadow-xl bg-white mb-10">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="px-3 py-3 text-left">Task</th>
                  <th className="px-3 py-3 text-left">Section</th>
                  <th className="px-3 py-3 text-left">Priority</th>
                  <th className="px-3 py-3 text-left">Effort</th>
                  <th className="px-3 py-3 text-left">Frequency</th>
                  <th className="px-3 py-3 text-left">KPI</th>
                  <th className="px-3 py-3 text-left">Status</th>
                  <th className="px-3 py-3 text-left">Notes</th>
                  <th className="px-3 py-3 text-left">Playbook</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row, index) => {
                  const expanded = !!expandedRows[row.id];
                  return (
                    <React.Fragment key={row.id}>
                      <tr className={`${index % 2 === 0 ? "bg-white" : "bg-slate-50"} ${row.status === "Done" ? "bg-emerald-50/70" : ""}`}>
                        <td className="px-3 py-3 align-top">
                          <p className="font-semibold text-slate-900">{row.action}</p>
                          <p className="text-xs text-slate-500 mt-1">{row.id}</p>
                        </td>
                        <td className="px-3 py-3 align-top text-slate-700">{row.section}</td>
                        <td className="px-3 py-3 align-top"><span className={priorityClass(row.priority)}>{row.priority}</span></td>
                        <td className="px-3 py-3 align-top"><span className="inline-flex rounded-full px-2 py-1 text-xs font-semibold bg-slate-200 text-slate-800">{row.effort}</span></td>
                        <td className="px-3 py-3 align-top text-slate-700">{row.frequency}</td>
                        <td className="px-3 py-3 align-top text-slate-700">{row.kpi}</td>
                        <td className="px-3 py-3 align-top">
                          <select value={row.status} onChange={event => updateTask(row.id, { status: event.target.value })} className={`w-full rounded-md border px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${statusSelectClass(row.status)}`}>
                            {STATUS_OPTIONS.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        </td>
                        <td className="px-3 py-3 align-top">
                          <input type="text" value={row.notes} onChange={event => updateTask(row.id, { notes: event.target.value })} placeholder="Add note" className="w-full rounded-md border border-slate-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary" />
                        </td>
                        <td className="px-3 py-3 align-top">
                          <button type="button" onClick={() => toggleExpanded(row.id)} className={`rounded-lg px-3 py-1 text-xs font-semibold transition ${expanded ? "bg-primary text-white" : "bg-slate-200 text-slate-800 hover:bg-slate-300"}`}>
                            {expanded ? "Hide Guide" : "How to do it"}
                          </button>
                        </td>
                      </tr>
                      {expanded && (
                        <tr className="bg-slate-50 border-t border-slate-200">
                          <td colSpan={9} className="px-4 py-4">
                            <div className="grid md:grid-cols-3 gap-4">
                              <div className="md:col-span-2 rounded-xl border border-slate-200 bg-white p-4">
                                <p className="font-semibold text-slate-900 mb-2">Step-by-step instructions</p>
                                <ol className="list-decimal list-inside space-y-1 text-slate-700">
                                  {row.guide.map((step, stepIndex) => (
                                    <li key={`${row.id}-step-${stepIndex}`}>{step}</li>
                                  ))}
                                </ol>
                              </div>
                              <div className="rounded-xl border border-slate-200 bg-white p-4">
                                <p className="font-semibold text-slate-900 mb-2">Recommended links</p>
                                <div className="flex flex-wrap gap-2">
                                  {row.resources.map(resource => (
                                    <a key={`${row.id}-${resource.url}`} href={resource.url} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border transition ${resourceBadgeClass(resource.kind)}`}>
                                      {resource.label}
                                    </a>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid gap-4 lg:hidden">
          {filteredRows.map(row => {
            const expanded = !!expandedRows[row.id];
            return (
              <article key={row.id} className={`rounded-xl border p-4 shadow-sm ${row.status === "Done" ? "border-emerald-300 bg-emerald-50/70" : "border-slate-200 bg-white"}`}>
                <div className="flex items-start justify-between gap-3">
                  <p className="font-semibold text-slate-900">{row.action}</p>
                  <span className={priorityClass(row.priority)}>{row.priority}</span>
                </div>
                <div className="mt-2 text-sm text-slate-600">
                  <p><span className="font-semibold text-slate-700">Section:</span> {row.section}</p>
                  <p><span className="font-semibold text-slate-700">KPI:</span> {row.kpi}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-3 text-sm">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Effort</p>
                    <span className="inline-flex rounded-full px-2 py-1 text-xs font-semibold bg-slate-200 text-slate-800">{row.effort}</span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Frequency</p>
                    <span className="font-semibold text-slate-900">{row.frequency}</span>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-xs text-slate-500 mb-1">Status</p>
                  <select value={row.status} onChange={event => updateTask(row.id, { status: event.target.value })} className={`w-full rounded-md border px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${statusSelectClass(row.status)}`}>
                    {STATUS_OPTIONS.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div className="mt-3">
                  <p className="text-xs text-slate-500 mb-1">Notes</p>
                  <input type="text" value={row.notes} onChange={event => updateTask(row.id, { notes: event.target.value })} placeholder="Add note" className="w-full rounded-md border border-slate-300 px-2 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div className="mt-3">
                  <button type="button" onClick={() => toggleExpanded(row.id)} className={`w-full rounded-lg px-3 py-2 text-sm font-semibold transition ${expanded ? "bg-primary text-white" : "bg-slate-200 text-slate-800 hover:bg-slate-300"}`}>
                    {expanded ? "Hide Guide" : "How to do it"}
                  </button>
                </div>
                {expanded && (
                  <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <p className="font-semibold text-slate-900 mb-2">Step-by-step instructions</p>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-slate-700">
                      {row.guide.map((step, stepIndex) => (
                        <li key={`${row.id}-mobile-step-${stepIndex}`}>{step}</li>
                      ))}
                    </ol>
                    <div className="mt-3">
                      <p className="font-semibold text-slate-900 mb-2">Recommended links</p>
                      <div className="flex flex-wrap gap-2">
                        {row.resources.map(resource => (
                          <a key={`${row.id}-mobile-${resource.url}`} href={resource.url} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border transition ${resourceBadgeClass(resource.kind)}`}>
                            {resource.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ title, value, subtitle, tone }) => (
  <div className={`rounded-2xl border p-4 shadow-sm ${toneClass(tone)}`}>
    <p className="text-xs uppercase tracking-wide text-slate-600 font-semibold">{title}</p>
    <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
    <p className="text-sm text-slate-600 mt-1">{subtitle}</p>
  </div>
);

function toneClass(tone) {
  if (tone === "primary") return "border-sky-200 bg-sky-50";
  if (tone === "blue") return "border-blue-200 bg-blue-50";
  if (tone === "rose") return "border-rose-200 bg-rose-50";
  if (tone === "amber") return "border-amber-200 bg-amber-50";
  if (tone === "emerald") return "border-emerald-200 bg-emerald-50";
  return "border-slate-200 bg-white";
}

function priorityClass(priority) {
  if (priority === "P0") return "inline-flex rounded-full px-2 py-1 text-xs font-bold bg-rose-100 text-rose-800";
  if (priority === "P1") return "inline-flex rounded-full px-2 py-1 text-xs font-bold bg-orange-100 text-orange-800";
  if (priority === "P2") return "inline-flex rounded-full px-2 py-1 text-xs font-bold bg-amber-100 text-amber-800";
  return "inline-flex rounded-full px-2 py-1 text-xs font-bold bg-slate-200 text-slate-700";
}

function statusSelectClass(status) {
  if (status === "Done") return "border-emerald-300 bg-emerald-50 text-emerald-900";
  if (status === "In progress") return "border-amber-300 bg-amber-50 text-amber-900";
  if (status === "Blocked") return "border-rose-300 bg-rose-50 text-rose-900";
  return "border-slate-300 bg-white text-slate-900";
}

function resourceBadgeClass(kind) {
  if (kind === "app") return "border-cyan-300 bg-cyan-50 text-cyan-800 hover:border-cyan-500";
  return "border-slate-300 bg-white text-slate-700 hover:border-primary hover:text-primary";
}

function buildGuide(taskItem, platform) {
  const action = taskItem.action.toLowerCase();
  const platformName = platform === "shopify" ? "Shopify" : "Wix";

  if (/ga4|search console/.test(action)) {
    return [
      `Open ${platformName} admin and confirm your verified primary domain and tracking setup.`,
      "Connect GA4 and Search Console, then submit sitemap for indexing.",
      "Capture baseline clicks, impressions, and conversions before making SEO changes."
    ];
  }

  if (/sitemap|index coverage|review coverage/.test(action)) {
    return [
      `Open ${platformName} sitemap settings and confirm the sitemap URL is live and returning status 200.`,
      "Submit sitemap in Search Console and review excluded/error URLs for patterns.",
      "Fix one high-impact indexing issue batch first, then re-request indexing."
    ];
  }

  if (/fix broken links|404|crawl errors/.test(action)) {
    return [
      `Crawl your ${platformName} site and export all 404 and broken internal links.`,
      "Update links at source pages first, then add 301 redirects for removed URLs.",
      "Re-crawl the site and verify that critical navigation and money pages are clean."
    ];
  }

  if (/schema/.test(action)) {
    return [
      "Run a schema test on priority URLs and list all missing fields.",
      "Implement fixes on templates first, then on any high-traffic exceptions.",
      "Re-test after deployment and track rich result impressions weekly."
    ];
  }

  if (/optimize title tags and meta descriptions|improve weak snippets/.test(action)) {
    return [
      "Start with pages that already have impressions but weak click-through rate.",
      "Rewrite title + meta pairs to match user intent and include a clear value angle.",
      "Track CTR changes over 14 days and keep the winning variants."
    ];
  }

  if (/heading structure|h1 to h3|hierarchy/.test(action)) {
    return [
      "Audit one template at a time and map heading levels to page sections.",
      "Keep one clear H1, then structure H2/H3 blocks around distinct subtopics.",
      "Re-check pages after publishing to ensure heading order stayed intact."
    ];
  }

  if (/publish one .*seo (blog|post)|intent-focused seo post|product-focused seo blog/.test(action)) {
    return [
      "Choose one target query and define search intent before writing.",
      "Outline sections with real examples, FAQs, and a clear conversion path.",
      "Publish, request indexing, and review first impression/CTR signals after 1-2 weeks."
    ];
  }

  if (/internal links/.test(action)) {
    return [
      "Pick the target page that needs authority and identify 3-5 relevant source pages.",
      "Add natural anchor text links inside existing content, not just footer/nav links.",
      "Track crawl depth and target page ranking movement over the next month."
    ];
  }

  if (/refresh stale posts|refresh old pages/.test(action)) {
    return [
      "Prioritize pages with traffic decline over the last 60-90 days.",
      "Update outdated facts, improve structure, add current links, and sharpen CTA copy.",
      "Republish with meaningful changes and compare traffic trend 2-4 weeks later."
    ];
  }

  if (/expand thin product|thin product and collection copy/.test(action)) {
    return [
      `Audit thin ${platformName} product and collection pages by word count and conversion rate.`,
      "Add use cases, differentiators, objections, and keyword-aligned descriptive content.",
      "Re-check for duplicate copy across variants and canonicalize where needed."
    ];
  }

  if (/improve homepage and service page copy/.test(action)) {
    return [
      "Rewrite hero and above-the-fold sections around intent, credibility, and CTA clarity.",
      "Expand service sections with proof, scope, FAQs, and internal links to support pages.",
      "Measure engagement, conversion rate, and assisted conversions after rollout."
    ];
  }

  if (/improve image alt text/.test(action)) {
    return [
      "Export images from key pages and identify missing or duplicated alt text.",
      "Write concise alt text that describes image context and user intent naturally.",
      "Validate coverage on priority templates and maintain standards for new uploads."
    ];
  }

  if (/repurpose blogs to social channels/.test(action)) {
    return [
      "Turn one blog into multiple social snippets with unique hooks per channel.",
      "Link back to the original page using tracked UTM parameters.",
      "Review referral sessions and on-site behavior to find top-performing formats."
    ];
  }

  if (/pillar page|topic cluster/.test(action)) {
    return [
      "Choose one high-value core topic and map supporting long-tail subtopics.",
      "Publish the pillar page first, then link all supporting articles back to it.",
      "Monitor cluster visibility and internal click flow each month."
    ];
  }

  if (/blog|content|publish/.test(action)) {
    return [
      "Draft content around one clear search intent and include product/service relevance.",
      "Add structured headers, FAQs where useful, and strong internal linking.",
      "Publish, request indexing, and monitor impressions and CTR over the next 2 weeks."
    ];
  }

  if (/speed|core web vitals|image/.test(action)) {
    return [
      "Audit key pages on mobile and identify heavy media or script bottlenecks.",
      "Compress media, defer non-critical assets, and optimize template-level issues.",
      "Retest until LCP, INP, and CLS trend toward green thresholds."
    ];
  }

  if (/backlink|partner|pr/.test(action)) {
    return [
      "Build a target list of relevant websites with topical overlap.",
      "Pitch value-first collaborations and track outreach by status.",
      "Log acquired links and monitor their impact on target page rankings."
    ];
  }

  return [
    `Open the relevant ${platformName} pages and define the exact changes needed for this task.`,
    "Implement in a small batch first, validate quality, then roll out broadly.",
    "Track KPI movement weekly and record findings in the notes field."
  ];
}

function buildResources(taskItem, platform) {
  const action = taskItem.action.toLowerCase();
  const resources = [];

  if (/blog|content|publish|internal links/.test(action)) {
    resources.push({ ...APP_LINKS.autoblogger, kind: "app" });
    resources.push({ ...APP_LINKS.autollms, kind: "app" });
    resources.push({ label: "Google Helpful Content", url: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content", kind: "doc" });
  }

  if (/schema/.test(action)) {
    resources.push({ ...APP_LINKS.autoschema, kind: "app" });
    resources.push({ label: "Rich Results Test", url: "https://search.google.com/test/rich-results", kind: "tool" });
    resources.push({ label: "Schema.org Docs", url: "https://schema.org/docs/documents.html", kind: "doc" });
  }

  if (/ga4|search console|sitemap|index/.test(action)) {
    resources.push({ label: "Google Search Console Help", url: "https://support.google.com/webmasters/", kind: "doc" });
    resources.push({ label: "Submit a Sitemap", url: "https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap", kind: "doc" });
    resources.push({ label: "GA4 Setup Guide", url: "https://support.google.com/analytics/answer/9304153", kind: "doc" });
  }

  if (/title tags|meta|heading|snippet/.test(action)) {
    resources.push({ label: "Google Title Links", url: "https://developers.google.com/search/docs/appearance/title-link", kind: "doc" });
    resources.push({ label: "Google Meta Snippets", url: "https://developers.google.com/search/docs/appearance/snippet", kind: "doc" });
  }

  if (/product|service page|homepage|collection/.test(action)) {
    resources.push({ ...APP_LINKS.autobuy, kind: "app" });
  }

  if (/speed|core web vitals|image/.test(action)) {
    resources.push({ ...APP_LINKS.autoship, kind: "app" });
    resources.push({ label: "PageSpeed Insights", url: "https://pagespeed.web.dev/", kind: "tool" });
    resources.push({ label: "Core Web Vitals Guide", url: "https://web.dev/articles/vitals", kind: "doc" });
  }

  if (/backlink|partner|pr/.test(action)) {
    resources.push({ label: "Google Search Essentials", url: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide", kind: "doc" });
    resources.push({ label: "Spam Policies (Links)", url: "https://developers.google.com/search/docs/essentials/spam-policies", kind: "doc" });
  }

  if (/stock|inventory/.test(action)) {
    resources.push({ ...APP_LINKS.autostockist, kind: "app" });
  }

  resources.push({
    label: platform === "shopify" ? "Shopify SEO Guide" : "Wix SEO Guide",
    url: platform === "shopify" ? "https://help.shopify.com/en/manual/promoting-marketing/seo" : "https://support.wix.com/en/article/wix-seo",
    kind: "doc"
  });
  resources.push({ label: "Google Search Central", url: "https://developers.google.com/search", kind: "doc" });

  const seen = new Set();
  return resources.filter(item => {
    if (seen.has(item.url)) return false;
    seen.add(item.url);
    return true;
  });
}

export default SEOChecklist;
