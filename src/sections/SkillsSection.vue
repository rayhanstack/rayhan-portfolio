<template>
  <section id="skills" class="section" aria-labelledby="skills-heading">
    <!-- Subtle bg gradient -->
    <div class="skills-bg" aria-hidden="true"></div>

    <div class="container" style="position:relative; z-index:1;">
      <!-- Header -->
      <div class="section-header">
        <p class="section-label reveal">Skills</p>
        <h2 id="skills-heading" class="section-title reveal" data-delay="80">
          My Technical <span class="gradient-text">Arsenal</span>
        </h2>
        <p class="section-desc reveal" data-delay="160">
          Technologies I use to bring ideas to life — from pixel-perfect frontends to scalable backends.
        </p>
      </div>

      <!-- Category tabs -->
      <div class="skill-tabs reveal" data-delay="240" role="tablist" aria-label="Skill categories">
        <button
          v-for="(group, i) in skills"
          :key="group.category"
          :class="['skill-tab', { active: activeTab === i }]"
          @click="activeTab = i"
          :aria-selected="activeTab === i"
          role="tab"
          :id="`tab-${i}`"
          :aria-controls="`panel-${i}`"
        >
          <component :is="getIcon(group.icon)" :size="15" />
          {{ group.category }}
        </button>
      </div>

      <!-- Skills panel -->
      <Transition name="tab-fade" mode="out-in">
        <div
          :key="activeTab"
          class="skills-panel"
          role="tabpanel"
          :id="`panel-${activeTab}`"
          :aria-labelledby="`tab-${activeTab}`"
        >
          <div class="skills-grid">
            <div
              v-for="(skill, i) in skills[activeTab].items"
              :key="skill.name"
              class="skill-card reveal"
              :data-delay="i * 60"
            >
              <div class="skill-top">
                <div class="skill-info">
                  <span class="skill-emoji" aria-hidden="true">{{ skill.icon }}</span>
                  <span class="skill-name">{{ skill.name }}</span>
                </div>
                <span class="skill-pct mono">{{ skill.level }}%</span>
              </div>
              <div class="skill-bar-track" role="progressbar" :aria-valuenow="skill.level" aria-valuemin="0" aria-valuemax="100" :aria-label="`${skill.name} proficiency`">
                <div
                  class="skill-bar-fill"
                  :class="`fill-${skills[activeTab].color}`"
                  :style="{ width: animated ? skill.level + '%' : '0%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Tech cloud (all techs) -->
      <div class="tech-cloud reveal" data-delay="100">
        <p class="tech-cloud-label mono">Also familiar with</p>
        <div class="tech-tags">
          <span v-for="tech in extraTechs" :key="tech" class="tech-tag">{{ tech }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { Monitor, Server, Database, Wrench } from 'lucide-vue-next'
import { skills } from '@/data/portfolio'

const activeTab = ref(0)
const animated = ref(false)

const iconMap = { Monitor, Server, Database, Wrench }
function getIcon(name) { return iconMap[name] || Monitor }

// Animate bars when tab changes
watch(activeTab, async () => {
  animated.value = false
  await nextTick()
  requestAnimationFrame(() => { animated.value = true })
}, { immediate: true })

const extraTechs = [
  'Inertia.js', 'Livewire', 'Alpine.js', 'Webpack', 'Pinia', 'Vuex',
  'Axios', 'Sanctum', 'Passport', 'Horizon', 'Telescope', 'Pest', 'PHPUnit',
  'Bash', 'Linux', 'Nginx', 'GitHub Actions', 'Cloudflare',
]
</script>

<style scoped>
.skills-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 70% 60% at 50% 0%, rgba(108,99,255,0.06) 0%, transparent 70%);
  pointer-events: none;
}

.section-header {
  max-width: 600px;
  margin-bottom: 40px;
}
.section-desc {
  font-size: 1.02rem;
  color: var(--text-secondary);
  line-height: 1.7;
}

/* Tabs */
.skill-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 40px;
}

.skill-tab {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 20px;
  border-radius: 100px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  color: var(--text-secondary);
  transition: all 200ms;
  font-family: var(--font-body);
}
.skill-tab:hover { border-color: var(--border); color: var(--text-primary); }
.skill-tab.active {
  background: var(--accent-dim);
  border-color: var(--accent);
  color: var(--accent);
}

/* Grid */
.skills-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}
@media (min-width: 600px) { .skills-grid { grid-template-columns: 1fr 1fr; } }
@media (min-width: 1024px) { .skills-grid { grid-template-columns: 1fr 1fr 1fr; } }

.skill-card {
  padding: 20px;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 14px;
  transition: border-color 250ms, transform 250ms;
}
.skill-card:hover { border-color: var(--border); transform: translateY(-2px); }

.skill-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}
.skill-info {
  display: flex;
  align-items: center;
  gap: 10px;
}
.skill-emoji { font-size: 1.1rem; line-height: 1; }
.skill-name { font-size: 0.9rem; font-weight: 500; color: var(--text-primary); }
.skill-pct { font-size: 0.78rem; color: var(--text-muted); }

.skill-bar-track {
  height: 5px;
  background: var(--border-subtle);
  border-radius: 100px;
  overflow: hidden;
}
.skill-bar-fill {
  height: 100%;
  border-radius: 100px;
  transition: width 0.9s cubic-bezier(0.16, 1, 0.3, 1);
}
.fill-accent { background: linear-gradient(90deg, var(--accent), var(--accent-light)); }
.fill-cyan   { background: linear-gradient(90deg, #00D9F5, #4DE8FF); }
.fill-violet { background: linear-gradient(90deg, var(--violet), #C893FF); }

/* Tech cloud */
.tech-cloud {
  margin-top: 60px;
  text-align: center;
}
.tech-cloud-label {
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  color: var(--text-muted);
  margin-bottom: 16px;
}
.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}
.tech-tag {
  font-size: 0.8rem;
  padding: 5px 14px;
  border-radius: 100px;
  border: 1px solid var(--border-subtle);
  color: var(--text-secondary);
  background: var(--bg-card);
  transition: all 200ms;
  cursor: default;
}
.tech-tag:hover {
  border-color: var(--accent);
  color: var(--accent);
}

/* Tab transition */
.tab-fade-enter-active, .tab-fade-leave-active {
  transition: opacity 200ms, transform 200ms;
}
.tab-fade-enter-from { opacity: 0; transform: translateY(8px); }
.tab-fade-leave-to   { opacity: 0; transform: translateY(-8px); }
</style>
