'use client'

import Link from 'next/link'

export default function CtaBand() {
  return (
    <section
      className="relative text-white py-20 overflow-hidden bg-slate-900"
      aria-labelledby="cta-heading"
    >
      <div className="absolute top-0 right-0 w-[30%] h-full bg-primary-blue/10 skew-x-[-20deg] translate-x-20" />
      <div className="relative max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        <div className="pill-badge bg-white/5 text-white/70 border border-white/10 mb-8 reveal-on-scroll text-[10px]! tracking-[0.3em]!">
          CONTACTEAZĂ-NE
        </div>
        <h2
          id="cta-heading"
          className="text-[clamp(2rem,5vw,3.5rem)] leading-tight font-black text-white mb-10 reveal-on-scroll [animation-delay:0.1s]"
        >
          Ești gata să <br />
          <span className="text-primary-blue">evoluăm împreună?</span>
        </h2>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 reveal-on-scroll [animation-delay:0.2s]">
          <Link
            href="#contact"
            className="btn-agency-primary bg-primary-blue! text-white! hover:bg-white! hover:text-slate-900! px-12 py-4 shadow-2xl transition-all duration-300"
          >
            Solicită Ofertă
          </Link>
          <a
            href="tel:+40722802121"
            className="text-xl font-bold border-b-2 border-primary-blue/30 hover:border-primary-blue transition-all duration-300 pb-1"
          >
            0722 802 121
          </a>
        </div>
      </div>

      {/* Very Thin & Subtle Marquee Strip */}
      <div className="absolute bottom-0 left-0 w-full py-2 bg-white/5 border-t border-white/5 opacity-30 pointer-events-none select-none">
        <div className="marquee-content text-[10px]! font-bold! tracking-[0.4em]! text-white uppercase">
          <span className="marquee-item">EXCELENȚĂ • INTEGRITATE • PROFESIONALISM •</span>
          <span className="marquee-item">EXCELENȚĂ • INTEGRITATE • PROFESIONALISM •</span>
        </div>
      </div>
    </section>
  )
}
