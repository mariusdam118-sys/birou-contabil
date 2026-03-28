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
    <section id="process" ref={sectionRef} className="py-20 md:py-28 bg-(--surface) border-b border-black/[0.06]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12 md:mb-14 reveal-item">
          <span className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.28em] uppercase text-(--accent-soft) mb-4">
            <span className="block w-6 h-px bg-(--accent-soft)" aria-hidden />
            Cum lucrăm
          </span>
          <h2 className="font-serif font-normal text-[clamp(1.75rem,3.5vw,2.4rem)] tracking-tight text-(--navy)">
            Procesul de colaborare
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-black/[0.08] border-r-0 bg-white">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="reveal-item border-r border-b border-black/[0.08] lg:border-b-0 p-7 md:p-8 hover:bg-[#fafbfc] transition-colors relative"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <span className="block font-serif text-[11px] font-bold text-black/20 tracking-widest mb-4">
                {step.number}
              </span>
              <h3 className="font-serif text-[17px] text-(--navy) font-semibold mb-3">{step.title}</h3>
              <p className="text-[14px] text-[#4b5563] leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
