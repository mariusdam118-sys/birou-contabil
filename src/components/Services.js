'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

function IconBox({ children, solid }) {
  return (
    <span
      className={`inline-flex items-center justify-center size-14 shrink-0 rounded-2xl transition-all duration-300 ${
        solid
          ? 'bg-accent-mustard text-text-navy shadow-[0_10px_25px_rgba(234,179,8,0.25)]'
          : 'bg-primary-blue/5 text-primary-blue group-hover:bg-primary-blue group-hover:text-white'
      }`}
    >
      {children}
    </span>
  )
}

function IconChart() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
      <path d="M4 19V5M8 19v-6M12 19V9M16 19v-4M20 19V11" strokeLinecap="round" />
    </svg>
  )
}
function IconUsers() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16 11a3 3 0 100-6 3 3 0 000 6zM8 13a4 4 0 100-8 4 4 0 000 8zm8 1c2.2 0 4 1.3 4 3v2H12v-2c0-1.7 1.8-3 4-3zM8 15c-2.3 0-6 1.1-6 3v2h8v-2c0-.6.3-1.2.8-1.7-.5-.2-1-.3-1.6-.3z" />
    </svg>
  )
}
function IconShield() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
      <path d="M12 3l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V7l8-4z" strokeLinejoin="round" />
    </svg>
  )
}
function IconHome() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
      <path d="M4 10.5L12 4l8 6.5V20a1 1 0 01-1 1h-5v-6H10v6H5a1 1 0 01-1-1v-9.5z" strokeLinejoin="round" />
    </svg>
  )
}
function IconDoc() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
      <path d="M7 3h7l5 5v13a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z" strokeLinejoin="round" />
      <path d="M14 3v4h4M9 13h6M9 17h6" strokeLinecap="round" />
    </svg>
  )
}
function IconScreen() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 21h8M12 17v4" strokeLinecap="round" />
    </svg>
  )
}

const services = [
  {
    id: 'I',
    slug: 'contabilitate-financiara',
    title: 'Contabilitate financiară',
    description:
      'Evidență completă și corectă pentru o imagine fidelă a situației financiare a firmei tale.',
    icon: 'chart',
    highlight: false,
  },
  {
    id: 'II',
    slug: 'salarizare-personal',
    title: 'Salarizare & Personal',
    description: 'State de salarii, declarații contribuții, înregistrare și actualizare Revisal.',
    icon: 'users',
    highlight: true,
  },
  {
    id: 'III',
    slug: 'consultanta-fiscala',
    title: 'Consultanță fiscală',
    description: 'Optimizare fiscală și reprezentare profesională în fața autorităților fiscale.',
    icon: 'shield',
    highlight: false,
  },
  {
    id: 'IV',
    slug: 'infiintari-firme',
    title: 'Înființări de firme',
    description: 'SRL, PFA, ÎI – de la alegerea formei juridice la obținerea CUI-ului.',
    icon: 'home',
    highlight: false,
  },
  {
    id: 'V',
    slug: 'expertiza-contabila',
    title: 'Expertiză contabilă',
    description: 'Rapoarte de expertiză judiciară, audit intern și due diligence financiar.',
    icon: 'doc',
    highlight: false,
  },
  {
    id: 'VI',
    slug: 'asistenta-anaf-itm',
    title: 'Asistență ANAF & ITM',
    description: 'Reprezentare la controale fiscale și răspunsuri la notificări administrative.',
    icon: 'screen',
    highlight: false,
  },
]

const icons = {
  chart: IconChart,
  users: IconUsers,
  shield: IconShield,
  home: IconHome,
  doc: IconDoc,
  screen: IconScreen,
}

export default function Services() {
  const gridRef = useRef(null)

  useEffect(() => {
    const elements = gridRef.current?.querySelectorAll('.reveal-on-scroll')
    if (!elements) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" className="pt-8 pb-24 bg-base-off">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 reveal-on-scroll">
          <div className="max-w-3xl">
            <div className="pill-badge mb-6">Expertiză</div>
            <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] text-text-navy leading-none tracking-tight">
              Servicii integrate <br />
              <span className="text-primary-blue">pentru succesul tău.</span>
            </h2>
          </div>
          <p className="text-xl text-text-muted max-w-sm font-medium leading-snug">
            Acoperim tot spectrul financiar-contabil cu precizie digitală.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6"
        >
          {services.map((service, index) => {
            const Icon = icons[service.icon]
            // Bento logic: some cards span more columns/rows
            const isLarge = index === 0 || index === 3
            const colSpan = isLarge ? 'md:col-span-3 lg:col-span-6' : 'md:col-span-3 lg:col-span-3'
            
            return (
              <Link 
                key={service.id}
                href={`/servicii/${service.slug}`}
                className={`bento-card reveal-on-scroll group flex flex-col justify-between ${colSpan}`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div>
                  <div className="flex items-center justify-between mb-10">
                    <IconBox solid={service.highlight}>
                      <Icon />
                    </IconBox>
                    <span className="text-sm font-bold text-text-muted uppercase tracking-widest opacity-30">
                      {service.id}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-text-navy mb-4 group-hover:text-primary-blue transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-lg text-text-muted leading-relaxed">
                    {service.description}
                  </p>
                </div>
                
                <div className="mt-12 flex items-center gap-2 text-primary-blue font-bold group-hover:gap-4 transition-all">
                  <span className="text-sm uppercase tracking-widest">Vezi detalii</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14m-7-7l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
