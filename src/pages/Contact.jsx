import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, CheckCircle, ArrowRight } from 'lucide-react'
import { InstagramIcon, TwitterIcon, YoutubeIcon, FacebookIcon } from '../components/SocialIcons'

const socials = [
  { icon: InstagramIcon, label: '@apexmotors', href: '#' },
  { icon: TwitterIcon, label: '@apexmotors', href: '#' },
  { icon: YoutubeIcon, label: 'Apex Motors TV', href: '#' },
  { icon: FacebookIcon, label: 'Apex Motors', href: '#' },
]

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: 'General Enquiry', message: '' })

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  return (
    <div className="min-h-screen bg-white  md:!py-7">
      {/* Header */}
      <div className="relative mt-16 pt-16 md:pt-24 pb-14 bg-[#0f0f0f] overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0000] via-[#0f0f0f] to-[#0a0a0a]" />
        <div className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #D5001C 0%, transparent 70%)' }} />
        <div className="absolute -top-20 -left-20 w-[600px] h-[600px] rounded-full opacity-0 group-hover:opacity-40 scale-90 group-hover:scale-110 transition-all duration-700 ease-out"
          style={{ background: 'radial-gradient(circle, #D5001C 0%, transparent 65%)' }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-0 group-hover:opacity-25 scale-75 group-hover:scale-100 transition-all duration-700 ease-out"
          style={{ background: 'radial-gradient(circle, #D5001C 0%, transparent 70%)' }} />
        <div className="wrap relative z-10">
          <p className="section-label text-white/40">Get In Touch</p>
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-4">Contact Us</h1>
          <p className="text-white/40 text-[15px] max-w-lg leading-relaxed">
            Whether you're ready to buy, looking for a test drive, or just have a question — we'd love to hear from you.
          </p>
        </div>
      </div>

      <div className="wrap py-16 md:!py-10">
        <div className="grid lg:grid-cols-[1fr_420px] gap-16">

          {/* ── Form ── */}
          <div>
            {sent ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-[#D5EDD9] bg-[#F5FDF6] p-16 text-center flex flex-col items-center justify-center min-h-[520px]"
              >
                <div className="w-16 h-16 rounded-full bg-[#1A6B3A]/10 flex items-center justify-center mb-6">
                  <CheckCircle size={32} className="text-[#1A6B3A]" />
                </div>
                <h3 className="text-[#1A1A1A] font-bold text-2xl mb-3">Message Received</h3>
                <p className="text-[#6B6B6B] max-w-xs leading-relaxed text-sm">
                  Thank you for reaching out. A member of our team will respond within 24 hours.
                </p>
                <button onClick={() => setSent(false)} className="mt-10 btn-outline text-[11px]">
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form
                className="space-y-5"
                onSubmit={(e) => { e.preventDefault(); setSent(true) }}
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-[#1A1A1A]">Send a Message</h2>
                  <p className="text-[#AAAAAA] text-sm mt-1">We'll get back to you within 24 hours.</p>
                </div>

                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#1A1A1A] block">
                    Full Name <span className="text-[#D5001C]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="James Whitmore"
                    required
                    value={form.name}
                    onChange={(e) => set('name', e.target.value)}
                    className="w-full bg-[#F7F7F7] border border-transparent rounded-xl !px-5 !py-2 text-[#1A1A1A] text-base placeholder-[#CCCCCC] focus:outline-none focus:bg-white focus:border-[#1A1A1A] transition-all"
                  />
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#1A1A1A] block">
                      Email <span className="text-[#D5001C]">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="james@email.com"
                      required
                      value={form.email}
                      onChange={(e) => set('email', e.target.value)}
                      className="w-full bg-[#F7F7F7] border border-transparent rounded-xl !px-5 !py-2 text-[#1A1A1A] text-base placeholder-[#CCCCCC] focus:outline-none focus:bg-white focus:border-[#1A1A1A] transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#1A1A1A] block">
                      Phone
                    </label>
                    <input
                      type="tel"
                      placeholder="+44 7900 000000"
                      value={form.phone}
                      onChange={(e) => set('phone', e.target.value)}
                      className="w-full bg-[#F7F7F7] border border-transparent rounded-xl !px-5 !py-2 text-[#1A1A1A] text-base placeholder-[#CCCCCC] focus:outline-none focus:bg-white focus:border-[#1A1A1A] transition-all"
                    />
                  </div>
                </div>

                {/* Subject pills */}
                <div className="space-y-2.5">
                  <label className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#1A1A1A] block">
                    Subject
                  </label>
                  <div className="flex flex-wrap gap-2 !py-2">
                    {['General Enquiry', 'Test Drive', 'Finance', 'Specific Vehicle', 'Feedback'].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => set('subject', s)}
                        className={`!px-4  rounded-full text-[12px] font-semibold border transition-all !py-2 ${
                          form.subject === s
                            ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                            : 'bg-[#F7F7F7] text-[#6B6B6B] border-transparent hover:bg-white hover:border-[#CCCCCC] hover:text-[#1A1A1A]'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#1A1A1A] block">
                    Message <span className="text-[#D5001C]">*</span>
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Tell us how we can help..."
                    required
                    value={form.message}
                    onChange={(e) => set('message', e.target.value)}
                    className="w-full bg-[#F7F7F7] border border-transparent rounded-xl !px-5 py-4 text-[#1A1A1A] text-base placeholder-[#CCCCCC] focus:outline-none focus:bg-white focus:border-[#1A1A1A] resize-none transition-all"
                  />
                </div>

                <button type="submit" className="w-full flex items-center justify-center gap-2 bg-[#1A1A1A] hover:bg-[#D5001C] text-white font-bold tracking-[0.12em] uppercase text-[13px] !py-5 rounded-xl transition-colors duration-300 group">
                  Send Message
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}
          </div>

          {/* ── Info panel ── */}
          <div className="space-y-0 divide-y divide-[#E5E5E5] self-start">
            {/* Visit */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="p-6 flex gap-4 md:!py-3">
              <div className="w-10 h-10 bg-[#F7F7F7] flex items-center justify-center shrink-0">
                <MapPin size={17} className="text-[#1A1A1A]" />
              </div>
              <div>
                <p className="text-[#1A1A1A] font-semibold text-sm mb-2">Visit Us</p>
                <p className="text-[#6B6B6B] text-sm">14 Apex Drive, Mayfair</p>
                <p className="text-[#6B6B6B] text-sm">London, W1K 6AA</p>
                <p className="text-[#6B6B6B] text-sm">United Kingdom</p>
              </div>
            </motion.div>

            {/* Phone */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-6 flex gap-4 md:!py-3">
              <div className="w-10 h-10 bg-[#F7F7F7] flex items-center justify-center shrink-0">
                <Phone size={17} className="text-[#1A1A1A]" />
              </div>
              <div>
                <p className="text-[#1A1A1A] font-semibold text-sm mb-2">Call Us</p>
                <a href="tel:+442070000000" className="block text-[#6B6B6B] text-sm hover:text-[#1A1A1A] transition-colors">+44 (0) 20 7000 0000</a>
                <a href="tel:+447900000000" className="block text-[#6B6B6B] text-sm hover:text-[#1A1A1A] transition-colors">+44 (0) 7900 000 000</a>
                <p className="text-[#AAAAAA] text-xs mt-1">Mon–Sat 9am–7pm</p>
              </div>
            </motion.div>

            {/* Email */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="p-6 flex gap-4 md:!py-3">
              <div className="w-10 h-10 bg-[#F7F7F7] flex items-center justify-center shrink-0">
                <Mail size={17} className="text-[#1A1A1A]" />
              </div>
              <div>
                <p className="text-[#1A1A1A] font-semibold text-sm mb-2">Email Us</p>
                <a href="mailto:sales@apexmotors.co.uk" className="block text-[#6B6B6B] text-sm hover:text-[#1A1A1A] transition-colors">sales@apexmotors.co.uk</a>
                <a href="mailto:finance@apexmotors.co.uk" className="block text-[#6B6B6B] text-sm hover:text-[#1A1A1A] transition-colors">finance@apexmotors.co.uk</a>
                <a href="mailto:concierge@apexmotors.co.uk" className="block text-[#6B6B6B] text-sm hover:text-[#1A1A1A] transition-colors">concierge@apexmotors.co.uk</a>
              </div>
            </motion.div>

            {/* Hours */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-6 flex gap-4 md:!py-3">
              <div className="w-10 h-10 bg-[#F7F7F7] flex items-center justify-center shrink-0">
                <Clock size={17} className="text-[#1A1A1A]" />
              </div>
              <div>
                <p className="text-[#1A1A1A] font-semibold text-sm mb-2">Opening Hours</p>
                <p className="text-[#6B6B6B] text-sm">Monday – Friday: 9am – 7pm</p>
                <p className="text-[#6B6B6B] text-sm">Saturday: 9am – 6pm</p>
                <p className="text-[#6B6B6B] text-sm">Sunday: 11am – 4pm</p>
              </div>
            </motion.div>

            {/* Map */}
            <div className="h-48 bg-[#F0F0F0] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 29px, rgba(0,0,0,.06) 30px), repeating-linear-gradient(90deg, transparent, transparent 29px, rgba(0,0,0,.06) 30px)' }} />
              <div className="text-center relative z-10">
                <MapPin size={26} className="text-[#D5001C] mx-auto mb-2" />
                <p className="text-[#1A1A1A] text-sm font-semibold">14 Apex Drive, Mayfair</p>
                <p className="text-[#6B6B6B] text-xs mb-3">London, W1K 6AA</p>
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#D5001C] hover:underline">
                  Open in Maps →
                </a>
              </div>
            </div>

            {/* Socials */}
            <div className="p-10  md:!py-4">
              <p className="text-[#AAAAAA] text-[10px] tracking-[0.2em] uppercase font-semibold mb-4">Follow Us</p>
              <div className="grid grid-cols-2 gap-3">
                {socials.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="flex items-center gap-3 px-4 py-2.5 text-[#6B6B6B] hover:text-[#1A1A1A] hover:border-[#1A1A1A] transition-all group"
                  >
                    <Icon size={25} className="shrink-0" />
                    <span className="text-s font-medium">{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
