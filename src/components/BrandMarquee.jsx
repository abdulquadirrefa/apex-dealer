const brands = [
  'BMW', 'Mercedes-Benz', 'Audi', 'Ferrari', 'Lamborghini',
  'Porsche', 'Tesla', 'Range Rover', 'Maserati', 'Bentley',
  'Aston Martin', 'McLaren', 'Rolls-Royce', 'Bugatti', 'Pagani',
]

export default function BrandMarquee() {
  const doubled = [...brands, ...brands]

  return (
    <div className="py-20 border-y border-[#E5E5E5] overflow-hidden bg-white">
      <div className="flex marquee-track gap-14 whitespace-nowrap">
        {doubled.map((brand, i) => (
          <div key={i} className="flex items-center gap-14 shrink-0">
            <span className="bebas text-[#CCCCCC] text-xl tracking-[0.25em] uppercase hover:text-[#1A1A1A] transition-colors duration-300 cursor-default">
              {brand}
            </span>
            <span className="text-[#E5E5E5] text-base">·</span>
          </div>
        ))}
      </div>
    </div>
  )
}
