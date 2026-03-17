'use client'

import { useEffect, useRef } from 'react'

const steps = [
  {
    number: '01',
    title: 'Consultație inițială',
    description: 'Analizăm profilul firmei tale, volumul de documente și nevoile specifice pentru a stabili un pachet potrivit.',
  },
  {
    number: '02',
    title: 'Ofertă & contract',
    description: 'Îți transmitem o ofertă detaliată și transparentă. Semnăm un contract de prestări servicii cu clauze clare.',
  },
  {
    number: '03',
    title: 'Preluarea dosarelor',
    description: 'Preluăm documentele de la contabilul anterior sau de la tine direct, fizic sau prin mijloace digitale securizate.',
  },
  {
    number: '04',
    title: 'Gestionare continuă',
    description: 'Gestionăm lunar toate obligațiile contabile și fiscale și te informăm constant despre situația firmei tale.',
  },
]

export default function Process() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const elements = sectionRef.current?.querySelectorAll('.reveal-item')
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
    <section
      id="process"
      ref={sectionRef}
      className="py-24 border-b border-(--rule)"
    >
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="mb-14 reveal-item">
          <span className="flex items-center gap-3 text-[11px] font-semibold tracking-widest uppercase text-(--ink-4) mb-4">
            <span className="block w-5 h-px bg-(--warm)" />
            Cum lucrăm
          </span>
          <h2 className="font-serif font-normal text-[clamp(26px,3.5vw,42px)] tracking-tight text-(--ink)">
            Procesul de colaborare
          </h2>
        </div>

        {/* Pași */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-(--rule) border-r-0">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="reveal-item border-r border-(--rule) p-8 hover:bg-(--bg-2) transition-colors duration-200 relative group"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Linie de conectare între pași — doar pe desktop */}
              {index < steps.length - 1 && (
                <span className="hidden lg:block absolute top-13 right-0 w-px h-6 bg-(--rule) group-hover:bg-(--warm) transition-colors duration-300" />
              )}

              <span className="block font-serif text-[11px] font-bold text-(--rule) tracking-wider mb-5">
                {step.number}
              </span>
              <h4 className="font-serif font-bold text-[16px] text-(--ink) mb-3">
                {step.title}
              </h4>
              <p className="text-[14px] text-(--ink-3) leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}