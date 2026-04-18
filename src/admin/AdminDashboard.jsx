import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Car, TrendingUp, Star, CheckSquare, DollarSign, BarChart2, PlusCircle, Edit2, Trash2 } from 'lucide-react'
import useCarStore from '../store/useCarStore'
import useToastStore from '../store/useToastStore'
import CarPlaceholder from '../components/CarPlaceholder'

export default function AdminDashboard() {
  const { cars, deleteCar } = useCarStore()
  const { addToast } = useToastStore()

  const total = cars.length
  const available = cars.filter((c) => !c.sold).length
  const sold = cars.filter((c) => c.sold).length
  const featured = cars.filter((c) => c.featured).length
  const totalValue = cars.filter((c) => !c.sold).reduce((s, c) => s + c.price, 0)
  const avgPrice = available > 0 ? Math.round(totalValue / available) : 0

  const recent = [...cars].slice(-5).reverse()

  const categoryCounts = cars.reduce((acc, c) => {
    acc[c.category] = (acc[c.category] || 0) + 1
    return acc
  }, {})
  const maxCount = Math.max(...Object.values(categoryCounts))

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete "${name}"? This cannot be undone.`)) {
      deleteCar(id)
      addToast(`"${name}" deleted`, 'error')
    }
  }

  const statCards = [
    { icon: Car, label: 'Total Vehicles', value: total, color: 'text-white', bg: 'bg-white/5' },
    { icon: TrendingUp, label: 'Available', value: available, color: 'text-green-400', bg: 'bg-green-500/10' },
    { icon: CheckSquare, label: 'Sold', value: sold, color: 'text-white/50', bg: 'bg-white/3' },
    { icon: Star, label: 'Featured', value: featured, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
    { icon: DollarSign, label: 'Inventory Value', value: `$${(totalValue / 1000000).toFixed(1)}M`, color: 'text-[#E3000F]', bg: 'bg-[#E3000F]/10' },
    { icon: BarChart2, label: 'Avg. Price', value: `$${avgPrice.toLocaleString()}`, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  ]

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-white/30 text-sm mb-1">Welcome back</p>
          <h1 className="bebas text-4xl text-white tracking-wider">Dashboard</h1>
        </div>
        <Link
          to="/admin/cars/new"
          className="flex items-center gap-2 bg-[#E3000F] hover:bg-red-700 text-white text-xs font-semibold tracking-widest uppercase px-4 py-2.5 rounded-lg transition-colors"
        >
          <PlusCircle size={14} />
          Add New Car
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {statCards.map(({ icon: Icon, label, value, color, bg }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`${bg} border border-white/5 rounded-xl p-4`}
          >
            <div className="flex items-center justify-between mb-3">
              <Icon size={15} className={color} />
            </div>
            <p className={`font-bold text-xl ${color}`}>{value}</p>
            <p className="text-white/30 text-xs mt-0.5">{label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_300px] gap-6">
        {/* Recent listings */}
        <div className="bg-[#111] border border-white/5 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
            <h2 className="text-white font-semibold text-sm">Recent Listings</h2>
            <Link to="/admin/cars" className="text-white/30 hover:text-white text-xs transition-colors">View All</Link>
          </div>
          <div className="divide-y divide-white/5">
            {recent.map((car) => (
              <div key={car.id} className="flex items-center gap-4 px-5 py-3">
                <div className="w-12 h-10 rounded-lg overflow-hidden shrink-0 bg-[#1a1a1a]">
                  {car.images?.[0] ? (
                    <img src={car.images[0]} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <CarPlaceholder make={car.make} category={car.category} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{car.name}</p>
                  <p className="text-white/30 text-xs">{car.year} · ${car.price?.toLocaleString()}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${car.sold ? 'text-white/30 border-white/10 bg-white/3' : 'text-green-400 border-green-500/30 bg-green-500/10'}`}>
                  {car.sold ? 'Sold' : 'Available'}
                </span>
                <div className="flex items-center gap-2">
                  <Link to={`/admin/cars/edit/${car.id}`} className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors">
                    <Edit2 size={12} />
                  </Link>
                  <button
                    onClick={() => handleDelete(car.id, car.name)}
                    className="w-7 h-7 rounded-lg bg-white/5 hover:bg-red-500/15 flex items-center justify-center text-white/40 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category chart */}
        <div className="bg-[#111] border border-white/5 rounded-xl p-5">
          <h2 className="text-white font-semibold text-sm mb-5">Cars by Category</h2>
          <div className="space-y-3">
            {Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]).map(([cat, count]) => (
              <div key={cat}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-white/50">{cat}</span>
                  <span className="text-white/30">{count}</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(count / maxCount) * 100}%` }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="h-full bg-[#E3000F] rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
