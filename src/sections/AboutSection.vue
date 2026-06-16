<template>
  <section id="about" class="section" aria-labelledby="about-heading">
    <div class="container">
      <div class="about-grid">
        <!-- Left: Image + decorative -->
        <div class="about-visual reveal-left">
          <div class="about-img-wrap">
            <div class="about-img-placeholder" aria-label="Profile photo placeholder">
              <div class="img-inner">
                <User :size="72" />
              </div>
              <!-- Accent ring -->
              <div class="img-ring" aria-hidden="true"></div>
              <!-- Floating experience badge -->
              <div class="exp-badge">
                <span class="exp-num gradient-text">3+</span>
                <span class="exp-label">Years of<br/>Experience</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Text content -->
        <div class="about-content">
          <p class="section-label reveal" data-delay="0">About Me</p>
          <h2 id="about-heading" class="section-title reveal" data-delay="80">
            Turning ideas into<br /><span class="gradient-text">elegant code</span>
          </h2>

          <p class="about-bio reveal" data-delay="160">{{ about.bio }}</p>
          <p class="about-bio reveal" data-delay="240" style="margin-top:16px;">{{ about.approach }}</p>

          <!-- Highlights -->
          <div class="about-highlights reveal" data-delay="320">
            <div v-for="item in highlights" :key="item.label" class="highlight-item">
              <div class="highlight-icon">
                <component :is="item.iconComp" :size="18" />
              </div>
              <div>
                <div class="highlight-label">{{ item.label }}</div>
                <div class="highlight-value">{{ item.value }}</div>
              </div>
            </div>
          </div>

          <!-- CTA -->
          <div class="about-actions reveal" data-delay="400">
            <a href="#contact" class="btn btn-primary">
              <MessageSquare :size="15" /> Let's Talk
            </a>
            <a :href="personal.resumeUrl" class="btn btn-secondary" download>
              <Download :size="15" /> Download CV
            </a>
          </div>
        </div>
      </div>

      <!-- Stats row -->
      <div class="stats-row">
        <div
          v-for="(stat, i) in stats"
          :key="stat.label"
          class="stat-card glass-card reveal"
          :data-delay="i * 80"
        >
          <span class="stat-card-value gradient-text">{{ stat.value }}</span>
          <span class="stat-card-label">{{ stat.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { User, MapPin, Mail, Download, MessageSquare, Code2, Coffee, Clock } from 'lucide-vue-next'
import { personal, about, stats } from '@/data/portfolio'

const highlights = [
  { label: 'Location',    value: personal.location,  iconComp: MapPin },
  { label: 'Email',       value: personal.email,     iconComp: Mail },
  { label: 'Stack',       value: 'Laravel · Vue 3',  iconComp: Code2 },
  { label: 'Availability',value: 'Open to work',     iconComp: Clock },
]
</script>

<style scoped>
.about-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 60px;
  align-items: center;
  margin-bottom: 80px;
}
@media (min-width: 900px) {
  .about-grid { grid-template-columns: 1fr 1.4fr; gap: 80px; }
}

/* Visual */
.about-visual { display: flex; justify-content: center; }

.about-img-wrap { position: relative; width: fit-content; }

.about-img-placeholder {
  width: 300px;
  height: 360px;
  border-radius: 24px;
  background: var(--gradient-card);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: visible;
}
@media (max-width: 480px) {
  .about-img-placeholder { width: 240px; height: 290px; }
}

.img-inner {
  width: 120px; height: 120px;
  border-radius: 50%;
  background: var(--accent-dim);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
}

.img-ring {
  position: absolute;
  inset: -8px;
  border-radius: 28px;
  border: 1px dashed rgba(108, 99, 255, 0.3);
  animation: ring-spin 20s linear infinite;
  pointer-events: none;
}
@keyframes ring-spin { to { transform: rotate(360deg); } }

.exp-badge {
  position: absolute;
  bottom: -20px;
  right: -20px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 14px 18px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: var(--shadow-card);
}
.exp-num {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 800;
  line-height: 1;
}
.exp-label {
  font-size: 0.7rem;
  color: var(--text-muted);
  line-height: 1.4;
}

/* Content */
.about-bio {
  font-size: 1.02rem;
  color: var(--text-secondary);
  line-height: 1.8;
  max-width: 560px;
}

.about-highlights {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin: 28px 0;
}
@media (max-width: 500px) {
  .about-highlights { grid-template-columns: 1fr; }
}

.highlight-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px;
  border-radius: 12px;
  border: 1px solid var(--border-subtle);
  background: var(--bg-card);
  transition: border-color 250ms;
}
.highlight-item:hover { border-color: var(--border); }

.highlight-icon {
  width: 36px; height: 36px;
  border-radius: 10px;
  background: var(--accent-dim);
  color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.highlight-label {
  font-size: 0.72rem;
  color: var(--text-muted);
  letter-spacing: 0.04em;
  margin-bottom: 2px;
}
.highlight-value {
  font-size: 0.88rem;
  font-weight: 500;
  color: var(--text-primary);
}

.about-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

/* Stats row */
.stats-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
@media (min-width: 640px) {
  .stats-row { grid-template-columns: repeat(4, 1fr); }
}

.stat-card {
  padding: 28px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  text-align: center;
  transition: transform 250ms, border-color 250ms;
}
.stat-card:hover {
  transform: translateY(-4px);
  border-color: var(--border);
}
.stat-card-value {
  font-family: var(--font-display);
  font-size: 2.4rem;
  font-weight: 800;
  line-height: 1;
}
.stat-card-label {
  font-size: 0.8rem;
  color: var(--text-muted);
  letter-spacing: 0.03em;
}
</style>
