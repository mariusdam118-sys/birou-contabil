'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const navLinks = ['Servicii', 'Despre noi', 'Cum lucrăm', 'Contact']

export default function Header() {
  const [scrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Închide meniul când dai click pe un link
  const closeMenu = () => setIsOpen(false)

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-(--rule) transition-shadow duration-300 ${scrolled ? 'shadow-sm' : ''}`}>

      {/* ── Bara principală ── */}
      <div className="max-w-6xl mx-auto px-6 h-17 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="font-serif text-[27px] text-(--ink) no-underline">
          Birou <strong>Contabil</strong>
        </Link>

        {/* Linkuri desktop — ascunse pe mobile */}
        <nav aria-label="Navigare principala" className="hidden md:block">
          <ul className="flex items-center gap-8 list-none">
            {navLinks.map((item) => (
              <li key={item}>
                <Link
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="nav-link text-sm text-(--ink-3) hover:text-(--ink) transition-colors no-underline"
                >
                  {item}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="#contact"
                className="text-sm font-semibold bg-(--ink) text-white px-5 py-2 hover:bg-(--ink-2) transition-colors no-underline"
              >
                Solicită ofertă
              </Link>
            </li>
          </ul>
        </nav>

        {/* Burger button — vizibil doar pe mobile */}
        <button
          className="md:hidden flex flex-col justify-center gap-1.25 w-8 h-8 bg-transparent border-none cursor-pointer p-0"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Închide meniul' : 'Deschide meniul'}
          aria-expanded={isOpen}
        >
          {/* Cele 3 linii ale burger-ului */}
          <span className={`block h-[1.5px] bg-(--ink) transition-all duration-300 origin-center ${isOpen ? 'rotate-45 translate-y-[6.5px] w-6' : 'w-6'}`} />
          <span className={`block h-[1.5px] bg-(--ink) transition-all duration-300 ${isOpen ? 'opacity-0 w-6' : 'w-6'}`} />
          <span className={`block h-[1.5px] bg-(--ink) transition-all duration-300 origin-center ${isOpen ? '-rotate-45 -translate-y-[6.5px] w-6' : 'w-6'}`} />
        </button>

      </div>

      {/* ── Meniu mobil — apare sub bara principală ── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        inert={!isOpen}
      >
        <nav className="border-t border-(--rule) bg-white">
          <ul className="list-none max-w-6xl mx-auto px-6 py-4 flex flex-col gap-0">
            {navLinks.map((item) => (
              <li key={item} className="border-b border-(--rule-lt) last:border-b-0">
                <Link
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  onClick={closeMenu}
                  className="nav-link text-sm text-(--ink-3) hover:text-(--ink) transition-colors no-underline"
                >
                  {item}
                </Link>
              </li>
            ))}
            <li className="pt-4">
              <Link
                href="#contact"
                onClick={closeMenu}
                className="block text-center text-sm font-semibold bg-(--ink) text-white px-5 py-3 hover:bg-(--ink-2) transition-colors no-underline"
              >
                Solicită ofertă
              </Link>
            </li>
          </ul>
        </nav>
      </div>

    </header>
  )
}