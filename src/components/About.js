'use client'

import { useEffect, useRef } from 'react'

const credentials = [
    {
        title: 'CECCAR',
        description: 'Corp Experți Contabili și Contabili Autorizați din România',
    },
    {
        title:'CAFR',
        description:'Camera Auditorilor Financiari din România',
    },
    {
        title:'ANAF',
        description:'Reprezentant autorizat în relația cu administrația fiscală',
    },
    {
        title: 'ITM',
        description:'Autorizat pentru relații cu Inspectoratul Teritorial de Muncă',
    },
]

const principles = [
      {
    number: '01',
    title: 'Confidențialitate',
    description: 'Toate documentele și informațiile clientului sunt tratate cu deplină discreție și protejate conform GDPR.',
  },
  {
    number: '02',
    title: 'Comunicare permanentă',
    description: 'Răspundem prompt la orice solicitare și inițiem contactul ori de câte ori legislația se modifică cu impact asupra firmei tale.',
  },
  {
    number: '03',
    title: 'Tarife clare, fără surprize',
    description: 'Stabilim onorariul înainte de începerea colaborării, în funcție de volumul de activitate — fără costuri ascunse.',
  },
]

function CredentialCard({title, description}){
    return(
    <div className="bg-white p-5 hover:bg-(--bg-3) transition-colors">
      <div className="font-serif font-bold text-[15px] text-(--ink) mb-1">
        {title}
      </div>
      <div className="text-[12px] text-(--ink-3) leading-snug">
        {description}
      </div>
    </div>
    )
}

function Principle({number, title, description}){
    return(
    <div className="flex gap-5 py-5 border-b border-(--rule-lt) last:border-b-0 first:pt-0">
      <span className="font-serif text-[12px] font-bold text-(--rule) shrink-0 mt-0.5 min-w-5">
        {number}
      </span>
      <div>
        <div className="text-[15px] font-semibold text-(--ink) mb-1">
          {title}
        </div>
        <div className="text-[15px] text-(--ink-3) leading-relaxed">
          {description}
        </div>
      </div>
    </div>
    )
}

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
      { threshold: 0.1 }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return(
        <section
      id="about"
      ref={sectionRef}
      className="py-24 bg-(--bg-2) border-b border-(--rule)"
    >
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[460px_1fr] gap-16 lg:gap-24 items-start">

        {/* Coloana stângă */}
        <div className="reveal-item">
          <span className="flex items-center gap-3 text-[11px] font-semibold tracking-widest uppercase text-(--ink-4) mb-4">
            <span className="block w-5 h-px bg-(--warm)" />
            Despre noi
          </span>
          <h2 className="font-serif font-normal text-[clamp(26px,3.5vw,42px)] tracking-tight text-(--ink) mb-7">
            Un birou contabil cu standarde ridicate
          </h2>
          <div className="space-y-4">
            <p className="text-[15px] font-light text-(--ink-2) leading-relaxed">
              Biroul Contabil este o firmă de specialitate din București care acordă servicii integrate de contabilitate, fiscalitate și consultanță pentru IMM-uri, PFA-uri și companii de mari dimensiuni.
            </p>
            <p className="text-[15px] font-light text-(--ink-2) leading-relaxed">
              Prioritatea noastră este protecția intereselor clientului — prin cunoaștere aprofundată a legislației românești în continuă schimbare, comunicare transparentă și soluții adaptate fiecărui profil de activitate.
            </p>
            <p className="text-[15px] font-light text-(--ink-2) leading-relaxed">
              Nu oferim pachete standard. Fiecare client primește o abordare construită în jurul nevoilor și volumului său specific.
            </p>
          </div>
        </div>

        {/* Coloana dreaptă */}
        <div className="reveal-item" style={{ transitionDelay: '120ms' }}>

          {/* Grid acreditări */}
          <div className="grid grid-cols-2 gap-px bg-(--rule) border border-(--rule) mb-10">
            {credentials.map((cred) => (
              <CredentialCard
                key={cred.title}
                title={cred.title}
                description={cred.description}
              />
            ))}
          </div>

          {/* Principii */}
          <div>
            {principles.map((p) => (
              <Principle
                key={p.number}
                number={p.number}
                title={p.title}
                description={p.description}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}