import { Fragment, useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import Lenis from 'lenis'
import heroBg from './assets/hero-bg.png'
import logoMark from './assets/logo-mark.svg'
import menuIcon from './assets/menu.svg'
import brandLarge from './assets/brand-large.svg'
import arrowRight from './assets/arrow-right.svg'
import work1 from './assets/work-1.jpg'
import work2 from './assets/work-2.jpg'
import work3 from './assets/work-3.jpg'
import logoDrify from './assets/logo-drify.png'
import logoUst from './assets/logo-ust.png'
import logoSbi from './assets/logo-sbi.png'
import ideaBg from './assets/idea-bg.png'
import ideaDoor from './assets/idea-door.jpg'
import servicesPeople from './assets/services-people.png'
import missionFlower from './assets/mission-flower.png'
import './App.css'

export default function App() {
  const ledeRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    })

    let rafId
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ledeRef.current.querySelectorAll('.word'), {
        yPercent: 110,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.015,
        delay: 0.2,
      })
    }, ledeRef)
    return () => ctx.revert()
  }, [])

  return (
    <>
    <main className="hero">
      <div
        className="hero-bg"
        style={{ backgroundImage: `url(${heroBg})` }}
        aria-hidden="true"
      />

      <motion.nav
        className="nav"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <a href="/" className="logo" aria-label="Design1312 home">
          <img src={logoMark} alt="Design1312" />
        </a>
        <button type="button" className="menu" aria-label="Open menu">
          <img src={menuIcon} alt="" />
        </button>
      </motion.nav>

      <section className="hero-content">
        <p ref={ledeRef} className="lede" aria-label="We combine creativity, storytelling, and commerce to create human-centered brand experiences that inspire connection and drive transformation.">
          {LEDE_TEXT.split(' ').map((w, i) => (
            <Fragment key={i}>
              {i > 0 && ' '}
              <span className="word-wrap">
                <span className="word">{w}</span>
              </span>
            </Fragment>
          ))}
        </p>

        <motion.a
          href="#work"
          className="cta"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span>OUR WORK</span>
          <img src={arrowRight} alt="" className="cta-arrow" />
        </motion.a>
      </section>

      <motion.img
        src={brandLarge}
        alt=""
        className="brand-large"
        aria-hidden="true"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />
    </main>

    <div className="stack-about-work">
      <About />
      <Work />
    </div>
    <Idea />
    <Services />
    <Mission />
    <Footer />
    </>
  )
}

