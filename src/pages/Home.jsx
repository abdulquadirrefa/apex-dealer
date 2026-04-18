import { useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ChevronDown, ShieldCheck, UserCheck, Tag, HeartHandshake } from 'lucide-react'
import useCarStore from '../store/useCarStore'
import CarCard from '../components/CarCard'
import StatsBar from '../components/StatsBar'
import TestimonialCarousel from '../components/TestimonialCarousel'
import BrandMarquee from '../components/BrandMarquee'

const promises = [
  { num: '01', icon: ShieldCheck, title: 'Certified Excellence', desc: 'Every vehicle passes a 150-point inspection. Only cars that meet our standards earn the Apex badge.' },
  { num: '02', icon: UserCheck, title: 'Bespoke Service', desc: 'A dedicated specialist guides you from first look to handover. No pressure. No shortcuts.' },
  { num: '03', icon: Tag, title: 'Transparent Pricing', desc: 'The price you see is the price you pay. No hidden fees, no surprise add-ons. Ever.' },
  { num: '04', icon: HeartHandshake, title: 'After-Sale Care', desc: 'Our relationship begins at delivery. Lifetime concierge access for every Apex client.' },
]

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
}

export default function Home() {
  const { getFeaturedCars, cars } = useCarStore()
  const featuredCars = getFeaturedCars()
  const heroRef = useRef(null)

  const videos = ['/car1.mp4', '/car2.mp4']
  const [active, setActive] = useState(0)
  const vid0 = useRef(null)
  const vid1 = useRef(null)

  const handleEnded = useCallback((finished) => {
    const next = finished === 0 ? 1 : 0
    const nextRef = next === 0 ? vid0 : vid1
    if (nextRef.current) {
      nextRef.current.currentTime = 0
      nextRef.current.play()
    }
    setActive(next)
  }, [])
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <div className="bg-white">
      {/* ── HERO ── */}
      <section ref={heroRef} className="relative h-screen min-h-[640px] overflow-hidden bg-[#111]">
        <div className="grain-overlay" />

        <motion.div style={{ y: heroY }} className="absolute inset-0">
          {/* Video 1 */}
          <video
            ref={vid0}
            src={videos[0]}
            autoPlay
            muted
            playsInline
            onEnded={() => handleEnded(0)}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
            style={{ opacity: active === 0 ? 1 : 0 }}
          />
          {/* Video 2 */}
          <video
            ref={vid1}
            src={videos[1]}
            muted
            playsInline
            onEnded={() => handleEnded(1)}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
            style={{ opacity: active === 1 ? 1 : 0 }}
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/60" />
          {/* Subtle red vignette */}
          <div className="absolute inset-0 opacity-20"
            style={{ background: 'radial-gradient(ellipse at 20% 80%, #D5001C 0%, transparent 55%)' }} />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 h-full flex flex-col justify-center pt-16"
        >
          <div className="wrap">
            <motion.p
              variants={fadeUp} initial="initial" animate="animate"
              transition={{ delay: 0.2, duration: 0.7, ease: [0.16,1,0.3,1] }}
              className="text-white/40 text-[11px] tracking-[0.3em] uppercase font-medium mb-6"
            >
              Est. 2009 · London, Mayfair
            </motion.p>

            <div className="overflow-hidden mb-3">
              <motion.h1
                initial={{ y: '100%' }} animate={{ y: 0 }}
                transition={{ delay: 0.3, duration: 0.9, ease: [0.16,1,0.3,1] }}
                className="bebas text-[clamp(56px,9vw,120px)] text-white leading-[0.88]"
              >Precision.</motion.h1>
            </div>
            <div className="overflow-hidden mb-3">
              <motion.h1
                initial={{ y: '100%' }} animate={{ y: 0 }}
                transition={{ delay: 0.42, duration: 0.9, ease: [0.16,1,0.3,1] }}
                className="bebas text-[clamp(56px,9vw,120px)] text-white/70 leading-[0.88]"
              >Performance.</motion.h1>
            </div>
            <div className="overflow-hidden mb-10">
              <motion.h1
                initial={{ y: '100%' }} animate={{ y: 0 }}
                transition={{ delay: 0.54, duration: 0.9, ease: [0.16,1,0.3,1] }}
                className="bebas text-[clamp(56px,9vw,120px)] text-[#D5001C] leading-[0.88]"
              >Perfection.</motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <Link to="/inventory" className="btn-primary">
                Explore Models <ArrowRight size={14} />
              </Link>
              <Link to="/contact" className="btn-outline-white">
                Book a Viewing
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
          className="absolute bottom-8 right-10 flex flex-col items-center gap-2 text-white/25"
        >
          <span className="text-[9px] tracking-[0.4em] uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
            <ChevronDown size={14} />
          </motion.div>
        </motion.div>
      </section>

      {/* ── FEATURED MODELS ── */}
      <section className="py-24 md:py-32 bg-white">
        <div className="wrap  md:!py-8">
          <motion.div
            variants={fadeUp} initial="initial" whileInView="animate"
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
          >
            <div>
              <p className="section-label">Featured Models</p>
              <h2 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] leading-tight">
                Chosen for those<br />who know the difference.
              </h2>
            </div>
            <Link
              to="/inventory"
              className="text-[13px] font-medium text-[#1A1A1A] hover:text-[#D5001C] transition-colors flex items-center gap-2 group link-underline shrink-0 pb-1"
            >
              View all {cars.length} vehicles
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-14">
            {featuredCars.slice(0, 6).map((car, i) => (
              <CarCard key={car.id} car={car} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <StatsBar />

      {/* ── PROMISES ── */}
      <section className="py-24 md:py-32 bg-white border-t border-[#E5E5E5]">
        <div className="wrap md:!py-8">
          <motion.div
            variants={fadeUp} initial="initial" whileInView="animate"
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <p className="section-label">The Apex Standard</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] max-w-lg leading-tight">
              Why discerning buyers choose us.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {promises.map(({ num, icon: Icon, title, desc }, i) => (
              <motion.div
                key={num}
                variants={fadeUp} initial="initial" whileInView="animate"
                viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.6 }}
                className="border-t-2 border-[#E5E5E5] pt-8 pr-8 pb-8 hover:border-[#D5001C] transition-colors duration-300 group"
              >
                <div className="w-11 h-11 bg-[#F7F7F7] flex items-center justify-center mb-6 group-hover:bg-[#D5001C]/8 transition-colors">
                  <Icon size={20} className="text-[#D5001C]" strokeWidth={2.5} />
                </div>
                <p className="text-[11px] font-bold tracking-[0.2em] text-[#AAAAAA] mb-3 group-hover:text-[#D5001C] transition-colors">{num}</p>
                <p className="text-[17px] font-semibold text-[#1A1A1A] !mb-3 leading-snug">{title}</p>
                <p className="text-[14px] text-[#6B6B6B] !ml-3 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRAND MARQUEE ── */}
      <BrandMarquee />

      {/* ── TESTIMONIALS ── */}
      <TestimonialCarousel />

      {/* ── CTA BANNER ── */}
      <section className="bg-[#1A1A1A] !py-16 md:py-44 relative overflow-hidden md:!py-8">
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, #D5001C 0, #D5001C 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />
        <div className="wrap relative z-10">
          <div className="max-w-2xl">
            <motion.div
              variants={fadeUp} initial="initial" whileInView="animate"
              viewport={{ once: true }} transition={{ duration: 0.7 }}
            >
              <p className="text-white/40 text-[11px] tracking-[0.3em] uppercase font-medium mb-5">Ready when you are</p>
              <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-8">
                Find your next<br />great car.
              </h2>
              <p className="text-white/50 text-[15px] leading-relaxed !mb-5 max-w-md">
                Browse our full collection online, or visit us in Mayfair. Our specialists are available seven days a week.
              </p>
              <div className="flex flex-col sm:flex-row gap-5">
                <Link to="/inventory" className="btn-primary" style={{ background: '#D5001C', borderColor: '#D5001C' }}>
                  Browse All Models <ArrowRight size={14} />
                </Link>
                <Link to="/contact" className="btn-outline-white">
                  Talk to a Specialist
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
