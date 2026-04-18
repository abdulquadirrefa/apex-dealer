import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle, XCircle, Info, X } from 'lucide-react'
import useToastStore from '../store/useToastStore'

const icons = {
  success: <CheckCircle size={18} className="text-green-400" />,
  error: <XCircle size={18} className="text-red-400" />,
  info: <Info size={18} className="text-yellow-400" />,
}

const borders = {
  success: 'border-green-500/30',
  error: 'border-red-500/30',
  info: 'border-yellow-500/30',
}

export default function Toast() {
  const { toasts, removeToast } = useToastStore()

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 80, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 80, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl glass-dark border ${borders[toast.type]} min-w-[280px] max-w-[360px] shadow-2xl`}
          >
            {icons[toast.type]}
            <span className="text-sm text-white/90 flex-1 font-medium">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-white/40 hover:text-white/80 transition-colors"
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
