const categoryIcons = {
  Sedan: (
    <svg viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-10">
      <path d="M5 28 L15 28 L20 18 L35 14 L55 14 L68 22 L72 28 L75 28" stroke="rgba(26,26,26,0.2)" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M22 18 L30 12 L52 12 L60 18" stroke="rgba(26,26,26,0.12)" strokeWidth="1.5" fill="none"/>
      <circle cx="20" cy="30" r="5" stroke="rgba(26,26,26,0.15)" strokeWidth="1.5" fill="none"/>
      <circle cx="60" cy="30" r="5" stroke="rgba(26,26,26,0.15)" strokeWidth="1.5" fill="none"/>
    </svg>
  ),
  SUV: (
    <svg viewBox="0 0 80 45" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-11">
      <rect x="8" y="14" width="64" height="18" rx="2" stroke="rgba(26,26,26,0.2)" strokeWidth="2" fill="none"/>
      <path d="M8 20 L16 20 L22 10 L58 10 L64 20 L72 20" stroke="rgba(26,26,26,0.12)" strokeWidth="1.5" fill="none"/>
      <circle cx="22" cy="33" r="5" stroke="rgba(26,26,26,0.15)" strokeWidth="1.5" fill="none"/>
      <circle cx="58" cy="33" r="5" stroke="rgba(26,26,26,0.15)" strokeWidth="1.5" fill="none"/>
    </svg>
  ),
  Sports: (
    <svg viewBox="0 0 80 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-9">
      <path d="M3 26 L12 26 L18 18 L30 12 L55 12 L66 20 L74 24 L77 26" stroke="rgba(26,26,26,0.2)" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M20 18 L26 10 L54 10 L63 18" stroke="rgba(26,26,26,0.12)" strokeWidth="1.5" fill="none"/>
      <circle cx="19" cy="28" r="4" stroke="rgba(26,26,26,0.15)" strokeWidth="1.5" fill="none"/>
      <circle cx="62" cy="28" r="4" stroke="rgba(26,26,26,0.15)" strokeWidth="1.5" fill="none"/>
    </svg>
  ),
  Convertible: (
    <svg viewBox="0 0 80 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-9">
      <path d="M3 26 L14 26 L20 18 L36 14 L52 14 L64 20 L74 24 L77 26" stroke="rgba(26,26,26,0.2)" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M22 18 L28 14" stroke="rgba(26,26,26,0.15)" strokeWidth="1.5" strokeDasharray="3 2"/>
      <circle cx="20" cy="28" r="4" stroke="rgba(26,26,26,0.15)" strokeWidth="1.5" fill="none"/>
      <circle cx="62" cy="28" r="4" stroke="rgba(26,26,26,0.15)" strokeWidth="1.5" fill="none"/>
    </svg>
  ),
  Electric: (
    <svg viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-10">
      <path d="M5 28 L15 28 L20 18 L35 12 L55 12 L68 20 L72 28 L75 28" stroke="rgba(26,26,26,0.2)" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M38 8 L34 18 L40 18 L36 28" stroke="rgba(213,0,28,0.4)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <circle cx="20" cy="30" r="5" stroke="rgba(26,26,26,0.15)" strokeWidth="1.5" fill="none"/>
      <circle cx="60" cy="30" r="5" stroke="rgba(26,26,26,0.15)" strokeWidth="1.5" fill="none"/>
    </svg>
  ),
  Luxury: (
    <svg viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-10">
      <path d="M5 28 L15 28 L18 20 L30 14 L55 14 L65 20 L72 26 L75 28" stroke="rgba(26,26,26,0.2)" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M20 20 L28 12 L52 12 L62 20" stroke="rgba(26,26,26,0.12)" strokeWidth="1.5" fill="none"/>
      <circle cx="20" cy="30" r="5" stroke="rgba(26,26,26,0.15)" strokeWidth="1.5" fill="none"/>
      <circle cx="60" cy="30" r="5" stroke="rgba(26,26,26,0.15)" strokeWidth="1.5" fill="none"/>
    </svg>
  ),
}

const makeColors = {
  BMW: '#1C69D3',
  Mercedes: '#6B6B6B',
  Porsche: '#8B0000',
  Audi: '#BB0A14',
  'Land Rover': '#005A2B',
  Tesla: '#CC0000',
  Lamborghini: '#B8920A',
  Ferrari: '#D40000',
  Bentley: '#254A5D',
  Maserati: '#003DA5',
  Lexus: '#5C1B33',
  Cadillac: '#862633',
}

export default function CarPlaceholder({ make, category, className = '' }) {
  const accent = makeColors[make] || '#D5001C'
  const icon = categoryIcons[category] || categoryIcons['Sedan']
  const initial = make ? make[0].toUpperCase() : 'A'

  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center gap-4 bg-[#F0F0F0] ${className}`}
    >
      <div className="flex flex-col items-center gap-3 opacity-70">
        <div
          className="w-10 h-10 flex items-center justify-center bebas text-xl"
          style={{ color: accent }}
        >
          {initial}
        </div>
        {icon}
        <span className="text-[#AAAAAA] text-[10px] tracking-[0.3em] uppercase">{category}</span>
      </div>
    </div>
  )
}
