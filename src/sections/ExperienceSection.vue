<template>
  <section id="experience" class="section" aria-labelledby="exp-heading">
    <div class="container">
      <p class="section-label reveal">Experience</p>
      <h2 id="exp-heading" class="section-title reveal" data-delay="80">
        Career <span class="gradient-text">Journey</span>
      </h2>

      <div class="timeline">
        <!-- Center line (desktop) -->
        <div class="timeline-center-line" aria-hidden="true"></div>

        <div
          v-for="(item, i) in experience"
          :key="item.company"
          :class="['timeline-item', i % 2 === 0 ? 'left' : 'right']"
        >
          <!-- Dot -->
          <div class="timeline-dot" aria-hidden="true">
            <Briefcase :size="14" />
          </div>

          <!-- Card -->
          <div
            class="timeline-card glass-card"
            :class="i % 2 === 0 ? 'reveal-left' : 'reveal-right'"
            :data-delay="i * 120"
          >
            <div class="card-header">
              <div>
                <h3 class="exp-role">{{ item.role }}</h3>
                <div class="exp-company">
                  <Building2 :size="13" />
                  {{ item.company }}
                </div>
              </div>
              <span class="exp-duration mono">{{ item.duration }}</span>
            </div>
            <p class="exp-desc">{{ item.description }}</p>
            <div class="exp-tags">
              <span v-for="tech in item.technologies" :key="tech" class="exp-tag">{{ tech }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Briefcase, Building2 } from 'lucide-vue-next'
import { experience } from '@/data/portfolio'
</script>

<style scoped>
.timeline {
  position: relative;
  margin-top: 60px;
}

.timeline-center-line {
  display: none;
  position: absolute;
  left: 50%;
  top: 0; bottom: 0;
  width: 1px;
  background: linear-gradient(to bottom, transparent, var(--border), transparent);
  transform: translateX(-50%);
}
@media (min-width: 800px) {
  .timeline-center-line { display: block; }
}

/* Items */
.timeline-item {
  position: relative;
  display: flex;
  margin-bottom: 40px;
}

@media (min-width: 800px) {
  .timeline-item { width: 50%; }
  .timeline-item.left  { padding-right: 48px; justify-content: flex-end; }
  .timeline-item.right { padding-left: 48px; margin-left: 50%; }
}

/* Dot */
.timeline-dot {
  display: none;
  position: absolute;
  width: 36px; height: 36px;
  border-radius: 50%;
  background: var(--bg-card);
  border: 2px solid var(--accent);
  color: var(--accent);
  align-items: center;
  justify-content: center;
  z-index: 2;
}
@media (min-width: 800px) {
  .timeline-dot { display: flex; }
  .left  .timeline-dot { right: -18px; top: 20px; }
  .right .timeline-dot { left: -18px;  top: 20px; }
}

/* Card */
.timeline-card {
  padding: 28px;
  width: 100%;
  max-width: 480px;
  transition: transform 250ms, border-color 250ms;
}
.timeline-card:hover { transform: translateY(-3px); border-color: var(--border); }

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}
.exp-role {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 4px;
}
.exp-company {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.85rem;
  color: var(--accent);
  font-weight: 500;
}
.exp-duration {
  font-size: 0.72rem;
  color: var(--text-muted);
  white-space: nowrap;
  padding: 4px 10px;
  background: var(--accent-dim);
  border-radius: 100px;
  border: 1px solid rgba(108,99,255,0.2);
  letter-spacing: 0.04em;
}
.exp-desc {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 16px;
}
.exp-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.exp-tag {
  font-size: 0.7rem;
  padding: 3px 10px;
  border-radius: 100px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-subtle);
  color: var(--text-muted);
  font-family: var(--font-mono);
}
</style>
