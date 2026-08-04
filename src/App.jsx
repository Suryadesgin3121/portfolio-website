import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import Home from './pages/Home'
import Services from './pages/Services'
import { registerLenis, scrollToSelector, scrollToTop } from './lib/scroll'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  )
}

function Shell() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    })
    registerLenis(lenis)

    let rafId
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      registerLenis(null)
      lenis.destroy()
    }
  }, [])

  // Land at the top on a new page, or on the anchor when one was requested.
  // The target only exists after the incoming route paints, hence the frame wait.
  useEffect(() => {
    scrollToTop()
    if (!hash) return

    const timer = setTimeout(() => scrollToSelector(hash), 120)
    return () => clearTimeout(timer)
  }, [pathname, hash, key])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="*" element={<Home />} />
    </Routes>
  )
}
