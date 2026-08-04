import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import arrowRight from '../assets/arrow-right.svg'

export default function Footer() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    setSent(true)
    setName('')
    setEmail('')
    setTimeout(() => setSent(false), 2500)
  }

  return (
    <footer className="footer" id="contact" ref={ref}>
      <form className="footer-form" onSubmit={onSubmit} noValidate>
        <div className="footer-inner">
          <motion.div
            className="footer-col footer-credit"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="footer-mark" aria-hidden="true" />
            <p>
              Design and build by
              <br />
              1312 Design studio
            </p>
          </motion.div>

          <motion.div
            className="footer-col footer-contact"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="footer-label">Say hello</p>
            <a className="footer-value" href="mailto:buzzsonuvarma@gmail.com">
              buzzsonuvarma@gmail.com
            </a>
            <a className="footer-value" href="tel:+919664831212">
              +91 96648 31212
            </a>
          </motion.div>

          <motion.div
            className="footer-col footer-field"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <label className="footer-label" htmlFor="footer-name">
              Name
            </label>
            <input
              id="footer-name"
              name="name"
              type="text"
              placeholder="Jane Smith"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </motion.div>

          <motion.div
            className="footer-col footer-field"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <label className="footer-label" htmlFor="footer-email">
              Email
            </label>
            <input
              id="footer-email"
              name="email"
              type="email"
              placeholder="janesmith@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </motion.div>

          <motion.div
            className="footer-col footer-submit-col"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <button type="submit" className="footer-submit">
              <span>{sent ? 'Thanks' : 'Submit'}</span>
              <img src={arrowRight} alt="" className="footer-submit-arrow" />
            </button>
          </motion.div>
        </div>
      </form>

      <div className="footer-divider" aria-hidden="true" />

      <motion.p
        className="footer-copy"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.55, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        © 1312 Design Studio — 2026
      </motion.p>
    </footer>
  )
}
