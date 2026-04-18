import { useState, useEffect, useCallback } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, MessageCircle, Share2, CheckCircle, ArrowRight, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import useCarStore from '../store/useCarStore'
import CarCard from '../components/CarCard'
import CarPlaceholder from '../components/CarPlaceholder'

const badgeStyles = {
  NEW: 'bg-[#1A1A1A] text-white',
  CERTIFIED: 'bg-[#1A6B3A] text-white',
  'HOT DEAL': 'bg-[#D5001C] text-white',
}

export default function CarDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getCarById, cars } = useCarStore()
  const car = getCarById(id)
  const [activeImg, setActiveImg] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const [lightboxImg, setLightboxImg] = useState(0)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', date: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const openLightbox = (i) => { setLightboxImg(i); setLightbox(true) }
  const closeLightbox = () => setLightbox(false)

  const lightboxPrev = useCallback(() => {
    setLightboxImg((i) => (i - 1 + (images?.length || 1)) % (images?.length || 1))
  }, [])
  const lightboxNext = useCallback(() => {
    setLightboxImg((i) => (i + 1) % (images?.length || 1))
  }, [])

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') lightboxPrev()
      if (e.key === 'ArrowRight') lightboxNext()
      if (e.key === 'Escape') closeLightbox()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, lightboxPrev, lightboxNext])

  if (!car) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center pt-20">
        <h2 className="bebas text-5xl text-[#1A1A1A] mb-4">Vehicle Not Found</h2>
        <p className="text-[#6B6B6B] mb-8">This listing may have been removed.</p>
        <Link to="/inventory" className="btn-primary text-[12px]">
          Back to Inventory
        </Link>
      </div>
    )
  }

  const images = car.images && car.images.some((img) => img && img.trim() !== '')
    ? car.images.filter((img) => img && img.trim() !== '')
    : null

  const related = cars.filter((c) => c.id !== car.id && (c.make === car.make || c.category === car.category) && !c.sold).slice(0, 3)

  const specs = [
    { label: 'Engine', value: car.engine || `${car.horsepower}hp Motor` },
    { label: 'Horsepower', value: car.horsepower ? `${car.horsepower} hp` : '—' },
    { label: 'Torque', value: car.torque || '—' },
    { label: '0–60 mph', value: car.acceleration || '—' },
    { label: 'Top Speed', value: car.topSpeed || '—' },
    { label: 'Fuel Economy', value: car.mpg || '—' },
    { label: 'Drivetrain', value: car.drivetrain || '—' },
    { label: 'Transmission', value: car.transmission || '—' },
    { label: 'Fuel Type', value: car.fuel || '—' },
    { label: 'Mileage', value: car.mileage ? `${car.mileage.toLocaleString()} mi` : '—' },
    { label: 'Color', value: car.color || '—' },
    { label: 'VIN', value: car.vin || '—' },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-white pt-32">
      <div className="wrap py-8">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#AAAAAA] hover:text-[#1A1A1A] text-sm mb-8 transition-colors group"
        >
          <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
          Back to Inventory
        </button>

        <div className="grid lg:grid-cols-[1fr_360px] gap-12">
          {/* Left */}
          <div>
            {/* Main image */}
            <div
              className="relative overflow-hidden aspect-[16/10] mb-3 bg-[#F0F0F0] group cursor-zoom-in"
              onClick={() => images && openLightbox(activeImg)}
            >
              {images ? (
                <img src={images[activeImg]} alt={car.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
              ) : (
                <CarPlaceholder make={car.make} category={car.category} />
              )}
              {images && (
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full p-2">
                    <ZoomIn size={18} className="text-[#1A1A1A]" />
                  </div>
                </div>
              )}

              {car.sold && (
                <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                  <div className="border-4 border-[#1A1A1A]/30 px-10 py-4 rotate-[-8deg]">
                    <span className="bebas text-[#1A1A1A]/40 text-5xl tracking-widest">SOLD</span>
                  </div>
                </div>
              )}

              {car.badge && car.badge !== 'None' && (
                <div className={`absolute top-5 left-5 px-3 py-1.5 text-xs font-bold tracking-widest uppercase ${badgeStyles[car.badge] || ''}`}>
                  {car.badge}
                </div>
              )}

              <button className="absolute top-5 right-5 flex items-center gap-2 text-[#6B6B6B] hover:text-[#1A1A1A] text-sm transition-colors bg-white/80 backdrop-blur-sm px-3 py-1.5">
                <Share2 size={13} /> Share
              </button>
            </div>

            {/* Thumbnails */}
            {images && images.length > 1 && (
              <div className="flex gap-2 mb-8">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-20 h-14 overflow-hidden border-2 transition-all ${
                      i === activeImg ? 'border-[#1A1A1A]' : 'border-transparent opacity-50 hover:opacity-80'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {!images && (
              <div className="flex gap-2 mb-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className={`w-20 h-14 overflow-hidden border-2 bg-[#F0F0F0] ${i === 0 ? 'border-[#1A1A1A]' : 'border-transparent opacity-30'}`}>
                    <CarPlaceholder make={car.make} category={car.category} />
                  </div>
                ))}
              </div>
            )}

            {/* Title row */}
            <div className="mb-6">
              <p className="text-[#AAAAAA] text-[10px] tracking-[0.3em] uppercase font-semibold mb-1">{car.make} · {car.year} · {car.category}</p>
              <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] leading-tight">{car.name}</h1>
            </div>

            <p className="text-[#6B6B6B] leading-relaxed mb-10 text-[15px]">{car.description}</p>

            {/* Specs */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-5">Full Specifications</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-[#E5E5E5]">
                {specs.map(({ label, value }) => (
                  <div key={label} className="bg-white p-4">
                    <p className="text-[#AAAAAA] text-[10px] tracking-[0.2em] uppercase font-semibold mb-1">{label}</p>
                    <p className="text-[#1A1A1A] font-medium text-sm">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            {car.features && car.features.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-[#1A1A1A] mb-5">Features & Equipment</h2>
                <div className="flex flex-wrap gap-2">
                  {car.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2 px-3 py-2 border border-[#E5E5E5] text-sm text-[#6B6B6B]">
                      <CheckCircle size={12} className="text-[#1A6B3A] shrink-0" />
                      {feat}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className=" p-6 sticky top-24">
              <div className="flex items-start justify-between mb-2">
                <p className="text-[#AAAAAA] text-[10px] tracking-[0.25em] uppercase font-semibold">Asking Price</p>
                {car.featured && (
                  <span className="text-xs text-[#8B6914] border border-[#C9A84C]/40 px-2 py-0.5">Featured</span>
                )}
              </div>
              <p className="text-[#1A1A1A] font-bold text-4xl mb-1">${car.price?.toLocaleString()}</p>
              {car.originalPrice && (
                <>
                  <p className="text-[#AAAAAA] text-sm line-through mb-1">${car.originalPrice?.toLocaleString()}</p>
                  <p className="text-[#1A6B3A] text-sm mb-4">Save ${(car.originalPrice - car.price).toLocaleString()}</p>
                </>
              )}

              <div className="grid grid-cols-2 gap-2 mb-5 text-sm">
                {[
                  { label: 'Mileage', value: `${car.mileage?.toLocaleString()} mi` },
                  { label: 'Year', value: car.year },
                  { label: 'Power', value: `${car.horsepower} hp` },
                  { label: '0–60', value: car.acceleration },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-[#F7F7F7] p-3 text-center">
                    <p className="text-[#AAAAAA] text-[10px] uppercase tracking-wider mb-1">{label}</p>
                    <p className="text-[#1A1A1A] font-semibold text-sm">{value}</p>
                  </div>
                ))}
              </div>

              {!car.sold ? (
                <>
                  {submitted ? (
                    <div className="border border-[#1A6B3A]/30 bg-[#F0FFF4] p-4 text-center">
                      <CheckCircle size={24} className="text-[#1A6B3A] mx-auto mb-2" />
                      <p className="text-[#1A6B3A] font-medium text-sm">Request Submitted!</p>
                      <p className="text-[#6B6B6B] text-xs mt-1">We'll be in touch within 24 hours.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-3">
                      <p className="text-[#1A1A1A] font-semibold text-sm mb-3">Book a Test Drive</p>
                      {[
                        { key: 'name', placeholder: 'Full Name', type: 'text' },
                        { key: 'email', placeholder: 'Email Address', type: 'email' },
                        { key: 'phone', placeholder: 'Phone Number', type: 'tel' },
                        { key: 'date', placeholder: 'Preferred Date', type: 'date' },
                      ].map(({ key, placeholder, type }) => (
                        <input
                          key={key}
                          type={type}
                          placeholder={placeholder}
                          required
                          value={formData[key]}
                          onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                          className="w-full bg-white border border-[#E5E5E5] px-4 py-2.5 text-[#1A1A1A] placeholder-[#AAAAAA] text-sm focus:outline-none focus:border-[#1A1A1A] transition-colors"
                        />
                      ))}
                      <button
                        type="submit"
                        className="w-full btn-primary justify-center text-[12px]"
                      >
                        Request Test Drive
                      </button>
                    </form>
                  )}

                  <a
                    href={`https://wa.me/442070000000?text=Hi!%20I'm%20interested%20in%20the%20${encodeURIComponent(car.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 w-full flex items-center justify-center gap-2 border border-[#E5E5E5] hover:border-[#1A1A1A] py-2.5 text-[#6B6B6B] hover:text-[#1A1A1A] text-xs font-medium transition-all"
                  >
                    <MessageCircle size={13} /> Chat on WhatsApp
                  </a>
                </>
              ) : (
                <div className="border border-[#E5E5E5] p-4 text-center">
                  <p className="text-[#6B6B6B] font-medium text-sm">This vehicle has been sold.</p>
                  <Link to="/inventory" className="text-[#D5001C] text-sm mt-2 block hover:underline">
                    Browse Available Vehicles →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightbox && images && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
              onClick={closeLightbox}
            >
              {/* Close */}
              <button
                onClick={closeLightbox}
                className="absolute top-5 right-5 w-10 h-10 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors rounded-full"
              >
                <X size={18} />
              </button>

              {/* Counter */}
              <p className="absolute top-6 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-widest">
                {lightboxImg + 1} / {images.length}
              </p>

              {/* Prev */}
              {images.length > 1 && (
                <button
                  onClick={(e) => { e.stopPropagation(); lightboxPrev() }}
                  className="absolute left-4 md:left-8 w-12 h-12 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors rounded-full"
                >
                  <ChevronLeft size={24} />
                </button>
              )}

              {/* Image */}
              <motion.img
                key={lightboxImg}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                src={images[lightboxImg]}
                alt={car.name}
                className="max-w-[90vw] max-h-[85vh] object-contain"
                onClick={(e) => e.stopPropagation()}
              />

              {/* Next */}
              {images.length > 1 && (
                <button
                  onClick={(e) => { e.stopPropagation(); lightboxNext() }}
                  className="absolute right-4 md:right-8 w-12 h-12 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors rounded-full"
                >
                  <ChevronRight size={24} />
                </button>
              )}

              {/* Thumbnail strip */}
              {images.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={(e) => { e.stopPropagation(); setLightboxImg(i) }}
                      className={`w-14 h-10 overflow-hidden transition-all ${i === lightboxImg ? 'opacity-100 ring-2 ring-white' : 'opacity-40 hover:opacity-70'}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-24 pt-16 border-t border-[#E5E5E5]">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="section-label">You May Also Like</p>
                <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A]">Similar Vehicles</h2>
              </div>
              <Link to="/inventory" className="flex items-center gap-2 text-[#6B6B6B] hover:text-[#1A1A1A] text-sm transition-colors group">
                All Inventory <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((c, i) => <CarCard key={c.id} car={c} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
