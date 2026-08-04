import { Fragment, useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import missionFlower from '../assets/mission-flower.png'
import work1 from '../assets/work-1.jpg'
import work2 from '../assets/work-2.jpg'
import work3 from '../assets/work-3.jpg'
import ideaDoor from '../assets/idea-door.jpg'
import servicesPeople from '../assets/services-people.png'

const HERO_TITLE = 'What we do'

const INTENT_TEXT =
  'Every project starts the same way — working out what you’re actually trying to do. Strategy, design, and build all happen under one roof, and nobody hands you off halfway through.'

const STATEMENT_TEXT =
  'Five things we do properly, start to finish, with none of the parts that matter quietly sent somewhere else.'

const SERVICE_ROWS = [
  {
    num: '01',
    title: 'Brand Communication',
    body:
      'Your brand should sound like a person, not a press release. We build identities that age well — the name, the voice, and the rules that keep both honest everywhere your logo turns up.',
    tags: ['NAMING', 'IDENTITY', 'VOICE & TONE', 'MESSAGING', 'BRAND GUIDELINES'],
    image: work2,
  },
  {
    num: '02',
    title: 'Web Development',
    body:
      'A site isn’t just how it looks — it’s how fast it loads and how well it holds up two years in. We build clean, search-friendly front ends that scale without becoming somebody else’s problem.',
    tags: ['REACT', 'NEXT.JS', 'WEBFLOW', 'SHOPIFY', 'HEADLESS CMS', 'PERFORMANCE'],
    image: work1,
  },
  {
    num: '03',
    title: 'UI/UX Strategy',
    body:
      'Good design starts with watching people get stuck. We research, map the flows, and build systems that quietly do the heavy lifting — so visitors get what they came for and never think about the plumbing.',
    tags: ['RESEARCH', 'USER FLOWS', 'WIREFRAMES', 'DESIGN SYSTEMS', 'USABILITY TESTING'],
    image: work3,
  },
  {
    num: '04',
    title: 'Motion & Interaction',
    body:
      'The gap between a page and an experience is usually a few hundred milliseconds. We choreograph the scroll, the transitions, and the small moments that make a site feel built rather than assembled.',
    tags: ['SCROLL CHOREOGRAPHY', 'MICRO-INTERACTIONS', 'GSAP', 'WEBGL', 'PROTOTYPES'],
    image: ideaDoor,
  },
  {
    num: '05',
    title: 'Art Direction',
    body:
      'Someone has to decide what the whole thing looks like and then hold the line. We set the visual grammar — photography, layout, campaign — and keep it intact across every asset that ships.',
    tags: ['CAMPAIGN CONCEPTS', 'PHOTOGRAPHY', 'LAYOUT SYSTEMS', 'PITCH DECKS', 'PRINT'],
    image: servicesPeople,
    fit: 'contain',
  },
]

export default function Services() {
  return (
    <>
      <main className="sv-hero">
        <Nav />

        <div className="sv-hero-content">
          <motion.p
            className="sv-eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            [ SERVICES ]
          </motion.p>

          <h1 className="sv-hero-title" aria-label={HERO_TITLE}>
            {HERO_TITLE.split(' ').map((w, i) => (
              <Fragment key={i}>
                {i > 0 && ' '}
                <span className="word-wrap">
                  <motion.span
                    className="word"
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{
                      duration: 1.15,
                      ease: [0.22, 1, 0.36, 1],
                      delay: 0.28 + i * 0.07,
                    }}
                  >
                    {w}
                  </motion.span>
                </span>
              </Fragment>
            ))}
          </h1>
        </div>
      </main>

      <Intent />
      <Statement />

      <section className="sv-list">
        {SERVICE_ROWS.map((row, i) => (
          <ServiceRow key={row.num} {...row} index={i} />
        ))}
      </section>

      <Footer />
    </>
  )
}

function Intent() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.08])

  return (
    <section className="sv-intent" ref={ref}>
      <motion.img
        src={missionFlower}
        alt=""
        className="sv-intent-image"
        aria-hidden="true"
        style={{ y: imgY, scale: imgScale }}
      />
      <div className="sv-intent-scrim" aria-hidden="true" />

      <div className="sv-intent-inner">
        <motion.div
          className="sv-intent-label"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="sv-intent-mark" aria-hidden="true" />
          <h2>Crafted with intent</h2>
        </motion.div>

        <motion.p
          className="sv-intent-body"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          {INTENT_TEXT}
        </motion.p>
      </div>
    </section>
  )
}

function Statement() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-20% 0px' })

  return (
    <section className="sv-statement" ref={ref}>
      <h2 className="sv-statement-text" aria-label={STATEMENT_TEXT}>
        {STATEMENT_TEXT.split(' ').map((w, i) => (
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
                  delay: 0.15 + i * 0.022,
                }}
              >
                {w}
              </motion.span>
            </span>
          </Fragment>
        ))}
      </h2>
    </section>
  )
}

function ServiceRow({ num, title, body, tags, image, fit = 'cover', index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-7%', '7%'])

  return (
    <article className="sv-row" ref={ref} id={`service-${num}`}>
      <div className="sv-row-rule" aria-hidden="true" />

      <div className="sv-row-inner">
        <div className="sv-row-text">
          <motion.p
            className="sv-row-num"
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            /{num}
          </motion.p>

          <h3 className="sv-row-title" aria-label={title}>
            {title.split(' ').map((w, i) => (
              <Fragment key={i}>
                {i > 0 && ' '}
                <span className="word-wrap">
                  <motion.span
                    className="word"
                    initial={{ y: '110%' }}
                    animate={inView ? { y: '0%' } : {}}
                    transition={{
                      duration: 1,
                      ease: [0.22, 1, 0.36, 1],
                      delay: 0.12 + i * 0.05,
                    }}
                  >
                    {w}
                  </motion.span>
                </span>
              </Fragment>
            ))}
          </h3>

          <motion.p
            className="sv-row-body"
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            {body}
          </motion.p>

          <ul className="sv-row-tags">
            {tags.map((tag, i) => (
              <motion.li
                key={tag}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: 0.45 + i * 0.05,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {tag}
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.div
          className={`sv-row-media sv-row-media-${fit}`}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            delay: index === 0 ? 0.25 : 0.2,
            duration: 1.05,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <motion.img src={image} alt="" aria-hidden="true" style={{ y: imgY }} />
        </motion.div>
      </div>
    </article>
  )
}
