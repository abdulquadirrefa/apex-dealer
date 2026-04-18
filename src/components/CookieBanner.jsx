import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const accepted = localStorage.getItem('apex_cookies')
    if (!accepted) {
      const timer = setTimeout(() => setVisible(true), 1800)
      return () => clearTimeout(timer)
    }
  }, [])

  const accept = () => {
    localStorage.setItem('apex_cookies', 'true')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 200 }}
          className="fixed bottom-5 left-0 right-0 z-[9990] px-4"
        >
          <div className="max-w-[900px] mx-auto">
            <div className="bg-white border border-[#E5E5E5] shadow-[0_8px_40px_rgba(0,0,0,0.12)] p-5 flex flex-col md:flex-row items-start md:items-center gap-4">
              <p className="text-[#6B6B6B] text-sm leading-relaxed flex-1">
                We use cookies to enhance your experience and analyse traffic.
                By clicking <strong className="text-[#1A1A1A] font-semibold">Accept All</strong>, you consent to our use of cookies.{' '}
                <a href="#" className="text-[#D5001C] hover:underline">Learn more</a>
              </p>
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={accept}
                  className="px-5 py-2 bg-[#1A1A1A] hover:bg-[#D5001C] text-white text-[11px] font-semibold tracking-[0.12em] uppercase transition-colors"
                >
                  Accept All
                </button>
                <button
                  onClick={accept}
                  className="px-5 py-2 border border-[#E5E5E5] hover:border-[#1A1A1A] text-[#6B6B6B] hover:text-[#1A1A1A] text-[11px] font-semibold tracking-[0.12em] uppercase transition-all"
                >
                  Essential Only
                </button>
                <button onClick={accept} className="text-[#AAAAAA] hover:text-[#1A1A1A] transition-colors p-1">
                  <X size={16} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
