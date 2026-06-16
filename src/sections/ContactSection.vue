<template>
  <section id="contact" class="section" aria-labelledby="contact-heading">
    <div class="contact-bg" aria-hidden="true"></div>
    <div class="container" style="position:relative;z-index:1;">
      <div class="contact-grid">
        <!-- Left: Info -->
        <div class="contact-info">
          <p class="section-label reveal">Contact</p>
          <h2 id="contact-heading" class="section-title reveal" data-delay="80">
            Let's Build <span class="gradient-text">Together</span>
          </h2>
          <p class="contact-desc reveal" data-delay="160">
            Have a project in mind or want to discuss opportunities? I'd love to hear from you. I typically respond within 24 hours.
          </p>

          <div class="contact-items reveal" data-delay="240">
            <a :href="`mailto:${personal.email}`" class="contact-item">
              <div class="contact-item-icon">
                <Mail :size="18" />
              </div>
              <div>
                <div class="contact-item-label">Email</div>
                <div class="contact-item-value">{{ personal.email }}</div>
              </div>
            </a>
            <div class="contact-item">
              <div class="contact-item-icon">
                <Phone :size="18" />
              </div>
              <div>
                <div class="contact-item-label">Phone</div>
                <div class="contact-item-value">{{ personal.phone }}</div>
              </div>
            </div>
            <div class="contact-item">
              <div class="contact-item-icon">
                <MapPin :size="18" />
              </div>
              <div>
                <div class="contact-item-label">Location</div>
                <div class="contact-item-value">{{ personal.location }}</div>
              </div>
            </div>
          </div>

          <!-- Socials -->
          <div class="contact-socials reveal" data-delay="320">
            <a
              v-for="s in personal.socials"
              :key="s.name"
              :href="s.url"
              class="social-icon-btn"
              :aria-label="s.name"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github v-if="s.icon === 'Github'" :size="18" />
              <Linkedin v-else-if="s.icon === 'Linkedin'" :size="18" />
              <Twitter v-else-if="s.icon === 'Twitter'" :size="18" />
            </a>
          </div>
        </div>

        <!-- Right: Form -->
        <div class="contact-form-wrap reveal-right" data-delay="100">
          <!-- Success state -->
          <Transition name="fade">
            <div v-if="state === 'success'" class="form-success glass-card">
              <div class="success-icon">
                <CheckCircle2 :size="40" />
              </div>
              <h3>Message Sent!</h3>
              <p>Thank you for reaching out. I'll get back to you soon.</p>
              <button class="btn btn-secondary" @click="resetForm">Send Another</button>
            </div>
          </Transition>

          <form
            v-if="state !== 'success'"
            class="contact-form glass-card"
            @submit.prevent="handleSubmit"
            novalidate
            aria-label="Contact form"
          >
            <div class="form-row">
              <div class="form-group" :class="{ error: errors.name }">
                <label for="name" class="form-label">Full Name</label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  class="form-input"
                  placeholder="John Doe"
                  autocomplete="name"
                  :aria-invalid="!!errors.name"
                  :aria-describedby="errors.name ? 'name-error' : undefined"
                />
                <span v-if="errors.name" id="name-error" class="form-error" role="alert">{{ errors.name }}</span>
              </div>
              <div class="form-group" :class="{ error: errors.email }">
                <label for="email" class="form-label">Email Address</label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  class="form-input"
                  placeholder="john@example.com"
                  autocomplete="email"
                  :aria-invalid="!!errors.email"
                  :aria-describedby="errors.email ? 'email-error' : undefined"
                />
                <span v-if="errors.email" id="email-error" class="form-error" role="alert">{{ errors.email }}</span>
              </div>
            </div>

            <div class="form-group" :class="{ error: errors.subject }">
              <label for="subject" class="form-label">Subject</label>
              <input
                id="subject"
                v-model="form.subject"
                type="text"
                class="form-input"
                placeholder="Project inquiry, collaboration..."
                :aria-invalid="!!errors.subject"
              />
              <span v-if="errors.subject" class="form-error" role="alert">{{ errors.subject }}</span>
            </div>

            <div class="form-group" :class="{ error: errors.message }">
              <label for="message" class="form-label">Message</label>
              <textarea
                id="message"
                v-model="form.message"
                class="form-input form-textarea"
                placeholder="Tell me about your project..."
                rows="5"
                :aria-invalid="!!errors.message"
              ></textarea>
              <span v-if="errors.message" class="form-error" role="alert">{{ errors.message }}</span>
            </div>

            <button
              type="submit"
              class="btn btn-primary submit-btn"
              :disabled="state === 'loading'"
              :aria-busy="state === 'loading'"
            >
              <template v-if="state === 'loading'">
                <Loader2 :size="16" class="spin" />
                Sending…
              </template>
              <template v-else>
                <Send :size="16" />
                Send Message
              </template>
            </button>

            <p v-if="state === 'error'" class="form-error-banner" role="alert">
              <AlertCircle :size="15" /> Something went wrong. Please try again.
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-vue-next'
import { personal } from '@/data/portfolio'

