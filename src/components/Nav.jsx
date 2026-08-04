import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import logoMark from '../assets/logo-mark.svg'
import menuIcon from '../assets/menu.svg'
import arrowRight from '../assets/arrow-right.svg'
import { lockScroll, unlockScroll } from '../lib/scroll'

const MENU_LINKS = [
  { num: '01', label: 'Home', to: '/' },
  { num: '02', label: 'Services', to: '/services' },
  { num: '03', label: 'Work', to: '/#work' },
  { num: '04', label: 'Contact', to: '/#contact' },
]

export default function Nav({ delay = 0 }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    lockScroll()
    const close = () => setOpen(false)
    const onKey = (e) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    // Back/forward while the overlay is up should dismiss it too; in-menu
    // links close themselves on click.
    window.addEventListener('popstate', close)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('popstate', close)
      unlockScroll()
    }
  }, [open])

  return (
    <>
      <motion.nav
        className="nav"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link to="/" className="logo" aria-label="Design1312 home">
          <img src={logoMark} alt="Design1312" />
        </Link>
        <button
          type="button"
          className="menu"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <img src={menuIcon} alt="" />
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && <MenuOverlay onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  )
}

function MenuOverlay({ onClose }) {
  const { pathname, hash } = useLocation()
  const current = `${pathname}${hash}`

  return (
    <motion.div
      className="menu-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.35, ease: [0.7, 0, 0.84, 0] } }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="menu-bar">
        <Link to="/" className="logo" aria-label="Design1312 home" onClick={onClose}>
          <img src={logoMark} alt="Design1312" />
        </Link>
        <button type="button" className="menu-close" aria-label="Close menu" onClick={onClose}>
          <svg viewBox="0 0 32 32" aria-hidden="true">
            <path d="M7 7 L25 25 M25 7 L7 25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <nav className="menu-links">
        {MENU_LINKS.map((link, i) => (
          <motion.div
            key={link.to}
            className="menu-link-row"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 + i * 0.06, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              to={link.to}
              className="menu-link"
              aria-current={current === link.to ? 'page' : undefined}
              onClick={onClose}
            >
              <span className="menu-link-num">({link.num})</span>
              <span className="menu-link-label">{link.label}</span>
              <img src={arrowRight} alt="" className="menu-link-arrow" />
            </Link>
          </motion.div>
        ))}
      </nav>

      <motion.div
        className="menu-foot"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="menu-foot-label">Say hello</p>
        <div className="menu-foot-values">
          <a href="mailto:buzzsonuvarma@gmail.com">buzzsonuvarma@gmail.com</a>
          <a href="tel:+919664831212">+91 96648 31212</a>
        </div>
      </motion.div>
    </motion.div>
  )
}
