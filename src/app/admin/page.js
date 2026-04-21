'use client'

import { useState, Suspense, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { 
  Users, 
  FileText, 
  Activity, 
  MoreVertical, 
  Settings, 
  ShieldCheck, 
  Database,
  Circle,
  LogOut
} from 'lucide-react'

function AdminContent() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authLoading, setAuthLoading] = useState(true)

  // Local state for UI toggles (Non-persistent/Database-free)
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [publicSignups, setPublicSignups] = useState(true)
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setAuthLoading(false)
    }
    checkUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!authLoading && user) {
    fetchClients()
    }
  }, [authLoading, user])

  const handleLogin = async (e) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      alert(`Eroare de acces: ${error.message}`)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const fetchClients = async () => {
    try {
      const res = await fetch('/api/admin/messages')
      const data = await res.json()
      setClients(data)
    } catch (err) {
      console.error("Fetch error:", err)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === 'Nou' ? 'În Lucru' : 'Finalizat'
    await fetch('/api/admin/messages', {
      method: 'PATCH',
      body: JSON.stringify({ id, status: nextStatus })
    })
    fetchClients()
  }

  const deleteClient = async (id) => {
    if (confirm('Ștergi definitiv această înregistrare?')) {
      await fetch(`/api/admin/messages?id=${id}`, { method: 'DELETE' })
      fetchClients()
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-base flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary-blue border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-base flex flex-col items-center justify-center px-6">
        <div className="max-w-md w-full bento-card p-12">
          <div className="flex items-center gap-3 mb-8 text-[10px] font-black uppercase tracking-[0.3em] text-text-muted/40">
            <ShieldCheck size={14} className="text-primary-blue" />
            <span className="text-primary-blue">Secure Terminal Login</span>
          </div>
          <h2 className="text-3xl font-black text-text-navy mb-10 tracking-tighter leading-none">Autentificare <br/><span className="text-primary-blue">Management.</span></h2>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-text-muted/60 mb-2">Email Admin</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-primary-blue transition-all font-bold text-text-navy" placeholder="admin@biroucontabil.ro" required />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-text-muted/60 mb-2">Parolă Sistem</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-primary-blue transition-all font-bold text-text-navy" placeholder="••••••••" required />
            </div>
            <button type="submit" className="btn-agency-primary w-full py-5 text-sm uppercase tracking-[0.2em] shadow-xl hover:shadow-primary-blue/20">
              Acces Terminal
            </button>
          </form>
        </div>
        <button onClick={() => router.push('/')} className="mt-12 text-[10px] font-black uppercase tracking-widest text-text-muted/40 hover:text-primary-blue transition-colors">
          ← Revenire la site
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-base text-text-navy font-sans selection:bg-primary-blue/10">
      <Header />
      
      <main className="max-w-7xl mx-auto pt-40 pb-20 px-6">
        {/* Breadcrumbs / System Info */}
        <div className="flex items-center gap-3 mb-12 text-[10px] font-black uppercase tracking-[0.3em] text-text-muted/40">
          <ShieldCheck size={14} className="text-primary-blue" />
          <span className="text-primary-blue">Secure Access Granted</span>
          <span className="text-slate-200">/</span>
          <span>Node: BC-BUC-01</span>
          <span className="text-slate-200">/</span>
          <button 
            onClick={handleLogout}
            className="text-accent-orange hover:text-text-navy transition-colors flex items-center gap-2 group"
          >
            <span className="animate-pulse">Terminal Active</span>
            <LogOut size={12} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Section: Win Cards (Stats) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { label: 'Total Clienți', val: '124', icon: Users, sub: '+4 luna aceasta' },
            { label: 'TVA Pending', val: '12', icon: FileText, sub: 'Scadență 25 Nov' },
            { label: 'Status Sistem', val: 'Activ', icon: Activity, sub: 'Latentă 14ms', accent: true },
          ].map((stat, i) => (
            <div key={i} className="bento-card flex items-start justify-between group">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.3em] text-text-muted/50 mb-4">{stat.label}</p>
                <h2 className={`text-5xl font-black tracking-tighter ${stat.accent ? 'text-primary-blue' : 'text-text-navy'}`}>
                  {stat.val}
                </h2>
                <p className="text-[10px] text-text-muted/40 mt-4 font-bold uppercase tracking-widest">{stat.sub}</p>
              </div>
              <stat.icon size={24} className="text-slate-200 group-hover:text-primary-blue transition-colors duration-500" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Management Table */}
          <div className="lg:col-span-3">
            <div className="bento-card overflow-hidden p-0">
              <div className="px-10 py-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-text-navy">Registru Clienți Recenți</h3>
                <button className="text-[10px] text-text-muted/60 hover:text-primary-blue transition-colors uppercase font-black tracking-widest">Vezi Tot Archive</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/30">
                      <th className="px-10 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-text-muted/40 border-b border-slate-100">Companie</th>
                      <th className="px-10 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-text-muted/40 border-b border-slate-100">Serviciu</th>
                      <th className="px-10 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-text-muted/40 border-b border-slate-100">Status</th>
                      <th className="px-10 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-text-muted/40 border-b border-slate-100">Acțiuni</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {loading ? (
                      <tr><td colSpan="4" className="p-10 text-center animate-pulse">Se încarcă datele...</td></tr>
                    ) : clients.map((client) => (
                      <tr key={client.id} className="hover:bg-primary-blue/5 transition-colors group">
                        <td className="px-10 py-6 text-[16px] font-extrabold text-text-navy">{client.name}</td>
                        <td className="px-10 py-6 text-[15px] text-text-muted font-medium">{client.service}</td>
                        <td className="px-10 py-6">
                          <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${client.status === 'Nou' ? 'text-accent-orange' : 'text-primary-blue'}`}>
                            <Circle size={8} fill="currentColor" />
                            {client.status}
                          </div>
                        </td>
                        <td className="px-10 py-6 flex gap-4">
                          <button onClick={() => updateStatus(client.id, client.status)} className="text-slate-300 hover:text-primary-blue transition-colors uppercase text-[10px] font-black">
                            Update
                          </button>
                          <button onClick={() => deleteClient(client.id)} className="text-slate-300 hover:text-accent-orange transition-colors uppercase text-[10px] font-black">
                            Șterge
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Side Control Panel */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bento-card p-10">
              <div className="flex items-center gap-3 mb-10">
                <Settings size={18} className="text-primary-blue" />
                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-text-navy">Global Config</h3>
              </div>
              
              <div className="space-y-10">
                {/* Maintenance Mode Toggle */}
                <div className="flex items-center justify-between group cursor-pointer" onClick={() => setMaintenanceMode(!maintenanceMode)}>
                  <div>
                    <p className="text-[13px] font-black text-text-navy group-hover:text-primary-blue transition-colors">Maintenance Mode</p>
                    <p className="text-[10px] text-text-muted/50 uppercase tracking-[0.2em] mt-1">System-wide lock</p>
                  </div>
                  <div className={`w-12 h-6 rounded-full relative transition-all duration-300 ${maintenanceMode ? 'bg-primary-blue' : 'bg-slate-200'}`}>
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${maintenanceMode ? 'left-7' : 'left-1'}`} />
                  </div>
                </div>

                {/* Public Signups Toggle */}
                <div className="flex items-center justify-between group cursor-pointer" onClick={() => setPublicSignups(!publicSignups)}>
                  <div>
                    <p className="text-[13px] font-black text-text-navy group-hover:text-primary-blue transition-colors">Public Signups</p>
                    <p className="text-[10px] text-text-muted/50 uppercase tracking-[0.2em] mt-1">Client Registration</p>
                  </div>
                  <div className={`w-12 h-6 rounded-full relative transition-all duration-300 ${publicSignups ? 'bg-primary-blue' : 'bg-slate-200'}`}>
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${publicSignups ? 'left-7' : 'left-1'}`} />
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-10 border-t border-slate-100">
                <button className="btn-agency-primary w-full py-5 text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3">
                  <Database size={16} />
                  Flush Cache
                </button>
              </div>
            </div>

            {/* Quick Notes */}
            <div className="p-8 border-2 border-dashed border-slate-100 rounded-3xl bg-slate-50/30">
              <h4 className="text-[11px] font-black text-text-muted/40 uppercase tracking-[0.3em] mb-4">Admin Memo:</h4>
              <p className="text-sm italic text-text-muted/70 leading-relaxed font-medium">
                Sesiune live activă. Toate modificările de status sunt salvate în baza de date Supabase.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />

    </div>
  )
}

export default function AdminPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-base flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary-blue border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <AdminContent />
    </Suspense>
  )
}