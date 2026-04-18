import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail } from 'lucide-react'
import { InstagramIcon, TwitterIcon, YoutubeIcon, FacebookIcon } from './SocialIcons'

const footerLinks = {
  Inventory: [
    { label: 'All Vehicles', path: '/inventory' },
    { label: 'Sports Cars', path: '/inventory' },
    { label: 'SUVs', path: '/inventory' },
    { label: 'Electric', path: '/inventory' },
    { label: 'Luxury', path: '/inventory' },
  ],
  Services: [
    { label: 'Book Test Drive', path: '/contact' },
    { label: 'Vehicle Appraisal', path: '/contact' },
    { label: 'Extended Warranty', path: '/contact' },
    { label: 'Concierge Service', path: '/contact' },
  ],
  Company: [
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },
    { label: 'Careers', path: '/contact' },
    { label: 'Admin Panel', path: '/admin/login' },
  ],
}

const socials = [
  { icon: InstagramIcon, href: '#', label: 'Instagram' },
  { icon: TwitterIcon, href: '#', label: 'Twitter' },
  { icon: YoutubeIcon, href: '#', label: 'YouTube' },
  { icon: FacebookIcon, href: '#', label: 'Facebook' },
]

export default function Footer() {
  return (
    <footer className="bg-[#0D0D0D]">

      {/* Main content */}
      
      <div className="wrap !py-4 md:!py-8"> 
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[2fr_1fr_1fr_1fr] gap-12 xl:gap-16">

          {/* Brand column */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 bg-white flex items-center justify-center shrink-0">
                <span className="bebas text-[#1A1A1A] text-lg leading-none">A</span>
              </div>
              <div className="leading-none">
                <span className="bebas text-white text-xl tracking-[0.15em]">APEX</span>
                <span className="bebas text-[#D5001C] text-xl tracking-[0.15em] ml-1.5">MOTORS</span>
              </div>
            </Link>

            <p className="text-white/40 text-sm leading-relaxed mb-8 max-w-[280px]">
              Curating the world's finest performance and luxury automobiles since 2009. We don't just sell cars — we deliver experiences.
            </p>

            {/* Contact quick info */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3">
                <MapPin size={13} className="text-[#D5001C] shrink-0" />
                <span className="text-white/40 text-sm">14 Apex Drive, Mayfair, London W1K 6AA</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={13} className="text-[#D5001C] shrink-0" />
                <a href="tel:+442070000000" className="text-white/40 text-sm hover:text-white transition-colors">+44 (0) 20 7000 0000</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={13} className="text-[#D5001C] shrink-0" />
                <a href="mailto:sales@apexmotors.co.uk" className="text-white/40 text-sm hover:text-white transition-colors">sales@apexmotors.co.uk</a>
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:border-white/40 transition-all"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <p className="text-white text-[11px] font-bold tracking-[0.2em] uppercase mb-6">{section}</p>
              <ul className="space-y-3.5">
                {links.map(({ label, path }) => (
                  <li key={label}>
                    <Link
                      to={path}
                      className="text-white/40 hover:text-white text-sm transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>


      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="wrap py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs text-center sm:text-left">
            © 2026 Apex Motors Ltd. All rights reserved. Registered in England & Wales.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Use', 'Cookie Policy'].map((item) => (
              <a key={item} href="#" className="text-white/25 hover:text-white/60 text-xs transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
