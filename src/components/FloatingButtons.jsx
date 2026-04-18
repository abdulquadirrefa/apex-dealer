import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp, MessageCircle } from 'lucide-react'

export default function FloatingButtons() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* WhatsApp */}
      <motion.a
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        href="https://wa.me/442070000000?text=Hello%2C%20I'm%20interested%20in%20a%20vehicle%20from%20Apex%20Motors"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110"
        style={{ background: '#25D366' }}
        aria-label="WhatsApp"
      >
        <MessageCircle size={22} className="text-white" fill="white" />
      </motion.a>

      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={scrollTop}
            className="w-12 h-12 bg-[#1A1A1A] flex items-center justify-center shadow-lg hover:bg-[#D5001C] transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp size={18} className="text-white" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
