'use client'

import { useEffect, useRef } from 'react'

const stats = [
  { value: 200, suffix: '+', label: 'clienți activi gestionați cu succes' },
  { value: 15, suffix: '+', label: 'ani de experiență în domeniu' },
  { value: 100, suffix: '%', label: 'conformitate și transparență' },
  { value: 6, suffix: '/7', label: 'zile pe săptămână disponibili' },
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

export default function StatsStrip() {
  const ref = useRef(null)
  const done = useRef(false)

  useEffect(() => {
    const container = ref.current
    if (!container) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !done.current) {
            done.current = true
            container.querySelectorAll('[data-count]').forEach((el) => {
              const target = parseInt(el.dataset.count, 10)
              const suffix = el.dataset.suffix || ''
              animateCount(el, target, suffix)
            })
          }
        })
      },
      { threshold: 0.35 }
    )
    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      className="bg-base-off py-24 border-b border-slate-100"
      aria-label="Indicatori Performanță"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        {stats.map((s, idx) => (
          <div key={s.label} className="reveal-on-scroll flex flex-col items-start group" style={{ transitionDelay: `${idx * 100}ms` }}>
            <div className="flex items-baseline gap-1 mb-4">
              <span
                className="text-7xl md:text-8xl font-black text-text-navy leading-none tracking-tighter group-hover:text-primary-blue transition-colors"
                data-count={s.value}
                data-suffix={s.suffix}
              >
                0
                {s.suffix}
              </span>
            </div>
            <p className="text-lg md:text-xl text-text-muted font-bold leading-tight max-w-60 uppercase tracking-wider">
              {s.label}
            </p>
            <div className="mt-6 w-12 h-1.5 bg-accent-mustard group-hover:w-24 transition-all duration-500" />
          </div>
        ))}
      </div>
    </section>
  )
}
