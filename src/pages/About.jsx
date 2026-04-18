import { motion } from 'framer-motion'
import { Award, Users, Car, Globe } from 'lucide-react'

const timeline = [
  { year: '2009', title: 'Founded in Mayfair', desc: 'Apex Motors opens its doors in the heart of London, with just 12 cars and a singular vision: to deliver the most exceptional car-buying experience in the world.' },
  { year: '2012', title: 'First £1M Sale', desc: 'We broker our first eight-figure transaction — a Bugatti Veyron Grand Sport. Word spreads. The client list grows.' },
  { year: '2015', title: 'Showroom Expansion', desc: 'Our flagship 12,000 sq ft showroom opens on Apex Drive, redefining what a luxury dealership looks like. Voted Best New Showroom by AutoElite Magazine.' },
  { year: '2018', title: 'Finance Division Launch', desc: 'Apex Finance launches, giving clients access to bespoke funding solutions through our network of premium lending partners.' },
  { year: '2020', title: 'Electric Future', desc: 'We add our first dedicated electric vehicle wing. EV sales grow by 340% as we partner with Tesla, Rimac, and Lotus Electric.' },
  { year: '2023', title: 'International Reach', desc: 'We begin sourcing and shipping vehicles globally, with clients in 28 countries. Our concierge service manages the entire process end-to-end.' },
  { year: '2026', title: 'Today', desc: "Over 10,000 satisfied clients. 500+ vehicles in stock. Four consecutive years as the UK's top-rated luxury dealership. We're just getting started." },
]

const team = [
  { name: 'Alexander Reid', role: 'Founder & CEO', initial: 'A', image: '/images/team/ceo.jpg', bio: "20 years in luxury automotive. Former Ferrari brand director. Built Apex from a single showroom to the UK's finest." },
  { name: 'Sofia Marchetti', role: 'Head of Sales', initial: 'S', image: '/images/team/demo1.jpg', bio: 'Ex-Lamborghini. 15 years matching exceptional clients with exceptional cars. Sofia speaks five languages fluently.' },
  { name: 'James Okafor', role: 'Finance Director', initial: 'J', image: '/images/team/demo2.jpg', bio: 'Former Goldman Sachs. Brings institutional-grade finance expertise to every client deal. Known for structuring the impossible.' },
  { name: 'Sara James', role: 'Client Relations', initial: 'P', image: '/images/team/demo3.jpg', bio: 'The face of Apex. Priya manages our most valued long-term clients and ensures every experience is unforgettable.' },
]

const awards = [
  "UK's #1 Luxury Dealership 2023–2026",
  'Best Customer Experience — AutoElite Awards 2025',
  'Top Finance Partner — Premium Auto Finance Summit 2024',
  'Green Dealer of the Year 2024',
  'AutoTrader Highly Recommended 2026',
]

const fadeUp = { initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 } }

export default function About() {
  return (
    <div className="min-h-screen bg-white  md:!py-15">
      {/* Header */}
      <div className="relative mt-16 pt-16 md:pt-24 pb-12 bg-[#0f0f0f] overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0000] via-[#0f0f0f] to-[#0a0a0a]" />
        <div className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #D5001C 0%, transparent 70%)' }} />
        <div className="absolute -top-20 -left-20 w-[600px] h-[600px] rounded-full opacity-0 group-hover:opacity-40 scale-90 group-hover:scale-110 transition-all duration-700 ease-out"
          style={{ background: 'radial-gradient(circle, #D5001C 0%, transparent 65%)' }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-0 group-hover:opacity-25 scale-75 group-hover:scale-100 transition-all duration-700 ease-out"
          style={{ background: 'radial-gradient(circle, #D5001C 0%, transparent 70%)' }} />
        <div className="wrap relative z-10">
          <p className="section-label text-white/40">Est. 2009 · London</p>
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight max-w-xl">
            The story behind<br />the obsession.
          </h1>
        </div>
      </div>

      <div className="wrap  md:!py-5">
        {/* Intro */}
        <div className="py-16 md:py-20 grid lg:grid-cols-2 gap-16 items-center border-b border-[#E5E5E5]">
          <motion.div
            variants={fadeUp} initial="initial" animate="animate"
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[#1A1A1A] text-xl md:text-2xl leading-relaxed font-light mb-6">
              Apex Motors was born from a single conviction: that buying an extraordinary car should itself be an extraordinary experience.
            </p>
            <p className="text-[#6B6B6B] leading-relaxed text-[15px]">
              Founded in 2009 by Alexander Reid in London's Mayfair, we started with twelve cars and a refusal to do things the conventional way.
              Seventeen years later, we're the most trusted name in UK luxury automotive retail — and we still treat every client like our first.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 gap-px bg-[#E5E5E5]"
          >
            {[
              { icon: Car, value: '500+', label: 'Cars in Stock' },
              { icon: Users, value: '10,000+', label: 'Happy Clients' },
              { icon: Globe, value: '28', label: 'Countries Served' },
              { icon: Award, value: '4×', label: "UK's #1 Dealership" },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="bg-white p-8 text-center">
                <Icon size={22} className="text-[#D5001C] mx-auto mb-3" />
                <p className="bebas text-4xl text-[#1A1A1A] mb-1">{value}</p>
                <p className="text-[#AAAAAA] text-[11px] tracking-[0.2em] uppercase font-semibold">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="py-16 md:py-20 border-b border-[#E5E5E5]">
          <motion.div
            variants={fadeUp} initial="initial" whileInView="animate"
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <p className="section-label">Our Journey</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] leading-tight">2009 – 2026</h2>
          </motion.div>

          <div className=" md:!py-4 space-y-0 divide-y divide-[#E5E5E5]">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.5 }}
                className="py-6 grid sm:grid-cols-[100px_1fr] gap-6 items-start"
              >
                <span className="bebas text-3xl text-[#D5001C]">{item.year}</span>
                <div>
                  <p className="font-semibold text-[#1A1A1A] mb-1">{item.title}</p>
                  <p className="text-[#6B6B6B] text-[14px] leading-relaxed max-w-2xl">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="py-16 md:py-20 border-b border-[#E5E5E5]">
          <motion.div
            variants={fadeUp} initial="initial" whileInView="animate"
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <p className="section-label">The People</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] leading-tight">Meet the team.</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.55 }}
              >
                {/* Photo */}
                <div className="w-full aspect-[3/4] bg-[#F0F0F0] overflow-hidden mb-5 relative">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top"
                      onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
                    />
                  ) : null}
                  <div
                    className="absolute inset-0 bg-[#1A1A1A] items-center justify-center bebas text-5xl text-white"
                    style={{ display: member.image ? 'none' : 'flex' }}
                  >
                    {member.initial}
                  </div>
                </div>
                <p className="font-semibold text-[#1A1A1A] mb-0.5">{member.name}</p>
                <p className="text-[#D5001C] text-[11px] tracking-[0.15em] uppercase font-semibold mb-3">{member.role}</p>
                <p className="text-[#6B6B6B] text-[13px] leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Awards */}
        <div className="py-16 md:py-20">
          <motion.div
            variants={fadeUp} initial="initial" whileInView="animate"
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <p className="section-label">Recognition</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] leading-tight">Awards & accolades.</h2>
          </motion.div>
          <div className="flex flex-wrap gap-3">
            {awards.map((award, i) => (
              <motion.div
                key={award}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-3 border border-[#E5E5E5] px-5 py-3"
              >
                <Award size={14} className="text-[#D5001C] shrink-0" />
                <span className="text-[#1A1A1A] text-sm">{award}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
