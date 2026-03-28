const serviceLinks = [
  'Contabilitate financiară',
  'Salarizare & Personal',
  'Consultanță fiscală',
]

const companyLinks = [
  { label: 'Despre noi', href: '#about' },
  { label: 'Cum lucrăm', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

const accreditations = ['CECCAR', 'CAFR', 'ANAF']

export default function Footer() {
  return (
    <footer className="bg-(--navy-deep) text-white" role="contentinfo">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10 border-b border-white/10">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="font-serif text-[1.35rem] text-white/95 mb-3">Biroul Contabil</div>
          <p className="text-[13px] text-(--muted) leading-relaxed mb-6 max-w-xs">
            Contabilitate, fiscalitate și consultanță pentru afaceri serioase. Sector 3, București.
          </p>
          <div>
            <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-white/35 block mb-1">
              Tel
            </span>
            <a
              href="tel:+40725316318"
              className="text-[14px] text-white/80 hover:text-white transition-colors no-underline"
            >
              (+40) 725.316.318
            </a>
          </div>
        </div>

        <nav aria-label="Servicii">
          <h2 className="text-[11px] font-semibold tracking-[0.25em] uppercase text-white/40 mb-5">Servicii</h2>
          <ul className="list-none space-y-3 m-0 p-0">
            {serviceLinks.map((item) => (
              <li key={item}>
                <a href="#services" className="text-[14px] text-(--muted) hover:text-white transition-colors no-underline">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Companie">
          <h2 className="text-[11px] font-semibold tracking-[0.25em] uppercase text-white/40 mb-5">Companie</h2>
          <ul className="list-none space-y-3 m-0 p-0">
            {companyLinks.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="text-[14px] text-(--muted) hover:text-white transition-colors no-underline">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-[11px] font-semibold tracking-[0.25em] uppercase text-white/40 mb-5">Acreditări</h2>
          <ul className="list-none space-y-3 m-0 p-0">
            {accreditations.map((item) => (
              <li key={item} className="text-[14px] text-(--muted)">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-wrap justify-between items-center gap-4">
        <span className="text-[12px] text-white/35">
          © {new Date().getFullYear()} Biroul Contabil. Toate drepturile rezervate.
        </span>
        <div className="flex gap-6 flex-wrap">
          {['Politică cookies', 'GDPR', 'ANPC'].map((item) => (
            <a
              key={item}
              href="#"
              className="text-[12px] text-white/35 hover:text-white/60 transition-colors no-underline"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
