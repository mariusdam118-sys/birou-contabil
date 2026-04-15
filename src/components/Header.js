'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const navLinks = [
  { label: 'Servicii', href: '#services' },
  { label: 'Despre noi', href: '#about' },
  { label: 'Cum lucrăm', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const closeMenu = () => setIsOpen(false)

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 z-60 bg-void/60 backdrop-blur-md md:hidden animate-[fadeOverlay_0.35s_ease-out_both]"
          aria-label="Închide meniul"
          onClick={closeMenu}
        />
      )}

      <header className="fixed top-0 left-0 right-0 z-70 pointer-events-none pt-6 px-6">
        <div className="max-w-7xl mx-auto relative pointer-events-auto">
          <div
            className={[
              'nav-agency flex items-center justify-between gap-4 transition-all duration-500',
              scrolled
                ? 'shadow-agency-hover -translate-y-1.25'
                : 'shadow-none',
            ].join(' ')}
          >
            <Link
              href="/"
              className="text-2xl font-black text-text-navy tracking-tighter no-underline shrink-0 pl-2 transition-all duration-300 hover:text-primary-blue"
            >
              Birou<span className="text-primary-blue">.</span>
            </Link>

            <nav aria-label="Navigare principală" className="hidden md:flex items-center gap-6">
              <ul className="flex items-center gap-2 list-none m-0 p-0">
                {navLinks.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="px-4 py-2 text-sm font-bold text-text-muted hover:text-text-navy transition-colors no-underline uppercase tracking-widest">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="#contact"
                className="btn-agency-primary py-3 px-8 text-xs uppercase tracking-[0.2em] bg-primary-blue! text-white! hover:bg-slate-900! transition-all shadow-lg"
              >
                Solicită o discuție
              </Link>
            </nav>

            <button
              type="button"
              className="md:hidden flex flex-col justify-center gap-1.5 w-12 h-12 rounded-full items-center bg-slate-50 border-none cursor-pointer p-0 shrink-0 transition-all hover:bg-slate-100"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Închide meniul' : 'Deschide meniul'}
              aria-expanded={isOpen}
            >
              <span
                className={`block h-0.5 bg-text-navy rounded-full transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2 w-6' : 'w-6'}`}
              />
              <span className={`block h-0.5 bg-text-navy rounded-full transition-all duration-300 ${isOpen ? 'opacity-0 w-6' : 'w-6'}`} />
              <span
                className={`block h-0.5 bg-text-navy rounded-full transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2 w-6' : 'w-6'}`}
              />
            </button>
          </div>

          {/* Mobile sheet */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isOpen ? 'max-h-125 opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0 pointer-events-none'
            }`}
          >
            <nav
              className="rounded-[2.5rem] border-2 border-slate-100 bg-white shadow-agency-hover p-4"
              aria-label="Navigare mobilă"
            >
              <ul className="list-none m-0 p-0 flex flex-col gap-2">
                {navLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className="block rounded-2xl px-6 py-5 text-xl font-black text-text-navy hover:text-primary-blue hover:bg-slate-50 transition-all no-underline"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li className="p-2 pt-6">
                  <Link
                    href="#contact"
                    onClick={closeMenu}
                    className="btn-agency-primary flex items-center justify-center text-sm uppercase tracking-widest py-6 w-full"
                  >
                    Solicită ofertă
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  )
}
