<template>
  <section id="services" class="section" aria-labelledby="services-heading">
    <div class="services-bg" aria-hidden="true"></div>
    <div class="container" style="position:relative;z-index:1;">
      <div class="section-header">
        <p class="section-label reveal">Services</p>
        <h2 id="services-heading" class="section-title reveal" data-delay="80">
          What I <span class="gradient-text">Deliver</span>
        </h2>
        <p class="section-desc reveal" data-delay="160">
          From architecture to deployment — I cover the full spectrum of modern web development.
        </p>
      </div>

      <div class="services-grid">
        <div
          v-for="(service, i) in services"
          :key="service.title"
          class="service-card reveal"
          :data-delay="i * 70"
        >
          <div class="service-icon-wrap">
            <component :is="getIcon(service.icon)" :size="22" class="service-icon" />
          </div>
          <h3 class="service-title">{{ service.title }}</h3>
          <p class="service-desc">{{ service.description }}</p>
          <div class="service-arrow">
            <ArrowRight :size="16" />
          </div>
        </div>
      </div>

      <!-- CTA strip -->
      <div class="services-cta reveal" data-delay="100">
        <div class="cta-text">
          <h3>Got a project in mind?</h3>
          <p>Let's discuss how I can help bring it to life.</p>
        </div>
        <a href="#contact" class="btn btn-primary">
          <Zap :size="15" /> Start a Project
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Layers, Monitor, Server, Zap, Shield, Wrench, ArrowRight } from 'lucide-vue-next'
import { services } from '@/data/portfolio'

const iconMap = { Layers, Monitor, Server, Zap, Shield, Wrench }
function getIcon(name) { return iconMap[name] || Layers }
</script>

<style scoped>
.services-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 60% 50% at 50% 100%, rgba(0,217,245,0.05) 0%, transparent 70%);
  pointer-events: none;
}
.section-header { max-width: 560px; margin-bottom: 48px; }
.section-desc { font-size: 1.02rem; color: var(--text-secondary); line-height: 1.7; }

.services-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-bottom: 60px;
}
@media (min-width: 600px) { .services-grid { grid-template-columns: 1fr 1fr; } }
@media (min-width: 1024px) { .services-grid { grid-template-columns: repeat(3, 1fr); } }

.service-card {
  padding: 28px;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  transition: transform 280ms var(--ease-smooth), border-color 280ms, box-shadow 280ms;
  cursor: default;
}
.service-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: var(--gradient-hero);
  opacity: 0;
  transition: opacity 280ms;
}
.service-card:hover {
  transform: translateY(-5px);
  border-color: var(--border);
  box-shadow: 0 20px 50px rgba(0,0,0,0.25);
}
.service-card:hover::before { opacity: 1; }
.service-card:hover .service-arrow { opacity: 1; transform: translate(2px, -2px); }

.service-icon-wrap {
  width: 48px; height: 48px;
  border-radius: 14px;
  background: var(--accent-dim);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  transition: background 280ms;
}
.service-card:hover .service-icon-wrap { background: rgba(108,99,255,0.2); }
.service-icon { color: var(--accent); }

.service-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 10px;
}
.service-desc {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.7;
}

.service-arrow {
  position: absolute;
  top: 28px; right: 28px;
  color: var(--accent);
  opacity: 0;
  transition: all 280ms var(--ease-smooth);
}

/* CTA strip */
.services-cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  padding: 36px 40px;
  border-radius: 20px;
  background: var(--gradient-card);
  border: 1px solid var(--border);
}
.cta-text h3 {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 4px;
}
.cta-text p { font-size: 0.9rem; color: var(--text-secondary); }
</style>
