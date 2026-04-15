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
      'Consilieri autorizați CECCAR și CCF - Camera Consultanților Fiscali, cu experiență în relația cu ANAF și alte instituții.',
  },
]

export default function About() {
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
      { threshold: 0.12 }
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-base overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">
          <div className="reveal-on-scroll">
            <div className="pill-badge mb-8">Povestea Noastră</div>
            <h2 className="text-[clamp(3rem,8vw,5.5rem)] text-text-navy leading-[0.9] tracking-tight mb-12">
              Partenerul tău <br />
              <span className="text-accent-orange">de încredere.</span>
            </h2>
            <div className="space-y-8 text-2xl text-text-muted leading-snug font-medium">
              <p>
                Biroul Contabil transformă complexitatea fiscală în claritate strategică. Suntem o echipă de experți dedicați succesului tău.
              </p>
              <p>
                Utilizăm tehnologie de ultimă oră pentru a-ți oferi o imagine fidelă și în timp real asupra afacerii tale.
              </p>
            </div>
            <div className="mt-16">
              <Link href="#contact" className="btn-agency-primary text-xl">
                Află mai multe
              </Link>
            </div>
          </div>
          
          <div className="reveal-on-scroll relative [animation-delay:0.2s]">
            <div className="absolute inset-0 bg-primary-blue/5 rounded-3xl rotate-3" />
            <div className="relative bg-white border-2 border-slate-100 p-12 rounded-3xl shadow-agency">
              <div className="grid grid-cols-2 gap-8">
                {principles.map((p, idx) => (
                  <div key={p.number} className="space-y-4">
                    <span className="text-4xl font-black text-primary-blue/10">{p.number}</span>
                    <h3 className="text-xl font-extrabold text-text-navy leading-tight">{p.title}</h3>
                    <p className="text-base leading-relaxed">{p.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
