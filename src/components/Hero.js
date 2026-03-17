'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

// Datele statisticilor — definite în afara componentului
// ca să nu fie recreate la fiecare render
const stats = [
  { value: 200, suffix: '+', label: 'clienți activi gestionați' },
  { value: 15,  suffix: '+', label: 'ani de experiență în domeniu' },
  { value: 100, suffix: '%', label: 'conformitate garantată ANAF' },
  { value: 6,   suffix: '/7', label: 'zile pe săptămână disponibili' },
]

// Funcția de count-up — în afara componentului
// pentru că nu folosește nimic din state/props
function animateCount(el, target, suffix) {
  const duration = 1200
  const start = performance.now()

  function step(now) {
    const progress = Math.min((now - start) / duration, 1)
    // Ease-out cubic — încetinește spre final
    const eased = 1 - Math.pow(1 - progress, 3)
    el.textContent = Math.round(eased * target) + suffix
    if (progress < 1) requestAnimationFrame(step)
  }

  requestAnimationFrame(step)
}

export default function Hero() {
  const statsRef = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const container = statsRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Rulează animația o singură dată
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true

            // Selectează toate elementele cu data-count
            container.querySelectorAll('[data-count]').forEach((el) => {
              const target = parseInt(el.dataset.count)
              const suffix = el.dataset.suffix || ''
              animateCount(el, target, suffix)
            })
          }
        })
      },
      { threshold: 0.5 }
    )

    observer.observe(container)

    // Cleanup — oprește observarea când componenta dispare
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="hero"
      className="pt-16 border-b border-(--rule)"
    >

      {/* ── Banda de sus cu credențiale ── */}
      <div className="bg-(--bg-2) border-b border-(--rule) py-3" aria-hidden="true">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:flex md:gap-8">
          {['Membri CECCAR', 'Autorizați CAFR', 'Sector 3, București', 'Luni – Sâmbătă 08:00–20:00'].map((item, i) => (
            <span key={item} className="text-[14px] text-(--ink-4) flex items-center gap-2">
              {i > 0 && <span className="w-1 h-1 rounded-full bg-(--rule)" aria-hidden="true" />}
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── Conținut principal ── */}
      <div className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 lg:gap-20 items-end">

        {/* Coloana stângă — text */}
        <div>
          {/* Label */}
          <span className="flex items-center gap-3 text-[11px] font-semibold tracking-widest uppercase text-(--ink-4) mb-4 animate-[fadeUp_0.6s_ease_0.1s_both]">
            <span className="block w-5 h-px bg-(--warm)" aria-hidden="true" />
            Contabilitate & Consultanță Fiscală
          </span>

          {/* Headline */}
          <h1 className="font-serif font-normal text-[clamp(40px,5.5vw,70px)] leading-[1.06] tracking-tight text-(--ink) mb-6 animate-[fadeUp_0.6s_ease_0.2s_both]">
            Expertiza care<br />
            <em className="italic underline decoration-(--warm) decoration-1 underline-offset-4">
              protejează
            </em>
            <br />
            afacerea ta.
          </h1>

          {/* Descriere */}
          <p className="text-[17px] font-light text-(--ink-2) leading-relaxed max-w-xl mb-10 animate-[fadeUp_0.6s_ease_0.35s_both]">
            Gestionăm evidența contabilă, salarizarea și obligațiile fiscale
            ale firmei tale cu precizie și responsabilitate — astfel încât tu
            să te concentrezi pe creșterea afacerii.
          </p>

          {/* Butoane */}
          <div className="flex gap-4 flex-wrap animate-[fadeUp_0.5s_ease_0.5s_both]">
            <Link
              href="#contact"
              className="btn-dark text-sm font-semibold bg-(--ink) text-white px-7 py-3 no-underline"
            >
              Solicită o consultație gratuită
            </Link>
            <Link
              href="#services"
              className="btn-outline text-sm font-semibold text-(--ink) px-7 py-3 border border-(--rule) no-underline"
            >
              <span>Serviciile noastre</span>
            </Link>
          </div>
        </div>

        {/* Coloana dreaptă — statistici */}
        <aside ref={statsRef} aria-label="Date statistice">
          <div className="border border-(--rule) animate-[fadeUp_0.6s_ease_0.4s_both]">
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`flex justify-between items-baseline gap-4 px-7 py-5 hover:bg-(--bg-2) transition-colors ${
                  i < stats.length - 1 ? 'border-b border-(--rule-lt)' : ''
                }`}
              >
                <span
                  className="font-serif font-bold text-[30px] tracking-tight text-(--ink) min-w-20"
                  data-count={stat.value}
                  data-suffix={stat.suffix}
                >
                  {stat.value}{stat.suffix}
                </span>
                <span className="text-[13px] text-(--ink-3) text-right leading-snug max-w-40">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </aside>

      </div>
    </section>
  )
}