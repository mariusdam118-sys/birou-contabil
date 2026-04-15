'use client'

import { useState, Suspense } from 'react'
import { useSearchParams, notFound } from 'next/navigation'
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
  Circle
} from 'lucide-react'

function AdminContent() {
  const searchParams = useSearchParams()
  const access = searchParams.get('access')

  // Stealth Gate: Page looks like a 404 unless the secret param is present
  if (access !== 'topsecret') {
    return notFound()
  }

  // Local state for UI toggles (Non-persistent/Database-free)
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [publicSignups, setPublicSignups] = useState(true)

  const mockClients = [
    { id: 1, name: 'Quantum Logistics S.A.', service: 'Audit Anual', status: 'Validat', color: 'text-emerald-500' },
    { id: 2, name: 'PFA Ionescu Maria', service: 'Consultanță Fiscală', status: 'În Lucru', color: 'text-amber-500' },
    { id: 3, name: 'TechFlow Startups SRL', service: 'Înființare Firmă', status: 'Preluat', color: 'text-blue-500' },
    { id: 4, name: 'Construct Balkan Grup', service: 'Declarații TVA', status: 'Urgent', color: 'text-rose-500' },
    { id: 5, name: 'Eco-Friendly Solutions', service: 'Salarizare ReviSal', status: 'Finalizat', color: 'text-emerald-500' },
  ]

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
          <span className="text-accent-orange animate-pulse">Terminal Active</span>
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
                    {mockClients.map((client) => (
                      <tr key={client.id} className="hover:bg-primary-blue/5 transition-colors group">
                        <td className="px-10 py-6 text-[16px] font-extrabold text-text-navy">{client.name}</td>
                        <td className="px-10 py-6 text-[15px] text-text-muted font-medium">{client.service}</td>
                        <td className="px-10 py-6">
                          <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${client.color.replace('emerald', 'primary-blue').replace('amber', 'accent-mustard').replace('blue', 'primary-blue').replace('rose', 'accent-orange')}`}>
                            <Circle size={8} fill="currentColor" />
                            {client.status}
                          </div>
                        </td>
                        <td className="px-10 py-6">
                          <button className="text-slate-200 hover:text-primary-blue transition-colors">
                            <MoreVertical size={20} />
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
                Toate modificările sunt temporare (Sesiune locală). Integrarea cu baza de date este dezactivată pentru modul demo.
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