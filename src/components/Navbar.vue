<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
      scrolled ? 'nav-scrolled' : 'nav-transparent'
    ]"
    role="banner"
  >
    <nav class="container nav-inner" aria-label="Main navigation">
      <!-- Logo -->
      <a href="#hero" class="nav-logo" aria-label="Home">
        <span class="logo-bracket">[</span>
        <span class="logo-name">RA</span>
        <span class="logo-bracket">]</span>
        <span class="logo-cursor">_</span>
      </a>

      <!-- Desktop Links -->
      <ul class="nav-links" role="list">
        <li v-for="link in navLinks" :key="link.href">
          <a
            :href="link.href"
            :class="['nav-link', { active: activeSection === link.href.slice(1) }]"
            @click="closeMenu"
          >
            {{ link.label }}
          </a>
        </li>
      </ul>

      <!-- Right Controls -->
      <div class="nav-controls">
        <!-- Theme Toggle -->
        <button
          class="theme-btn"
          @click="toggleTheme"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <Sun v-if="!isDark" :size="18" />
          <Moon v-else :size="18" />
        </button>

        <!-- Hire Me CTA -->
        <a href="#contact" class="btn btn-primary hidden sm:inline-flex">
          <Zap :size="15" />
          Hire Me
        </a>

        <!-- Hamburger -->
        <button
          class="hamburger"
          @click="menuOpen = !menuOpen"
          :aria-expanded="menuOpen"
          aria-label="Toggle navigation menu"
        >
          <span :class="['ham-line', { open: menuOpen }]"></span>
          <span :class="['ham-line mid', { open: menuOpen }]"></span>
          <span :class="['ham-line', { open: menuOpen }]"></span>
        </button>
      </div>
    </nav>

    <!-- Mobile Drawer -->
    <Transition name="drawer">
      <div v-if="menuOpen" class="mobile-drawer" role="dialog" aria-label="Mobile navigation">
        <ul role="list">
          <li
            v-for="(link, i) in navLinks"
            :key="link.href"
            :style="{ transitionDelay: `${i * 40}ms` }"
            class="drawer-item"
            :class="{ visible: menuOpen }"
          >
            <a
              :href="link.href"
              class="drawer-link"
              @click="closeMenu"
            >
              <span class="drawer-num mono">0{{ i + 1 }}</span>
              {{ link.label }}
            </a>
          </li>
        </ul>
        <div class="drawer-footer">
          <a href="#contact" class="btn btn-primary w-full justify-center" @click="closeMenu">
            <Zap :size="15" /> Hire Me
          </a>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Sun, Moon, Zap } from 'lucide-vue-next'
import { useTheme } from '@/composables/useTheme'
import { useActiveSection } from '@/composables/useActiveSection'
import { navLinks } from '@/data/portfolio'

const { isDark, toggleTheme } = useTheme()
const { activeSection } = useActiveSection()

const scrolled = ref(false)
const menuOpen = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 60
}

function closeMenu() {
  menuOpen.value = false
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.nav-transparent {
  background: transparent;
  border-bottom: 1px solid transparent;
}

.nav-scrolled {
  background: var(--bg-glass);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border-subtle);
}

.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 20px;
  padding-bottom: 20px;
}

/* Logo */
.nav-logo {
  font-family: var(--font-mono);
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--text-primary);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 1px;
  letter-spacing: -0.02em;
}
.logo-bracket { color: var(--accent); }
.logo-name { color: var(--text-primary); font-weight: 700; padding: 0 2px; }
.logo-cursor {
  color: var(--accent);
  animation: blink 1.2s step-end infinite;
  margin-left: 2px;
}
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

/* Desktop links */
.nav-links {
  display: none;
  list-style: none;
  align-items: center;
  gap: 4px;
}
@media (min-width: 900px) {
  .nav-links { display: flex; }
}

.nav-link {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
  text-decoration: none;
  padding: 6px 14px;
  border-radius: 8px;
  transition: color 200ms, background 200ms;
  position: relative;
}
.nav-link:hover, .nav-link.active {
  color: var(--text-primary);
  background: var(--accent-dim);
}
.nav-link.active { color: var(--accent); }

/* Controls */
.nav-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.theme-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: var(--accent-dim);
  border: 1px solid var(--border-subtle);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 200ms;
}
.theme-btn:hover {
  color: var(--accent);
  border-color: var(--accent);
}

/* Hamburger */
.hamburger {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 8px;
  cursor: pointer;
  background: none;
  border: none;
}
@media (min-width: 900px) { .hamburger { display: none; } }

.ham-line {
  display: block;
  width: 22px;
  height: 1.5px;
  background: var(--text-primary);
  border-radius: 2px;
  transition: all 300ms var(--ease-smooth);
  transform-origin: center;
}
.ham-line.open:first-child { transform: translateY(6.5px) rotate(45deg); }
.ham-line.mid.open { opacity: 0; transform: scaleX(0); }
.ham-line.open:last-child { transform: translateY(-6.5px) rotate(-45deg); }

/* Mobile drawer */
.mobile-drawer {
  background: var(--bg-panel);
  border-bottom: 1px solid var(--border-subtle);
  padding: 16px 0 24px;
}
@media (min-width: 900px) { .mobile-drawer { display: none; } }

.drawer-item {
  opacity: 0;
  transform: translateX(-16px);
  transition: opacity 300ms, transform 300ms;
  list-style: none;
}
.drawer-item.visible {
  opacity: 1;
  transform: translateX(0);
}

.drawer-link {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px clamp(16px, 5vw, 48px);
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 1.05rem;
  font-weight: 500;
  transition: color 200ms;
}
.drawer-link:hover { color: var(--text-primary); }

.drawer-num {
  font-size: 0.7rem;
  color: var(--accent);
  min-width: 22px;
}

.drawer-footer {
  padding: 20px clamp(16px, 5vw, 48px) 0;
}

/* Transition */
.drawer-enter-active, .drawer-leave-active {
  transition: all 350ms var(--ease-smooth);
  overflow: hidden;
}
.drawer-enter-from, .drawer-leave-to {
  opacity: 0;
  max-height: 0;
}
.drawer-enter-to, .drawer-leave-from {
  opacity: 1;
  max-height: 600px;
}
</style>
