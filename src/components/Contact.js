'use client'

import { useState, useRef, useEffect } from 'react'
import { Phone, Mail, MapPin } from 'lucide-react'

const contactDetails = [
  { 
    label: 'Telefon', 
    value: '0722 802 121', 
    href: 'tel:+40722802121',
    icon: Phone 
  },
  { 
    label: 'Email', 
    value: 'sgsconta@gmail.com', 
    href: 'mailto:sgsconta@gmail.com',
    icon: Mail 
  },
  { 
    label: 'Adresă', 
    value: 'Șos. Pantelimon, Nr. 285A, Bl. 11A, Sc. 1, Et. 8, Ap. 42, Sector 2, București',
    icon: MapPin 
  },
  { 
    label: 'Program', 
    value: [
      { days: 'Luni – Vineri', hours: '10:00 – 18:00' },
      { days: 'Sâmbătă', hours: '09:30 – 14:30' },
      { days: 'Duminică', hours: 'Închis' }
    ],
    isSchedule: true
  },
]

export default function Contact() {
  const sectionRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState('idle') // 'idle' | 'loading' | 'success' | 'error'

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
      alert('Te rugăm să completezi toate câmpurile obligatorii (nume, telefon, email)')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      alert('Te rugăm să introduci o adresă de email validă')
      return
    }

    setSubmitted('loading')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitted('success')
        setFormData({ name: '', phone: '', email: '', service: '', message: '' })
      } else {
        setSubmitted('error')
        console.error(data.error)
      }
    } catch (error) {
      setSubmitted('error')
      console.error(error)
    }

    setTimeout(() => setSubmitted('idle'), 4000)
  }

  const inputClass =
    'w-full text-lg text-text-navy bg-white border-2 border-slate-100 px-6 py-5 outline-none focus:border-primary-blue transition-all duration-300 rounded-2xl placeholder:text-text-muted/40'

  return (
    <section id="contact" ref={sectionRef} className="py-32 bg-base">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-24 items-start">
        <div className="reveal-on-scroll">
          <div className="pill-badge mb-8">Contact</div>
          <h2 className="text-[clamp(3rem,8vw,5.5rem)] text-text-navy leading-[0.9] tracking-tight mb-12">
            Hai să <br />
            <span className="text-primary-blue">colaborăm.</span>
          </h2>

          <dl className="space-y-12">
            {contactDetails.map((detail) => (
              <div key={detail.label} className="group flex items-start gap-6">
                {detail.icon && (
                  <div className="mt-1 shrink-0 p-3 bg-primary-blue/5 rounded-xl group-hover:bg-primary-blue group-hover:text-white transition-all duration-300">
                    <detail.icon size={24} className="text-primary-blue group-hover:text-white transition-colors" />
                  </div>
                )}
                <div>
                  <dt className="text-sm font-black tracking-[0.3em] uppercase text-text-muted/50 mb-2 group-hover:text-primary-blue transition-colors">
                    {detail.label}
                  </dt>
                  <dd className={`text-text-navy leading-relaxed font-bold ${detail.label === 'Telefon' ? 'text-2xl' : 'text-xl'}`}>
                    {detail.href ? (
                      <a
                        href={detail.href}
                        className="hover:text-primary-blue transition-all border-b-2 border-slate-100 hover:border-primary-blue pb-1"
                      >
                        {detail.value}
                      </a>
                    ) : detail.isSchedule ? (
                      <div className="space-y-2">
                        {detail.value.map((item) => (
                          <div key={item.days} className="flex justify-between gap-8 text-lg">
                            <span className="text-text-muted font-medium">{item.days}:</span>
                            <span className="text-text-navy font-bold">{item.hours}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="whitespace-pre-line">{detail.value}</span>
                    )}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
          
          <div className="mt-16 reveal-on-scroll [animation-delay:0.2s]">
             <div className="p-2 bg-slate-50 rounded-3xl border-2 border-slate-100 grayscale hover:grayscale-0 transition-all duration-700">
               <iframe
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2848.342156789!2d26.1623456!3d44.4456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1f8e5e5e5e5e5%3A0x5e5e5e5e5e5e5e5e!2zU29zLiBQYW50ZWxpbW9uIDI4NUEsIFNlY3RvciAyLCBCdWN1cmVzdGk!5e0!3m2!1sro!2sro!4v1773708201276!5m2!1sro!2sro"
                 width="100%"
                 height="300"
                 style={{ border: 0, display: 'block', borderRadius: '1.25rem' }}
                 allowFullScreen=""
                 loading="lazy"
                 title="Locație Birou"
               />
             </div>
          </div>
        </div>

        <div className="reveal-on-scroll [animation-delay:0.1s]">
          <div className="bg-base-off border-2 border-slate-100 p-12 rounded-[2.5rem] shadow-agency">
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                <div>
                  <label htmlFor="name" className="block text-xs font-black uppercase tracking-widest text-text-muted/60 mb-3">Nume complet</label>
                  <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Ion Popescu" required className={inputClass} />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs font-black uppercase tracking-widest text-text-muted/60 mb-3">Telefon</label>
                  <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="07xx xxx xxx" required className={inputClass} />
                </div>
              </div>

              <div className="mb-8">
                <label htmlFor="email" className="block text-xs font-black uppercase tracking-widest text-text-muted/60 mb-3">Email de business</label>
                <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="email@firma.ro" required className={inputClass} />
              </div>

              <div className="mb-8">
                <label htmlFor="service" className="block text-xs font-black uppercase tracking-widest text-text-muted/60 mb-3">Cu ce te putem ajuta?</label>
                <select id="service" name="service" value={formData.service} onChange={handleChange} className={inputClass + ' appearance-none'}>
                  <option value="">Alege o opțiune...</option>
                  <option value="contabilitate">Contabilitate Digitală</option>
                  <option value="salarizare">Salarizare & HR</option>
                  <option value="consultanta">Consultanță Strategică</option>
                  <option value="expertiza">Expertiză Judiciară</option>
                  <option value="altele">Alte servicii</option>
                </select>
              </div>

              <div className="mb-12">
                <label htmlFor="message" className="block text-xs font-black uppercase tracking-widest text-text-muted/60 mb-3">Detalii proiect</label>
                <textarea id="message" name="message" rows="4" value={formData.message} onChange={handleChange} placeholder="Spune-ne mai multe despre afacerea ta..." className={inputClass + ' resize-none'} />
              </div>

              <button
                type="submit"
                disabled={submitted === 'loading'}
                className="btn-agency-primary w-full py-6 text-xl"
              >
                {submitted === 'loading' ? 'Se trimite...' : submitted === 'success' ? 'Trimis!' : 'Trimite Solicitarea'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
