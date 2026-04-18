import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

const testimonials = [
  {
    name: 'James Whitmore',
    role: 'CEO, Whitmore Capital',
    text: "Apex Motors redefined what I thought a car-buying experience could be. From the moment I walked through the door to the second the keys were in my hand — pure theatre. Picked up my GT3 RS and haven't stopped smiling since.",
    rating: 5,
    car: 'Porsche 911 GT3 RS',
  },
  {
    name: 'Sophia Chen',
    role: 'Architect, SCAD Studio',
    text: "I've bought three cars from Apex in five years. They understand what I'm looking for before I even say it. The Ferrari Roma Spider they sourced for me was exactly right — perfect colour, perfect spec. These people know cars.",
    rating: 5,
    car: 'Ferrari Roma Spider',
  },
  {
    name: 'Marcus Okafor',
    role: 'Professional Racing Driver',
    text: "I'm extremely picky about cars — occupational hazard. Apex Motors is the only dealership I trust to be honest with me. No upsells, no nonsense. Just deep knowledge and a genuine passion for what they do.",
    rating: 5,
    car: 'Lamborghini Urus Performante',
  },
  {
    name: 'Elena Vasquez',
    role: 'Fashion Director',
    text: "The Bentley GT Speed I found at Apex is the most beautiful object I own. The team helped me choose a bespoke colour combination I never would have found on my own. It's like having a personal stylist — for cars.",
    rating: 5,
    car: 'Bentley Continental GT Speed',
  },
  {
    name: 'David Kensington',
    role: 'Entrepreneur',
    text: "The team at Apex saved me from a terrible deal elsewhere. Transparent, fast, and genuinely competitive. My M5 Competition was delivered to my house fully detailed. Proper service.",
    rating: 5,
    car: 'BMW M5 Competition',
  },
]

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0)
  const [dir, setDir] = useState(1)

  useEffect(() => {
    const timer = setInterval(() => {
      setDir(1)
      setCurrent((c) => (c + 1) % testimonials.length)
    }, 5500)
    return () => clearInterval(timer)
  }, [])

  const go = (idx) => { setDir(idx > current ? 1 : -1); setCurrent(idx) }
  const prev = () => { setDir(-1); setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length) }
  const next = () => { setDir(1); setCurrent((c) => (c + 1) % testimonials.length) }

  const t = testimonials[current]

  return (
    <section className="pt-36 pb-28 md:pt-44 md:pb-36 bg-[#F7F7F7] border-t border-[#E5E5E5] md:!py-4">
      <div className="wrap">
        {/* Section header — centered */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-label">Client Stories</p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] leading-tight">
            What our clients say.
          </h2>
        </motion.div>

        {/* Testimonial card — centered */}
        <div className="max-w-2xl mx-auto text-center !pl-50 !pr-1">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={current}
              custom={dir}
              initial={{ opacity: 0, x: dir * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -40 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="w-full text-center"
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-8">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={14} className="text-[#D5001C]" fill="#D5001C" />
                ))}
              </div>

              <blockquote className="text-[#1A1A1A] text-xl md:text-2xl leading-relaxed mb-10 font-light">
                "{t.text}"
              </blockquote>

              {/* Author */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 bg-[#1A1A1A] flex items-center justify-center mx-auto mb-1">
                  <span className="bebas text-white text-lg">{t.name[0]}</span>
                </div>
                <p className="text-[#1A1A1A] font-semibold text-sm">{t.name}</p>
                <p className="text-[#6B6B6B] text-sm">{t.role}</p>
                <p className="text-[#AAAAAA] text-xs tracking-widest uppercase mt-1">{t.car}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls — centered */}
          <div className="flex items-center justify-center gap-4 mt-12 pl:100px" >
            <button
              onClick={prev}
              className="w-10 h-10 border border-[#E5E5E5] flex items-center justify-center text-[#6B6B6B] hover:text-[#1A1A1A] hover:border-[#1A1A1A] transition-all"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2 ">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === current ? 'w-6 h-2 bg-[#1A1A1A]' : 'w-2 h-2 bg-[#CCCCCC] hover:bg-[#999]'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 border border-[#E5E5E5] flex items-center justify-center text-[#6B6B6B] hover:text-[#1A1A1A] hover:border-[#1A1A1A] transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
