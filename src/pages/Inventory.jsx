import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import useCarStore from '../store/useCarStore'
import CarCard from '../components/CarCard'
import CarPlaceholder from '../components/CarPlaceholder'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const ITEMS_PER_PAGE = 9

function ListCarCard({ car, index }) {
  const hasImage = car.images && car.images[0] && car.images[0].trim() !== ''
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="group flex bg-white border-b border-[#E5E5E5] py-6 gap-6 hover:bg-[#FAFAFA] transition-colors"
    >
      <div className="w-44 h-28 shrink-0 relative overflow-hidden bg-[#F0F0F0]">
        {hasImage ? (
          <img src={car.images[0]} alt={car.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        ) : (
          <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-700">
            <CarPlaceholder make={car.make} category={car.category} />
          </div>
        )}
        {car.sold && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="bebas text-[#1A1A1A]/40 text-lg tracking-widest border-2 border-[#1A1A1A]/20 px-3 py-1 rotate-[-8deg]">SOLD</span>
          </div>
        )}
      </div>
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[#AAAAAA] text-[10px] tracking-[0.25em] uppercase font-semibold mb-0.5">{car.make} · {car.year}</p>
            <p className="text-[#1A1A1A] font-semibold text-lg leading-snug">{car.name}</p>
          </div>
          <p className="text-[#1A1A1A] font-bold text-lg shrink-0">${car.price?.toLocaleString()}</p>
        </div>
        <div className="flex items-center gap-4 mt-2">
          <span className="text-[#6B6B6B] text-sm">{car.mileage?.toLocaleString()} mi</span>
          <span className="w-px h-3 bg-[#E5E5E5]" />
          <span className="text-[#6B6B6B] text-sm">{car.horsepower} hp</span>
          <span className="w-px h-3 bg-[#E5E5E5]" />
          <span className="text-[#6B6B6B] text-sm">{car.transmission}</span>
          <span className="w-px h-3 bg-[#E5E5E5]" />
          <span className="text-[#6B6B6B] text-sm">{car.fuel}</span>
          <Link to={`/inventory/${car.id}`} className="ml-auto flex items-center gap-1.5 text-[12px] font-semibold tracking-[0.1em] uppercase text-[#1A1A1A] hover:text-[#D5001C] transition-colors group/btn">
            View <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default function Inventory() {
  const { cars } = useCarStore()
  const [view, setView] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [page, setPage] = useState(1)

  const [filters, setFilters] = useState({
    search: '',
    make: '',
    category: '',
    fuel: '',
    minPrice: 0,
    maxPrice: 500000,
    maxMileage: 200000,
    transmission: '',
    sort: 'newest',
    showSold: false,
  })

  const setFilter = (key, val) => {
    setFilters((f) => ({ ...f, [key]: val }))
    setPage(1)
  }

  const makes = [...new Set(cars.map((c) => c.make))].sort()
  const categories = [...new Set(cars.map((c) => c.category))].sort()

  const filtered = useMemo(() => {
    let result = cars.filter((car) => {
      if (!filters.showSold && car.sold) return false
      if (filters.make && car.make !== filters.make) return false
      if (filters.category && car.category !== filters.category) return false
      if (filters.fuel && car.fuel !== filters.fuel) return false
      if (filters.transmission && car.transmission !== filters.transmission) return false
      if (car.price < filters.minPrice || car.price > filters.maxPrice) return false
      if (car.mileage > filters.maxMileage) return false
      if (filters.search) {
        const q = filters.search.toLowerCase()
        return (
          car.name.toLowerCase().includes(q) ||
          car.make.toLowerCase().includes(q) ||
          car.model.toLowerCase().includes(q)
        )
      }
      return true
    })

    switch (filters.sort) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break
      case 'price-desc': result.sort((a, b) => b.price - a.price); break
      case 'newest': result.sort((a, b) => b.year - a.year); break
      case 'oldest': result.sort((a, b) => a.year - b.year); break
      case 'mileage': result.sort((a, b) => a.mileage - b.mileage); break
      default: break
    }

    return result
  }, [cars, filters])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const activeFilterCount = [
    filters.make, filters.category, filters.fuel, filters.transmission,
    filters.maxPrice < 500000, filters.maxMileage < 200000, filters.showSold,
  ].filter(Boolean).length

  const clearFilters = () => {
    setFilters({
      search: '', make: '', category: '', fuel: '',
      minPrice: 0, maxPrice: 500000, maxMileage: 200000,
      transmission: '', sort: 'newest', showSold: false,
    })
    setPage(1)
  }

  return (
    <div className="min-h-screen bg-white  md:!py-15">
      {/* Header */}
      <div className="relative mt-16 pt-16 md:pt-24 pb-14 bg-[#0f0f0f] overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0000] via-[#0f0f0f] to-[#0a0a0a]" />
        {/* Static glow */}
        <div className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #D5001C 0%, transparent 70%)' }} />
        {/* Hover glow — scales up and brightens */}
        <div className="absolute -top-20 -left-20 w-[600px] h-[600px] rounded-full opacity-0 group-hover:opacity-40 scale-90 group-hover:scale-110 transition-all duration-700 ease-out"
          style={{ background: 'radial-gradient(circle, #D5001C 0%, transparent 65%)' }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-0 group-hover:opacity-25 scale-75 group-hover:scale-100 transition-all duration-700 ease-out"
          style={{ background: 'radial-gradient(circle, #D5001C 0%, transparent 70%)' }} />
        <div className="wrap relative z-10">
          <p className="section-label text-white/40">Browse Our Collection</p>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
              Vehicle Inventory
            </h1>
            <p className="text-white/30 text-sm pb-2">{filtered.length} vehicles</p>
          </div>
        </div>
      </div>

      <div className="wrap  md:!py-2">

        {/* ── Toolbar ── */}
        <div className="p-4 !mb-2">
          <div className="flex flex-col lg:flex-row gap-3">

            {/* Search — takes remaining space */}
            <div className="relative flex-1 min-w-0">
              <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#AAAAAA] pointer-events-none" />
              <input
                type="text"
                placeholder="            Search make, model, or name…"
                value={filters.search}
                onChange={(e) => setFilter('search', e.target.value)}
                className="w-full h-12 bg-white border border-[#E5E5E5] pl-11 pr-10 text-[#1A1A1A] placeholder-[#BBBBBB] text-sm focus:outline-none focus:border-[#1A1A1A] transition-colors rounded-lg"
              />
              {filters.search && (
                <button onClick={() => setFilter('search', '')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#AAAAAA] hover:text-[#1A1A1A] transition-colors">
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Right controls row */}
            <div className="flex items-center gap-3 flex-shrink-0">

              {/* Sort */}
              <div className="relative">
                <select
                  value={filters.sort}
                  onChange={(e) => setFilter('sort', e.target.value)}
                  className="h-12 bg-white border border-[#E5E5E5] pl-4 pr-10 text-[#6B6B6B] text-sm focus:outline-none focus:border-[#1A1A1A] appearance-none min-w-[170px] cursor-pointer rounded-lg"
                >
                  <option value="newest"> Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="price-asc">Price: Low → High</option>
                  <option value="price-desc">Price: High → Low</option>
                  <option value="mileage">Lowest Mileage</option>
                </select>
                <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#AAAAAA] pointer-events-none" />
              </div>

              {/* Divider */}
              <div className="w-px h-8 bg-[#E5E5E5] hidden sm:block" />

              {/* Filters button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`h-12 flex items-center rounded-lg gap-2.5 px-5 text-[11px] font-bold tracking-[0.12em] uppercase transition-all ${
                  showFilters || activeFilterCount > 0
                    ? 'bg-[#1A1A1A] text-white'
                    : 'bg-white border border-[#E5E5E5] text-[#6B6B6B] hover:border-[#1A1A1A] hover:text-[#1A1A1A]'
                }`}
              >
                <SlidersHorizontal size={14} />
                Filters
                {activeFilterCount > 0 && (
                  <span className="bg-[#D5001C] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* View toggle */}
              <div className="flex h-12 overflow-hidden border border-[#E5E5E5] rounded-lg">
                <button
                  onClick={() => setView('grid')}
                  title="Grid view"
                  className={`w-12 flex items-center justify-center transition-colors text-[11px] font-bold tracking-wide ${view === 'grid' ? 'bg-[#1A1A1A] text-white' : 'bg-white text-[#AAAAAA] hover:text-[#1A1A1A]'}`}
                >
                  ⊞
                </button>
                <button
                  onClick={() => setView('list')}
                  title="List view"
                  className={`w-12 flex items-center justify-center border-l border-[#E5E5E5] transition-colors text-[11px] font-bold ${view === 'list' ? 'bg-[#1A1A1A] text-white' : 'bg-white text-[#AAAAAA] hover:text-[#1A1A1A]'}`}
                >
                  ☰
                </button>
              </div>

            </div>
          </div>

          {/* Active filter chips */}
          {activeFilterCount > 0 && (
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#E5E5E5] flex-wrap">
              <span className="text-[10px] text-[#AAAAAA] uppercase tracking-wider font-semibold">Active:</span>
              {filters.make && <span className="bg-[#1A1A1A] text-white text-[10px] font-semibold px-3 py-1 tracking-wide">{filters.make}</span>}
              {filters.category && <span className="bg-[#1A1A1A] text-white text-[10px] font-semibold px-3 py-1 tracking-wide">{filters.category}</span>}
              {filters.fuel && <span className="bg-[#1A1A1A] text-white text-[10px] font-semibold px-3 py-1 tracking-wide">{filters.fuel}</span>}
              {filters.transmission && <span className="bg-[#1A1A1A] text-white text-[10px] font-semibold px-3 py-1 tracking-wide">{filters.transmission}</span>}
              {filters.maxPrice < 500000 && <span className="bg-[#1A1A1A] text-white text-[10px] font-semibold px-3 py-1 tracking-wide">Under ${(filters.maxPrice/1000).toFixed(0)}k</span>}
              <button onClick={clearFilters} className="ml-auto text-[11px] text-[#D5001C] font-semibold hover:underline flex items-center gap-1">
                <X size={11} /> Clear all
              </button>
            </div>
          )}
        </div>

        {/* Filter panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="border border-[#E5E5E5] bg-white mb-8 overflow-hidden rounded-lg"
          >
            <div className="border-b border-[#E5E5E5] px-6 py-4 flex items-center justify-between">
              <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#1A1A1A]">Refine Results</p>
              <button onClick={() => setShowFilters(false)} className="text-[#AAAAAA] hover:text-[#1A1A1A] transition-colors">
                <X size={16} />
              </button>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Make */}
              <div>
                <label className="text-[#AAAAAA] text-[10px] tracking-[0.2em] uppercase font-semibold block mb-2">Make</label>
                <select
                  value={filters.make}
                  onChange={(e) => setFilter('make', e.target.value)}
                  className="w-full h-11 bg-[#F7F7F7] border border-[#E5E5E5] px-3 text-[#1A1A1A] text-sm focus:outline-none focus:border-[#1A1A1A] cursor-pointer rounded-lg"
                >
                  <option value="">All Makes</option>
                  {makes.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>

              {/* Body type */}
              <div>
                <label className="text-[#AAAAAA] text-[10px] tracking-[0.2em] uppercase font-semibold block mb-2">Body Type</label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilter('category', e.target.value)}
                  className="w-full h-11 bg-[#F7F7F7] border border-[#E5E5E5] px-3 text-[#1A1A1A] text-sm focus:outline-none focus:border-[#1A1A1A] cursor-pointer rounded-lg"
                >
                  <option value="">All Types</option>
                  {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Fuel */}
              <div>
                <label className="text-[#AAAAAA] text-[10px] tracking-[0.2em] uppercase font-semibold block mb-2">Fuel Type</label>
                <select
                  value={filters.fuel}
                  onChange={(e) => setFilter('fuel', e.target.value)}
                  className="w-full h-11 bg-[#F7F7F7] border border-[#E5E5E5] px-3 text-[#1A1A1A] text-sm focus:outline-none focus:border-[#1A1A1A] cursor-pointer rounded-lg"
                >
                  <option value="">All Fuels</option>
                  {['Petrol', 'Diesel', 'Electric', 'Hybrid'].map((f) => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>

              {/* Transmission */}
              <div>
                <label className="text-[#AAAAAA] text-[10px] tracking-[0.2em] uppercase font-semibold block mb-2">Transmission</label>
                <select
                  value={filters.transmission}
                  onChange={(e) => setFilter('transmission', e.target.value)}
                  className="w-full h-11 bg-[#F7F7F7] border border-[#E5E5E5] px-3 text-[#1A1A1A] text-sm focus:outline-none focus:border-[#1A1A1A] cursor-pointer rounded-lg"
                >
                  <option value="">Any</option>
                  {['Automatic', 'Manual', 'DCT', 'CVT'].map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            {/* Price slider + sold toggle */}
            <div className="px-6 pb-6 grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-[#F0F0F0] pt-5">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-[#AAAAAA] text-[10px] tracking-[0.2em] uppercase font-semibold">Max Price</label>
                  <span className="text-[#1A1A1A] text-sm font-bold">${(filters.maxPrice / 1000).toFixed(0)}k</span>
                </div>
                <input
                  type="range"
                  min="20000"
                  max="500000"
                  step="5000"
                  value={filters.maxPrice}
                  onChange={(e) => setFilter('maxPrice', Number(e.target.value))}
                  className="w-full accent-[#D5001C] cursor-pointer"
                />
                <div className="flex justify-between mt-1">
                  <span className="text-[#AAAAAA] text-xs">$20k</span>
                  <span className="text-[#AAAAAA] text-xs">$500k</span>
                </div>
              </div>

              <div className="flex items-center">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div
                    onClick={() => setFilter('showSold', !filters.showSold)}
                    className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${filters.showSold ? 'bg-[#1A1A1A]' : 'bg-[#E5E5E5]'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${filters.showSold ? 'translate-x-6' : 'translate-x-1'}`} />
                  </div>
                  <span className="text-[#6B6B6B] text-sm group-hover:text-[#1A1A1A] transition-colors">Show Sold Vehicles</span>
                </label>
              </div>
            </div>
          </motion.div>
        )}

        {/* Results */}
        {paginated.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-[#AAAAAA] text-5xl mb-4">—</p>
            <p className="text-[#1A1A1A] text-xl font-semibold mb-2">No vehicles found</p>
            <p className="text-[#6B6B6B] text-sm mb-6">Try adjusting your filters</p>
            <button onClick={clearFilters} className="btn-primary text-[12px]">
              Clear Filters
            </button>
          </div>
        ) : view === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-14">
            {paginated.map((car, i) => <CarCard key={car.id} car={car} index={i} />)}
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-[#E5E5E5]">
            {paginated.map((car, i) => <ListCarCard key={car.id} car={car} index={i} />)}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-14">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-5 py-2.5 border border-[#E5E5E5] text-[#6B6B6B] disabled:opacity-30 hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-all text-sm"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-10 h-10 text-sm font-medium transition-all ${
                  page === i + 1
                    ? 'bg-[#1A1A1A] text-white'
                    : 'border border-[#E5E5E5] text-[#6B6B6B] hover:border-[#1A1A1A] hover:text-[#1A1A1A]'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-5 py-2.5 border border-[#E5E5E5] text-[#6B6B6B] disabled:opacity-30 hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-all text-sm"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
