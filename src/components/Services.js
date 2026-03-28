'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

function IconBox({ children, solid }) {
  return (
    <span
      className={`inline-flex items-center justify-center size-11 shrink-0 rounded border ${
        solid
          ? 'bg-(--navy) border-(--navy) text-white'
          : 'bg-[#f0f2f5] border-black/[0.06] text-(--blue-soft)'
      }`}
    >
      {children}
    </span>
  )
}

function IconChart() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M4 19V5M8 19v-6M12 19V9M16 19v-4M20 19V11" strokeLinecap="round" />
    </svg>
  )
}
function IconUsers() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16 11a3 3 0 100-6 3 3 0 000 6zM8 13a4 4 0 100-8 4 4 0 000 8zm8 1c2.2 0 4 1.3 4 3v2H12v-2c0-1.7 1.8-3 4-3zM8 15c-2.3 0-6 1.1-6 3v2h8v-2c0-.6.3-1.2.8-1.7-.5-.2-1-.3-1.6-.3z" />
    </svg>
  )
}
function IconShield() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M12 3l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V7l8-4z" strokeLinejoin="round" />
    </svg>
  )
}
function IconHome() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M4 10.5L12 4l8 6.5V20a1 1 0 01-1 1h-5v-6H10v6H5a1 1 0 01-1-1v-9.5z" strokeLinejoin="round" />
    </svg>
  )
}
function IconDoc() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M7 3h7l5 5v13a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z" strokeLinejoin="round" />
      <path d="M14 3v4h4M9 13h6M9 17h6" strokeLinecap="round" />
    </svg>
  )
}
function IconScreen() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 21h8M12 17v4" strokeLinecap="round" />
    </svg>
  )
}

const services = [
  {
    id: 'I',
    title: 'Contabilitate financiară',
    description:
      'Evidență completă și corectă pentru o imagine fidelă a situației financiare a firmei tale.',
    icon: 'chart',
    highlight: false,
  },
  {
    id: 'II',
    title: 'Salarizare & Personal',
    description: 'State de salarii, declarații contribuții, înregistrare și actualizare Revisal.',
    icon: 'users',
    highlight: true,
  },
  {
    id: 'III',
    title: 'Consultanță fiscală',
    description: 'Optimizare fiscală și reprezentare profesională în fața autorităților fiscale.',
    icon: 'shield',
    highlight: false,
  },
  {
    id: 'IV',
    title: 'Înființări de firme',
    description: 'SRL, PFA, ÎI – de la alegerea formei juridice la obținerea CUI-ului.',
    icon: 'home',
    highlight: false,
  },
  {
    id: 'V',
    title: 'Expertiză contabilă',
    description: 'Rapoarte de expertiză judiciară, audit intern și due diligence financiar.',
    icon: 'doc',
    highlight: false,
  },
  {
    id: 'VI',
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
    const cards = gridRef.current?.querySelectorAll('.svc-card')
    if (!cards) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08 }
    )
    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" className="py-20 md:py-28 bg-white border-b border-black/[0.06]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12 md:mb-16 max-w-3xl">
          <span className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.28em] uppercase text-(--accent-soft) mb-4">
            <span className="block w-6 h-px bg-(--accent-soft)" aria-hidden />
            Servicii
          </span>
          <h2 className="font-serif font-normal text-[clamp(1.75rem,4vw,2.65rem)] leading-tight tracking-tight text-(--navy)">
            Expertiza noastră,{' '}
            <span className="text-(--blue-soft) italic" style={{ fontStyle: 'italic' }}>
              rezultatele tale.
            </span>
          </h2>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-black/[0.08] border-r-0 border-b-0"
        >
          {services.map((service, index) => {
            const Icon = icons[service.icon]
            return (
              <div
                key={service.id}
                className={`svc-card relative border-r border-b border-black/[0.08] p-7 md:p-8 transition-colors duration-300 opacity-0 translate-y-4 ${
                  service.highlight
                    ? 'bg-[#f4f1ec] border-l-2 border-l-(--accent) pl-6 md:pl-7'
                    : 'bg-white hover:bg-[#fafbfc]'
                }`}
                style={{ transitionDelay: `${index * 70}ms` }}
              >
                <div className="flex items-start justify-between gap-4 mb-5">
                  <span className="font-serif text-[11px] font-semibold text-black/25 tracking-widest">{service.id}</span>
                  <IconBox solid={service.highlight}>
                    <Icon />
                  </IconBox>
                </div>
                <h3 className="font-serif text-[1.15rem] md:text-[1.2rem] text-(--navy) font-normal mb-3 pr-2">
                  {service.title}
                </h3>
                <p className="text-[14px] md:text-[15px] text-[#4b5563] leading-relaxed mb-6">{service.description}</p>
                {service.highlight && (
                  <Link
                    href="#contact"
                    className="text-sm font-semibold text-(--blue-soft) hover:text-(--navy) no-underline inline-flex items-center gap-1"
                  >
                    Află mai mult <span aria-hidden>→</span>
                  </Link>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
