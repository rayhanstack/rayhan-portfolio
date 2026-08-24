<template>
  <div
    class="cursor-glow"
    :style="{ left: x + 'px', top: y + 'px', opacity: visible ? 1 : 0 }"
    aria-hidden="true"
  ></div>
  <div
    class="cursor-ring"
    :class="{ active: hovering }"
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
const hovering = ref(false)
const isCoarsePointer = useMediaQuery('(pointer: coarse)')

let raf
function onMove(e) {
  cancelAnimationFrame(raf)
  raf = requestAnimationFrame(() => {
    x.value = e.clientX
    y.value = e.clientY
    visible.value = true
    const el = document.elementFromPoint(e.clientX, e.clientY)
    hovering.value = !!el?.closest('a, button, [role="button"], .project-card, .skill-card, .service-card')
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
  background: radial-gradient(circle, rgba(91,61,246,0.08) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
  transform: translate(-50%, -50%);
  transition: opacity 300ms;
  will-change: left, top;
}

.cursor-ring {
  position: fixed;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1.5px solid var(--accent);
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  transition: opacity 300ms, width 250ms var(--ease-spring), height 250ms var(--ease-spring), border-color 250ms;
  will-change: left, top;
  mix-blend-mode: multiply;
  display: none;
}
@media (hover: hover) and (pointer: fine) {
  .cursor-ring { display: block; }
}
.cursor-ring.active {
  width: 52px;
  height: 52px;
  border-color: var(--coral);
  background: var(--accent-dim);
}
</style>
