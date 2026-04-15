'use client'

import { useState } from 'react'
import { login } from './actions'
import Link from 'next/link'

export default function LoginPage() {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData) {
    setLoading(true)
    setError(null)
    
    const result = await login(formData)
    
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <Link href="/" className="text-2xl font-black text-text-navy tracking-tighter no-underline">
            Birou<span className="text-primary-blue">.</span>
          </Link>
          <h1 className="mt-6 text-3xl font-black text-text-navy tracking-tight">Admin Login</h1>
          <p className="mt-2 text-text-muted font-medium">Acces securizat pentru echipa de consultanță</p>
        </div>

        <div className="bg-white border-2 border-slate-100 p-10 rounded-[2.5rem] shadow-agency">
          <form action={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-xs font-black uppercase tracking-widest text-text-muted/60 mb-3">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="admin@birou.ro"
                className="w-full text-lg text-text-navy bg-white border-2 border-slate-100 px-6 py-4 outline-none focus:border-primary-blue transition-all duration-300 rounded-2xl placeholder:text-text-muted/40"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-black uppercase tracking-widest text-text-muted/60 mb-3">
                Parolă
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="w-full text-lg text-text-navy bg-white border-2 border-slate-100 px-6 py-4 outline-none focus:border-primary-blue transition-all duration-300 rounded-2xl placeholder:text-text-muted/40"
              />
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-sm font-bold rounded-xl text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-agency-primary w-full py-5 text-lg bg-primary-blue! text-white! hover:bg-slate-900! transition-all shadow-xl disabled:opacity-50"
            >
              {loading ? 'Se autentifică...' : 'Intră în cont'}
            </button>
          </form>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-sm font-bold text-text-muted hover:text-primary-blue transition-colors">
            ← Înapoi la site
          </Link>
        </div>
      </div>
    </div>
  )
}
