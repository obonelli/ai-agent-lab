import Link from "next/link";

export function Brand({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="inline-flex items-center gap-3" aria-label="Oscar Bonelli AI Agent Lab">
      <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-[13px] border border-cyan-300/25 bg-slate-950 text-sm font-black text-white shadow-lg shadow-cyan-500/10 dark:bg-white/[.06]">
        OB
        <span className="absolute inset-x-1 bottom-1 h-px bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500" />
      </span>
      <span className="leading-none">
        <span className="block text-sm font-black tracking-[-0.03em] text-slate-950 dark:text-white">Oscar Bonelli</span>
        <span className="mt-1 block text-[10px] font-bold uppercase tracking-[.18em] text-cyan-700 dark:text-cyan-300">AI Agent Lab</span>
      </span>
    </Link>
  );
}
