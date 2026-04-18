import { useState } from 'react'
import { NavLink, useNavigate, Outlet } from 'react-router-dom'
import {
  LayoutDashboard, Car, PlusCircle, Star, CheckSquare, Settings,
  LogOut, Bell, Menu, X, ChevronRight
} from 'lucide-react'
import useCarStore from '../store/useCarStore'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
  { icon: Car, label: 'Car Listings', path: '/admin/cars' },
  { icon: PlusCircle, label: 'Add New Car', path: '/admin/cars/new' },
  { icon: Star, label: 'Featured Cars', path: '/admin/cars?filter=featured' },
  { icon: CheckSquare, label: 'Sold Cars', path: '/admin/cars?filter=sold' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
]

export default function AdminLayout() {
  const navigate = useNavigate()
  const { cars } = useCarStore()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const logout = () => {
    localStorage.removeItem('apex_admin_auth')
    navigate('/admin/login')
  }

  const stats = {
    total: cars.length,
    available: cars.filter((c) => !c.sold).length,
    sold: cars.filter((c) => c.sold).length,
  }

  return (
    <div className="admin-body min-h-screen bg-[#080808] flex" style={{ cursor: 'auto' }}>
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-[260px] bg-[#0d0d0d] border-r border-white/5 z-50 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#E3000F] rounded-sm flex items-center justify-center">
              <span className="bebas text-white text-base">A</span>
            </div>
            <div>
              <p className="bebas text-white text-base tracking-widest leading-none">APEX MOTORS</p>
              <p className="text-white/25 text-[10px] tracking-wider uppercase mt-0.5">Admin</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 overflow-y-auto">
          <div className="px-3 space-y-0.5">
            {navItems.map(({ icon: Icon, label, path }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                    isActive
                      ? 'bg-[#E3000F]/15 text-[#E3000F] border border-[#E3000F]/20'
                      : 'text-white/40 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <Icon size={16} />
                {label}
                <ChevronRight size={12} className="ml-auto opacity-0 group-hover:opacity-50 transition-opacity" />
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Quick stats */}
        <div className="px-4 pb-4">
          <div className="bg-white/3 border border-white/5 rounded-xl p-4 space-y-2">
            {[
              { label: 'Total', value: stats.total, color: 'text-white' },
              { label: 'Available', value: stats.available, color: 'text-green-400' },
              { label: 'Sold', value: stats.sold, color: 'text-white/40' },
            ].map(({ label, value, color }) => (
              <div key={label} className="flex justify-between">
                <span className="text-white/30 text-xs">{label}</span>
                <span className={`text-xs font-semibold ${color}`}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-white/5">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/8 text-sm font-medium transition-all"
          >
            <LogOut size={15} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Overlay (mobile only) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main area */}
      <div
        className="flex-1 flex flex-col min-h-screen transition-all duration-300"
        style={{ marginLeft: sidebarOpen ? '260px' : '0' }}
      >
        {/* Topbar */}
        <header className="sticky top-0 z-30 bg-[#0d0d0d]/90 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white/50 hover:text-white"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex-1" />
          <button className="w-9 h-9 rounded-lg bg-white/3 border border-white/5 flex items-center justify-center text-white/40 hover:text-white transition-colors relative">
            <Bell size={15} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#E3000F] rounded-full" />
          </button>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/8 text-white/40 hover:text-red-400 hover:border-red-500/30 text-xs font-medium transition-all"
          >
            <LogOut size={13} />
            Logout
          </button>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
