import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react'
import LoanCalculator from '../components/LoanCalculator'

const tiers = [
  {
    name: 'Standard Finance',
    rate: 'From 6.9% APR',
    desc: 'Competitive rates for all approved customers. Fixed monthly payments for the full term.',
    features: ['Terms from 24–60 months', 'Fixed monthly repayments', '10% minimum deposit', 'Decision within 2 hours', 'No early repayment fee'],
    highlight: false,
  },
  {
    name: 'Elite Finance',
    rate: 'From 4.9% APR',
    desc: 'Our premium product for exceptional credit profiles. The most flexible terms we offer.',
    features: ['Terms from 24–84 months', 'Flexible repayment structure', '5% minimum deposit', 'Instant decision', 'Free early repayment', 'Dedicated account manager'],
    highlight: true,
  },
  {
    name: 'PCP Arrangement',
    rate: 'From 5.9% APR',
    desc: 'Lower monthly payments with a final balloon payment option. Keep, return, or trade in.',
    features: ['Lower monthly payments', 'Guaranteed future value', 'Flexibility at contract end', 'Mileage options available', 'Wear & tear protection'],
    highlight: false,
  },
]

const faqs = [
  {
    q: 'How long does finance approval take?',
    a: 'Most finance applications receive a decision within 2–4 hours during business hours. Our Elite Finance product offers near-instant decisions. We\'ll call you as soon as your application is assessed.',
  },
  {
    q: 'What credit score do I need?',
    a: 'We work with a range of lenders to accommodate various credit profiles. While a stronger credit history will unlock our best rates, we have solutions for most situations. We recommend applying to find out your personalised rate.',
  },
  {
    q: 'Can I pay off my finance early?',
    a: 'Yes, absolutely. All our finance products allow early repayment. Standard and Elite Finance have no early repayment charges. PCP arrangements may have a small administrative fee — your account manager will clarify this upfront.',
  },
  {
    q: 'What documents do I need to apply?',
    a: 'You\'ll need proof of identity (passport or driving licence), proof of address (utility bill or bank statement from the last 3 months), and 3 months\' bank statements. Employed applicants should also provide their last 3 payslips.',
  },
  {
    q: 'Is finance available on all vehicles?',
    a: 'Finance is available on the vast majority of our vehicles. A small number of heavily discounted or trade-in listings may be cash-only. Your sales representative will confirm this during the consultation.',
  },
]

export default function Financing() {
  const [openFaq, setOpenFaq] = useState(null)
  const [formSent, setFormSent] = useState(false)

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-28">
      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-6 py-12 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-[#E3000F] text-xs tracking-[0.4em] uppercase font-medium mb-4">Flexible Finance Solutions</p>
          <h1 className="bebas text-6xl md:text-8xl text-white mb-4">Drive Now.</h1>
          <h1 className="bebas text-6xl md:text-8xl text-[#E3000F] mb-6">Pay Smart.</h1>
          <p className="text-white/45 text-lg max-w-xl mx-auto leading-relaxed">
            Bespoke finance packages tailored to your life. Competitive rates, transparent terms,
            and a team that puts you first — every time.
          </p>
        </motion.div>
      </div>

      {/* Calculator + Tiers */}
      <div className="max-w-[1400px] mx-auto px-6 pb-20">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 mb-20">
          <LoanCalculator />
          <div className="space-y-4">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-xl border p-6 transition-all ${
                  tier.highlight
                    ? 'border-[#E3000F]/40 bg-[#E3000F]/5'
                    : 'glass border-white/8'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-white font-semibold text-lg">{tier.name}</h3>
                    <p className="text-[#E3000F] font-bold text-sm">{tier.rate}</p>
                  </div>
                  {tier.highlight && (
                    <span className="text-[10px] bg-[#E3000F] text-white px-2 py-1 rounded-full tracking-widest uppercase">
                      Most Popular
                    </span>
                  )}
                </div>
                <p className="text-white/40 text-sm mb-4">{tier.desc}</p>
                <ul className="space-y-2">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-white/60">
                      <CheckCircle size={13} className="text-green-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto mb-20">
          <h2 className="bebas text-4xl text-white text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="glass border border-white/8 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                >
                  <span className="text-white font-medium text-sm">{faq.q}</span>
                  {openFaq === i
                    ? <ChevronUp size={16} className="text-[#E3000F] shrink-0" />
                    : <ChevronDown size={16} className="text-white/30 shrink-0" />
                  }
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="text-white/50 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Apply form */}
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="bebas text-4xl text-white mb-2">Ready to Apply?</h2>
            <p className="text-white/40 text-sm">Complete the form below and our finance team will be in touch within 2 hours.</p>
          </div>
          {formSent ? (
            <div className="glass border border-green-500/30 rounded-2xl p-10 text-center">
              <CheckCircle size={40} className="text-green-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold text-xl mb-2">Application Received</h3>
              <p className="text-white/40 text-sm">Our finance team will call you within 2 business hours.</p>
            </div>
          ) : (
            <form
              className="glass border border-white/8 rounded-2xl p-8 space-y-4"
              onSubmit={(e) => { e.preventDefault(); setFormSent(true) }}
            >
              <div className="grid grid-cols-2 gap-4">
                {[
                  { id: 'fname', label: 'First Name', type: 'text' },
                  { id: 'lname', label: 'Last Name', type: 'text' },
                  { id: 'email', label: 'Email Address', type: 'email' },
                  { id: 'phone', label: 'Phone Number', type: 'tel' },
                ].map(({ id, label, type }) => (
                  <div key={id}>
                    <label className="text-white/40 text-xs tracking-wider uppercase block mb-1.5">{label}</label>
                    <input
                      type={type}
                      required
                      className="w-full bg-black/40 border border-white/8 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#E3000F]/50 placeholder-white/20"
                    />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-white/40 text-xs tracking-wider uppercase block mb-1.5">Finance Product</label>
                  <select className="w-full bg-black/40 border border-white/8 rounded-lg px-4 py-2.5 text-white/70 text-sm focus:outline-none focus:border-[#E3000F]/50">
                    <option>Standard Finance</option>
                    <option>Elite Finance</option>
                    <option>PCP Arrangement</option>
                  </select>
                </div>
                <div>
                  <label className="text-white/40 text-xs tracking-wider uppercase block mb-1.5">Vehicle Budget</label>
                  <select className="w-full bg-black/40 border border-white/8 rounded-lg px-4 py-2.5 text-white/70 text-sm focus:outline-none focus:border-[#E3000F]/50">
                    <option>Under £50,000</option>
                    <option>£50,000 – £100,000</option>
                    <option>£100,000 – £200,000</option>
                    <option>£200,000+</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-[#E3000F] hover:bg-red-700 text-white font-semibold tracking-widest uppercase text-sm py-4 rounded-lg transition-colors flex items-center justify-center gap-2 group"
              >
                Submit Finance Enquiry
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
