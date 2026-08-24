// src/directives/tilt.js
// A lightweight, dependency-free 3D tilt directive.
// Usage: <div v-tilt> or <div v-tilt="{ max: 10, glare: true }">
// Adds real perspective rotateX/rotateY tracking the pointer, plus an
// optional moving glare sheen — this is what gives cards genuine depth
// instead of a flat hover-lift.

function setup(el, binding) {
  const opts = Object.assign({ max: 10, scale: 1.02, glare: true, speed: 400 }, binding.value || {})

  el.style.transformStyle = 'preserve-3d'
  el.style.willChange = 'transform'
  el.style.transition = `transform ${opts.speed}ms cubic-bezier(0.16,1,0.3,1)`

  let glareEl = null
  if (opts.glare) {
    glareEl = document.createElement('div')
    glareEl.className = 'tilt-glare'
    glareEl.style.cssText = `
      position:absolute; inset:0; pointer-events:none; border-radius:inherit;
      background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.55), transparent 60%);
      opacity:0; transition: opacity ${opts.speed}ms ease; mix-blend-mode: overlay; z-index:5;
    `
    const pos = getComputedStyle(el).position
    if (pos === 'static') el.style.position = 'relative'
    el.appendChild(glareEl)
  }

  function onMove(e) {
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const rotY = (px - 0.5) * 2 * opts.max
    const rotX = -(py - 0.5) * 2 * opts.max
    el.style.transition = 'transform 60ms linear'
    el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(${opts.scale},${opts.scale},${opts.scale})`
    if (glareEl) {
      glareEl.style.opacity = '0.5'
      glareEl.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.45), transparent 60%)`
    }
  }

  function onLeave() {
    el.style.transition = `transform ${opts.speed}ms cubic-bezier(0.16,1,0.3,1)`
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
    if (glareEl) glareEl.style.opacity = '0'
  }

  el.addEventListener('mousemove', onMove)
  el.addEventListener('mouseleave', onLeave)
  el._tiltCleanup = () => {
    el.removeEventListener('mousemove', onMove)
    el.removeEventListener('mouseleave', onLeave)
  }
}

export const tilt = {
  mounted(el, binding) {
    // Skip on touch/coarse-pointer devices — tilt needs a real cursor
    if (window.matchMedia('(pointer: coarse)').matches) return
    setup(el, binding)
  },
  unmounted(el) {
    el._tiltCleanup?.()
  },
}
