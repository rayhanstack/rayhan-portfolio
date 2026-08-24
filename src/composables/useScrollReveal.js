// src/composables/useScrollReveal.js
// GSAP/ScrollTrigger-powered reveal system — replaces the old plain
// opacity/translate IntersectionObserver with real 3D rotation-in motion
// (rotateX + translateZ), staggered per section, for a premium, kinetic
// feel as content enters the viewport.
import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function useScrollReveal() {
  let triggers = []

  onMounted(() => {
    // Give the DOM a tick to fully render before querying elements
    requestAnimationFrame(() => {
      const reduced = prefersReducedMotion()

      const groups = [
        { sel: '.reveal', from: { opacity: 0, y: 42, rotateX: -8, transformPerspective: 800 } },
        { sel: '.reveal-left', from: { opacity: 0, x: -48, rotateY: 10, transformPerspective: 800 } },
        { sel: '.reveal-right', from: { opacity: 0, x: 48, rotateY: -10, transformPerspective: 800 } },
      ]

      groups.forEach(({ sel, from }) => {
        document.querySelectorAll(sel).forEach((el) => {
          // Remove the old CSS-driven classes so they don't fight GSAP
          el.classList.remove(sel.slice(1))
          el.style.opacity = ''
          el.style.transform = ''

          if (reduced) {
            gsap.set(el, { opacity: 1, x: 0, y: 0, rotateX: 0, rotateY: 0 })
            return
          }

          const delay = Number(el.dataset.delay || 0) / 1000
          gsap.set(el, from)
          const st = ScrollTrigger.create({
            trigger: el,
            start: 'top 88%',
            once: true,
            onEnter: () => {
              gsap.to(el, {
                opacity: 1,
                x: 0,
                y: 0,
                rotateX: 0,
                rotateY: 0,
                duration: 0.9,
                delay,
                ease: 'power3.out',
              })
            },
          })
          triggers.push(st)
        })
      })
    })
  })

  onUnmounted(() => {
    triggers.forEach((t) => t.kill())
    triggers = []
  })
}
