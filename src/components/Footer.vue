<template>
  <footer class="footer" role="contentinfo">
    <div class="footer-top-line" aria-hidden="true"></div>
    <div class="container">
      <div class="footer-grid">
        <!-- Brand -->
        <div class="footer-brand">
          <a href="#hero" class="footer-logo" aria-label="Back to top">
            <span class="logo-bracket">[</span>
            <span class="logo-name">RA</span>
            <span class="logo-bracket">]</span>
            <span class="logo-cursor">_</span>
          </a>
          <p class="footer-tagline">{{ personal.tagline }}</p>
          <div class="footer-socials">
            <a
              v-for="s in personal.socials"
              :key="s.name"
              :href="s.url"
              class="footer-social"
              :aria-label="s.name"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github v-if="s.icon === 'Github'" :size="16" />
              <Linkedin v-else-if="s.icon === 'Linkedin'" :size="16" />
              <Twitter v-else-if="s.icon === 'Twitter'" :size="16" />
            </a>
          </div>
        </div>

        <!-- Quick links -->
        <div class="footer-col">
          <h4 class="footer-col-title">Navigate</h4>
          <ul class="footer-links" role="list">
            <li v-for="link in navLinks" :key="link.href">
              <a :href="link.href" class="footer-link">{{ link.label }}</a>
            </li>
          </ul>
        </div>

        <!-- Contact info -->
        <div class="footer-col">
          <h4 class="footer-col-title">Contact</h4>
          <div class="footer-contacts">
            <a :href="`mailto:${personal.email}`" class="footer-contact-item">
              <Mail :size="14" /> {{ personal.email }}
            </a>
            <div class="footer-contact-item">
              <MapPin :size="14" /> {{ personal.location }}
            </div>
          </div>

          <!-- Status -->
          <div class="footer-status">
            <span class="status-dot-sm" aria-hidden="true"></span>
            <span>Available for freelance</span>
          </div>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="footer-bottom">
        <p class="footer-copy">
          © {{ new Date().getFullYear() }} {{ personal.name }}. Built with
          <span class="heart" aria-label="love">♥</span>
          using Vue 3 &amp; Tailwind CSS.
        </p>
        <a href="#hero" class="back-top-btn" aria-label="Back to top">
          <ChevronUp :size="16" />
          <span>Top</span>
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { Mail, MapPin, Github, Linkedin, Twitter, ChevronUp } from 'lucide-vue-next'
import { personal, navLinks } from '@/data/portfolio'
</script>

<style scoped>
.footer {
  background: var(--bg-secondary);
  padding: 60px 0 0;
  position: relative;
}
.footer-top-line {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent), var(--cyan), transparent);
}

.footer-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-bottom: 48px;
}
@media (min-width: 640px) { .footer-grid { grid-template-columns: 1fr 1fr; } }
@media (min-width: 900px) { .footer-grid { grid-template-columns: 1.5fr 1fr 1fr; } }

/* Brand */
.footer-logo {
  font-family: var(--font-mono);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary);
  text-decoration: none;
  display: inline-flex;
  gap: 2px;
  margin-bottom: 12px;
}
.logo-bracket { color: var(--accent); }
.logo-cursor { color: var(--accent); animation: blink 1.2s step-end infinite; }
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

.footer-tagline {
  font-size: 0.875rem;
  color: var(--text-muted);
  margin-bottom: 20px;
  line-height: 1.6;
  max-width: 280px;
}

.footer-socials { display: flex; gap: 8px; }
.footer-social {
  width: 36px; height: 36px;
  border-radius: 9px;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  color: var(--text-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 200ms;
}
.footer-social:hover { border-color: var(--accent); color: var(--accent); }

/* Col */
.footer-col-title {
  font-size: 0.75rem;
  font-family: var(--font-mono);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 16px;
}

.footer-links { list-style: none; display: flex; flex-direction: column; gap: 8px; }
.footer-link {
  font-size: 0.875rem;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 200ms;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.footer-link::before {
  content: '→';
  font-size: 0.7rem;
  color: var(--accent);
  opacity: 0;
  transform: translateX(-4px);
  transition: all 200ms;
}
.footer-link:hover { color: var(--text-primary); }
.footer-link:hover::before { opacity: 1; transform: translateX(0); }

.footer-contacts { display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px; }
.footer-contact-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 200ms;
}
a.footer-contact-item:hover { color: var(--accent); }

.footer-status {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 0.78rem;
  color: var(--cyan);
  padding: 5px 12px;
  border-radius: 100px;
  background: rgba(0,217,245,0.06);
  border: 1px solid rgba(0,217,245,0.2);
}
.status-dot-sm {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--cyan);
  animation: pulse-sm 2s ease infinite;
}
@keyframes pulse-sm {
  0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(0,217,245,0.4); }
  50% { opacity: 0.8; box-shadow: 0 0 0 4px rgba(0,217,245,0); }
}

/* Bottom */
.footer-bottom {
  border-top: 1px solid var(--border-subtle);
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}
.footer-copy {
  font-size: 0.8rem;
  color: var(--text-muted);
}
.heart { color: #FF6B6B; }

.back-top-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.78rem;
  color: var(--text-muted);
  text-decoration: none;
  padding: 6px 14px;
  border-radius: 8px;
  border: 1px solid var(--border-subtle);
  transition: all 200ms;
}
.back-top-btn:hover { color: var(--accent); border-color: var(--accent); }
</style>
