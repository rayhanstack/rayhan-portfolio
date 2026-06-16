<template>
  <section id="certifications" class="section" aria-labelledby="edu-heading">
    <div class="container">
      <div class="edu-grid">
        <!-- Education -->
        <div>
          <p class="section-label reveal">Background</p>
          <h2 id="edu-heading" class="section-title reveal" data-delay="80">
            <span class="gradient-text">Education</span>
          </h2>

          <div class="edu-cards">
            <div
              v-for="(item, i) in education"
              :key="item.degree"
              class="edu-card glass-card reveal"
              :data-delay="i * 100"
            >
              <div class="edu-icon">
                <GraduationCap :size="20" />
              </div>
              <div class="edu-content">
                <h3 class="edu-degree">{{ item.degree }}</h3>
                <div class="edu-inst">
                  <Building2 :size="13" />
                  {{ item.institution }}
                </div>
                <div class="edu-meta">
                  <span class="mono" style="font-size:0.72rem; color:var(--text-muted);">{{ item.duration }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Certifications -->
        <div>
          <p class="section-label reveal" data-delay="0">Credentials</p>
          <h2 class="section-title reveal" data-delay="80">
            <span class="gradient-text">Certifications</span>
          </h2>

          <div class="cert-cards">
            <div
              v-for="(cert, i) in certifications"
              :key="cert.title"
              class="cert-card reveal"
              :data-delay="i * 80"
            >
              <div class="cert-emoji" aria-hidden="true">{{ cert.icon }}</div>
              <div class="cert-content">
                <h3 class="cert-title">{{ cert.title }}</h3>
                <div class="cert-meta">
                  <span class="cert-issuer">{{ cert.issuer }}</span>
                  <span class="cert-year mono">{{ cert.year }}</span>
                </div>
              </div>
              <div class="cert-badge">
                <Award :size="14" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { GraduationCap, Building2, Award } from 'lucide-vue-next'
import { education, certifications } from '@/data/portfolio'
</script>

<style scoped>
.edu-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 60px;
}
@media (min-width: 900px) {
  .edu-grid { grid-template-columns: 1fr 1fr; gap: 80px; }
}

/* Education */
.edu-cards { display: flex; flex-direction: column; gap: 20px; margin-top: 32px; }

.edu-card {
  display: flex;
  gap: 20px;
  padding: 24px;
  transition: transform 250ms, border-color 250ms;
}
.edu-card:hover { transform: translateY(-3px); border-color: var(--border); }

.edu-icon {
  width: 44px; height: 44px;
  border-radius: 12px;
  background: var(--accent-dim);
  color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.edu-content { flex: 1; min-width: 0; }
.edu-degree {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 6px;
  line-height: 1.3;
}
.edu-inst {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.85rem;
  color: var(--accent);
  margin-bottom: 8px;
}
.edu-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

/* Certifications */
.cert-cards { display: flex; flex-direction: column; gap: 14px; margin-top: 32px; }

.cert-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px 20px;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 14px;
  transition: transform 250ms, border-color 250ms;
}
.cert-card:hover { transform: translateY(-2px) translateX(3px); border-color: var(--border); }

.cert-emoji { font-size: 1.5rem; flex-shrink: 0; line-height: 1; }
.cert-content { flex: 1; min-width: 0; }
.cert-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
}
.cert-meta { display: flex; justify-content: space-between; align-items: center; gap: 8px; }
.cert-issuer { font-size: 0.78rem; color: var(--text-secondary); }
.cert-year {
  font-size: 0.7rem;
  color: var(--text-muted);
  white-space: nowrap;
}
.cert-badge {
  width: 30px; height: 30px;
  border-radius: 8px;
  background: rgba(0,217,245,0.08);
  color: var(--cyan);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
</style>
