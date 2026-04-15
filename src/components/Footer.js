'use client'

import Link from 'next/link';

const serviceLinks = ['Contabilitate financiară', 'Salarizare & Personal', 'Consultanță fiscală']

const companyLinks = [
  { label: 'Despre noi', href: '#about' },
  { label: 'Cum lucrăm', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

const accreditations = ['CECCAR', 'CCF - Camera Consultanților Fiscali', 'ANAF']

export default function Footer() {
  return (
    <footer className="bg-base border-t border-slate-100" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-24 mb-24">
          <div className="lg:col-span-1">
            <div className="text-3xl font-black text-text-navy mb-8">
              Birou<span className="text-primary-blue">.</span>
            </div>
            <p className="text-lg text-text-muted leading-relaxed mb-10 max-w-xs font-medium">
              Expertiză contabilă de elită pentru afaceri care vizează excelența în era digitală.
            </p>
            <div className="space-y-4">
              <span className="text-xs font-black tracking-[0.3em] uppercase text-text-muted/40 block">Contact Direct</span>
              <a
                href="tel:+40722802121"
                className="text-2xl font-black text-primary-blue hover:text-accent-orange transition-all no-underline"
              >
                0722 802 121
              </a>
            </div>
          </div>

          <nav aria-label="Servicii">
            <h2 className="text-xs font-black tracking-[0.3em] uppercase text-text-muted/40 mb-8">Expertiză</h2>
            <ul className="list-none space-y-4 m-0 p-0">
              {serviceLinks.map((item) => (
                <li key={item}>
                  <a
                    href="#services"
                    className="text-lg font-bold text-text-navy hover:text-primary-blue transition-all no-underline"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Companie">
            <h2 className="text-xs font-black tracking-[0.3em] uppercase text-text-muted/40 mb-8">Companie</h2>
            <ul className="list-none space-y-4 m-0 p-0">
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-lg font-bold text-text-navy hover:text-primary-blue transition-all no-underline"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-black tracking-[0.3em] uppercase text-text-muted/40 mb-8">Acreditări</h2>
            <div className="flex flex-wrap gap-3">
              {accreditations.map((item) => (
                <span key={item} className="px-4 py-2 bg-slate-50 text-text-navy text-xs font-black uppercase tracking-widest rounded-lg border border-slate-100">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-100 flex flex-wrap justify-between items-center gap-8">
          <span className="text-sm font-bold text-text-muted/60">
            <Link href="/admin" className="hover:text-primary-blue transition-colors no-underline">
              ©
            </Link>{' '}
            {new Date().getFullYear()} Birou. Toate drepturile rezervate.
          </span>
          <div className="flex gap-10 flex-wrap">
            {['Politică cookies', 'GDPR', 'ANPC'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm font-bold text-text-muted/60 hover:text-primary-blue transition-all no-underline"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
