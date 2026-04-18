import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: 500, suffix: '+', label: 'Vehicles Sold' },
  { value: 15, suffix: ' Years', label: 'In Business' },
  { value: 10000, suffix: '+', label: 'Happy Clients' },
  { value: 50, suffix: '+', label: 'Premium Brands' },
]

function CountUp({ target, suffix, inView }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 2000
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target])

  return <span>{count.toLocaleString()}{suffix}</span>
}

export default function StatsBar() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} className="bg-[#F7F7F7] border-y border-[#E5E5E5] py-20">
      <div className="wrap">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <div className="bebas text-5xl md:text-6xl text-[#1A1A1A] leading-none mb-2">
                <CountUp target={stat.value} suffix={stat.suffix} inView={inView} />
              </div>
              <p className="text-[#AAAAAA] text-[11px] tracking-[0.25em] uppercase font-semibold">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
