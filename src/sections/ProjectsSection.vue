<template>
  <section id="projects" class="section" aria-labelledby="projects-heading">
    <div class="container">
      <!-- Header -->
      <div class="section-header-row">
        <div>
          <p class="section-label reveal">Projects</p>
          <h2 id="projects-heading" class="section-title reveal" data-delay="80">
            Featured <span class="gradient-text">Work</span>
          </h2>
        </div>
        <a href="#contact" class="btn btn-secondary reveal" data-delay="160" style="align-self:flex-end;">
          <ExternalLink :size="15" /> Hire Me
        </a>
      </div>

      <!-- Filter tabs -->
      <div class="filter-tabs reveal" data-delay="200">
        <button
          v-for="cat in categories"
          :key="cat"
          :class="['filter-btn', { active: activeFilter === cat }]"
          @click="activeFilter = cat"
          :aria-pressed="activeFilter === cat"
        >{{ cat }}</button>
      </div>

      <!-- Projects grid -->
      <TransitionGroup name="project-list" tag="div" class="projects-grid">
        <div
          v-for="(project, i) in filteredProjects"
          :key="project.id"
          class="project-card"
          :class="{ featured: project.featured }"
          @click="openModal(project)"
          :style="{ transitionDelay: `${i * 60}ms` }"
          tabindex="0"
          role="button"
          :aria-label="`View details for ${project.title}`"
          @keydown.enter="openModal(project)"
          @keydown.space.prevent="openModal(project)"
        >
          <!-- Thumbnail -->
          <div class="project-thumb" :style="{ '--accent-color': project.accentColor }">
            <div class="project-thumb-inner">
              <FolderOpen :size="36" class="thumb-icon" />
            </div>
            <div class="project-overlay">
              <Eye :size="20" />
              <span>View Details</span>
            </div>
          </div>

          <!-- Content -->
          <div class="project-content">
            <div class="project-meta">
              <span class="project-category">{{ project.category }}</span>
              <span v-if="project.featured" class="featured-badge">Featured</span>
            </div>
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-desc">{{ project.description }}</p>

            <!-- Tags -->
            <div class="project-tags">
              <span v-for="tag in project.tags.slice(0, 4)" :key="tag" class="project-tag">{{ tag }}</span>
            </div>

            <!-- Links -->
            <div class="project-links" @click.stop>
              <a :href="project.liveUrl" class="btn btn-ghost" target="_blank" rel="noopener noreferrer" aria-label="Live demo">
                <ExternalLink :size="14" /> Live
              </a>
              <a :href="project.githubUrl" class="btn btn-ghost" target="_blank" rel="noopener noreferrer" aria-label="GitHub repo">
                <Github :size="14" /> Code
              </a>
            </div>
          </div>
        </div>
      </TransitionGroup>

      <!-- Empty state -->
      <div v-if="filteredProjects.length === 0" class="empty-state">
        <PackageOpen :size="40" />
        <p>No projects in this category yet.</p>
      </div>
    </div>

    <!-- Project Detail Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="modalProject"
          class="modal-backdrop"
          @click.self="closeModal"
          role="dialog"
          :aria-label="`Project details: ${modalProject.title}`"
          aria-modal="true"
        >
          <div class="modal-panel">
            <!-- Modal header -->
            <div class="modal-header">
              <div>
                <span class="project-category">{{ modalProject.category }}</span>
                <h3 class="modal-title">{{ modalProject.title }}</h3>
              </div>
              <button class="modal-close" @click="closeModal" aria-label="Close modal">
                <X :size="20" />
              </button>
            </div>

            <div class="modal-body">
              <!-- Description -->
              <p class="modal-desc">{{ modalProject.description }}</p>

              <!-- Features -->
              <div class="modal-section">
                <h4 class="modal-section-title">Key Features</h4>
                <ul class="feature-list">
                  <li v-for="feat in modalProject.features" :key="feat" class="feature-item">
                    <CheckCircle2 :size="15" class="feature-check" />
                    {{ feat }}
                  </li>
                </ul>
              </div>

              <!-- Challenge -->
              <div class="modal-section">
                <h4 class="modal-section-title">Challenge Solved</h4>
                <p class="modal-text">{{ modalProject.challenge }}</p>
              </div>

              <!-- Tags -->
              <div class="modal-section">
                <h4 class="modal-section-title">Tech Stack</h4>
                <div class="project-tags">
                  <span v-for="tag in modalProject.tags" :key="tag" class="project-tag">{{ tag }}</span>
                </div>
              </div>

              <!-- Actions -->
              <div class="modal-actions">
                <a :href="modalProject.liveUrl" class="btn btn-primary" target="_blank" rel="noopener noreferrer">
                  <ExternalLink :size="15" /> Live Demo
                </a>
                <a :href="modalProject.githubUrl" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                  <Github :size="15" /> View Code
                </a>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ExternalLink, Github, Eye, FolderOpen, PackageOpen, X, CheckCircle2 } from 'lucide-vue-next'
import { projects } from '@/data/portfolio'

