// src/directives/magnetic.js
// Buttons subtly "pull" toward the cursor within a radius — a common
// award-site micro-interaction that makes CTAs feel alive/tangible.
export const magnetic = {
  mounted(el, binding) {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const strength = (binding.value && binding.value.strength) || 0.35
    el.style.transition = 'transform 300ms cubic-bezier(0.16,1,0.3,1)'
    el.style.willChange = 'transform'

    function onMove(e) {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - (rect.left + rect.width / 2)
      const y = e.clientY - (rect.top + rect.height / 2)
      el.style.transition = 'transform 80ms linear'
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
    }
    function onLeave() {
      el.style.transition = 'transform 400ms cubic-bezier(0.34,1.56,0.64,1)'
      el.style.transform = 'translate(0px, 0px)'
    }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    el._magneticCleanup = () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  },
  unmounted(el) {
    el._magneticCleanup?.()
  },
}
