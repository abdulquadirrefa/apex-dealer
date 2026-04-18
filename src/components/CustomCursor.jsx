import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  useEffect(() => {
    if (isAdmin) return

    const dot = dotRef.current
    const ring = ringRef.current
    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0

    const moveCursor = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.left = mouseX + 'px'
      dot.style.top = mouseY + 'px'
    }

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring.style.left = ringX + 'px'
      ring.style.top = ringY + 'px'
      requestAnimationFrame(animateRing)
    }

    const onMouseEnterLink = () => ring.classList.add('expanded')
    const onMouseLeaveLink = () => ring.classList.remove('expanded')

    document.addEventListener('mousemove', moveCursor)
    animateRing()

    const links = document.querySelectorAll('a, button, [role="button"]')
    links.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnterLink)
      el.addEventListener('mouseleave', onMouseLeaveLink)
    })

    return () => {
      document.removeEventListener('mousemove', moveCursor)
    }
  }, [isAdmin, location.pathname])

  if (isAdmin) return null

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
