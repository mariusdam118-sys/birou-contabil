'use client'

import { useEffect, useRef } from 'react'

const services = [
  {
    id: 'I',
    title: 'Contabilitate financiară',
    description: 'Evidență completă și corectă pentru o imagine fidelă a situației financiare a firmei tale.',
    items: [
      'Registre contabile obligatorii',
      'Situații financiare anuale',
      'Rapoarte anuale de management',
      'Reconcilieri bancare',
    ],
  },
  {
    id: 'II',
    title: 'Salarizare & Personal',
    description: 'Acoperim toate obligațiile legate de relațiile de muncă și declararea contribuțiilor sociale.',
    items:[
      'State de salarii & fluturași',
      'Declarații contribuții (D112)',
      'Înregistrare & actualizare Revisal',
      'Contracte de muncă',
    ],
  },
  {
    id: 'III',
    title: 'Consultanță fiscală',
    description: 'Interpretare corectă a Codului fiscal și optimizare a sarcinii fiscale în limitele legii.',
    items: [
      'Declarații TVA & D394',
      'Planificare fiscală strategică',
      'Reprezentare în fața ANAF',
      'Contestații administrative',
    ],
  },
  {
    id: 'IV',
    title:'Înființări de firme',
    description:'Asistare completă în procesul de înregistrare — de la forma juridică la obținerea CUI-ului',
    items:[
      'SRL, SRL-D, SA',
      'PFA, Întreprindere Familială, ÎI',
      'Sediu social & puncte de lucru',
      'Radieri & modificări societare',
    ],
  },
  {
    id: 'V',
    title: 'Expertiză contabilă',
    description:'Rapoarte de expertiză judiciară și extrajudiciară, audit intern și analiză patrimonială.',
    items:[
      'Expertiză judiciară',
      'Audit intern',
      'Due diligence financiar',
      'Evaluare patrimoniu',
    ],
  },
  {
    id:'VI',
    title: 'Asistență ANAF & ITM',
    description: 'Intermediem relațiile cu autoritățile fiscale și administrative în orice situație.',
    items:[
      'Reprezentare la controale',
      'Răspunsuri la notificări ANAF',
      'Înregistrare contracte',
      'Cereri & adrese administrative',
    ],
  },
]

export default function Services(){
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
    { threshold: 0.1 }
  )

  cards.forEach((card) => observer.observe(card))
  return () => observer.disconnect()
}, [])

  return(
    <section id="services" className="py-24 border-b border-(--rule)">
      <div className="max-w-6x1 mx-auto px-6">
        {/*Header*/}
        <div className="flex justify-between items-end mb-14 flex-wrap gap-6">
          <div>
            <span className="flex items-center gap-3 text-[11px] font-semibold tracking-widest uppercase text-(--ink-4) mb-4">
              <span className="block w-5 h-px bg-(--warm)"/>
              Servicii
            </span>
            <h2 className="font-serif font-normal text-[clamp(26px,3.5vw,42px)] tracking-tight text-(--ink)">
              Ce oferim?
            </h2>
          </div>
          <a href="#contact" className="text-sm font-semibold text-(--ink) px-6 py-3 border border-(--rule) hover:border-(--ink-3) hover:bg-(--bg-2) transition-all no-underline">
            Solicită ofertă personalizată
          </a>
        </div>
                {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-(--rule) border-r-0 border-b-0"
        >
          {services.map((service, index) => (
            <div
              key={service.id}
              className="svc-card relative border-r border-b border-(--rule) p-8 bg-white hover:bg-(--bg-2) transition-all duration-300 opacity-0 translate-y-4 overflow-hidden group"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              {/* Bordura stângă animată */}
              <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-(--warm) scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom" />

              {/* Număr roman */}
              <span className="block font-serif text-[11px] font-bold text-(--rule) tracking-wider mb-5">
                {service.id}
              </span>

              {/* Titlu */}
              <h3 className="font-serif font-normal text-[19px] text-(--ink) mb-3">
                {service.title}
              </h3>

              {/* Descriere */}
              <p className="text-[15px] text-(--ink-3) leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Lista de servicii */}
              <ul className="border-t border-(--rule-lt) pt-4 list-none space-y-1">
                {service.items.map((item) => (
                  <li
                    key={item}
                    className="text-[15px] text-(--ink-3) pl-4 relative"
                  >
                    <span className="absolute left-0 text-(--rule)">–</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}