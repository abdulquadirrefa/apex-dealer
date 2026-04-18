import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="bebas text-[180px] md:text-[240px] leading-none text-[#F0F0F0] select-none mb-[-2rem]">404</p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">Lost on the road?</h1>
          <p className="text-[#6B6B6B] text-[15px] mb-10 max-w-sm mx-auto leading-relaxed">
            The page you're looking for doesn't exist or has been moved. Let us guide you back.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/" className="btn-primary flex items-center gap-2 group">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
            <Link to="/inventory" className="btn-outline">
              Browse Inventory
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
