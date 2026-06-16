// src/composables/useActiveSection.js
import { ref, onMounted, onUnmounted } from 'vue'

export function useActiveSection() {
  const activeSection = ref('hero')

  let observer

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeSection.value = entry.target.id
          }
        })
      },
      { threshold: 0.35 }
    )

    document.querySelectorAll('section[id]').forEach((el) => observer.observe(el))
  })

  onUnmounted(() => observer?.disconnect())

  return { activeSection }
}
