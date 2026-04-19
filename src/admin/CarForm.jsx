import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Save, X, Trash2, Image, CheckCircle } from 'lucide-react'
import useCarStore from '../store/useCarStore'
import useToastStore from '../store/useToastStore'
import CarPlaceholder from '../components/CarPlaceholder'

const FEATURES = [
  'Sunroof', 'Heated Seats', 'Leather Seats', 'Apple CarPlay', 'Android Auto',
  'Backup Camera', 'Blind Spot Monitor', 'Lane Assist', 'Adaptive Cruise',
  'Night Vision', 'Harman Kardon', 'Bang & Olufsen', 'Panoramic Roof',
  'Ventilated Seats', 'Head-Up Display', 'Park Assist', '360 Camera',
  'Wireless Charging', 'Ambient Lighting', 'Performance Package',
]

const years = Array.from({ length: 12 }, (_, i) => 2026 - i)

const emptyForm = {
  name: '', make: '', model: '', year: 2025, price: '', originalPrice: '',
  mileage: '', category: 'Sedan', fuel: 'Petrol', transmission: 'Automatic',
  drivetrain: 'AWD', color: '', vin: '', engine: '', horsepower: '', torque: '',
  acceleration: '', topSpeed: '', mpg: '', badge: 'None',
  featured: false, sold: false, description: '',
  features: [],
  images: ['', '', '', ''],
}