const form = reactive({ name: '', email: '', subject: '', message: '' })
const errors = reactive({ name: '', email: '', subject: '', message: '' })
const state = ref('idle') // idle | loading | success | error

function validate() {
  let valid = true
  errors.name = form.name.trim() ? '' : 'Name is required.'
  errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? '' : 'Valid email is required.'
  errors.subject = form.subject.trim() ? '' : 'Subject is required.'
  errors.message = form.message.trim().length >= 10 ? '' : 'Message must be at least 10 characters.'
  Object.values(errors).forEach(v => { if (v) valid = false })
  return valid
}

async function handleSubmit() {
  if (!validate()) return
  state.value = 'loading'
  // Simulate API call
  await new Promise(r => setTimeout(r, 1500))
  state.value = 'success'
}

function resetForm() {
  Object.assign(form, { name: '', email: '', subject: '', message: '' })
  Object.assign(errors, { name: '', email: '', subject: '', message: '' })
  state.value = 'idle'
}
</script>

<style scoped>
.contact-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 70% 60% at 50% 100%, rgba(108,99,255,0.07) 0%, transparent 70%);
  pointer-events: none;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 60px;
  align-items: start;
}
@media (min-width: 900px) {
  .contact-grid { grid-template-columns: 1fr 1.2fr; }
}

/* Info */
.contact-desc {
  font-size: 1.02rem;
  color: var(--text-secondary);
  line-height: 1.75;
  margin-bottom: 36px;
  max-width: 440px;
}

.contact-items { display: flex; flex-direction: column; gap: 16px; margin-bottom: 28px; }

.contact-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  border-radius: 14px;
  border: 1px solid var(--border-subtle);
  background: var(--bg-card);
  text-decoration: none;
  color: inherit;
  transition: border-color 200ms, transform 200ms;
}
.contact-item:hover { border-color: var(--border); transform: translateX(4px); }

.contact-item-icon {
  width: 40px; height: 40px;
  border-radius: 10px;
  background: var(--accent-dim);
  color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.contact-item-label { font-size: 0.72rem; color: var(--text-muted); margin-bottom: 2px; letter-spacing: 0.03em; }
.contact-item-value { font-size: 0.9rem; font-weight: 500; color: var(--text-primary); }

.contact-socials { display: flex; gap: 8px; }
.social-icon-btn {
  width: 40px; height: 40px;
  border-radius: 10px;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 200ms;
}
.social-icon-btn:hover { border-color: var(--accent); color: var(--accent); }

/* Form */
.contact-form {
  padding: 36px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
@media (max-width: 480px) {
  .contact-form { padding: 24px; }
}

.form-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}
@media (min-width: 500px) {
  .form-row { grid-template-columns: 1fr 1fr; }
}

.form-group { display: flex; flex-direction: column; gap: 6px; }
.form-group.error .form-input { border-color: #FF6B6B; }

.form-label {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-secondary);
  letter-spacing: 0.02em;
}
.form-input {
  padding: 12px 16px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-subtle);
  border-radius: 10px;
  color: var(--text-primary);
  font-family: var(--font-body);
  font-size: 0.9rem;
  transition: border-color 200ms, box-shadow 200ms;
  outline: none;
  width: 100%;
  resize: none;
}
.form-input::placeholder { color: var(--text-muted); }
.form-input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-dim);
}
.form-textarea { resize: vertical; min-height: 120px; }

.form-error { font-size: 0.75rem; color: #FF6B6B; }
.form-error-banner {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  color: #FF6B6B;
  padding: 10px 14px;
  background: rgba(255,107,107,0.08);
  border: 1px solid rgba(255,107,107,0.2);
  border-radius: 8px;
}

.submit-btn { justify-content: center; padding: 14px; font-size: 0.95rem; }
.submit-btn:disabled { opacity: 0.7; cursor: not-allowed; transform: none !important; }

@keyframes spin { to { transform: rotate(360deg); } }
.spin { animation: spin 0.8s linear infinite; }

/* Success */
.form-success {
  padding: 60px 40px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
.success-icon { color: #28C840; }
.form-success h3 { font-size: 1.4rem; font-weight: 700; }
.form-success p { color: var(--text-secondary); margin-bottom: 8px; }

.fade-enter-active, .fade-leave-active { transition: opacity 300ms; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