function Footer() {
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
    <footer className="footer" ref={ref}>
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

const MISSION_HEADLINE =
  'We believe good work shows up — careful, honest, and confident enough not to shout. Every project is a chance to make something useful, something memorable, and ideally both.'

const MISSION_PARAGRAPHS = [
  'We’re a small studio that punches above its weight. Brands, websites, and digital products — from first sketch to live URL — and we don’t outsource the parts that matter.',
  'We’ve worked with founders, big teams, and everyone in between. The reward isn’t the invoice at the end — it’s seeing click-throughs climb, the brand land, and a vague vision turn into something real.',
]

function Mission() {
  const ref = useRef(null)
  const contentRef = useRef(null)
  const inView = useInView(contentRef, { once: true, margin: '-20% 0px' })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const flowerY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  const flowerScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1, 1.06])

  return (
    <section className="mission" id="mission" ref={ref}>
      <div className="mission-inner" ref={contentRef}>
        <motion.div
          className="mission-image-frame"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          <motion.img
            src={missionFlower}
            alt=""
            className="mission-image"
            style={{ y: flowerY, scale: flowerScale }}
          />
          <div className="mission-image-fade" aria-hidden="true" />
        </motion.div>

        <div className="mission-content">
          <motion.p
            className="mission-eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            [OUR MISSION]
          </motion.p>

          <h2 className="mission-headline" aria-label={MISSION_HEADLINE}>
            {MISSION_HEADLINE.split(' ').map((w, i) => (
              <Fragment key={i}>
                {i > 0 && ' '}
                <span className="word-wrap">
                  <motion.span
                    className="word"
                    initial={{ y: '110%' }}
                    animate={inView ? { y: '0%' } : {}}
                    transition={{
                      duration: 1.05,
                      ease: [0.22, 1, 0.36, 1],
                      delay: 0.2 + i * 0.018,
                    }}
                  >
                    {w}
                  </motion.span>
                </span>
              </Fragment>
            ))}
          </h2>

          <div className="mission-body">
            {MISSION_PARAGRAPHS.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: 0.9 + i * 0.15,
                  duration: 0.85,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {p}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const SERVICES = [
  {
    num: '01',
    title: 'Brand Communication',
    body:
      'Identities that age well, copy that sounds like you, and a voice your brand can actually grow into.',
  },
  {
    num: '02',
    title: 'Web Development',
    body:
      'Sites that load fast, scale clean, and feel hand-built — from one-page launches to full-on platforms.',
  },
  {
    num: '03',
    title: 'UI/UX Strategy',
    body:
      'Research, flows, and design systems that quietly do the heavy lifting — so people get what they came for.',
  },
]

function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <section className="services" id="services" ref={ref}>
      <motion.p
        className="services-eyebrow"
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        [ SERVICES ]
      </motion.p>

      <div className="services-canvas">
        <ServiceItem {...SERVICES[0]} cell="s1" delay={0.15} />

        <motion.div
          className="service-image-wrap"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.35, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.img
            src={servicesPeople}
            alt=""
            className="service-image"
            style={{ y: imgY }}
            aria-hidden="true"
          />
        </motion.div>

        <ServiceItem {...SERVICES[1]} cell="s2" delay={0.45} />
        <ServiceItem {...SERVICES[2]} cell="s3" delay={0.75} />
      </div>
    </section>
  )
}

function ServiceItem({ num, title, body, cell, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <motion.div
      className={`service service-${cell}`}
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="service-num">({num})</span>
      <div className="service-meta">
        <h3 className="service-title">{title}</h3>
        <p className="service-body">{body}</p>
      </div>
    </motion.div>
  )
}

const IDEA_TEXT =
  'Every brief is a door. We crack it open and see what’s behind — sharper brands, simpler products, and the occasional small miracle of usable design.'

function Idea() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-20% 0px' })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const doorY = useTransform(scrollYProgress, [0, 1], ['10%', '-10%'])
  const doorScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1, 1.06])

  return (
    <section className="idea" id="idea" ref={ref}>
      <motion.div
        className="idea-bg"
        style={{ backgroundImage: `url(${ideaBg})`, y: bgY }}
        aria-hidden="true"
      />
      <div className="idea-inner">
        <div className="idea-top">
          <motion.p
            className="idea-eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            [ THE IDEA ]
          </motion.p>

          <h2 className="idea-body" aria-label={IDEA_TEXT}>
            {IDEA_TEXT.split(' ').map((w, i) => (
              <Fragment key={i}>
                {i > 0 && ' '}
                <span className="word-wrap">
                  <motion.span
                    className="word"
                    initial={{ y: '110%' }}
                    animate={inView ? { y: '0%' } : {}}
                    transition={{
                      duration: 1.05,
                      ease: [0.22, 1, 0.36, 1],
                      delay: 0.2 + i * 0.025,
                    }}
                  >
                    {w}
                  </motion.span>
                </span>
              </Fragment>
            ))}
          </h2>
        </div>

        <motion.div
          className="idea-image-frame"
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.img
            src={ideaDoor}
            alt="An open door at the edge of a dark, cloudy field"
            className="idea-image"
            style={{ y: doorY, scale: doorScale }}
          />
        </motion.div>
      </div>
    </section>
  )
}

