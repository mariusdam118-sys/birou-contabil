'use client'

import { useEffect, useRef } from 'react'

const stats = [
  { value: 15, suffix: '+', label: 'Ani Experiență' },
  { value: 200, suffix: '+', label: 'Clienți în Portofoliu' },
  { value: 100, suffix: '%', label: 'Conformitate' },
  { value: 'Premium', suffix: '', label: 'Consultanță', isText: true },
]

function animateCount(el, target, suffix) {
  const duration = 1200
  const start = performance.now()
  function step(now) {
    const progress = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    el.textContent = Math.round(eased * target) + suffix
    if (progress < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

export default function Hero() {
  const statsRef = useRef(null)
  const done = useRef(false)

  useEffect(() => {
    const container = statsRef.current
    if (!container) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !done.current) {
            done.current = true
            container.querySelectorAll('[data-count]').forEach((el) => {
              if (el.dataset.isText === 'true') {
                el.textContent = el.dataset.count
              } else {
                const target = parseInt(el.dataset.count, 10)
                const suffix = el.dataset.suffix || ''
                animateCount(el, target, suffix)
              }
            })
          }
        })
      },
      { threshold: 0.1 }
    )
    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-[82vh] flex flex-col bg-base overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/30 skew-x-[-15deg] translate-x-1/2 pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-1/4 h-1/2 bg-primary-blue/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="flex flex-col justify-center items-start px-6 md:px-12 pt-32 pb-12">
        <div className="relative max-w-7xl w-full mx-auto">
          <div className="pill-badge mb-8 animate-fade-up bg-accent-mustard text-text-navy font-bold text-xs tracking-widest uppercase">
            EXPERTIZĂ FINANCIARĂ LA STANDARDE ÎNALTE
          </div>
          
          <h1 className="text-[clamp(3rem,8vw,6.5rem)] font-black leading-none tracking-[-0.04em] text-text-navy mb-10 animate-reveal">
            Expertiza care <br />
            <span className="relative inline-block">
              securizează
              <span className="absolute bottom-2 left-0 w-full h-[0.15em] bg-accent-mustard/30 -z-10" />
            </span> <br />
            viitorul tău.
          </h1>
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-10 mb-16 animate-fade-up [animation-delay:0.3s]">
            <p className="text-lg md:text-xl text-text-muted max-w-lg leading-relaxed font-medium border-l-2 border-primary-blue/20 pl-6">
              Soluții contabile de elită pentru companii vizionare. <br className="hidden md:block" />
              Excelență prin precizie, integritate și viziune strategică.
            </p>
            <div className="flex gap-4">
              <a href="#contact" className="btn-agency-primary text-base px-10 py-4 bg-primary-blue! hover:bg-slate-800! transition-colors duration-300">
                Să începem
              </a>
              <a href="#services" className="btn-agency-secondary text-base px-10 py-4">
                Servicii
              </a>
            </div>
          </div>

          {/* Trust Metrics / Key Stats Strip */}
          <div 
            ref={statsRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 border-t border-slate-100 pt-12 animate-fade-up [animation-delay:0.5s]"
          >
            {stats.map((s) => (
              <div key={s.label} className="group">
                <p 
                  className="text-4xl md:text-5xl font-black text-text-navy mb-2 tracking-tighter transition-colors group-hover:text-primary-blue"
                  data-count={s.value}
                  data-suffix={s.suffix}
                  data-is-text={s.isText}
                >
                  {s.isText ? s.value : '0' + s.suffix}
                </p>
                <p className="text-xs md:text-sm font-bold text-text-muted uppercase tracking-widest">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Marquee - Acts as Divider */}
      <div className="relative marquee-container bg-slate-900! py-4! border-y border-slate-800">
        <div className="marquee-content text-xs! font-bold! tracking-[0.2em]!">
          <span className="marquee-item pr-12! text-white/90">CONTABILITATE DIGITALĂ <span className="text-accent-mustard ml-4">•</span></span>
          <span className="marquee-item pr-12! text-white/90">CONSULTANȚĂ FISCALĂ <span className="text-primary-blue ml-4">•</span></span>
          <span className="marquee-item pr-12! text-white/90">EXPERTIZĂ JUDICIARĂ <span className="text-accent-mustard ml-4">•</span></span>
          <span className="marquee-item pr-12! text-white/90">AUDIT FINANCIAR <span className="text-primary-blue ml-4">•</span></span>
          <span className="marquee-item pr-12! text-white/90">CONTABILITATE DIGITALĂ <span className="text-accent-mustard ml-4">•</span></span>
          <span className="marquee-item pr-12! text-white/90">CONSULTANȚĂ FISCALĂ <span className="text-primary-blue ml-4">•</span></span>
          <span className="marquee-item pr-12! text-white/90">EXPERTIZĂ JUDICIARĂ <span className="text-accent-mustard ml-4">•</span></span>
          <span className="marquee-item pr-12! text-white/90">AUDIT FINANCIAR <span className="text-primary-blue ml-4">•</span></span>
        </div>
      </div>
    </section>
  )
}
