import { useState, useMemo } from 'react'
import { Calculator, TrendingUp } from 'lucide-react'

export default function LoanCalculator() {
  const [values, setValues] = useState({
    price: 120000,
    down: 20000,
    rate: 6.9,
    term: 60,
  })

  const set = (key, val) => setValues((v) => ({ ...v, [key]: Number(val) }))

  const { monthly, totalInterest, totalCost } = useMemo(() => {
    const principal = values.price - values.down
    if (principal <= 0) return { monthly: 0, totalInterest: 0, totalCost: values.down }
    const monthlyRate = values.rate / 100 / 12
    const n = values.term
    if (monthlyRate === 0) {
      const m = principal / n
      return { monthly: m, totalInterest: 0, totalCost: values.price }
    }
    const m = principal * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1)
    const total = m * n + values.down
    const interest = total - values.price
    return { monthly: m, totalInterest: interest, totalCost: total }
  }, [values])

  const fmt = (n) => Math.round(n).toLocaleString()

  return (
    <div className="glass border border-white/8 rounded-2xl p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-[#E3000F]/10 flex items-center justify-center">
          <Calculator size={20} className="text-[#E3000F]" />
        </div>
        <div>
          <h3 className="text-white font-semibold text-lg">Finance Calculator</h3>
          <p className="text-white/35 text-xs">Estimate your monthly payments</p>
        </div>
      </div>

      <div className="space-y-6">
        {[
          { key: 'price', label: 'Vehicle Price', prefix: '$', min: 10000, max: 500000, step: 1000, suffix: '' },
          { key: 'down', label: 'Down Payment', prefix: '$', min: 0, max: values.price, step: 1000, suffix: '' },
          { key: 'rate', label: 'Interest Rate', prefix: '', min: 1, max: 25, step: 0.1, suffix: '%' },
          { key: 'term', label: 'Loan Term', prefix: '', min: 12, max: 84, step: 12, suffix: ' months' },
        ].map(({ key, label, prefix, min, max, step, suffix }) => (
          <div key={key}>
            <div className="flex justify-between mb-2">
              <label className="text-white/50 text-sm">{label}</label>
              <span className="text-white font-semibold text-sm">
                {prefix}{fmt(values[key])}{suffix}
              </span>
            </div>
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={values[key]}
              onChange={(e) => set(key, e.target.value)}
              className="w-full accent-[#E3000F] h-1.5 cursor-pointer"
            />
            <div className="flex justify-between text-white/20 text-xs mt-1">
              <span>{prefix}{fmt(min)}{suffix}</span>
              <span>{prefix}{fmt(max)}{suffix}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Results */}
      <div className="mt-8 bg-[#E3000F]/8 border border-[#E3000F]/20 rounded-xl p-5">
        <div className="text-center mb-4">
          <p className="text-white/40 text-xs tracking-widest uppercase mb-1">Estimated Monthly Payment</p>
          <p className="bebas text-6xl text-[#E3000F]">${fmt(monthly)}</p>
        </div>
        <div className="grid grid-cols-3 gap-3 text-center border-t border-white/5 pt-4">
          {[
            { label: 'Loan Amount', value: `$${fmt(values.price - values.down)}` },
            { label: 'Total Interest', value: `$${fmt(totalInterest)}` },
            { label: 'Total Cost', value: `$${fmt(totalCost)}` },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-white/30 text-xs mb-1">{label}</p>
              <p className="text-white font-medium text-sm">{value}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="text-white/20 text-xs mt-4 text-center leading-relaxed">
        For illustration purposes only. Actual rates subject to credit approval.
        Contact our finance team for a personalised quote.
      </p>
    </div>
  )
}
