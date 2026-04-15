'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const initialMessages = [
  { id: 1, name: 'Andrei Ionescu', email: 'andrei@example.com', phone: '0722 123 456', service: 'Contabilitate', date: '25 Oct 2023', status: 'Nou' },
  { id: 2, name: 'Maria Radu', email: 'maria.r@firma.ro', phone: '0744 987 654', service: 'Înființare Firmă', date: '24 Oct 2023', status: 'Contactat' },
  { id: 3, name: 'S.C. Construct SRL', email: 'office@construct.ro', phone: '021 555 000', service: 'Consultanță', date: '22 Oct 2023', status: 'Finalizat' },
]

const initialStats = [
  { label: 'Clienți activi', value: 200, suffix: '+' },
  { label: 'Ani experiență', value: 15, suffix: '+' },
  { label: 'Conformitate', value: 100, suffix: '%' },
]

export default function AdminPortal() {
  const [activeTab, setActiveTab] = useState('messages')
  const [messages, setMessages] = useState(initialMessages)
  const [stats, setStats] = useState(initialStats)
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleUpdateStatus = (id, currentStatus) => {
    const statusCycle = { 'Nou': 'Contactat', 'Contactat': 'Finalizat', 'Finalizat': 'Nou' }
    setMessages(prev => prev.map(msg => 
      msg.id === id ? { ...msg, status: statusCycle[currentStatus] } : msg
    ))
  }

  const handleDeleteMessage = (id) => {
    if (confirm('Sigur dorești să ștergi acest mesaj?')) {
      setMessages(prev => prev.filter(msg => msg.id !== id))
    }
  }

  const handleSaveStat = (idx) => {
    const stat = stats[idx]
    setIsSaving(idx)
    // Simulate network delay
    setTimeout(() => {
      setIsSaving(null)
      console.log(`Saved ${stat.label}: ${stat.value}`)
    }, 800)
  }

  const handleLocalStatChange = (idx, newValue) => {
    const updatedStats = [...stats]
    updatedStats[idx].value = newValue
    setStats(updatedStats)
  }

  if (!mounted) return <div className="min-h-screen bg-brand-paper" />

  const cardStyle = "bg-white border border-brand-navy/5 p-8 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-[0_40px_80px_-20px_rgba(15,22,28,0.08)] rounded-sm"

  return (
    <main className="min-h-screen bg-brand-paper pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Dashboard Header */}
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-brand-navy/5 pb-12">
          <div>
            <nav className="flex items-center gap-2 mb-6">
              <span className="size-1.5 rounded-full bg-brand-orange animate-pulse" />
              <p className="text-[11px] font-bold tracking-[0.4em] uppercase text-brand-orange">
              Panou de Control
            </p>
            </nav>
            <h1 className="font-serif text-[clamp(2.5rem,6vw,3.5rem)] text-brand-navy leading-[0.9] tracking-tighter">
              Management <span className="italic text-brand-orange">Birou Contabil</span>
            </h1>
          </div>
          
          <div className="flex bg-white p-1 rounded-sm border border-brand-navy/10">
            <button 
              onClick={() => setActiveTab('messages')}
              className={`px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'messages' ? 'bg-brand-navy text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Mesaje
            </button>
            <button 
              onClick={() => setActiveTab('stats')}
              className={`px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'stats' ? 'bg-brand-navy text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Indicatori
            </button>
          </div>
        </header>

        {activeTab === 'messages' ? (
          <div className="animate-fade-in">
            <div className="grid grid-cols-1 gap-6">
              {messages.length === 0 ? (
                <div className="py-20 text-center text-slate-400">Nu există mesaje noi.</div>
              ) : messages.map((msg) => (
                <div key={msg.id} className={`${cardStyle} group flex flex-col md:flex-row md:items-center justify-between gap-8`}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-1">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Expeditor</p>
                      <h3 className="text-[17px] font-bold text-brand-navy leading-tight">{msg.name}</h3>
                      <p className="text-sm text-slate-500">{msg.email}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Serviciu & Dată</p>
                      <h3 className="text-[15px] font-medium text-brand-navy/70 leading-tight">{msg.service}</h3>
                      <p className="text-sm text-slate-500">{msg.date}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Status</p>
                      <span className={`inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-tighter rounded-full ${
                        msg.status === 'Nou' ? 'bg-orange-100 text-brand-orange' : 
                        msg.status === 'Contactat' ? 'bg-blue-50 text-slate-600' : 'bg-emerald-50 text-emerald-600'
                      }`}>
                        {msg.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => handleUpdateStatus(msg.id, msg.status)}
                      className="p-3 bg-slate-50 text-slate-400 hover:bg-brand-orange/10 hover:text-brand-orange transition-all rounded-sm"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                    </button>
                    <button 
                      onClick={() => handleDeleteMessage(msg.id)}
                      className="p-3 bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all rounded-sm"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
            {stats.map((stat, idx) => (
              <div key={idx} className={`${cardStyle}`}>
                <div className="flex justify-between items-start mb-6">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Indicator</p>
                  {isSaving === idx && <span className="text-[9px] font-bold text-brand-orange animate-pulse">SALVARE...</span>}
                </div>
                <label className="block text-[12px] font-bold tracking-widest text-brand-navy/60 mb-2">
                  {stat.label}
                </label>
                <div className="relative mb-8">
                  <input 
                    type="number" 
                    value={stat.value}
                    onChange={(e) => handleLocalStatChange(idx, parseInt(e.target.value) || 0)}
                    className="w-full text-[2.5rem] font-serif font-bold text-brand-navy bg-transparent border-b border-brand-navy/10 focus:border-brand-orange outline-none py-2 transition-all"
                  />
                  <span className="absolute right-0 bottom-4 text-2xl font-serif text-slate-300">{stat.suffix}</span>
                </div>
                <button
                  onClick={() => handleSaveStat(idx)}
                  disabled={isSaving !== null}
                  className={`w-full py-4 text-[10px] font-bold uppercase tracking-widest transition-all rounded-sm ${isSaving === idx ? 'bg-slate-100 text-slate-400' : 'bg-brand-navy text-white hover:bg-brand-orange hover:-translate-y-0.5 shadow-md hover:shadow-xl'}`}
                >
                  Salvează Modificarea
                </button>
              </div>
            ))}
            
            <div className={`${cardStyle} border-dashed border-2 flex flex-col items-center justify-center text-center opacity-60 hover:opacity-100 cursor-pointer`}>
              <div className="size-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Adaugă Indicator Nou</p>
            </div>
          </div>
        )}

        {/* Footer Admin */}
        <div className="mt-20 pt-8 border-t border-slate-200 flex justify-between items-center text-slate-400">
          <p className="text-[11px] font-medium tracking-wide">
            Sesiune Administrare Activă • Biroul Contabil
          </p>
          <Link href="/" className="text-[11px] font-bold uppercase tracking-widest text-brand-orange hover:text-slate-800 transition-colors">
            Înapoi la Site →
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
      `}</style>
    </main>
  )
}