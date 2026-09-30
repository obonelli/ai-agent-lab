"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import { Brand } from "@/components/brand";
import { ThemeToggle } from "@/components/theme-toggle";
import { AGENTS, type AgentKey } from "@/lib/agents/catalog";
import type { AgentRun } from "@/lib/agents/demo-tools";

function isAgentKey(value: string | null): value is AgentKey {
  return value === "sales" || value === "documents" || value === "operations";
}

function ArrowLeft() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
      <path
        d="M19 12H5m6 6-6-6 6-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function DemoPage() {
  const [agentKey, setAgentKey] = useState<AgentKey>("sales");
  const agent = useMemo(() => AGENTS.find((item) => item.key === agentKey)!, [agentKey]);
  const [input, setInput] = useState(agent.preset);
  const [fileName, setFileName] = useState("north_supplier_invoice.pdf");
  const [run, setRun] = useState<AgentRun | null>(null);
  const [visibleSteps, setVisibleSteps] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const selected = new URLSearchParams(window.location.search).get("agent");
    if (isAgentKey(selected)) setAgentKey(selected);
  }, []);

  useEffect(() => {
    setInput(agent.preset);
    setRun(null);
    setVisibleSteps(0);
    setError("");
  }, [agent]);

  useEffect(() => {
    if (!run) return;

    setVisibleSteps(0);
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setVisibleSteps((current) => {
        if (current >= run.steps.length) {
          if (timerRef.current) clearInterval(timerRef.current);
          return current;
        }
        return current + 1;
      });
    }, 480);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [run]);

  async function executeAgent() {
    if (loading || input.trim().length < 2) return;

    setLoading(true);
    setError("");
    setRun(null);
    setVisibleSteps(0);

    try {
      const response = await fetch("/api/demo-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agent: agentKey,
          input,
          context: agentKey === "documents" ? { fileName } : undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error || "The agent could not be executed.");
      }

      setRun(data.run);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred.",
      );
    } finally {
      setLoading(false);
    }
  }

  const animationDone = !!run && visibleSteps >= run.steps.length;

  return (
    <div className="min-h-screen bg-[#f7f9fc] text-slate-950 dark:bg-[#050914] dark:text-white">
      <header className="sticky top-0 z-50 border-b border-slate-900/5 bg-[#f7f9fc]/90 backdrop-blur-xl dark:border-white/7 dark:bg-[#050914]/88">
        <div className="mx-auto flex h-[74px] max-w-[1500px] items-center justify-between px-5 lg:px-8">
          <div className="flex items-center gap-4">
            <Brand />

            <span className="hidden h-6 w-px bg-slate-200 sm:block dark:bg-white/10" />

            <span className="hidden text-xs font-black uppercase tracking-[.16em] text-slate-400 sm:block">
              Interactive Demo
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <ThemeToggle />

            <Link
              href="/"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-sm font-black text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-400 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
            >
              <ArrowLeft />
              <span className="hidden sm:inline">Back</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1500px] px-5 py-8 lg:px-8">
        <div className="mb-7">
          <p className="text-xs font-black uppercase tracking-[.18em] text-cyan-700 dark:text-cyan-300">
            AI Agent Lab
          </p>

          <div className="mt-2 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-black tracking-[-.04em] sm:text-4xl">
                Watch the agent work, not just respond.
              </h1>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-400">
                All systems and data on this page are simulated. The demo
                shows the real orchestration pattern: understand → query
                tools → apply rules → act or escalate.
              </p>
            </div>

            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-300/60 bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/8 dark:text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Safe demo · fictional data
            </span>
          </div>
        </div>

        <div className="mb-5 grid gap-3 sm:grid-cols-3">
          {AGENTS.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setAgentKey(item.key)}
              className={`cursor-pointer rounded-2xl border p-4 text-left transition ${agentKey === item.key
                ? "border-cyan-400 bg-cyan-50 shadow-lg shadow-cyan-500/8 dark:border-cyan-400/30 dark:bg-cyan-400/8"
                : "border-slate-200 bg-white hover:border-cyan-300 dark:border-white/8 dark:bg-white/[.03] dark:hover:border-cyan-400/20"
                }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`grid h-9 w-9 place-items-center rounded-xl text-sm font-black ${agentKey === item.key
                    ? "bg-gradient-to-br from-cyan-500 to-blue-600 text-white"
                    : "bg-slate-100 text-slate-600 dark:bg-white/6 dark:text-slate-300"
                    }`}
                >
                  {item.icon}
                </span>

                <div>
                  <p className="font-black">{item.name}</p>

                  <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[.12em] text-slate-400">
                    {item.eyebrow}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="grid gap-5 xl:grid-cols-[.86fr_1.15fr_.99fr]">
          <section className="rounded-[1.6rem] border border-slate-200 bg-white p-5 shadow-sm dark:border-white/8 dark:bg-white/[.035] sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[.16em] text-cyan-700 dark:text-cyan-300">
                  Scenario
                </p>

                <h2 className="mt-1 text-xl font-black">
                  {agent.name}
                </h2>
              </div>

              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-600 to-violet-600 text-xl font-black text-white">
                {agent.icon}
              </span>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-400">
              {agent.description}
            </p>

            {agentKey === "documents" && (
              <div className="mt-6">
                <label className="text-xs font-black uppercase tracking-[.12em] text-slate-500">
                  Demo document
                </label>

                <label className="mt-2 flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 transition hover:border-cyan-400 dark:border-white/15 dark:bg-white/[.025]">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-500/10 text-lg text-cyan-700 dark:text-cyan-300">
                    ⌁
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-black">
                      {fileName}
                    </span>

                    <span className="mt-0.5 block text-xs text-slate-500">
                      You can choose another file; its contents are not uploaded in this demo.
                    </span>
                  </span>

                  <input
                    type="file"
                    accept=".pdf,.xml,.csv,.xlsx"
                    className="hidden"
                    onChange={(event) => {
                      const file = event.target.files?.[0];

                      if (file) {
                        setFileName(file.name);
                      }
                    }}
                  />
                </label>
              </div>
            )}

            <div className="mt-6">
              <label
                htmlFor="agent-input"
                className="text-xs font-black uppercase tracking-[.12em] text-slate-500"
              >
                {agent.promptLabel}
              </label>

              <textarea
                id="agent-input"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                rows={7}
                className="mt-2 w-full resize-none rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm leading-6 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10 dark:border-white/12 dark:bg-[#070d19] dark:text-white"
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setInput(agent.preset)}
                className="cursor-pointer rounded-full border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 transition hover:border-cyan-400 dark:border-white/10 dark:text-slate-300"
              >
                Restore example
              </button>

              {agentKey === "sales" && (
                <button
                  type="button"
                  onClick={() =>
                    setInput(
                      "We receive 60 leads per month through WhatsApp. I want the agent to qualify them, create quotes, and leave me only the ones that are truly ready to buy.",
                    )
                  }
                  className="cursor-pointer rounded-full border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 transition hover:border-cyan-400 dark:border-white/10 dark:text-slate-300"
                >
                  WhatsApp lead
                </button>
              )}

              {agentKey === "operations" && (
                <button
                  type="button"
                  onClick={() =>
                    setInput(
                      "Review order 60718. If it is outside the SLA, open an incident, but do not send anything to the customer without my approval.",
                    )
                  }
                  className="cursor-pointer rounded-full border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 transition hover:border-cyan-400 dark:border-white/10 dark:text-slate-300"
                >
                  Approval case
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={executeAgent}
              disabled={loading || input.trim().length < 2}
              className="mt-6 inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 px-5 text-sm font-black text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {loading ? (
                <>
                  <span className="agent-pulse h-2 w-2 rounded-full bg-white" />
                  Running tools…
                </>
              ) : (
                <>▶ Run agent</>
              )}
            </button>

            {error && (
              <p className="mt-3 rounded-xl bg-rose-50 p-3 text-sm font-semibold text-rose-700 dark:bg-rose-400/8 dark:text-rose-300">
                {error}
              </p>
            )}
          </section>

          <section className="overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white shadow-sm dark:border-white/8 dark:bg-white/[.035]">
            <div className="border-b border-slate-100 px-5 py-4 dark:border-white/7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[.16em] text-cyan-700 dark:text-cyan-300">
                    Conversation
                  </p>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    The layer the user sees
                  </p>
                </div>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-[.12em] text-slate-500 dark:bg-white/6 dark:text-slate-400">
                  {agent.shortName}
                </span>
              </div>
            </div>

            <div className="flex min-h-[560px] flex-col p-5">
              <div className="ml-auto max-w-[88%] rounded-[1.4rem] rounded-br-md bg-slate-950 px-4 py-3 text-sm leading-6 text-white dark:bg-white dark:text-slate-950">
                {input}
              </div>

              {!run && !loading && (
                <div className="my-auto text-center">
                  <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-cyan-500/10 text-2xl text-cyan-700 dark:text-cyan-300">
                    {agent.icon}
                  </span>

                  <p className="mt-4 font-black">
                    Ready to work
                  </p>

                  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
                    Run the scenario. On the right, you will see every tool and rule that was applied.
                  </p>
                </div>
              )}

              {loading && (
                <div className="mt-5 max-w-[88%] rounded-[1.4rem] rounded-bl-md border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm font-semibold text-cyan-800 dark:border-cyan-400/15 dark:bg-cyan-400/7 dark:text-cyan-200">
                  <span className="inline-flex items-center gap-2">
                    <span className="agent-pulse h-2 w-2 rounded-full bg-cyan-500" />

                    Reviewing context and preparing tools…
                  </span>
                </div>
              )}

              {run && animationDone && (
                <div className="mt-5 max-w-[92%] rounded-[1.4rem] rounded-bl-md border border-cyan-200 bg-cyan-50 px-4 py-4 dark:border-cyan-400/15 dark:bg-cyan-400/7">
                  <p className="text-xs font-black uppercase tracking-[.12em] text-cyan-700 dark:text-cyan-300">
                    {run.headline}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">
                    {run.answer}
                  </p>
                </div>
              )}

              {run?.artifacts && animationDone && (
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {run.artifacts.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-white/8 dark:bg-white/[.03]"
                    >
                      <p className="text-[10px] font-black uppercase tracking-[.1em] text-slate-400">
                        {item.label}
                      </p>

                      <p className="mt-1 text-sm font-black">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {run && animationDone && (
                <p className="mt-auto pt-5 text-[11px] leading-5 text-slate-400">
                  {run.demoNotice}
                </p>
              )}
            </div>
          </section>

          <section className="overflow-hidden rounded-[1.6rem] border border-slate-200 bg-[#08101f] text-white shadow-sm dark:border-white/8">
            <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[.16em] text-cyan-300">
                  Tool trace
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  What makes the agent different
                </p>
              </div>

              <div className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-rose-400" />
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
              </div>
            </div>

            <div className="min-h-[500px] p-5">
              {!run && !loading && (
                <div className="rounded-2xl border border-white/8 bg-white/[.03] p-4 font-mono text-xs leading-6 text-slate-500">
                  <div>$ waiting_for_agent</div>

                  <div className="text-slate-600">
                    Tools, rules, and actions will appear here.
                  </div>
                </div>
              )}

              {loading && (
                <div className="space-y-3">
                  {[0, 1, 2].map((item) => (
                    <div
                      key={item}
                      className="h-20 animate-pulse rounded-2xl bg-white/[.045]"
                    />
                  ))}
                </div>
              )}

              {run && (
                <div className="space-y-3">
                  {run.steps
                    .slice(0, visibleSteps)
                    .map((step, index) => (
                      <div
                        key={`${step.tool}-${index}`}
                        className="rounded-2xl border border-white/8 bg-white/[.035] p-4"
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl text-xs font-black ${step.status === "warning"
                              ? "bg-amber-400/10 text-amber-300"
                              : "bg-emerald-400/10 text-emerald-300"
                              }`}
                          >
                            {step.status === "warning" ? "!" : "✓"}
                          </span>

                          <div className="min-w-0 flex-1">
                            <p className="font-mono text-[10px] text-cyan-300/70">
                              {step.tool}
                            </p>

                            <p className="mt-1 text-sm font-black text-slate-100">
                              {step.title}
                            </p>

                            <p className="mt-1 text-xs leading-5 text-slate-400">
                              {step.detail}
                            </p>
                          </div>

                          <span className="font-mono text-[10px] text-slate-600">
                            0{index + 1}
                          </span>
                        </div>
                      </div>
                    ))}

                  {visibleSteps < run.steps.length && (
                    <div className="flex items-center gap-2 px-2 py-2 text-xs font-bold text-cyan-300">
                      <span className="agent-pulse h-2 w-2 rounded-full bg-cyan-400" />

                      Running next tool…
                    </div>
                  )}
                </div>
              )}
            </div>

            {run && animationDone && (
              <div className="grid grid-cols-3 border-t border-white/8">
                {run.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="border-r border-white/8 px-3 py-4 text-center last:border-r-0"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-[.1em] text-slate-500">
                      {metric.label}
                    </p>

                    <p className="mt-1 text-sm font-black text-white">
                      {metric.value}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <section className="mt-6 rounded-[1.5rem] border border-slate-200 bg-white p-5 dark:border-white/8 dark:bg-white/[.03] sm:p-6">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              [
                "Tools",
                "The calls shown here can be replaced with real CRM, ERP, WhatsApp, databases, or APIs.",
              ],
              [
                "Guardrails",
                "Sensitive rules can require human approval before sending, modifying, or executing anything irreversible.",
              ],
              [
                "Observability",
                "Each step can record input, tool, result, latency, version, and evidence for auditing.",
              ],
            ].map(([title, text]) => (
              <div key={title}>
                <h3 className="font-black">
                  {title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}