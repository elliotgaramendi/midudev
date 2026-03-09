"use client";

import { useState } from "react";

export default function DashboardRoute() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: "Overview", active: true },
    { name: "Datasets", active: false },
    { name: "Retrieval", active: false },
    { name: "Pipelines", active: false },
    { name: "Evaluations", active: false },
    { name: "Settings", active: false },
    { name: "Security", active: false },
  ];

  const stats = [
    { label: "Indexed Documents", value: "128.4K", change: "+12.4%" },
    { label: "Queries Today", value: "8,942", change: "+18.1%" },
    { label: "Avg Retrieval Latency", value: "142ms", change: "-6.8%" },
    { label: "Answer Groundedness", value: "92.7%", change: "+3.2%" },
  ];

  const bars = [28, 34, 31, 49, 46, 58, 63, 60, 55, 72, 69, 82];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const queries = [
    {
      query: "Summarize the incident response policy for enterprise clients",
      source: "security-handbook-v4.pdf",
      latency: "121ms",
      status: "Resolved",
    },
    {
      query: "What are the onboarding steps for new workspace admins?",
      source: "help-center / onboarding docs",
      latency: "156ms",
      status: "Retrieved",
    },
    {
      query: "Compare pricing rules for annual and monthly contracts",
      source: "pricing-policy-2026.md",
      latency: "188ms",
      status: "Needs review",
    },
    {
      query: "List GDPR data retention constraints by region",
      source: "compliance-knowledge-base",
      latency: "133ms",
      status: "Resolved",
    },
    {
      query: "How do we rotate API secrets in production?",
      source: "platform-runbook.pdf",
      latency: "147ms",
      status: "Retrieved",
    },
  ];

  const sources = [
    { name: "Security Handbook", type: "PDF", chunks: "12.8K" },
    { name: "Help Center", type: "HTML", chunks: "31.2K" },
    { name: "Pricing Policy", type: "Markdown", chunks: "4.1K" },
    { name: "Compliance KB", type: "Notion Sync", chunks: "18.3K" },
    { name: "Engineering Runbooks", type: "Docs", chunks: "9.7K" },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <div className="flex min-h-screen">
        {sidebarOpen && (
          <button
            aria-label="Close sidebar overlay"
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px] lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside
          className={[
            "fixed inset-y-0 left-0 z-50 w-72 border-r border-zinc-800 bg-zinc-950/95 backdrop-blur-xl transition-transform duration-300 lg:static lg:z-auto lg:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full",
          ].join(" ")}
        >
          <div className="flex h-full flex-col">
            <div className="flex h-20 items-center justify-between border-b border-zinc-800 px-5">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-blue-600 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(37,99,235,0.35)]">
                  RAG
                </div>
                <div>
                  <p className="text-base font-semibold tracking-tight text-zinc-100">
                    Retrieval OS
                  </p>
                  <p className="text-xs text-zinc-400">Knowledge system dashboard</p>
                </div>
              </div>

              <button
                className="inline-flex size-10 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-300 lg:hidden"
                onClick={() => setSidebarOpen(false)}
                aria-label="Close sidebar"
              >
                <svg
                  className="size-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>

            <div className="flex-1 px-4 py-5">
              <div className="mb-6 rounded-3xl border border-blue-500/20 bg-linear-to-br from-blue-600/15 via-blue-500/10 to-transparent p-4">
                <p className="text-sm font-medium text-zinc-100">Index Health</p>
                <p className="mt-1 text-sm text-zinc-400">
                  Embedding pipeline is healthy and sync jobs are up to date.
                </p>
                <div className="mt-4 h-2 rounded-full bg-zinc-800">
                  <div className="h-2 w-[91%] rounded-full bg-blue-500" />
                </div>
              </div>

              <nav className="space-y-1.5">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href="#"
                    className={[
                      "group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all",
                      item.active
                        ? "bg-blue-600 text-white shadow-[0_10px_30px_rgba(37,99,235,0.25)]"
                        : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "inline-flex size-9 items-center justify-center rounded-xl border text-xs transition",
                        item.active
                          ? "border-white/10 bg-white/10 text-white"
                          : "border-zinc-800 bg-zinc-950 text-zinc-500 group-hover:text-zinc-200",
                      ].join(" ")}
                    >
                      ●
                    </span>
                    <span>{item.name}</span>
                  </a>
                ))}
              </nav>
            </div>

            <div className="border-t border-zinc-800 p-4">
              <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-4">
                <p className="text-sm font-medium text-zinc-100">Vector Capacity</p>
                <p className="mt-1 text-sm text-zinc-400">
                  2.4M / 3M vectors currently stored.
                </p>
                <button className="mt-4 inline-flex h-10 items-center justify-center rounded-xl bg-blue-600 px-4 text-sm font-medium text-white transition hover:bg-blue-500">
                  Manage storage
                </button>
              </div>
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl">
            <div className="flex h-20 items-center gap-3 px-4 sm:px-6 lg:px-8">
              <button
                className="inline-flex size-11 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900 text-zinc-200 lg:hidden"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open sidebar"
              >
                <svg
                  className="size-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              </button>

              <div className="min-w-0 flex-1">
                <div className="flex h-12 items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900 px-4 text-zinc-400 shadow-sm">
                  <svg
                    className="size-5 shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-3.5-3.5" />
                  </svg>
                  <input
                    className="w-full bg-transparent text-sm text-zinc-100 outline-none placeholder:text-zinc-500"
                    placeholder="Search datasets, chunks, queries, pipelines..."
                  />
                </div>
              </div>

              <button className="hidden size-11 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900 text-zinc-300 sm:inline-flex">
                <svg
                  className="size-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M15 17h5l-1.4-1.4a2 2 0 0 1-.6-1.4V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5" />
                  <path d="M10 17a2 2 0 0 0 4 0" />
                </svg>
              </button>

              <div className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900 px-3 py-2">
                <div className="hidden text-right md:block">
                  <p className="text-sm font-medium text-zinc-100">Olivia Chen</p>
                  <p className="text-xs text-zinc-400">ML Platform Lead</p>
                </div>
                <div className="size-10 rounded-2xl bg-linear-to-br from-blue-400 via-blue-600 to-indigo-700" />
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
              <section className="flex flex-col gap-2">
                <h1 className="text-3xl font-semibold tracking-tight text-zinc-50">
                  RAG System Dashboard
                </h1>
                <p className="text-sm text-zinc-400">
                  Monitor ingestion, retrieval quality, vector health, latency and source coverage.
                </p>
              </section>

              <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5 shadow-[0_10px_35px_rgba(0,0,0,0.25)]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium text-zinc-400">{stat.label}</p>
                        <p className="mt-3 text-4xl font-semibold tracking-tight text-zinc-50">
                          {stat.value}
                        </p>
                      </div>

                      <div className="flex size-12 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-400">
                        <svg
                          className="size-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path d="M4 7h16M4 12h10M4 17h7" />
                        </svg>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                      <span className="inline-flex rounded-full bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-400">
                        {stat.change}
                      </span>
                      <span className="text-xs text-zinc-500">vs last 7 days</span>
                    </div>
                  </div>
                ))}
              </section>

              <section className="grid grid-cols-1 gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
                <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold text-zinc-100">Retrieval Mix</h2>
                    <p className="text-sm text-zinc-400">
                      Hybrid retrieval contribution by strategy
                    </p>
                  </div>

                  <div className="mb-6 flex flex-wrap gap-4 text-xs text-zinc-400">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-blue-400" />
                      Dense retrieval
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                      BM25
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
                      Re-ranking
                    </div>
                  </div>

                  <div className="relative mx-auto flex aspect-square max-w-70 items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-34 border-zinc-800" />
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background:
                          "conic-gradient(rgb(96 165 250) 0deg 160deg, rgb(37 99 235) 160deg 275deg, rgb(82 82 91) 275deg 360deg)",
                        WebkitMask:
                          "radial-gradient(farthest-side, transparent calc(100% - 34px), #000 calc(100% - 33px))",
                        mask:
                          "radial-gradient(farthest-side, transparent calc(100% - 34px), #000 calc(100% - 33px))",
                      }}
                    />
                    <div className="relative z-10 flex size-32 flex-col items-center justify-center rounded-full border border-zinc-800 bg-zinc-950">
                      <p className="text-3xl font-semibold text-zinc-50">92%</p>
                      <p className="text-xs text-zinc-400">Top-k hit rate</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
                  <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-zinc-100">Query Volume</h2>
                      <p className="text-sm text-zinc-400">
                        Retrieval traffic over the current year
                      </p>
                    </div>

                    <div className="inline-flex w-fit items-center rounded-2xl border border-zinc-800 bg-zinc-950 p-1 text-sm">
                      <button className="rounded-xl bg-blue-600 px-3 py-1.5 text-white">
                        Monthly
                      </button>
                      <button className="rounded-xl px-3 py-1.5 text-zinc-400">
                        Weekly
                      </button>
                    </div>
                  </div>

                  <div className="flex h-70 items-end gap-2 sm:h-80 sm:gap-3">
                    {bars.map((value, index) => (
                      <div key={months[index]} className="flex flex-1 flex-col items-center gap-3">
                        <div className="flex h-full w-full items-end">
                          <div
                            className="w-full rounded-t-2xl bg-linear-to-t from-blue-700 via-blue-500 to-blue-300 shadow-[0_10px_30px_rgba(59,130,246,0.15)]"
                            style={{ height: `${value}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-zinc-500 sm:text-xs">
                          {months[index]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
                <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
                  <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="text-2xl font-semibold tracking-tight text-zinc-100">
                        Recent Queries
                      </h2>
                      <p className="text-sm text-zinc-400">
                        Latest retrieval requests and their primary source
                      </p>
                    </div>

                    <button className="inline-flex h-11 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-950 px-4 text-sm font-medium text-zinc-200 transition hover:border-blue-500/30 hover:bg-zinc-900 hover:text-white">
                      View all
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full border-separate border-spacing-y-2">
                      <thead>
                        <tr className="text-left text-sm text-zinc-400">
                          <th className="px-4 py-2 font-medium">Query</th>
                          <th className="px-4 py-2 font-medium">Top Source</th>
                          <th className="px-4 py-2 font-medium">Latency</th>
                          <th className="px-4 py-2 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {queries.map((item) => (
                          <tr key={item.query} className="bg-zinc-950">
                            <td className="rounded-l-2xl px-4 py-4 text-sm font-medium text-zinc-100">
                              <span className="block max-w-[320px] truncate sm:max-w-none">
                                {item.query}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-sm text-zinc-300">{item.source}</td>
                            <td className="px-4 py-4 text-sm text-zinc-300">{item.latency}</td>
                            <td className="rounded-r-2xl px-4 py-4">
                              <span
                                className={[
                                  "inline-flex rounded-full px-3 py-1 text-xs font-medium",
                                  item.status === "Resolved"
                                    ? "bg-blue-500/15 text-blue-300"
                                    : item.status === "Retrieved"
                                      ? "bg-zinc-800 text-zinc-200"
                                      : "bg-amber-500/15 text-amber-300",
                                ].join(" ")}
                              >
                                {item.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
                  <div className="mb-5">
                    <h2 className="text-2xl font-semibold tracking-tight text-zinc-100">
                      Top Sources
                    </h2>
                    <p className="text-sm text-zinc-400">
                      Most queried knowledge sources this week
                    </p>
                  </div>

                  <div className="space-y-3">
                    {sources.map((source, index) => (
                      <div
                        key={source.name}
                        className="flex items-center gap-4 rounded-2xl bg-zinc-950 px-4 py-3"
                      >
                        <div
                          className={[
                            "flex size-12 items-center justify-center rounded-2xl text-xs font-semibold text-white",
                            index === 0
                              ? "bg-linear-to-br from-blue-400 to-blue-700"
                              : index === 1
                                ? "bg-linear-to-br from-sky-400 to-indigo-700"
                                : index === 2
                                  ? "bg-linear-to-br from-cyan-400 to-blue-700"
                                  : index === 3
                                    ? "bg-linear-to-br from-zinc-500 to-zinc-700"
                                    : "bg-linear-to-br from-slate-500 to-slate-700",
                          ].join(" ")}
                        >
                          {source.type.slice(0, 2).toUpperCase()}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-zinc-100">
                            {source.name}
                          </p>
                          <p className="text-sm text-zinc-400">
                            {source.type} · {source.chunks} chunks
                          </p>
                        </div>

                        <button className="ml-auto inline-flex h-10 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 px-3 text-xs font-medium text-zinc-300 transition hover:border-blue-500/30 hover:text-white">
                          Open
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
