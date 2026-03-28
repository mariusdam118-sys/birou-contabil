'use client'

import Link from 'next/link'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[min(92vh,900px)] flex flex-col justify-center bg-(--navy) text-white pt-28 pb-16 md:pt-32 md:pb-20 overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 20%, rgba(235,135,85,0.4) 0%, transparent 45%),
            radial-gradient(circle at 80% 60%, rgba(74,114,158,0.35) 0%, transparent 40%)`,
        }}
        aria-hidden
      />

      <div className="relative max-w-6xl mx-auto px-6 w-full">
        <p className="flex items-center gap-3 text-[10px] md:text-[11px] font-semibold tracking-[0.28em] uppercase text-(--accent) mb-6 md:mb-8 animate-[fadeUp_0.6s_ease_0.05s_both]">
          <span className="block w-8 h-px bg-(--accent)" aria-hidden />
          Contabilitate &amp; consultanță fiscală — București
        </p>

        <h1 className="font-serif font-normal text-[clamp(2.35rem,6.5vw,4rem)] leading-[1.08] tracking-tight text-white mb-6 md:mb-8 max-w-3xl animate-[fadeUp_0.6s_ease_0.12s_both]">
          Expertiza care{' '}
          <em className="not-italic text-(--accent) font-[family-name:var(--font-serif)]" style={{ fontStyle: 'italic' }}>
            protejează
          </em>{' '}
          afacerea ta.
        </h1>

        <p className="text-[15px] md:text-[17px] font-light text-(--muted) leading-relaxed max-w-xl mb-10 md:mb-12 animate-[fadeUp_0.6s_ease_0.2s_both]">
          Gestionăm evidența contabilă, salarizarea și obligațiile fiscale ale firmei tale cu precizie și
          responsabilitate — astfel încât tu să te concentrezi pe creșterea afacerii.
        </p>

        <div className="flex flex-wrap items-center gap-4 animate-[fadeUp_0.55s_ease_0.28s_both]">
          <Link
            href="#contact"
            className="btn-accent inline-flex items-center justify-center text-sm font-semibold bg-(--accent) text-(--navy-deep) px-7 py-3.5 rounded-md no-underline"
          >
            Solicită o consultație gratuită
          </Link>
          <Link
            href="#services"
            className="btn-ghost-light inline-flex items-center gap-2 text-sm font-semibold text-white/95 px-6 py-3.5 rounded-md border border-white/25 no-underline"
          >
            Descoperă serviciile
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>

      <div className="relative mt-auto pt-16 md:pt-20">
        <p className="max-w-6xl mx-auto px-6 flex items-center gap-3 text-[10px] font-semibold tracking-[0.35em] uppercase text-(--accent)">
          <span className="block w-8 h-px bg-(--accent)" aria-hidden />
          Scroll
        </p>
      </div>
    </section>
  )
}
