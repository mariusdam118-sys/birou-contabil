'use client'

import { useEffect, useRef } from 'react'

const steps = [
  {
    number: '01',
    title: 'Consultație inițială',
    description:
      'Analizăm profilul firmei tale, volumul de documente și nevoile specifice pentru a stabili un pachet potrivit.',
  },
  {
    number: '02',
    title: 'Ofertă & contract',
    description:
      'Îți transmitem o ofertă detaliată și transparentă. Semnăm un contract de prestări servicii cu clauze clare.',
  },
  {
    number: '03',
    title: 'Preluarea dosarelor',
    description:
      'Preluăm documentele de la contabilul anterior sau direct de la tine, fizic sau prin canale digitale securizate.',
  },
  {
    number: '04',
    title: 'Gestionare continuă',
    description:
      'Gestionăm lunar obligațiile contabile și fiscale și te informăm constant despre situația firmei tale.',
  },
]

export default function Process() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const elements = sectionRef.current?.querySelectorAll('.reveal-on-scroll')
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
    <section id="process" ref={sectionRef} className="py-32 bg-base">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24 reveal-on-scroll">
          <div className="max-w-3xl">
            <div className="pill-badge mb-6">Workflow</div>
            <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] text-text-navy leading-none tracking-tight">
              Cum transformăm <br />
              <span className="text-primary-blue">viziunea în realitate.</span>
            </h2>
          </div>
          <p className="text-xl text-text-muted max-w-sm font-medium leading-snug">
            Un proces transparent și eficient, adaptat nevoilor tale specifice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="reveal-on-scroll group"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative mb-8">
                <span className="text-6xl font-black text-primary-blue/5 group-hover:text-primary-blue/10 transition-colors">
                  {step.number}
                </span>
                <div className="absolute bottom-2 left-0 w-12 h-1 bg-accent-mustard group-hover:w-full transition-all duration-500" />
              </div>
              <h3 className="text-2xl font-extrabold text-text-navy mb-4">{step.title}</h3>
              <p className="text-lg text-text-muted leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
