import Link from "next/link";

import { Brand } from "@/components/brand";

import { ThemeToggle } from "@/components/theme-toggle";

import { AGENTS } from "@/lib/agents/catalog";


function Arrow() {

  return (

    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>

      <path

        d="M5 12h14M13 6l6 6-6 6"

        stroke="currentColor"

        strokeWidth="1.8"

        strokeLinecap="round"

        strokeLinejoin="round"

      />

    </svg>

  );

}


function Check() {

  return (

    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>

      <path

        d="m5 12.5 4 4L19 7"

        stroke="currentColor"

        strokeWidth="2"

        strokeLinecap="round"

        strokeLinejoin="round"

      />

    </svg>

  );

}


const architecture = [

  ["01", "Understand", "Interprets intent, context, and constraints."],

  ["02", "Query", "Uses APIs, databases, documents, or CRM systems."],

  ["03", "Decide", "Applies business rules, permissions, and limits."],

  ["04", "Act", "Executes actions, records evidence, and escalates exceptions."],

];


export default function Home() {

  return (

    <div className="min-h-screen overflow-hidden bg-[#f7f9fc] text-slate-950 dark:bg-[#050914] dark:text-white">

      <header className="sticky top-0 z-50 border-b border-slate-900/5 bg-[#f7f9fc]/85 backdrop-blur-xl dark:border-white/7 dark:bg-[#050914]/78">

        <div className="mx-auto flex h-[74px] max-w-7xl items-center justify-between px-5 lg:px-8">

          <Brand />


          <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-600 lg:flex dark:text-slate-300">

            <a href="#agentes" className="transition hover:text-cyan-600 dark:hover:text-cyan-300">Agents</a>

            <a href="#arquitectura" className="transition hover:text-cyan-600 dark:hover:text-cyan-300">How it works</a>

            <a href="#diferencia" className="transition hover:text-cyan-600 dark:hover:text-cyan-300">The difference</a>

          </nav>


          <div className="flex items-center gap-2.5">

            <ThemeToggle />

            <Link

              href="/demo"

              className="inline-flex h-10 items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 px-4 text-sm font-black text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 sm:px-5"

            >

              Try agents <Arrow />

            </Link>

          </div>

        </div>

      </header>


      <main>

        <section className="relative isolate overflow-hidden">

          <div className="agent-grid pointer-events-none absolute inset-0 z-0" />

          <div className="agent-glow pointer-events-none absolute inset-0 z-0" />


          <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-5 pb-24 pt-20 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:pb-28 lg:pt-28">

            <div>

              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white/85 px-3 py-1.5 text-xs font-black uppercase tracking-[.12em] text-cyan-800 shadow-sm backdrop-blur dark:border-cyan-400/25 dark:bg-cyan-400/8 dark:text-cyan-200">

                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_16px_rgba(34,211,238,.9)]" />

                AI Agents for business

              </span>


              <h1 className="mt-7 max-w-4xl text-5xl font-black leading-[.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl">

                AI agents that do more than answer.{" "}

                <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 bg-clip-text text-transparent dark:from-cyan-300 dark:via-blue-300 dark:to-violet-300">

                  They get work done.

                </span>

              </h1>


              <p className="mt-7 max-w-2xl text-lg font-medium leading-8 text-slate-600 sm:text-xl dark:text-slate-300">

                Interactive demos of agents connected to sales,

                document, and operations processes. Try them before discussing

                a real implementation.

              </p>


              <div className="mt-9 flex flex-col gap-3 sm:flex-row">

                <Link

                  href="/demo"

                  className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 px-7 text-sm font-black text-white shadow-xl shadow-blue-500/25 transition hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-blue-500/30"

                >

                  Try the demo <Arrow />

                </Link>


                <a

                  href="#arquitectura"

                  className="inline-flex h-13 items-center justify-center rounded-full border border-slate-300 bg-white px-7 text-sm font-black text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-400 dark:border-white/12 dark:bg-white/5 dark:text-white"

                >

                  See how it works

                </a>

              </div>


              <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs font-bold text-slate-500 dark:text-slate-400">

                {["No real data connected", "Works without an API key", "Ready for Vercel"].map((item) => (

                  <span key={item} className="inline-flex items-center gap-1.5">

                    <span className="text-emerald-500"><Check /></span>

                    {item}

                  </span>

                ))}

              </div>

            </div>


            <div className="glass-panel relative rounded-[2rem] border border-slate-200/80 bg-white/75 p-4 backdrop-blur-xl dark:border-white/10 dark:bg-white/[.045] sm:p-6">

              <div className="rounded-[1.5rem] border border-slate-200 bg-slate-950 p-5 text-white shadow-2xl dark:border-white/8">

                <div className="flex items-center justify-between border-b border-white/8 pb-4">

                  <div>

                    <p className="text-xs font-black uppercase tracking-[.16em] text-cyan-300">Agent execution</p>

                    <p className="mt-1 text-sm text-slate-400">Order 54291 · simulated operation</p>

                  </div>

                  <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-[11px] font-black text-emerald-300">LIVE DEMO</span>

                </div>


                <div className="mt-5 space-y-3">

                  {[
                    ["orders.lookup", "Order found", "✓"],

                    ["carrier.track", "Tracking checked", "✓"],

                    ["sla.evaluate", "+18 h delay detected", "!"],

                    ["tickets.create", "INC-8821 created", "✓"],

                    ["human.approval", "Waiting for approval", "…"],

                  ].map(([tool, text, state], index) => (

                    <div key={tool} className="flex items-center gap-3 rounded-2xl border border-white/7 bg-white/[.035] p-3.5">

                      <span

                        className={`grid h-8 w-8 place-items-center rounded-xl text-xs font-black ${state === "!"

                          ? "bg-amber-400/10 text-amber-300"

                          : state === "…"

                            ? "bg-violet-400/10 text-violet-300"

                            : "bg-emerald-400/10 text-emerald-300"

                          }`}

                      >

                        {state}

                      </span>

                      <div className="min-w-0 flex-1">

                        <p className="font-mono text-[10px] text-slate-500">{tool}</p>

                        <p className="truncate text-sm font-bold text-slate-100">{text}</p>

                      </div>

                      <span className="text-[10px] font-bold text-slate-600">0{index + 1}</span>

                    </div>

                  ))}

                </div>


                <div className="mt-5 rounded-2xl border border-cyan-400/15 bg-cyan-400/6 p-4 text-sm leading-6 text-slate-300">

                  <span className="font-black text-cyan-300">Result:</span>{" "}

                  exception contained, evidence recorded, and sensitive action

                  paused until human approval.

                </div>

              </div>

            </div>

          </div>

        </section>


        <section id="agentes" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">

          <div className="max-w-3xl">

            <p className="text-xs font-black uppercase tracking-[.2em] text-cyan-700 dark:text-cyan-300">Demos you can actually try</p>

            <h2 className="mt-4 text-4xl font-black tracking-[-.045em] sm:text-5xl">Three agents. Three problems that actually cost money.</h2>

            <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">

              This demo is not trying to impress you with a chatbot. It shows which system

              was queried, which rule was applied, and which action was prepared.

            </p>

          </div>


          <div className="mt-12 grid gap-5 lg:grid-cols-3">

            {AGENTS.map((agent) => (

              <article

                key={agent.key}

                className="group rounded-[1.7rem] border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-cyan-300 hover:shadow-xl hover:shadow-cyan-500/8 dark:border-white/8 dark:bg-white/[.035] dark:hover:border-cyan-400/25"

              >

                <div className="flex items-center justify-between">

                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-600 to-violet-600 text-xl font-black text-white shadow-lg shadow-blue-500/20">{agent.icon}</span>

                  <span className="text-[10px] font-black uppercase tracking-[.15em] text-slate-400">{agent.eyebrow}</span>

                </div>

                <h3 className="mt-6 text-2xl font-black">{agent.name}</h3>

                <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{agent.description}</p>

                <div className="mt-6 border-t border-slate-100 pt-5 text-sm font-bold text-slate-500 dark:border-white/7 dark:text-slate-400">{agent.outcome}</div>

                <Link

                  href={`/demo?agent=${agent.key}`}

                  className="mt-6 inline-flex items-center gap-2 text-sm font-black text-cyan-700 transition group-hover:gap-3 dark:text-cyan-300"

                >

                  Try this agent <Arrow />

                </Link>

              </article>

            ))}

          </div>

        </section>


        <section id="arquitectura" className="border-y border-slate-900/5 bg-white/60 py-24 dark:border-white/6 dark:bg-white/[.02]">

          <div className="mx-auto max-w-7xl px-5 lg:px-8">

            <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-center">

              <div>

                <p className="text-xs font-black uppercase tracking-[.2em] text-cyan-700 dark:text-cyan-300">The difference</p>

                <h2 className="mt-4 text-4xl font-black tracking-[-.045em] sm:text-5xl">A serious agent has tools, rules, and boundaries.</h2>

                <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">

                  The model handles the conversation. Engineering makes it possible for that conversation to

                  interact with real systems without turning the business into a gamble.

                </p>

              </div>


              <div className="grid gap-4 sm:grid-cols-2">

                {architecture.map(([number, title, text]) => (

                  <article key={number} className="rounded-[1.5rem] border border-slate-200 bg-white p-6 dark:border-white/8 dark:bg-[#0a1020]">

                    <span className="font-mono text-xs font-black text-cyan-600 dark:text-cyan-300">{number}</span>

                    <h3 className="mt-4 text-xl font-black">{title}</h3>

                    <p className="mt-2 leading-7 text-slate-600 dark:text-slate-400">{text}</p>

                  </article>

                ))}

              </div>

            </div>

          </div>

        </section>


        <section id="diferencia" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">

          <div className="rounded-[2rem] border border-cyan-200 bg-gradient-to-br from-cyan-50 via-white to-violet-50 p-8 shadow-[0_35px_100px_-65px_rgba(6,182,212,.7)] dark:border-cyan-400/15 dark:from-cyan-400/7 dark:via-white/[.025] dark:to-violet-400/8 sm:p-12">

            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">

              <div className="max-w-3xl">

                <p className="text-xs font-black uppercase tracking-[.2em] text-cyan-700 dark:text-cyan-300">I won't explain it. Try it.</p>

                <h2 className="mt-4 text-4xl font-black tracking-[-.045em] sm:text-5xl">Do you have a process that still depends on copying, pasting, and chasing people?</h2>

                <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">

                  This demo uses simulated systems. In a real project, the same

                  layers connect to your APIs, CRM, ERP, documents, and business rules.

                </p>

              </div>


              <Link

                href="/demo"

                className="inline-flex h-13 shrink-0 items-center justify-center gap-2 rounded-full bg-slate-950 px-7 text-sm font-black text-white shadow-xl transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-950"

              >

                Open Agent Lab <Arrow />

              </Link>

            </div>

          </div>

        </section>

      </main>


      <footer className="border-t border-slate-900/5 py-9 dark:border-white/6">

        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8 dark:text-slate-400">

          <div><span className="font-black text-slate-800 dark:text-white">Oscar Bonelli</span> · Senior AI Software Engineer</div>

          <div>AI · Web · Automation · Integrations</div>

        </div>

      </footer>

    </div>

  );

}