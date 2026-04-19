import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import useCarStore from './store/useCarStore'

// Layout components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Toast from './components/Toast'
import FloatingButtons from './components/FloatingButtons'
import CookieBanner from './components/CookieBanner'
import CustomCursor from './components/CustomCursor'
import ScrollToTop from './components/ScrollToTop'

// Public pages
import Home from './pages/Home'
import Inventory from './pages/Inventory'
import CarDetail from './pages/CarDetail'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

// Admin
import AdminLogin from './admin/AdminLogin'
import AdminLayout from './admin/AdminLayout'
import AdminDashboard from './admin/AdminDashboard'
import CarListings from './admin/CarListings'
import CarForm from './admin/CarForm'
import ProtectedRoute from './admin/ProtectedRoute'

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
}

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>
        <motion.div
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {children}
        </motion.div>
      </main>
      <Footer />
      <FloatingButtons />
      <CookieBanner />
    </>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  return (
    <>
      <ScrollToTop />
      <CustomCursor />
      <Toast />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Public routes */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/inventory" element={<PublicLayout><Inventory /></PublicLayout>} />
          <Route path="/inventory/:id" element={<PublicLayout><CarDetail /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />

          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="cars" element={<CarListings />} />
            <Route path="cars/new" element={<CarForm mode="add" />} />
            <Route path="cars/edit/:id" element={<CarForm mode="edit" />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}

function AdminSettings() {
  return (
    <div>
      <h1 className="bebas text-4xl text-white tracking-wider mb-6">Settings</h1>
      <div className="bg-[#111] border border-white/5 rounded-xl p-6 max-w-lg">
        <p className="text-white/40 text-sm mb-4">Admin panel settings and preferences.</p>
        <div className="space-y-4">
          {[
            { label: 'Dealership Name', value: 'Apex Motors' },
            { label: 'Admin Email', value: 'admin@apexmotors.co.uk' },
            { label: 'Currency', value: 'USD ($)' },
          ].map(({ label, value }) => (
            <div key={label}>
              <label className="text-white/30 text-xs uppercase tracking-wider block mb-1.5">{label}</label>
              <input
                defaultValue={value}
                className="w-full bg-black/40 border border-white/8 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#E3000F]/50"
              />
            </div>
          ))}
          <button className="px-4 py-2.5 bg-[#E3000F] hover:bg-red-700 text-white text-sm rounded-lg transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const fetchCars = useCarStore((s) => s.fetchCars)
  useEffect(() => { fetchCars() }, [])

  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  )
}
