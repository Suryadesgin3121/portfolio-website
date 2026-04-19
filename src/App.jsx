import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import './App.css'

const LAUNCH_DATE = new Date('2026-06-01T00:00:00').getTime()

function useCountdown(target) {
  const [time, setTime] = useState(() => diff(target))
  useEffect(() => {
    const id = setInterval(() => setTime(diff(target)), 1000)
    return () => clearInterval(id)
  }, [target])
  return time
}

function diff(target) {
  const d = Math.max(0, target - Date.now())
  return {
    days: Math.floor(d / 86400000),
    hours: Math.floor((d / 3600000) % 24),
    minutes: Math.floor((d / 60000) % 60),
    seconds: Math.floor((d / 1000) % 60),
  }
}

const pad = (n) => String(n).padStart(2, '0')

const TITLE_LINES = [
  ['Something', 'new'],
  ['is', 'coming.'],
]

export default function App() {
  const orb1 = useRef(null)
  const orb2 = useRef(null)
  const titleRef = useRef(null)
  const time = useCountdown(LAUNCH_DATE)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(orb1.current, {
        x: 40,
        y: 60,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
      gsap.to(orb2.current, {
        x: -50,
        y: -40,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      gsap.from(titleRef.current.querySelectorAll('.char'), {
        yPercent: 120,
        rotate: 6,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.025,
        delay: 0.15,
      })
    })
    return () => ctx.revert()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 2800)
    setEmail('')
  }

  return (
    <main className="coming-soon">
      <div className="grid-bg" />
      <div className="noise" />
      <div ref={orb1} className="orb orb-1" />
      <div ref={orb2} className="orb orb-2" />

      <motion.nav
        className="nav"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="logo">
          <span className="logo-dot" />
          Design1312
        </div>
        <div className="nav-status">
          <span className="status-pulse" />
          In development
        </div>
      </motion.nav>

      <section className="main">
        <motion.div
          className="eyebrow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <span className="eyebrow-line" />
          v1.0 · launching soon
        </motion.div>

        <h1 ref={titleRef} className="title" aria-label="Something new is coming.">
          {TITLE_LINES.map((line, li) => (
            <div key={li}>
              {line.map((word, wi) => {
                const isAccent = word === 'new'
                return (
                  <span key={wi} className="word">
                    {Array.from(word).map((ch, ci) => (
                      <span
                        key={ci}
                        className={`char${isAccent ? ' accent' : ''}`}
                      >
                        {ch}
                      </span>
                    ))}
                  </span>
                )
              })}
            </div>
          ))}
        </h1>

        <motion.p
          className="subtitle"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
        >
          A portfolio crafted with care, motion, and a lot of late nights. Drop
          your email and we&apos;ll whisper when the doors open.
        </motion.p>

        <motion.form
          className="form-row"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.7 }}
        >
          <input
            type="email"
            required
            className="email-input"
            placeholder="you@somewhere.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <motion.button
            type="submit"
            className="notify-btn"
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.02 }}
          >
            <span className="btn-inner">
              {submitted ? 'On the list ✓' : 'Notify me'}
              {!submitted && <Arrow />}
            </span>
          </motion.button>
        </motion.form>
      </section>

      <motion.footer
        className="countdown"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <CountItem label="Days" value={time.days} />
        <CountItem label="Hours" value={pad(time.hours)} />
        <CountItem label="Minutes" value={pad(time.minutes)} />
        <CountItem label="Seconds" value={pad(time.seconds)} />

        <div className="socials">
          <SocialLink href="https://github.com/Suryadesgin3121" label="GitHub">
            <GitHubIcon />
          </SocialLink>
          <SocialLink href="#" label="Twitter">
            <TwitterIcon />
          </SocialLink>
          <SocialLink href="#" label="Instagram">
            <InstagramIcon />
          </SocialLink>
        </div>
      </motion.footer>
    </main>
  )
}

function CountItem({ label, value }) {
  return (
    <div className="count-item">
      <motion.span
        key={value}
        className="count-value"
        initial={{ y: -14, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {value}
      </motion.span>
      <span className="count-label">{label}</span>
    </div>
  )
}

function SocialLink({ href, label, children }) {
  return (
    <a className="social-link" href={href} aria-label={label} target="_blank" rel="noreferrer">
      {children}
    </a>
  )
}

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.4 18.3 4.7 18.3 4.7c.7 1.7.3 2.9.2 3.2.7.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z" />
    </svg>
  )
}

function TwitterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.9 2H22l-7.6 8.7L23 22h-6.8l-5.3-6.9L4.8 22H1.7l8.1-9.3L1 2h6.9l4.8 6.3L18.9 2Zm-1.2 18h1.9L7.4 4H5.4l12.3 16Z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  )
}
