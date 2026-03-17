import Link from 'next/link'

const serviceLinks = [
  'Contabilitate financiară',
  'Salarizare & Personal',
  'Consultanță fiscală',
  'Înființări de firme',
  'Expertiză contabilă',
  'Asistență ANAF & ITM',
]

const companyLinks = [
  { label: 'Despre noi', href: '#about' },
  { label: 'Cum lucrăm', href: '#process' },
  { label: 'Contact', href: '#contact' },
  { label: 'Politică confidențialitate', href: '#' },
  { label: 'Termeni și condiții', href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-(--ink)" role="contentinfo">

      {/* ── Top ── */}
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[280px_1fr_1fr] gap-12 border-b border-white/10">

        {/* Brand */}
        <div>
          <div className="font-serif text-[20px] text-white/85 mb-3">
            Biroul <strong>Contabil</strong>
          </div>
          <p className="text-[13px] text-white/30 leading-relaxed mb-6">
            Contabilitate, fiscalitate și consultanță pentru afaceri serioase. Sector 3, București.
          </p>
          {/* Contact rapid */}
          <div className="space-y-2">
            <a
              href="tel:+40725316318"
              className="flex items-center gap-2 text-[13px] text-white/40 hover:text-white/80 transition-colors no-underline"
            >
              <span className="text-[10px] font-semibold tracking-widest uppercase text-white/20">Tel</span>
              (+40) 725.316.318
            </a>
            <a
              href="mailto:office@biroulcontabil.ro"
              className="flex items-center gap-2 text-[13px] text-white/40 hover:text-white/80 transition-colors no-underline"
            >
              <span className="text-[10px] font-semibold tracking-widest uppercase text-white/20">Email</span>
              office@biroulcontabil.ro
            </a>
          </div>
        </div>

        {/* Servicii */}
        <nav aria-label="Linkuri servicii">
          <h5 className="text-[11px] font-semibold tracking-widest uppercase text-white/25 mb-5">
            Servicii
          </h5>
          <ul className="list-none space-y-3">
            {serviceLinks.map((item) => (
              <li key={item}>
                <a
                  href="#services"
                  className="text-[14px] text-white/45 hover:text-white/85 transition-colors no-underline"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Companie */}
        <nav aria-label="Linkuri companie">
          <h5 className="text-[11px] font-semibold tracking-widest uppercase text-white/25 mb-5">
            Companie
          </h5>
          <ul className="list-none space-y-3">
            {companyLinks.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-[14px] text-white/45 hover:text-white/85 transition-colors no-underline"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA în footer */}
          <div className="mt-8 pt-8 border-t border-white/10">
            <a
              href="#contact"
              className="inline-block text-[13px] font-semibold text-(--ink) bg-(--warm) px-5 py-3 hover:brightness-110 transition-all no-underline"
            >
              Solicită ofertă gratuită →
            </a>
          </div>
        </nav>

      </div>

      {/* ── Bottom ── */}
      <div className="max-w-6xl mx-auto px-6 py-5 flex flex-wrap justify-between items-center gap-4">
        <span className="text-[12px] text-white/20">
          © {new Date().getFullYear()} Biroul Contabil. Toate drepturile rezervate.
        </span>
        <div className="flex gap-6">
          {['Politică cookies', 'GDPR', 'ANPC'].map((item) => (
            <a
              key={item}
              href="#"
              className="text-[12px] text-white/20 hover:text-white/50 transition-colors no-underline"
            >
              {item}
            </a>
          ))}
        </div>
      </div>

    </footer>
  )
}