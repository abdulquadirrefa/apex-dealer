import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import CarPlaceholder from './CarPlaceholder'

const badgeStyles = {
  NEW: 'bg-[#1A1A1A] text-white',
  CERTIFIED: 'bg-[#1A6B3A] text-white',
  'HOT DEAL': 'bg-[#D5001C] text-white',
}

export default function CarCard({ car, index = 0 }) {
  const hasImage = car.images && car.images[0] && car.images[0].trim() !== ''

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col bg-white"
    >
      {/* Clickable image */}
      <Link to={`/inventory/${car.id}`} className="block relative aspect-[4/3] overflow-hidden bg-[#F0F0F0] shrink-0">
        {hasImage ? (
          <img
            src={car.images[0]}
            alt={car.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.04]">
            <CarPlaceholder make={car.make} category={car.category} />
          </div>
        )}

        {/* Sold overlay */}
        {car.sold && (
          <div className="absolute inset-0 bg-white/75 flex items-center justify-center">
            <div className="border-2 border-[#1A1A1A]/40 px-8 py-3 rotate-[-8deg]">
              <span className="bebas text-[#1A1A1A]/50 text-3xl tracking-[0.3em]">SOLD</span>
            </div>
          </div>
        )}

        {/* Badge */}
        {car.badge && car.badge !== 'None' && !car.sold && (
          <div className={`absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold tracking-[0.15em] uppercase ${badgeStyles[car.badge] || badgeStyles.NEW}`}>
            {car.badge}
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="pt-5 pb-6">
        <p className="text-[#AAAAAA] text-[10px] tracking-[0.25em] uppercase font-semibold mb-1.5">
          {car.make} · {car.year}
        </p>
        <Link to={`/inventory/${car.id}`}>
          <p className="text-[#1A1A1A] font-semibold text-[17px] leading-snug mb-3 hover:text-[#D5001C] transition-colors">
            {car.name}
          </p>
        </Link>

        {/* Specs row */}
        <div className="flex items-center gap-3 mb-5 flex-wrap">
          {car.horsepower && (
            <span className="text-[12px] text-[#6B6B6B]">{car.horsepower} hp</span>
          )}
          {car.horsepower && car.transmission && <span className="text-[#DDDDDD]">·</span>}
          {car.transmission && (
            <span className="text-[12px] text-[#6B6B6B]">{car.transmission.replace('Automatic', 'Auto')}</span>
          )}
          {car.transmission && car.fuel && <span className="text-[#DDDDDD]">·</span>}
          {car.fuel && (
            <span className="text-[12px] text-[#6B6B6B]">{car.fuel}</span>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-[#F0F0F0] pt-5 flex items-end justify-between">
          <div>
            <p className="text-[#1A1A1A] font-bold text-[20px] tracking-tight">
              ${car.price?.toLocaleString()}
            </p>
            {car.originalPrice && (
              <p className="text-[#AAAAAA] text-xs line-through mt-0.5">${car.originalPrice?.toLocaleString()}</p>
            )}
          </div>
          <Link
            to={`/inventory/${car.id}`}
            className="flex items-center gap-1.5 text-[11px] font-bold tracking-[0.12em] uppercase text-[#1A1A1A] hover:text-[#D5001C] transition-colors group/lnk"
          >
            View Details <ArrowRight size={12} className="group-hover/lnk:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
