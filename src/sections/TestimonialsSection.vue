<template>
  <section id="testimonials" class="section" aria-labelledby="test-heading">
    <div class="test-bg" aria-hidden="true"></div>
    <div class="container" style="position:relative;z-index:1;">
      <div class="section-header" style="text-align:center; align-items:center; display:flex; flex-direction:column;">
        <p class="section-label reveal">Testimonials</p>
        <h2 id="test-heading" class="section-title reveal" data-delay="80">
          What Clients <span class="gradient-text">Say</span>
        </h2>
      </div>

      <!-- Slider -->
      <div class="test-slider reveal" data-delay="160">
        <div class="test-track" :style="{ transform: `translateX(-${activeIdx * 100}%)` }">
          <div
            v-for="t in testimonials"
            :key="t.name"
            class="test-slide"
            role="group"
            :aria-label="`Testimonial from ${t.name}`"
          >
            <div class="test-card glass-card">
              <!-- Quote icon -->
              <div class="quote-icon" aria-hidden="true">"</div>

              <blockquote class="test-quote">{{ t.review }}</blockquote>

              <div class="test-author">
                <div class="author-avatar" aria-hidden="true">
                  {{ t.name.charAt(0) }}
                </div>
                <div>
                  <div class="author-name">{{ t.name }}</div>
                  <div class="author-pos">{{ t.position }}</div>
                </div>
                <!-- Stars -->
                <div class="stars" aria-label="5 stars">
                  <Star v-for="n in 5" :key="n" :size="14" fill="currentColor" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Dots -->
        <div class="test-dots" role="tablist" aria-label="Testimonial navigation">
          <button
            v-for="(_, i) in testimonials"
            :key="i"
            :class="['test-dot', { active: activeIdx === i }]"
            @click="goTo(i)"
            :aria-label="`Go to testimonial ${i + 1}`"
            role="tab"
            :aria-selected="activeIdx === i"
          ></button>
        </div>

        <!-- Arrows -->
        <div class="test-arrows">
          <button class="arrow-btn" @click="prev" aria-label="Previous testimonial">
            <ChevronLeft :size="18" />
          </button>
          <button class="arrow-btn" @click="next" aria-label="Next testimonial">
            <ChevronRight :size="18" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Star, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { testimonials } from '@/data/portfolio'

const activeIdx = ref(0)
let autoTimer

function next() {
  activeIdx.value = (activeIdx.value + 1) % testimonials.length
  resetTimer()
}
function prev() {
  activeIdx.value = (activeIdx.value - 1 + testimonials.length) % testimonials.length
  resetTimer()
}
function goTo(i) {
  activeIdx.value = i
  resetTimer()
}
function resetTimer() {
  clearInterval(autoTimer)
  autoTimer = setInterval(next, 4500)
}

onMounted(() => { autoTimer = setInterval(next, 4500) })
onUnmounted(() => clearInterval(autoTimer))
</script>

<style scoped>
.test-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 60% 60% at 50% 50%, rgba(108,99,255,0.05) 0%, transparent 70%);
  pointer-events: none;
}
.section-header { margin-bottom: 48px; }

/* Slider */
.test-slider {
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  max-width: 800px;
  margin: 0 auto;
}

.test-track {
  display: flex;
  transition: transform 500ms var(--ease-out-expo);
}

.test-slide {
  flex: 0 0 100%;
  padding: 0 4px;
}

.test-card {
  padding: 40px;
  position: relative;
  overflow: hidden;
}

.quote-icon {
  position: absolute;
  top: 20px; right: 30px;
  font-size: 6rem;
  font-family: Georgia, serif;
  line-height: 1;
  color: var(--accent);
  opacity: 0.15;
  pointer-events: none;
  user-select: none;
}

.test-quote {
  font-size: 1.05rem;
  color: var(--text-secondary);
  line-height: 1.8;
  font-style: italic;
  margin-bottom: 28px;
  position: relative;
  z-index: 1;
}

.test-author {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}
.author-avatar {
  width: 44px; height: 44px;
  border-radius: 50%;
  background: var(--gradient-hero);
  color: #fff;
  font-weight: 700;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.author-name { font-size: 0.9rem; font-weight: 600; color: var(--text-primary); }
.author-pos  { font-size: 0.78rem; color: var(--text-muted); }
.stars {
  margin-left: auto;
  display: flex;
  gap: 2px;
  color: #FFD580;
}

/* Dots */
.test-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 24px;
}
.test-dot {
  width: 8px; height: 8px;
  border-radius: 100px;
  background: var(--border-subtle);
  border: none;
  cursor: pointer;
  transition: all 300ms;
}
.test-dot.active {
  width: 28px;
  background: var(--accent);
}

/* Arrows */
.test-arrows {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
}
.arrow-btn {
  width: 38px; height: 38px;
  border-radius: 10px;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 200ms;
}
.arrow-btn:hover { border-color: var(--accent); color: var(--accent); }
</style>