const categories = ['All', ...new Set(projects.map(p => p.category))]
const activeFilter = ref('All')
const modalProject = ref(null)

const filteredProjects = computed(() =>
  activeFilter.value === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter.value)
)

function openModal(project) {
  modalProject.value = project
  document.body.style.overflow = 'hidden'
}
function closeModal() {
  modalProject.value = null
  document.body.style.overflow = ''
}

function onKeydown(e) {
  if (e.key === 'Escape') closeModal()
}
onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.section-header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 32px;
}

/* Filter */
.filter-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 40px;
}
.filter-btn {
  padding: 7px 18px;
  border-radius: 100px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  color: var(--text-secondary);
  transition: all 200ms;
  font-family: var(--font-body);
}
.filter-btn:hover { border-color: var(--border); color: var(--text-primary); }
.filter-btn.active {
  background: var(--accent-dim);
  border-color: var(--accent);
  color: var(--accent);
}

/* Grid */
.projects-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}
@media (min-width: 640px) { .projects-grid { grid-template-columns: 1fr 1fr; } }
@media (min-width: 1024px) { .projects-grid { grid-template-columns: 1fr 1fr 1fr; } }

/* Card */
.project-card {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 280ms var(--ease-smooth), border-color 280ms, box-shadow 280ms;
}
.project-card:hover {
  transform: translateY(-6px);
  border-color: var(--border);
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}
.project-card.featured {
  border-color: rgba(108,99,255,0.25);
}

/* Thumbnail */
.project-thumb {
  height: 180px;
  background: linear-gradient(135deg, color-mix(in srgb, var(--accent-color) 12%, transparent), color-mix(in srgb, var(--accent-color) 4%, transparent));
  border-bottom: 1px solid var(--border-subtle);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}
.project-thumb-inner {
  color: color-mix(in srgb, var(--accent-color) 60%, transparent);
}
.project-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #fff;
  font-size: 0.85rem;
  font-weight: 500;
  opacity: 0;
  transition: opacity 250ms;
}
.project-card:hover .project-overlay { opacity: 1; }

.project-content { padding: 24px; }

.project-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}
.project-category {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  color: var(--accent);
  text-transform: uppercase;
}
.featured-badge {
  font-size: 0.65rem;
  padding: 2px 8px;
  border-radius: 100px;
  background: rgba(0, 217, 245, 0.1);
  border: 1px solid rgba(0, 217, 245, 0.25);
  color: var(--cyan);
  letter-spacing: 0.04em;
}

.project-title {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 8px;
  color: var(--text-primary);
}
.project-desc {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.65;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 16px;
}
.project-tag {
  font-size: 0.72rem;
  padding: 3px 10px;
  border-radius: 100px;
  background: var(--accent-dim);
  color: var(--accent);
  border: 1px solid rgba(108,99,255,0.2);
  font-family: var(--font-mono);
}

.project-links {
  display: flex;
  gap: 4px;
  margin-top: 4px;
}

/* Empty state */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: var(--text-muted);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

/* TransitionGroup */
.project-list-move,
.project-list-enter-active,
.project-list-leave-active {
  transition: all 350ms var(--ease-smooth);
}
.project-list-enter-from { opacity: 0; transform: scale(0.96) translateY(16px); }
.project-list-leave-to   { opacity: 0; transform: scale(0.96) translateY(-16px); }
.project-list-leave-active { position: absolute; }

/* Modal */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  backdrop-filter: blur(8px);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.modal-panel {
  background: var(--bg-panel);
  border: 1px solid var(--border);
  border-radius: 24px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 40px 100px rgba(0,0,0,0.5);
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 28px 28px 0;
  gap: 16px;
}
.modal-title {
  font-size: 1.4rem;
  font-weight: 700;
  margin-top: 6px;
  color: var(--text-primary);
}
.modal-close {
  width: 36px; height: 36px;
  border-radius: 10px;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 200ms;
  flex-shrink: 0;
}
.modal-close:hover { color: var(--text-primary); border-color: var(--border); }

.modal-body { padding: 24px 28px 28px; }
.modal-desc {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.75;
  margin-bottom: 24px;
}
.modal-section { margin-bottom: 24px; }
.modal-section-title {
  font-size: 0.8rem;
  font-family: var(--font-mono);
  letter-spacing: 0.1em;
  color: var(--text-muted);
  text-transform: uppercase;
  margin-bottom: 12px;
}
.modal-text {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.7;
}

.feature-list { list-style: none; display: flex; flex-direction: column; gap: 8px; }
.feature-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
  color: var(--text-secondary);
}
.feature-check { color: var(--cyan); flex-shrink: 0; }

.modal-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 28px;
  padding-top: 24px;
  border-top: 1px solid var(--border-subtle);
}

/* Modal transition */
.modal-enter-active, .modal-leave-active { transition: all 300ms var(--ease-smooth); }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-from .modal-panel { transform: scale(0.95) translateY(20px); }
.modal-leave-to .modal-panel   { transform: scale(0.95) translateY(20px); }
</style>