const WORK_SLIDES = [
  {
    image: work1,
    tag: 'ECOM',
    logo: logoDrify,
    logoAlt: 'DRiFY',
    logoStyle: { width: 'clamp(120px, 9vw, 178px)' },
    title: 'A storefront that begs to be touched',
    body:
      'We rebuilt DRiFY’s shop from the ground up — playful product pages, smarter personalisation, and a checkout that nudges instead of shouts.',
  },
  {
    image: work2,
    tag: 'B2B',
    logo: logoUst,
    logoAlt: 'UST',
    logoStyle: { width: 'clamp(80px, 6.5vw, 125px)' },
    title: 'Enterprise that doesn’t feel enterprise',
    body:
      'A digital home as ambitious as the work itself — clean, confident, and ready to greet every kind of client at the door.',
  },
  {
    image: work3,
    tag: 'B2B',
    logo: logoSbi,
    logoAlt: 'SBI Life',
    logoStyle: { width: 'clamp(220px, 18vw, 372px)' },
    title: 'Insurance, finally worth your time',
    body:
      'We helped SBI Life swap fine print for clear thinking — an experience that treats visitors like people, not policy numbers.',
  },
]

function Work() {
  return (
    <section className="work" id="work">
      {WORK_SLIDES.map((s, i) => (
        <WorkSlide key={i} {...s} />
      ))}
    </section>
  )
}

function WorkSlide({ image, tag, logo, logoAlt, logoStyle, title, body }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-25% 0px' })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%'])
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1.04, 1.12])

  return (
    <article className="work-slide" ref={ref}>
      <div className="work-bg-frame" aria-hidden="true">
        <motion.div
          className="work-bg"
          style={{
            backgroundImage: `url(${image})`,
            y: bgY,
            scale: bgScale,
          }}
          initial={{ opacity: 0.4 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <div className="work-overlay" aria-hidden="true" />

      <motion.div
        className="work-tag"
        initial={{ opacity: 0, y: -12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <span>WORK</span>
        <span className="work-dot" aria-hidden="true" />
        <span>{tag}</span>
      </motion.div>

      <div className="work-text">
        <h3 className="work-title" aria-label={title}>
          {title.split(' ').map((w, i) => (
            <Fragment key={i}>
              {i > 0 && ' '}
              <span className="word-wrap">
                <motion.span
                  className="word"
                  initial={{ y: '110%' }}
                  animate={inView ? { y: '0%' } : {}}
                  transition={{
                    duration: 1.05,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.25 + i * 0.04,
                  }}
                >
                  {w}
                </motion.span>
              </span>
            </Fragment>
          ))}
        </h3>
        <motion.p
          className="work-body"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          {body}
        </motion.p>
      </div>

      <motion.img
        src={logo}
        alt={logoAlt}
        className="work-logo"
        style={logoStyle}
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.7, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />
    </article>
  )
}

function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })

  return (
    <section className="about" id="about" ref={ref}>
      <div className="about-inner">
        <motion.p
          className="about-eyebrow"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          [ ABOUT US ]
        </motion.p>

        <h2 className="about-heading" aria-label={ABOUT_TEXT}>
          {ABOUT_TEXT.split(' ').map((w, i) => (
            <Fragment key={i}>
              {i > 0 && ' '}
              <span className="word-wrap">
                <motion.span
                  className="word"
                  initial={{ y: '110%' }}
                  animate={inView ? { y: '0%' } : {}}
                  transition={{
                    duration: 1.05,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.15 + i * 0.015,
                  }}
                >
                  {w}
                </motion.span>
              </span>
            </Fragment>
          ))}
        </h2>
      </div>
    </section>
  )
}

const LEDE_TEXT =
  'A design studio building brands worth meeting, sites worth loading, and ideas that actually earn the click.'

const ABOUT_TEXT =
  'A tight crew of designers, developers, and incurable over-thinkers — making brands and digital products that don’t get lost in the feed.'
