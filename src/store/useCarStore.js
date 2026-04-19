import { create } from 'zustand'
import { supabase } from '../lib/supabase'

const initialCars = [
  {
    name: "BMW M5 Competition", make: "BMW", model: "M5 Competition", year: 2025,
    price: 142000, original_price: 158000, category: "Sedan", fuel: "Petrol",
    transmission: "Automatic", mileage: 1200, horsepower: 617, torque: "553 lb-ft",
    acceleration: "3.1s", top_speed: "190 mph", mpg: "17/23", drivetrain: "AWD",
    color: "Frozen Black", vin: "WBS83CH0XPB123456", badge: "NEW", featured: true, sold: false,
    description: "The pinnacle of performance saloons. The M5 Competition redefines what a four-door car can be, blending everyday usability with supercar-shaming straight-line performance.",
    features: ["Sunroof", "Harman Kardon", "Heated Seats", "Apple CarPlay", "Night Vision", "Performance Package"],
    images: ["/images/m5.jpg"]
  },
  {
    name: "Mercedes-AMG GT 63", make: "Mercedes", model: "AMG GT 63", year: 2025,
    price: 178000, original_price: null, category: "Sports", fuel: "Petrol",
    transmission: "Automatic", mileage: 800, horsepower: 630, torque: "664 lb-ft",
    acceleration: "2.9s", top_speed: "196 mph", mpg: "15/20", drivetrain: "AWD",
    color: "Obsidian Black", vin: "WDD9G4HB0NA123789", badge: "HOT DEAL", featured: true, sold: false,
    description: "Four doors, infinite thrills. The AMG GT 63 is a masterclass in contradictions — brutally fast yet elegantly refined, track-capable yet supremely comfortable.",
    features: ["Panoramic Roof", "Burmester Sound", "Heated Seats", "Night Vision", "Head-Up Display"],
    images: ["/images/merce.jpg"]
  },
  {
    name: "Porsche 911 GT3 RS", make: "Porsche", model: "911 GT3 RS", year: 2024,
    price: 225000, original_price: null, category: "Sports", fuel: "Petrol",
    transmission: "DCT", mileage: 500, horsepower: 518, torque: "342 lb-ft",
    acceleration: "2.9s", top_speed: "184 mph", mpg: "14/19", drivetrain: "RWD",
    color: "Guards Red", vin: "WP0AF2A90RS123001", badge: "CERTIFIED", featured: true, sold: false,
    description: "Track DNA in a road car. The GT3 RS represents the absolute pinnacle of Porsche engineering — a machine built with one singular purpose: total driver engagement.",
    features: ["Bucket Seats", "Carbon Package", "Sport Chrono", "Ceramic Brakes", "Weissach Package"],
    images: ["/images/911.jpg"]
  },
  {
    name: "Audi RS7 Sportback", make: "Audi", model: "RS7 Sportback", year: 2025,
    price: 138000, original_price: 155000, category: "Sedan", fuel: "Petrol",
    transmission: "Automatic", mileage: 2100, horsepower: 591, torque: "590 lb-ft",
    acceleration: "3.5s", top_speed: "190 mph", mpg: "16/22", drivetrain: "AWD",
    color: "Daytona Grey", vin: "WAUL2AF28MN123321", badge: "NEW", featured: false, sold: false,
    description: "The super saloon redefined. Combining breathtaking performance with a stunning fastback silhouette, the RS7 Sportback is the definition of dual-purpose perfection.",
    features: ["Panoramic Roof", "Bang & Olufsen", "Apple CarPlay", "Heated Seats", "Massage Seats"],
    images: ["/images/audi1.jpg", "/images/audi2.jpg", "/images/audi3.jpg", "/images/audi5.jpg"]
  },
  {
    name: "Range Rover Sport SVR", make: "Land Rover", model: "Range Rover Sport SVR", year: 2024,
    price: 165000, original_price: null, category: "SUV", fuel: "Petrol",
    transmission: "Automatic", mileage: 3400, horsepower: 575, torque: "516 lb-ft",
    acceleration: "4.3s", top_speed: "176 mph", mpg: "14/20", drivetrain: "AWD",
    color: "Santorini Black", vin: "SALWA2RE5LA123654", badge: "CERTIFIED", featured: false, sold: false,
    description: "Brutal performance. Immense luxury. The Sport SVR is an SUV that refuses to compromise.",
    features: ["Panoramic Roof", "Meridian Sound", "Air Suspension", "Adaptive Cruise", "360 Camera"],
    images: ["/images/range.jpg", "/images/range2.jpg"]
  },
  {
    name: "Tesla Model S Plaid", make: "Tesla", model: "Model S Plaid", year: 2025,
    price: 108000, original_price: null, category: "Electric", fuel: "Electric",
    transmission: "Automatic", mileage: 900, horsepower: 1020, torque: "1050 lb-ft",
    acceleration: "1.99s", top_speed: "200 mph", mpg: "348mi range", drivetrain: "AWD",
    color: "Midnight Silver", vin: "5YJSA1E67MF123987", badge: "NEW", featured: false, sold: false,
    description: "The quickest production car ever built. Three motors. One thousand and twenty horsepower. Zero to sixty in under two seconds.",
    features: ["Autopilot", "Gaming Computer", "Heated Seats", "Air Suspension", "Wireless Charging"],
    images: ["/images/tesla.jpg"]
  },
  {
    name: "Lamborghini Urus Performante", make: "Lamborghini", model: "Urus Performante", year: 2024,
    price: 285000, original_price: null, category: "SUV", fuel: "Petrol",
    transmission: "Automatic", mileage: 600, horsepower: 666, torque: "627 lb-ft",
    acceleration: "3.3s", top_speed: "193 mph", mpg: "12/17", drivetrain: "AWD",
    color: "Arancio Borealis", vin: "ZPBUA1ZL8RLA12340", badge: "HOT DEAL", featured: true, sold: false,
    description: "The Super SUV. Unleashed. Lamborghini took the already-sensational Urus and stripped away everything that wasn't absolutely necessary.",
    features: ["Carbon Package", "Alcantara Interior", "Sport Exhaust", "Carbon Brakes", "Performance Package"],
    images: ["/images/lambo.jpg"]
  },
  {
    name: "Ferrari Roma Spider", make: "Ferrari", model: "Roma Spider", year: 2025,
    price: 312000, original_price: null, category: "Convertible", fuel: "Petrol",
    transmission: "DCT", mileage: 200, horsepower: 612, torque: "561 lb-ft",
    acceleration: "3.4s", top_speed: "198 mph", mpg: "13/18", drivetrain: "RWD",
    color: "Rosso Corsa", vin: "ZFF97ALA8R0123001", badge: "NEW", featured: true, sold: false,
    description: "La Dolce Vita with the roof down. The Roma Spider captures the golden era of Italian style while delivering thoroughly modern performance.",
    features: ["Carbon Fibre Pack", "Daytona Seats", "JBL Hi-Fi", "Electric Roof", "Ferrari Dynamic Enhancer"],
    images: ["/images/ferrari.jpg"]
  },
  {
    name: "Bentley Continental GT Speed", make: "Bentley", model: "Continental GT Speed", year: 2024,
    price: 348000, original_price: null, category: "Luxury", fuel: "Petrol",
    transmission: "Automatic", mileage: 1100, horsepower: 650, torque: "664 lb-ft",
    acceleration: "3.6s", top_speed: "208 mph", mpg: "12/20", drivetrain: "AWD",
    color: "Verdant", vin: "SCBCE63W0NC123456", badge: "CERTIFIED", featured: false, sold: true,
    description: "The apex of grand touring. Handcrafted in Crewe, England, the Continental GT Speed is a monument to what happens when you refuse to compromise on anything.",
    features: ["Naim Audio", "Rotating Display", "Heated Seats", "Massage Seats", "Night Vision"],
    images: []
  },
  {
    name: "Maserati Ghibli Trofeo", make: "Maserati", model: "Ghibli Trofeo", year: 2024,
    price: 99000, original_price: 115000, category: "Sedan", fuel: "Petrol",
    transmission: "Automatic", mileage: 5200, horsepower: 580, torque: "538 lb-ft",
    acceleration: "4.3s", top_speed: "203 mph", mpg: "14/20", drivetrain: "AWD",
    color: "Blu Emozione", vin: "ZAM57YSL6NA123789", badge: "HOT DEAL", featured: false, sold: false,
    description: "Italian flair meets raw performance. The Ghibli Trofeo wears its Ferrari-sourced V8 with quiet pride.",
    features: ["Bowers & Wilkins", "Heated Seats", "Sunroof", "Apple CarPlay", "Skyhook Suspension"],
    images: ["/images/Maserati.jpg"]
  },
  {
    name: "Lexus LC 500 Convertible", make: "Lexus", model: "LC 500", year: 2025,
    price: 107000, original_price: null, category: "Convertible", fuel: "Petrol",
    transmission: "Automatic", mileage: 1800, horsepower: 471, torque: "398 lb-ft",
    acceleration: "4.4s", top_speed: "168 mph", mpg: "16/25", drivetrain: "RWD",
    color: "Structural Blue", vin: "JTHHP5BC0R5123456", badge: "NEW", featured: false, sold: false,
    description: "Art in motion. Sound as performance. The LC 500 Convertible is Lexus proving that a car can be genuinely beautiful without sacrificing driving dynamics.",
    features: ["Mark Levinson Audio", "Heated Seats", "Electric Roof", "Head-Up Display", "Blind Spot Monitor"],
    images: ["/images/lexus.jpg", "/images/lexus1.jpg"]
  },
  {
    name: "Cadillac CT5-V Blackwing", make: "Cadillac", model: "CT5-V Blackwing", year: 2024,
    price: 87000, original_price: 98000, category: "Sedan", fuel: "Petrol",
    transmission: "Manual", mileage: 3100, horsepower: 668, torque: "659 lb-ft",
    acceleration: "3.7s", top_speed: "200 mph", mpg: "14/21", drivetrain: "RWD",
    color: "Rift Metallic", vin: "1G6DN5RK1P0123456", badge: "CERTIFIED", featured: false, sold: false,
    description: "American muscle. European soul. The CT5-V Blackwing is Cadillac's declaration of war against European dominance.",
    features: ["Magnetic Ride", "Brembo Brakes", "Suede Interior", "Wireless Charging", "Apple CarPlay"],
    images: ["/images/Cadi.jpg", "/images/cadi1.jpg"]
  }
]

