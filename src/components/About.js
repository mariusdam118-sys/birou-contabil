'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

const principles = [
  {
    number: '01',
    title: 'Confidențialitate totală',
    description:
      'Toate documentele și informațiile sunt tratate cu discreție și protejate conform GDPR.',
  },
  {
    number: '02',
    title: 'Comunicare permanentă',
    description:
      'Răspundem prompt la solicitări și te informăm când legislația se schimbă cu impact asupra firmei tale.',
  },
  {
    number: '03',
    title: 'Tarife clare, fără surprize',
    description:
      'Onorariul se stabilește înainte de colaborare, în funcție de volum — fără costuri ascunse.',
  },
  {
    number: '04',
    title: 'Expertiză certificată',
    description:
      'Consilieri autorizați CECCAR și CAFR, cu experiență în relația cu ANAF și alte instituții.',
  },
]

export default function About() {
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
      { threshold: 0.12 }
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-(--navy) text-white overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 10% 20%, rgba(235,135,85,0.25) 0%, transparent 42%)',
        }}
        aria-hidden
      />

      <div className="relative max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-14 lg:gap-20 items-start">
        <div className="reveal-item">
          <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-(--accent) mb-5">
            — Despre noi
          </p>
          <h2 className="font-serif font-normal text-[clamp(1.75rem,3.8vw,2.6rem)] leading-[1.15] text-white mb-8">
            Un birou contabil cu{' '}
            <em className="not-italic text-(--accent)" style={{ fontStyle: 'italic' }}>
              standarde ridicate
            </em>
          </h2>
          <div className="space-y-4 text-[15px] text-(--muted) leading-relaxed mb-8">
            <p>
              Biroul Contabil este o firmă de specialitate din București care oferă servicii integrate de
              contabilitate, fiscalitate și consultanță pentru IMM-uri, PFA-uri și companii mari.
            </p>
            <p>
              Prioritatea noastră este protecția intereselor tale — prin cunoaștere aprofundată a legislației,
              comunicare transparentă și soluții adaptate fiecărui profil de activitate.
            </p>
          </div>
          <Link href="#contact" className="link-accent text-(--accent) text-sm font-semibold no-underline inline-flex items-center gap-1">
            Descoperă echipa noastră <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="reveal-item space-y-0 border-t border-white/10" style={{ transitionDelay: '100ms' }}>
          {principles.map((p) => (
            <div
              key={p.number}
              className="grid grid-cols-[auto_1fr] gap-5 md:gap-8 py-7 border-b border-white/10 last:border-b-0"
            >
              <span className="font-sans text-[2rem] md:text-[2.35rem] font-semibold text-white/[0.12] leading-none tabular-nums pt-1">
                {p.number}
              </span>
              <div>
                <h3 className="text-[16px] font-semibold text-white mb-2">{p.title}</h3>
                <p className="text-[14px] md:text-[15px] text-(--muted) leading-relaxed">{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
