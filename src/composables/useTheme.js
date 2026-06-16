// src/composables/useTheme.js
import { ref, watch, onMounted } from 'vue'

const isDark = ref(true)

export function useTheme() {
  onMounted(() => {
    const saved = localStorage.getItem('theme')
    isDark.value = saved ? saved === 'dark' : true
    applyTheme()
  })

  watch(isDark, () => {
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    applyTheme()
  })

  function applyTheme() {
    document.documentElement.classList.toggle('light', !isDark.value)
  }

  function toggleTheme() {
    isDark.value = !isDark.value
  }

  return { isDark, toggleTheme }
}
