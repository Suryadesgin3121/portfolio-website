// Single Lenis instance, created in App and shared with anything that needs to
// drive the page scroll (menu lock, route changes, in-page anchors).

let lenis = null

export function registerLenis(instance) {
  lenis = instance
}

export function lockScroll() {
  lenis?.stop()
  document.body.classList.add('scroll-locked')
}

export function unlockScroll() {
  lenis?.start()
  document.body.classList.remove('scroll-locked')
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true })
  else window.scrollTo(0, 0)
}

export function scrollToSelector(selector) {
  const el = document.querySelector(selector)
  if (!el) return false
  if (lenis) lenis.scrollTo(el, { offset: 0 })
  else el.scrollIntoView({ behavior: 'smooth' })
  return true
}
