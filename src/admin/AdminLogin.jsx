import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Lock, User, AlertCircle } from 'lucide-react'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    setTimeout(() => {
      if (form.username === 'apexadmin' && form.password === 'apex2026') {
        localStorage.setItem('apex_admin_auth', 'true')
        navigate('/admin/dashboard')
      } else {
        setError('Invalid username or password.')
        setLoading(false)
      }
    }, 800)
  }

  return (
    <div className="admin-body min-h-screen bg-[#0A0A0A] flex items-center justify-center p-6">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, #E3000F 0%, transparent 70%)' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-14 h-14 bg-[#E3000F] rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="bebas text-white text-3xl">A</span>
          </div>
          <h1 className="bebas text-3xl text-white tracking-widest">APEX MOTORS</h1>
          <p className="text-white/30 text-xs tracking-wider mt-1 uppercase">Admin Panel</p>
        </div>

        {/* Card */}
        <div className="glass-dark border border-white/10 rounded-2xl p-8">
          <h2 className="text-white font-semibold text-lg mb-1">Sign In</h2>
          <p className="text-white/30 text-sm mb-6">Access the dealership management system.</p>

          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 mb-5">
              <AlertCircle size={14} className="text-red-400 shrink-0" />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-white/40 text-xs tracking-wider uppercase block mb-1.5">Username</label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
                <input
                  type="text"
                  required
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  className="w-full bg-black/50 border border-white/8 rounded-lg pl-10 pr-4 py-3 text-white text-sm focus:outline-none focus:border-[#E3000F]/60 transition-colors placeholder-white/20"
                  placeholder="Enter username"
                  autoComplete="username"
                />
              </div>
            </div>

            <div>
              <label className="text-white/40 text-xs tracking-wider uppercase block mb-1.5">Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full bg-black/50 border border-white/8 rounded-lg pl-10 pr-10 py-3 text-white text-sm focus:outline-none focus:border-[#E3000F]/60 transition-colors placeholder-white/20"
                  placeholder="Enter password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors"
                >
                  {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#E3000F] hover:bg-red-700 disabled:opacity-60 text-white font-semibold tracking-widest uppercase text-sm py-3.5 rounded-lg transition-colors mt-2"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          <p className="text-white/15 text-xs text-center mt-6">
            Demo: apexadmin / apex2026
          </p>
        </div>
      </motion.div>
    </div>
  )
}
