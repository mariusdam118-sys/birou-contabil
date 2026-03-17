'use client'

import { useState, useRef, useEffect } from 'react'

const contactDetails = [
  { label: 'Adresă', value: 'Aleea Barajul Iezerul 6A\nSector 3, București' },
  { label: 'Telefon', value: '(+40) 725.316.318', href: 'tel:+40725316318' },
  { label: 'Email', value: 'office@biroulcontabil.ro', href: 'mailto:office@biroulcontabil.ro' },
  { label: 'Program', value: 'Luni – Vineri: 08:00 – 20:00\nSâmbătă: 09:00 – 14:00' },
]

const ibanDetails = [
  { currency: 'RON', iban: 'RO24 INGB 0000 9999 0485 5523' },
  { currency: 'EUR', iban: 'RO38 INGB 0000 9999 0490 9106' },
]

function IbanRow({ currency, iban }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(iban.replace(/\s/g, ''))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Clipboard error:', err)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={`w-full flex gap-3 items-baseline px-4 py-3 border-b border-(--rule-lt) last:border-b-0 cursor-pointer transition-all duration-200 text-left group ${
        copied ? 'bg-green-50' : 'bg-white hover:bg-(--bg-2)'
      }`}
      title={`Click pentru a copia ${currency} IBAN`}
    >
      <span className={`font-serif text-[11px] min-w-8 transition-colors duration-200 ${
        copied ? 'text-green-700' : 'text-(--ink-4)'
      }`}>
        {currency}
      </span>
      <span className={`font-serif text-[13px] tracking-wide flex-1 transition-colors duration-200 ${
        copied ? 'text-green-700' : 'text-(--ink-2) group-hover:text-(--ink)'
      }`}>
        {iban}
      </span>
      <span className={`text-[11px] font-semibold tracking-wide transition-all duration-200 ${
        copied
          ? 'text-green-700 opacity-100'
          : 'text-(--ink-4) opacity-0 group-hover:opacity-100'
      }`}>
        {copied ? 'Copiat ✓' : 'Click pentru copiere'}
      </span>
    </button>
  )
}

export default function Contact() {
  const sectionRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', service: '', message: '',
  })
  const [submitted, setSubmitted] = useState(false)

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    setSubmitted('loading')
    try{
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if(response.ok){
        setSubmitted('success')
        setFormData({name: '', phone:'', email: '', services: '', message: ''})
      }
      else{
        setSubmitted('error')
        console.error(data.error)
      }
    } catch(error){
      setSubmitted('error')
      console.error(error)
    }

    setTimeout(() => setSubmitted('idle'), 4000)
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 bg-(--bg-2) border-b border-(--rule)"
    >
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-16 lg:gap-24 items-start">

        {/* Coloana stângă — detalii */}
        <div className="reveal-item">
          <span className="flex items-center gap-3 text-[11px] font-semibold tracking-widest uppercase text-(--ink-4) mb-4">
            <span className="block w-5 h-px bg-(--warm)" />
            Contact
          </span>
          <h2 className="font-serif font-normal text-[clamp(26px,3.5vw,42px)] tracking-tight text-(--ink) mb-10">
            Hai să discutăm
          </h2>

          <dl className="space-y-6 mb-10">
            {contactDetails.map((detail) => (
              <div key={detail.label}>
                <dt className="text-[11px] font-semibold tracking-widest uppercase text-(--ink-4) mb-1">
                  {detail.label}
                </dt>
                <dd className="text-[15px] text-(--ink) leading-relaxed whitespace-pre-line">
                  {detail.href ? (
                    <a href={detail.href} className="link-warm no-underline">
                      {detail.value}
                    </a>
                  ) : (
                    detail.value
                  )}
                </dd>

                {/* Harta apare doar sub Adresă */}
                {detail.label === 'Adresă' && (
                  <div className="mt-4 border border-(--rule) overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2849.019227873178!2d26.167798076239215!3d44.43276780166357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1f94caadca921%3A0x6fbc87f02aa1d7f8!2sAleea%20Barajul%20Iezeru%206A!5e0!3m2!1sro!2snl!4v1773708201276!5m2!1sro!2snl"
                      width="100%"
                      height="200"
                      style={{ border: 0, display: 'block' }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Locație Biroul Contabil"
                    />
                    
                     <a href="https://maps.google.com/?q=Aleea+Barajul+Iezeru+6A+Sector+3+Bucuresti"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-4 py-2 bg-(--bg-2) border-t border-(--rule) text-[12px] text-(--ink-3) hover:text-(--ink) hover:bg-(--bg-3) transition-colors no-underline group"
                    >
                      <span>Deschide în Google Maps</span>
                      <span className="transition-transform group-hover:translate-x-1 duration-200">→</span>
                    </a>
                  </div>
                )}
              </div>
            ))}
          </dl>

          {/* IBAN cu copy on click */}
          <div className="border border-(--rule) overflow-hidden">
            <span className="block text-[11px] font-semibold tracking-widest uppercase text-(--ink-4) px-4 py-3 border-b border-(--rule) bg-(--bg-2)">
              Date bancare
            </span>
            {ibanDetails.map((item) => (
              <IbanRow
                key={item.currency}
                currency={item.currency}
                iban={item.iban}
              />
            ))}
          </div>
        </div>

        {/* Coloana dreaptă — formular */}
        <div className="reveal-item" style={{ transitionDelay: '120ms' }}>
          <div className="bg-white border border-(--rule) p-10">
            <form onSubmit={handleSubmit} noValidate>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-[11px] font-semibold tracking-widest uppercase text-(--ink-4) mb-2">
                    Nume și prenume *
                  </label>
                  <input
                    id="name" name="name" type="text"
                    value={formData.name} onChange={handleChange}
                    placeholder="Ion Popescu" required
                    className="w-full text-[15px] text-(--ink) bg-(--bg-2) border border-(--rule) px-4 py-3 outline-none focus:border-(--ink-3) focus:bg-white transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-[11px] font-semibold tracking-widest uppercase text-(--ink-4) mb-2">
                    Telefon *
                  </label>
                  <input
                    id="phone" name="phone" type="tel"
                    value={formData.phone} onChange={handleChange}
                    placeholder="07xx xxx xxx" required
                    className="w-full text-[15px] text-(--ink) bg-(--bg-2) border border-(--rule) px-4 py-3 outline-none focus:border-(--ink-3) focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-[11px] font-semibold tracking-widest uppercase text-(--ink-4) mb-2">
                  Adresă email *
                </label>
                <input
                  id="email" name="email" type="email"
                  value={formData.email} onChange={handleChange}
                  placeholder="email@firma.ro" required
                  className="w-full text-[15px] text-(--ink) bg-(--bg-2) border border-(--rule) px-4 py-3 outline-none focus:border-(--ink-3) focus:bg-white transition-colors"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="service" className="block text-[11px] font-semibold tracking-widest uppercase text-(--ink-4) mb-2">
                  Serviciu solicitat
                </label>
                <select
                  id="service" name="service"
                  value={formData.service} onChange={handleChange}
                  className="w-full text-[15px] text-(--ink) bg-(--bg-2) border border-(--rule) px-4 py-3 outline-none focus:border-(--ink-3) focus:bg-white transition-colors appearance-none"
                >
                  <option value="">Alege un serviciu...</option>
                  <option>Contabilitate financiară</option>
                  <option>Salarizare & Personal</option>
                  <option>Consultanță fiscală</option>
                  <option>Înființare firmă</option>
                  <option>Expertiză contabilă</option>
                  <option>Asistență ANAF / ITM</option>
                  <option>Altele</option>
                </select>
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-[11px] font-semibold tracking-widest uppercase text-(--ink-4) mb-2">
                  Mesaj
                </label>
                <textarea
                  id="message" name="message"
                  value={formData.message} onChange={handleChange}
                  placeholder="Descrie pe scurt tipul firmei, domeniul de activitate și necesitățile tale..."
                  rows={4}
                  className="w-full text-[15px] text-(--ink) bg-(--bg-2) border border-(--rule) px-4 py-3 outline-none focus:border-(--ink-3) focus:bg-white transition-colors resize-none"
                />
              </div>

              <div className="flex justify-between items-center gap-4 flex-wrap">
                <p className="text-[12px] text-(--ink-4) leading-relaxed max-w-60">
                  Câmpurile cu * sunt obligatorii. Datele tale sunt confidențiale.
                </p>
                <button
                  type="submit"
                  className={`btn-dark text-sm font-semibold px-8 py-3 text-white transition-all ${
                    submitted ? 'bg-green-700' : 'bg-(--ink)'
                  }`}
                >
                  {submitted ? 'Mesaj trimis ✓' : 'Trimite cererea'}
                </button>
              </div>

            </form>
          </div>
        </div>

      </div>
    </section>
  )
}