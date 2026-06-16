<template>
  <div
    class="cursor-glow"
    :style="{ left: x + 'px', top: y + 'px', opacity: visible ? 1 : 0 }"
    aria-hidden="true"
  ></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useMediaQuery } from '@vueuse/core'

const x = ref(0)
const y = ref(0)
const visible = ref(false)
const isCoarsePointer = useMediaQuery('(pointer: coarse)')

let raf
function onMove(e) {
  cancelAnimationFrame(raf)
  raf = requestAnimationFrame(() => {
    x.value = e.clientX
    y.value = e.clientY
    visible.value = true
  })
}
function onLeave() { visible.value = false }

onMounted(() => {
  if (isCoarsePointer.value) return
  window.addEventListener('mousemove', onMove, { passive: true })
  document.addEventListener('mouseleave', onLeave)
})
onUnmounted(() => {
  window.removeEventListener('mousemove', onMove)
  document.removeEventListener('mouseleave', onLeave)
})
</script>

<style scoped>
.cursor-glow {
  position: fixed;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(108,99,255,0.08) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
  transform: translate(-50%, -50%);
  transition: opacity 300ms;
  will-change: left, top;
}
</style>
