import { useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, PlusCircle, Edit2, Trash2, Star, CheckSquare, X, ChevronDown } from 'lucide-react'
import useCarStore from '../store/useCarStore'
import useToastStore from '../store/useToastStore'
import CarPlaceholder from '../components/CarPlaceholder'

const badgeColors = {
  NEW: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  CERTIFIED: 'text-green-400 bg-green-500/10 border-green-500/20',
  'HOT DEAL': 'text-[#E3000F] bg-[#E3000F]/10 border-[#E3000F]/20',
}

export default function CarListings() {
  const { cars, deleteCar, toggleFeatured, toggleSold } = useCarStore()
  const { addToast } = useToastStore()
  const [searchParams] = useSearchParams()

  const [search, setSearch] = useState('')
  const [tab, setTab] = useState(searchParams.get('filter') || 'all')
  const [selected, setSelected] = useState([])
  const [confirmDelete, setConfirmDelete] = useState(null)

  const filtered = useMemo(() => {
    let result = cars
    if (tab === 'available') result = result.filter((c) => !c.sold)
    if (tab === 'sold') result = result.filter((c) => c.sold)
    if (tab === 'featured') result = result.filter((c) => c.featured)
    if (search) {
      const q = search.toLowerCase()
      result = result.filter((c) => c.name.toLowerCase().includes(q) || c.make.toLowerCase().includes(q))
    }
    return result
  }, [cars, tab, search])

  const toggleSelect = (id) => {
    setSelected((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id])
  }
  const selectAll = () => setSelected(filtered.map((c) => c.id))
  const clearSelect = () => setSelected([])

  const handleDelete = (car) => setConfirmDelete(car)
  const confirmDel = () => {
    deleteCar(confirmDelete.id)
    addToast(`"${confirmDelete.name}" deleted`, 'error')
    setConfirmDelete(null)
    setSelected((s) => s.filter((x) => x !== confirmDelete.id))
  }

  const bulkDelete = () => {
    if (!selected.length) return
    if (window.confirm(`Delete ${selected.length} selected vehicles?`)) {
      selected.forEach((id) => deleteCar(id))
      addToast(`${selected.length} vehicles deleted`, 'error')
      setSelected([])
    }
  }

  const bulkSold = () => {
    selected.forEach((id) => {
      const car = cars.find((c) => c.id === id)
      if (car && !car.sold) toggleSold(id)
    })
    addToast(`${selected.length} vehicles marked as sold`, 'info')
    setSelected([])
  }

  const tabs = [
    { id: 'all', label: 'All', count: cars.length },
    { id: 'available', label: 'Available', count: cars.filter((c) => !c.sold).length },
    { id: 'sold', label: 'Sold', count: cars.filter((c) => c.sold).length },
    { id: 'featured', label: 'Featured', count: cars.filter((c) => c.featured).length },
  ]

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="bebas text-4xl text-white tracking-wider">Car Listings</h1>
        <Link
          to="/admin/cars/new"
          className="flex items-center gap-2 bg-[#E3000F] hover:bg-red-700 text-white text-xs font-semibold tracking-widest uppercase px-4 py-2.5 rounded-lg transition-colors"
        >
          <PlusCircle size={14} />
          Add New Car
        </Link>
      </div>

      {/* Tabs + search */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-5">
        <div className="flex bg-white/3 border border-white/8 rounded-xl p-1 gap-1">
          {tabs.map(({ id, label, count }) => (
            <button
              key={id}
              onClick={() => { setTab(id); clearSelect() }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all ${
                tab === id ? 'bg-[#E3000F] text-white' : 'text-white/40 hover:text-white'
              }`}
            >
              {label} <span className="opacity-60">({count})</span>
            </button>
          ))}
        </div>

        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" />
          <input
            type="text"
            placeholder="Search cars..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/3 border border-white/8 rounded-lg pl-9 pr-4 py-2.5 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#E3000F]/50"
          />
        </div>
      </div>

      {/* Bulk actions */}
      {selected.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 bg-[#E3000F]/10 border border-[#E3000F]/20 rounded-xl px-4 py-3 mb-4"
        >
          <span className="text-[#E3000F] text-sm font-medium">{selected.length} selected</span>
          <button onClick={bulkSold} className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs rounded-lg transition-colors">Mark as Sold</button>
          <button onClick={bulkDelete} className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs rounded-lg transition-colors">Delete Selected</button>
          <button onClick={clearSelect} className="ml-auto text-white/30 hover:text-white"><X size={14} /></button>
        </motion.div>
      )}

      {/* Table */}
      <div className="bg-[#111] border border-white/5 rounded-xl overflow-hidden">
        {/* Table head */}
        <div className="grid grid-cols-[40px_1fr_80px_100px_80px_90px_120px_130px] gap-3 px-4 py-3 border-b border-white/5 text-white/30 text-xs uppercase tracking-wider">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={selected.length === filtered.length && filtered.length > 0}
              onChange={selected.length === filtered.length ? clearSelect : selectAll}
              className="accent-[#E3000F] w-3.5 h-3.5"
            />
          </div>
          <span>Vehicle</span>
          <span>Year</span>
          <span>Price</span>
          <span>Type</span>
          <span>Status</span>
          <span>Featured</span>
          <span>Actions</span>
        </div>

        {/* Rows */}
        <div className="divide-y divide-white/3">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-white/20">No vehicles found</div>
          ) : (
            filtered.map((car, i) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.02 }}
                className="grid grid-cols-[40px_1fr_80px_100px_80px_90px_120px_130px] gap-3 px-4 py-3 items-center hover:bg-white/2 transition-colors"
              >
                {/* Checkbox */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selected.includes(car.id)}
                    onChange={() => toggleSelect(car.id)}
                    className="accent-[#E3000F] w-3.5 h-3.5"
                  />
                </div>

                {/* Name */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-8 rounded-md overflow-hidden shrink-0 bg-[#1a1a1a]">
                    {car.images?.[0] ? (
                      <img src={car.images[0]} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <CarPlaceholder make={car.make} category={car.category} />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-white text-sm font-medium truncate">{car.name}</p>
                    <p className="text-white/25 text-xs truncate">{car.make}</p>
                  </div>
                  {car.badge && car.badge !== 'None' && (
                    <span className={`hidden lg:inline text-[10px] px-1.5 py-0.5 rounded-full border tracking-wider shrink-0 ${badgeColors[car.badge] || ''}`}>
                      {car.badge}
                    </span>
                  )}
                </div>

                {/* Year */}
                <span className="text-white/50 text-sm">{car.year}</span>

                {/* Price */}
                <span className="text-[#E3000F] text-sm font-semibold">${(car.price / 1000).toFixed(0)}k</span>

                {/* Category */}
                <span className="text-white/40 text-xs truncate">{car.category}</span>

                {/* Status */}
                <button
                  onClick={() => { toggleSold(car.id); addToast(car.sold ? `${car.name} marked available` : `${car.name} marked sold`, 'info') }}
                  className={`text-xs px-2 py-1 rounded-full border transition-all ${
                    car.sold
                      ? 'text-white/30 border-white/10 bg-white/3 hover:border-white/30'
                      : 'text-green-400 border-green-500/30 bg-green-500/8 hover:border-green-500'
                  }`}
                >
                  {car.sold ? 'Sold' : 'Available'}
                </button>

                {/* Featured */}
                <button
                  onClick={() => { toggleFeatured(car.id); addToast(car.featured ? 'Removed from featured' : 'Added to featured', 'info') }}
                  className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border transition-all ${
                    car.featured
                      ? 'text-yellow-400 border-yellow-500/30 bg-yellow-500/8'
                      : 'text-white/25 border-white/8 hover:text-yellow-400 hover:border-yellow-500/30'
                  }`}
                >
                  <Star size={11} fill={car.featured ? 'currentColor' : 'none'} />
                  {car.featured ? 'Featured' : 'Feature'}
                </button>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Link
                    to={`/admin/cars/edit/${car.id}`}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-white text-xs transition-all"
                  >
                    <Edit2 size={11} /> Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(car)}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-red-500/15 text-white/40 hover:text-red-400 text-xs transition-all"
                  >
                    <Trash2 size={11} /> Del
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Delete confirmation modal */}
      <AnimatePresence>
        {confirmDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setConfirmDelete(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#111] border border-white/10 rounded-2xl p-8 max-w-sm w-full"
            >
              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-5">
                <Trash2 size={20} className="text-red-400" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Delete Vehicle</h3>
              <p className="text-white/45 text-sm mb-6">
                Are you sure you want to delete <strong className="text-white">"{confirmDelete.name}"</strong>? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="flex-1 py-2.5 border border-white/10 rounded-lg text-white/50 hover:text-white text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDel}
                  className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 rounded-lg text-white text-sm font-medium transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