const fromDB = (row) => ({
  ...row,
  originalPrice: row.original_price,
  topSpeed: row.top_speed,
})

const toDB = (car) => ({
  name: car.name,
  make: car.make,
  model: car.model,
  year: car.year,
  price: car.price,
  original_price: car.originalPrice ?? car.original_price ?? null,
  category: car.category,
  fuel: car.fuel,
  transmission: car.transmission,
  mileage: car.mileage,
  horsepower: car.horsepower || null,
  torque: car.torque || null,
  acceleration: car.acceleration || null,
  top_speed: car.topSpeed ?? car.top_speed ?? null,
  mpg: car.mpg || null,
  drivetrain: car.drivetrain,
  color: car.color || null,
  vin: car.vin || null,
  badge: car.badge || null,
  featured: car.featured || false,
  sold: car.sold || false,
  description: car.description || null,
  features: car.features || [],
  images: (car.images || []).filter((img) => img && img.trim()),
})

const useCarStore = create((set, get) => ({
  cars: [],
  loading: true,

  fetchCars: async () => {
    set({ loading: true })
    const { data, error } = await supabase.from('cars').select('*').order('id')
    if (error) { set({ loading: false }); return }

    if (data.length === 0) {
      const { error: insertError } = await supabase.from('cars').insert(initialCars)
      if (!insertError) {
        const { data: seeded } = await supabase.from('cars').select('*').order('id')
        set({ cars: (seeded || []).map(fromDB), loading: false })
      } else {
        set({ loading: false })
      }
    } else {
      set({ cars: data.map(fromDB), loading: false })
    }
  },

  addCar: async (car) => {
    const { data, error } = await supabase.from('cars').insert([toDB(car)]).select().single()
    if (!error && data) {
      set((state) => ({ cars: [...state.cars, fromDB(data)] }))
    }
  },

  updateCar: async (id, updates) => {
    const { error } = await supabase.from('cars').update(toDB(updates)).eq('id', id)
    if (!error) {
      set((state) => ({
        cars: state.cars.map((car) => car.id === id ? { ...car, ...updates } : car)
      }))
    }
  },

  deleteCar: async (id) => {
    const { error } = await supabase.from('cars').delete().eq('id', id)
    if (!error) {
      set((state) => ({ cars: state.cars.filter((car) => car.id !== id) }))
    }
  },

  toggleFeatured: async (id) => {
    const car = get().cars.find((c) => c.id === id)
    if (!car) return
    await get().updateCar(id, { featured: !car.featured })
  },

  toggleSold: async (id) => {
    const car = get().cars.find((c) => c.id === id)
    if (!car) return
    await get().updateCar(id, { sold: !car.sold })
  },

  getCarById: (id) => get().cars.find((car) => car.id === Number(id)),
  getFeaturedCars: () => get().cars.filter((car) => car.featured && !car.sold),
  getAvailableCars: () => get().cars.filter((car) => !car.sold),
}))

export default useCarStore
