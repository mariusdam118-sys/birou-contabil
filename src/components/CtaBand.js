'use client'

import Link from 'next/link'

export default function CtaBand() {
  return (
    <section
      className="relative text-white py-20 md:py-28 overflow-hidden"
      aria-labelledby="cta-heading"
    >
      <div className="absolute inset-0 bg-grid-fine" aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#1e3f73]/35 via-[#1a3866]/45 to-[#152d52]/55"
        aria-hidden
      />
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <p className="text-[11px] font-semibold tracking-[0.35em] uppercase text-(--accent) mb-6">
          Hai să colaborăm
        </p>
        <h2
          id="cta-heading"
          className="font-serif text-[clamp(1.85rem,4.5vw,2.75rem)] leading-[1.15] font-normal text-white mb-6"
        >
          Gata să{' '}
          <em className="not-italic text-(--accent)" style={{ fontStyle: 'italic' }}>
            protejăm
          </em>{' '}
          afacerea ta?
        </h2>
        <p className="text-[15px] text-(--muted-2) leading-relaxed mb-10 max-w-xl mx-auto">
          Solicită o consultație gratuită și descoperă cum Biroul Contabil poate gestiona toate obligațiile
          fiscale ale firmei tale.
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
          <Link
            href="#contact"
            className="btn-accent inline-flex justify-center text-sm font-semibold bg-(--accent) text-(--navy-deep) px-8 py-3.5 rounded-md no-underline"
          >
            Solicită consultație gratuită
          </Link>
          <a
            href="tel:+40725316318"
            className="inline-flex justify-center text-sm font-semibold px-8 py-3.5 rounded-md border border-white/35 text-white/95 hover:bg-white/10 transition-colors no-underline"
          >
            +40 725.316.318
          </a>
        </div>
      </div>
    </section>
  )
}
