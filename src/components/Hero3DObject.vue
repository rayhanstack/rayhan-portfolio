<template>
  <canvas ref="canvasEl" class="hero3d-canvas" aria-hidden="true"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const canvasEl = ref(null)
let renderer, scene, camera, group, raf
let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0
let ro

function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl')))
  } catch (e) {
    return false
  }
}

function buildMaterial(colorA, colorB) {
  // Custom shader: soft fresnel-lit gradient "glass" material — gives a
  // premium, animated 3D look without needing external textures/HDRIs.
  return new THREE.ShaderMaterial({
    uniforms: {
      uColorA: { value: new THREE.Color(colorA) },
      uColorB: { value: new THREE.Color(colorB) },
      uTime: { value: 0 },
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vPos;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vPos = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 uColorA;
      uniform vec3 uColorB;
      uniform float uTime;
      varying vec3 vNormal;
      varying vec3 vPos;
      void main() {
        float mixVal = clamp(0.5 + 0.5 * sin(vPos.y * 1.4 + uTime * 0.6), 0.0, 1.0);
        vec3 base = mix(uColorA, uColorB, mixVal);
        float fresnel = pow(1.0 - abs(vNormal.z), 2.6);
        vec3 col = base * 0.82 + fresnel * 0.6;
        gl_FragColor = vec4(col, 0.82);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide,
  })
}

function onPointerMove(e) {
  const w = window.innerWidth, h = window.innerHeight
  mouseX = (e.clientX / w) * 2 - 1
  mouseY = (e.clientY / h) * 2 - 1
}

function animate(t) {
  raf = requestAnimationFrame(animate)
  targetX += (mouseX - targetX) * 0.04
  targetY += (mouseY - targetY) * 0.04

  if (group) {
    group.rotation.y = t * 0.00022 + targetX * 0.5
    group.rotation.x = t * 0.00012 + targetY * 0.3
    group.position.y = Math.sin(t * 0.0007) * 0.18
  }
  scene.children.forEach((child) => {
    if (child.material && child.material.uniforms) {
      child.material.uniforms.uTime.value = t * 0.001
    }
  })
  renderer.render(scene, camera)
}

function resize() {
  const el = canvasEl.value
  if (!el || !renderer) return
  const parent = el.parentElement
  const w = parent.clientWidth
  const h = parent.clientHeight
  renderer.setSize(w, h, false)
  camera.aspect = w / h
  camera.updateProjectionMatrix()
}

onMounted(() => {
  if (!hasWebGL()) return // graceful no-op — hero still looks great without it

  try {
    const el = canvasEl.value
    renderer = new THREE.WebGLRenderer({ canvas: el, antialias: true, alpha: true })
    const isSmallScreen = window.innerWidth < 768
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmallScreen ? 1.5 : 2))

    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100)
    camera.position.set(0, 0, 6.2)

    group = new THREE.Group()

    // Core faceted icosahedron — the "hero" 3D object
    const coreGeo = new THREE.IcosahedronGeometry(1.08, 1)
    const coreMat = buildMaterial('#5B3DF6', '#FF5D73')
    coreMat.transparent = true
    coreMat.opacity = 0.85
    const core = new THREE.Mesh(coreGeo, coreMat)
    group.add(core)

    // Wireframe shell slightly larger, orbiting opposite direction for depth
    const wireGeo = new THREE.IcosahedronGeometry(1.55, 2)
    const wireMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#FFB020'),
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    })
    const wire = new THREE.Mesh(wireGeo, wireMat)
    wire.rotation.set(0.4, 0.2, 0)
    group.add(wire)

    // Small orbiting satellite spheres
    const satColors = ['#12C6B0', '#B34DFF', '#FF5D73']
    const sats = []
    satColors.forEach((c, i) => {
      const g = new THREE.SphereGeometry(0.11, 24, 24)
      const m = new THREE.MeshBasicMaterial({ color: new THREE.Color(c) })
      const s = new THREE.Mesh(g, m)
      s.userData.angle = (i / satColors.length) * Math.PI * 2
      s.userData.radius = 2.35
      s.userData.speed = 0.4 + i * 0.15
      sats.push(s)
      group.add(s)
    })

    scene.add(group)

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove, { passive: true })

    ro = new ResizeObserver(resize)
    ro.observe(el.parentElement)

    let start = null
    function loop(t) {
      if (!start) start = t
      const elapsed = t - start
      sats.forEach((s) => {
        const a = s.userData.angle + elapsed * 0.0006 * s.userData.speed
        s.position.set(Math.cos(a) * s.userData.radius, Math.sin(a * 0.6) * 0.6, Math.sin(a) * s.userData.radius)
      })
      animate(t)
    }
    raf = requestAnimationFrame(loop)
  } catch (e) {
    // Fail silently — WebGL context creation can fail on some devices/drivers
    console.warn('Hero3DObject: WebGL init failed, skipping 3D layer.', e)
  }
})

onUnmounted(() => {
  cancelAnimationFrame(raf)
  window.removeEventListener('resize', resize)
  window.removeEventListener('pointermove', onPointerMove)
  ro?.disconnect()
  renderer?.dispose()
})
</script>

<style scoped>
.hero3d-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