export default function CarForm({ mode = 'add' }) {
  const navigate = useNavigate()
  const { id } = useParams()
  const { addCar, updateCar, deleteCar, getCarById } = useCarStore()
  const { addToast } = useToastStore()

  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [confirmDel, setConfirmDel] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (mode === 'edit' && id) {
      const car = getCarById(id)
      if (car) {
        setForm({
          ...emptyForm,
          ...car,
          originalPrice: car.originalPrice || '',
          images: car.images?.length ? [...car.images, ...['', '', '', '']].slice(0, 4) : ['', '', '', ''],
        })
      }
    }
  }, [mode, id])

  const set = (key, val) => {
    setForm((f) => ({ ...f, [key]: val }))
    setErrors((e) => ({ ...e, [key]: '' }))
  }

  const toggleFeature = (feat) => {
    setForm((f) => ({
      ...f,
      features: f.features.includes(feat)
        ? f.features.filter((x) => x !== feat)
        : [...f.features, feat],
    }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.make.trim()) e.make = 'Make is required'
    if (!form.model.trim()) e.model = 'Model is required'
    if (!form.price || isNaN(Number(form.price))) e.price = 'Valid price is required'
    if (!form.mileage || isNaN(Number(form.mileage))) e.mileage = 'Valid mileage is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    if (e) e.preventDefault()
    if (!validate()) return
    setSaving(true)

    const data = {
      ...form,
      year: Number(form.year),
      price: Number(form.price),
      originalPrice: form.originalPrice ? Number(form.originalPrice) : null,
      mileage: Number(form.mileage),
      horsepower: form.horsepower ? Number(form.horsepower) : null,
    }

    if (mode === 'edit') {
      await updateCar(Number(id), data)
      addToast(`"${data.name}" updated successfully`, 'success')
    } else {
      await addCar(data)
      addToast(`"${data.name}" added to inventory`, 'success')
    }
    setSaving(false)
    navigate('/admin/cars')
  }

  const handleDelete = async () => {
    await deleteCar(Number(id))
    addToast(`Vehicle deleted`, 'error')
    navigate('/admin/cars')
  }

  const field = (key, label, type = 'text', placeholder = '', required = false) => (
    <div>
      <label className="text-white/40 text-xs tracking-wider uppercase block mb-1.5">
        {label}{required && <span className="text-[#E3000F] ml-1">*</span>}
      </label>
      <input
        type={type}
        value={form[key]}
        onChange={(e) => set(key, e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-black/40 border rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none transition-colors placeholder-white/20 ${
          errors[key] ? 'border-red-500/60' : 'border-white/8 focus:border-[#E3000F]/50'
        }`}
      />
      {errors[key] && <p className="text-red-400 text-xs mt-1">{errors[key]}</p>}
    </div>
  )

  const selectField = (key, label, options, required = false) => (
    <div>
      <label className="text-white/40 text-xs tracking-wider uppercase block mb-1.5">
        {label}{required && <span className="text-[#E3000F] ml-1">*</span>}
      </label>
      <select
        value={form[key]}
        onChange={(e) => set(key, e.target.value)}
        className="w-full bg-black/40 border border-white/8 rounded-lg px-4 py-2.5 text-white/80 text-sm focus:outline-none focus:border-[#E3000F]/50"
      >
        {options.map((opt) => (
          typeof opt === 'string'
            ? <option key={opt} value={opt}>{opt}</option>
            : <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  )

  const previewImg = form.images[0]?.trim()

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="bebas text-4xl text-white tracking-wider">
          {mode === 'edit' ? 'Edit Vehicle' : 'Add New Vehicle'}
        </h1>
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/admin/cars')}
            className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-lg text-white/40 hover:text-white text-sm transition-colors"
          >
            <X size={14} /> Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-[#E3000F] hover:bg-red-700 disabled:opacity-60 rounded-lg text-white text-sm font-medium transition-colors"
          >
            <Save size={14} />
            {saving ? 'Saving...' : mode === 'edit' ? 'Update Listing' : 'Save Listing'}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-[1fr_300px] gap-6">
        {/* Main form */}
        <div className="space-y-6">
          {/* Basic Info */}
          <section className="bg-[#111] border border-white/5 rounded-xl p-6">
            <h2 className="text-white font-semibold text-sm mb-5 uppercase tracking-widest">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {field('name', 'Listing Name', 'text', 'e.g. BMW M5 Competition', true)}
              {field('make', 'Make', 'text', 'e.g. BMW', true)}
              {field('model', 'Model', 'text', 'e.g. M5 Competition', true)}
              {selectField('year', 'Year', years.map(String), true)}
              {field('price', 'Price (USD)', 'number', '120000', true)}
              {field('originalPrice', 'Original Price (optional)', 'number', 'e.g. 145000')}
              {field('mileage', 'Mileage (miles)', 'number', 'e.g. 1500', true)}
              {field('color', 'Color', 'text', 'e.g. Frozen Black')}
              {field('vin', 'VIN Number', 'text', 'e.g. WBS83CH0XPB123456')}
            </div>
          </section>

          {/* Specs */}
          <section className="bg-[#111] border border-white/5 rounded-xl p-6">
            <h2 className="text-white font-semibold text-sm mb-5 uppercase tracking-widest">Performance Specs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {field('engine', 'Engine', 'text', 'e.g. 4.4L twin-turbo V8')}
              {field('horsepower', 'Horsepower (hp)', 'number', 'e.g. 617')}
              {field('torque', 'Torque', 'text', 'e.g. 553 lb-ft')}
              {field('acceleration', '0–60 mph', 'text', 'e.g. 3.1s')}
              {field('topSpeed', 'Top Speed', 'text', 'e.g. 190 mph')}
              {field('mpg', 'Fuel Economy / Range', 'text', 'e.g. 17/23 or 348mi')}
            </div>
          </section>

          {/* Details */}
          <section className="bg-[#111] border border-white/5 rounded-xl p-6">
            <h2 className="text-white font-semibold text-sm mb-5 uppercase tracking-widest">Vehicle Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectField('category', 'Body Type', ['Sedan', 'SUV', 'Sports', 'Coupe', 'Convertible', 'Truck', 'Electric', 'Luxury'], true)}
              {selectField('fuel', 'Fuel Type', ['Petrol', 'Diesel', 'Electric', 'Hybrid'], true)}
              {selectField('transmission', 'Transmission', ['Automatic', 'Manual', 'CVT', 'DCT'])}
              {selectField('drivetrain', 'Drivetrain', ['FWD', 'RWD', 'AWD', '4WD'])}
            </div>
          </section>

          {/* Listing Options */}
          <section className="bg-[#111] border border-white/5 rounded-xl p-6">
            <h2 className="text-white font-semibold text-sm mb-5 uppercase tracking-widest">Listing Options</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {selectField('badge', 'Badge', ['None', 'NEW', 'CERTIFIED', 'HOT DEAL'])}
            </div>
            <div className="flex gap-6">
              {[
                { key: 'featured', label: 'Mark as Featured', desc: 'Shows on homepage' },
                { key: 'sold', label: 'Mark as Sold', desc: 'Hidden from available' },
              ].map(({ key, label, desc }) => (
                <label key={key} className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={form[key]}
                    onChange={(e) => set(key, e.target.checked)}
                    className="accent-[#E3000F] w-4 h-4 mt-0.5"
                  />
                  <div>
                    <p className="text-white text-sm font-medium">{label}</p>
                    <p className="text-white/30 text-xs">{desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </section>

          {/* Features */}
          <section className="bg-[#111] border border-white/5 rounded-xl p-6">
            <h2 className="text-white font-semibold text-sm mb-5 uppercase tracking-widest">Features & Equipment</h2>
            <div className="flex flex-wrap gap-2">
              {FEATURES.map((feat) => (
                <button
                  key={feat}
                  type="button"
                  onClick={() => toggleFeature(feat)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                    form.features.includes(feat)
                      ? 'bg-[#E3000F]/15 border-[#E3000F]/40 text-[#E3000F]'
                      : 'bg-white/3 border-white/8 text-white/40 hover:text-white hover:border-white/30'
                  }`}
                >
                  {form.features.includes(feat) && <CheckCircle size={11} />}
                  {feat}
                </button>
              ))}
            </div>
          </section>

          {/* Images */}
          <section className="bg-[#111] border border-white/5 rounded-xl p-6">
            <h2 className="text-white font-semibold text-sm mb-5 uppercase tracking-widest">Images</h2>
            <div className="grid grid-cols-2 gap-4">
              {form.images.map((url, i) => (
                <div key={i}>
                  <label className="text-white/30 text-xs tracking-wider uppercase block mb-1.5">
                    Image {i + 1}{i === 0 && ' (Main)'}
                  </label>
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => {
                      const imgs = [...form.images]
                      imgs[i] = e.target.value
                      set('images', imgs)
                    }}
                    placeholder="https://... or /images/car.jpg"
                    className="w-full bg-black/40 border border-white/8 rounded-lg px-4 py-2.5 text-white/70 text-sm focus:outline-none focus:border-[#E3000F]/50 placeholder-white/15"
                  />
                  {url?.trim() && (
                    <div className="mt-2 h-16 rounded-lg overflow-hidden border border-white/8">
                      <img
                        src={url}
                        alt=""
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.style.display = 'none' }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Description */}
          <section className="bg-[#111] border border-white/5 rounded-xl p-6">
            <h2 className="text-white font-semibold text-sm mb-5 uppercase tracking-widest">Description</h2>
            <textarea
              rows={5}
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              placeholder="Write a compelling description of this vehicle..."
              className="w-full bg-black/40 border border-white/8 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#E3000F]/50 resize-none placeholder-white/20"
            />
          </section>

          {/* Delete (edit mode only) */}
          {mode === 'edit' && (
            <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-5">
              <h3 className="text-red-400 font-medium text-sm mb-1">Danger Zone</h3>
              <p className="text-white/30 text-xs mb-4">Permanently delete this vehicle from the inventory. This cannot be undone.</p>
              <button
                type="button"
                onClick={() => setConfirmDel(true)}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-400 text-sm rounded-lg transition-colors"
              >
                <Trash2 size={14} />
                Delete This Listing
              </button>
            </div>
          )}
        </div>

        {/* Preview sidebar */}
        <div className="space-y-4">
          <div className="sticky top-24">
            <div className="bg-[#111] border border-white/5 rounded-xl p-4">
              <p className="text-white/30 text-xs tracking-widest uppercase mb-4">Live Preview</p>
              {/* Mini card preview */}
              <div className="glass border border-white/8 rounded-xl overflow-hidden">
                <div className="h-36 bg-[#1a1a1a] relative overflow-hidden">
                  {previewImg ? (
                    <img src={previewImg} alt="" className="w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} />
                  ) : (
                    <CarPlaceholder make={form.make || 'A'} category={form.category} />
                  )}
                  {form.badge && form.badge !== 'None' && (
                    <div className="absolute top-2 left-2 bg-[#E3000F]/20 border border-[#E3000F]/40 text-[#E3000F] text-[10px] px-2 py-0.5 rounded-full tracking-widest">
                      {form.badge}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-white/30 text-xs">{form.make || 'Make'}</p>
                  <p className="text-white font-semibold text-sm">{form.name || 'Vehicle Name'}</p>
                  <p className="text-[#E3000F] font-bold mt-2">
                    {form.price ? `$${Number(form.price).toLocaleString()}` : '$0'}
                  </p>
                  {form.originalPrice && (
                    <p className="text-white/20 text-xs line-through">${Number(form.originalPrice).toLocaleString()}</p>
                  )}
                  <div className="flex gap-2 mt-3">
                    {form.featured && <span className="text-[10px] text-yellow-400 border border-yellow-500/30 px-2 py-0.5 rounded-full">Featured</span>}
                    {form.sold && <span className="text-[10px] text-white/30 border border-white/15 px-2 py-0.5 rounded-full">Sold</span>}
                  </div>
                </div>
              </div>

              {/* Quick stats */}
              {form.horsepower && (
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {[
                    { label: 'HP', value: form.horsepower },
                    { label: '0-60', value: form.acceleration || '—' },
                    { label: 'Top Speed', value: form.topSpeed || '—' },
                    { label: 'Drivetrain', value: form.drivetrain },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-white/3 border border-white/5 rounded-lg p-2 text-center">
                      <p className="text-white/25 text-[10px] mb-0.5">{label}</p>
                      <p className="text-white text-xs font-medium">{value}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Features selected count */}
            {form.features.length > 0 && (
              <div className="bg-[#111] border border-white/5 rounded-xl p-4">
                <p className="text-white/30 text-xs uppercase tracking-widest mb-3">Selected Features ({form.features.length})</p>
                <div className="flex flex-wrap gap-1.5">
                  {form.features.map((f) => (
                    <span key={f} className="text-[10px] bg-[#E3000F]/10 border border-[#E3000F]/20 text-[#E3000F] px-2 py-0.5 rounded-full">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={saving}
              className="w-full bg-[#E3000F] hover:bg-red-700 disabled:opacity-60 text-white font-semibold tracking-widest uppercase text-sm py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Save size={16} />
              {saving ? 'Saving...' : mode === 'edit' ? 'Update Listing' : 'Save Listing'}
            </button>
          </div>
        </div>
      </form>

      {/* Delete confirm */}
      {confirmDel && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-[#111] border border-white/10 rounded-2xl p-8 max-w-sm w-full"
          >
            <h3 className="text-white font-semibold text-lg mb-2">Delete Vehicle</h3>
            <p className="text-white/45 text-sm mb-6">This will permanently remove this vehicle from the inventory.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDel(false)} className="flex-1 py-2.5 border border-white/10 rounded-lg text-white/50 text-sm">Cancel</button>
              <button onClick={handleDelete} className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 rounded-lg text-white text-sm font-medium transition-colors">Delete</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
