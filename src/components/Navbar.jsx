import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Models', path: '/inventory' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isHeroPage = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [location])

  const navBg = scrolled || !isHeroPage || menuOpen

  return (
    <>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          navBg
            ? 'bg-[#F2F2F2] border-b border-[#E0E0E0]'
            : 'bg-transparent border-b border-white/10'
        }`}
        style={{ height: '64px' }}
      >
        <div className="wrap h-full flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className={`w-7 h-7 flex items-center justify-center text-sm font-black transition-colors ${
              navBg ? 'bg-[#1A1A1A] text-white' : 'bg-white text-[#1A1A1A]'
            }`}>
              <span className="bebas text-base leading-none">A</span>
            </div>
            <div className={`transition-colors ${navBg ? 'text-[#1A1A1A]' : 'text-white'}`}>
              <span className="font-bold text-sm tracking-[0.12em] uppercase">Apex</span>
              <span className="font-light text-sm tracking-[0.12em] uppercase ml-1">Motors</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[13px] font-medium tracking-wide transition-colors link-underline ${
                  navBg
                    ? location.pathname.startsWith(link.path) ? 'text-[#D5001C]' : 'text-[#1A1A1A] hover:text-[#D5001C]'
                    : location.pathname.startsWith(link.path) ? 'text-[#D5001C]' : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/inventory"
              className="btn-ring"
            >
              Find a Car
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden transition-colors ${navBg ? 'text-[#1A1A1A]' : 'text-white'}`}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[64px] left-0 right-0 z-40 bg-[#F2F2F2] border-b border-[#E0E0E0] shadow-lg"
          >
            <div className="wrap py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-[#1A1A1A] text-xl font-medium py-2 border-b border-[#F0F0F0]"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/inventory"
                className="mt-2 bg-[#1A1A1A] text-white text-[13px] font-semibold tracking-[0.12em] uppercase px-6 py-5 text-center"
              >
                Find a Car
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
