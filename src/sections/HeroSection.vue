<template>
  <section id="hero" class="hero-section noise" aria-label="Introduction">
    <div class="blob blob-1" aria-hidden="true"></div>
    <div class="blob blob-2" aria-hidden="true"></div>
    <div class="blob blob-3" aria-hidden="true"></div>
    <div class="hero-grid" aria-hidden="true"></div>

    <div class="container hero-inner">
      <!-- ─── LEFT: Content ─────────────────────────────────────── -->
      <div class="hero-content">
        <div class="status-badge reveal" data-delay="0">
          <span class="status-dot" aria-hidden="true"></span>
          <span class="mono" style="font-size:0.75rem;letter-spacing:0.05em;">Available for new projects</span>
        </div>

        <h1 class="hero-name reveal" data-delay="100">
          Hi, I'm<br />
          <span class="gradient-text">{{ personal.name }}</span>
        </h1>

        <div class="hero-role reveal" data-delay="200" aria-live="polite">
          <span class="role-prefix mono">$ </span>
          <span class="role-text">{{ displayedRole }}</span>
          <span class="role-cursor mono" aria-hidden="true">▋</span>
        </div>

        <p class="hero-desc reveal" data-delay="300">{{ personal.description }}</p>

        <div class="hero-ctas reveal" data-delay="400">
          <a href="#contact" class="btn btn-primary btn-lg"><Zap :size="16" />Hire Me</a>
          <a href="#projects" class="btn btn-secondary btn-lg"><FolderOpen :size="16" />View Projects</a>
          <a :href="personal.resumeUrl" class="btn btn-ghost" download><Download :size="15" />Resume</a>
        </div>

        <div class="hero-socials reveal" data-delay="500">
          <template v-for="social in personal.socials" :key="social.name">
            <a :href="social.url" class="social-link" :aria-label="social.name" target="_blank" rel="noopener noreferrer">
              <Github v-if="social.icon === 'Github'" :size="18" />
              <Linkedin v-else-if="social.icon === 'Linkedin'" :size="18" />
              <Twitter v-else-if="social.icon === 'Twitter'" :size="18" />
            </a>
          </template>
          <div class="social-divider" aria-hidden="true"></div>
          <span class="social-label mono">Follow me</span>
        </div>
      </div>

      <!-- ─── RIGHT: Visual ─────────────────────────────────────── -->
      <div class="hero-visual" aria-hidden="true">

        <!-- Outer glow ring -->
        <div class="v-glow-ring"></div>

        <!-- Orbiting tech icons -->
        <div class="orbit-ring orbit-outer">
          <div v-for="(tech, i) in outerOrbit" :key="tech.label"
               class="orbit-item"
               :style="orbitStyle(i, outerOrbit.length, 'outer')">
            <div class="orbit-icon" :style="{ background: tech.bg, color: tech.color }">
              <span>{{ tech.emoji }}</span>
            </div>
            <span class="orbit-label">{{ tech.label }}</span>
          </div>
        </div>

        <div class="orbit-ring orbit-inner">
          <div v-for="(tech, i) in innerOrbit" :key="tech.label"
               class="orbit-item"
               :style="orbitStyle(i, innerOrbit.length, 'inner')">
            <div class="orbit-icon sm" :style="{ background: tech.bg, color: tech.color }">
              <span>{{ tech.emoji }}</span>
            </div>
          </div>
        </div>

        <!-- Center card -->
        <div class="v-center-card">
          <!-- Profile avatar -->
          <div class="v-avatar-wrap">
            <div class="v-avatar">
              <div class="v-avatar-inner">
                <span class="v-avatar-initials">RA</span>
              </div>
            </div>
            <!-- Rotating dashed ring -->
            <div class="v-avatar-ring"></div>
            <!-- Online pulse -->
            <div class="v-online-dot"></div>
          </div>

          <!-- Name & title -->
          <div class="v-identity">
            <h2 class="v-name">{{ personal.name }}</h2>
            <p class="v-title mono">Full Stack Developer</p>
          </div>

          <!-- Animated activity feed -->
          <div class="v-activity">
            <div class="v-activity-header">
              <span class="v-activity-dot"></span>
              <span class="mono" style="font-size:0.65rem;letter-spacing:0.08em;color:var(--text-muted);">LIVE ACTIVITY</span>
            </div>
            <TransitionGroup name="feed" tag="div" class="v-feed">
              <div v-for="item in visibleFeed" :key="item.id" class="v-feed-item">
                <span class="v-feed-icon">{{ item.icon }}</span>
                <span class="v-feed-text">{{ item.text }}</span>
                <span class="v-feed-time mono">{{ item.time }}</span>
              </div>
            </TransitionGroup>
          </div>

          <!-- Stat pills row -->
          <div class="v-pills">
            <div v-for="stat in stats.slice(0,3)" :key="stat.label" class="v-pill">
              <span class="v-pill-val gradient-text">{{ stat.value }}</span>
              <span class="v-pill-lbl">{{ stat.label }}</span>
            </div>
          </div>
        </div>

        <!-- Floating accent cards -->
        <div class="v-float-card fc-1">
          <CheckCircle :size="14" class="fc-icon-check" />
          <div>
            <div class="fc-title">Project Delivered</div>
            <div class="fc-sub mono">E-Commerce Platform</div>
          </div>
        </div>

        <div class="v-float-card fc-2">
          <div class="fc-spark-row">
            <div v-for="(h, i) in sparkHeights" :key="i"
                 class="fc-spark-bar"
                 :style="{ height: h + 'px', animationDelay: i * 120 + 'ms' }">
            </div>
          </div>
          <div class="fc-spark-label mono">Code Activity</div>
        </div>

        <div class="v-float-card fc-3">
          <Star :size="13" class="fc-star" fill="currentColor" />
          <div>
            <div class="fc-title">5.0 Rating</div>
            <div class="fc-sub mono">Client Satisfaction</div>
          </div>
        </div>

      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="scroll-indicator" aria-hidden="true">
      <div class="scroll-mouse"><div class="scroll-wheel"></div></div>
      <span class="mono" style="font-size:0.7rem;letter-spacing:0.1em;">SCROLL</span>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { Zap, FolderOpen, Download, Github, Linkedin, Twitter, CheckCircle, Star } from 'lucide-vue-next'
import { personal, stats } from '@/data/portfolio'

// ── Typewriter ────────────────────────────────────────────────
const roles = personal.roles
const displayedRole = ref('')
let roleIndex = 0, charIndex = 0, isDeleting = false, typeTimer

function typeRole() {
  const current = roles[roleIndex]
  if (!isDeleting) {
    displayedRole.value = current.slice(0, charIndex + 1)
    charIndex++
    if (charIndex === current.length) { isDeleting = true; typeTimer = setTimeout(typeRole, 1800); return }
  } else {
    displayedRole.value = current.slice(0, charIndex - 1)
    charIndex--
    if (charIndex === 0) { isDeleting = false; roleIndex = (roleIndex + 1) % roles.length }
  }
  typeTimer = setTimeout(typeRole, isDeleting ? 40 : 80)
}

// ── Orbit layout ──────────────────────────────────────────────
const outerOrbit = [
  { label: 'Laravel',   emoji: '🔴', bg: 'rgba(255,45,45,0.12)',    color: '#FF6B6B' },
  { label: 'Vue 3',     emoji: '⚡', bg: 'rgba(65,184,131,0.12)',   color: '#41B883' },
  { label: 'Tailwind',  emoji: '🎨', bg: 'rgba(56,189,248,0.12)',   color: '#38BDF8' },
  { label: 'MySQL',     emoji: '🐬', bg: 'rgba(0,147,201,0.12)',    color: '#0093C9' },
  { label: 'Git',       emoji: '🐙', bg: 'rgba(240,80,50,0.12)',    color: '#F05032' },
  { label: 'PHP',       emoji: '🐘', bg: 'rgba(119,123,180,0.12)', color: '#777BB4' },
]
const innerOrbit = [
  { label: 'Vite',    emoji: '⚡', bg: 'rgba(189,52,254,0.12)', color: '#BD34FE' },
  { label: 'React',   emoji: '⚛️',  bg: 'rgba(97,218,251,0.12)', color: '#61DAFB' },
  { label: 'Docker',  emoji: '🐳', bg: 'rgba(13,183,237,0.12)', color: '#0DB7ED' },
  { label: 'Linux',   emoji: '🐧', bg: 'rgba(255,200,40,0.12)', color: '#FFC828' },
]

function orbitStyle(i, total, ring) {
  const angle = (360 / total) * i - 90
  const r = ring === 'outer' ? 175 : 105
  const rad = (angle * Math.PI) / 180
  const x = Math.cos(rad) * r
  const y = Math.sin(rad) * r
  return {
    position: 'absolute',
    left: `calc(50% + ${x}px)`,
    top:  `calc(50% + ${y}px)`,
    transform: 'translate(-50%, -50%)',
  }
}

// ── Activity feed ─────────────────────────────────────────────
const allFeed = [
  { id: 1,  icon: '✅', text: 'Pushed new API endpoint',       time: '2m ago' },
  { id: 2,  icon: '🚀', text: 'Deployed to production',        time: '1h ago' },
  { id: 3,  icon: '🔧', text: 'Fixed auth middleware bug',     time: '3h ago' },
  { id: 4,  icon: '💡', text: 'Added dark mode toggle',        time: '5h ago' },
  { id: 5,  icon: '📦', text: 'Released v2.1.0',               time: '1d ago' },
  { id: 6,  icon: '🎨', text: 'Redesigned hero section',       time: '2d ago' },
  { id: 7,  icon: '⚡', text: 'Optimized DB query 3x faster',  time: '3d ago' },
]
const feedIndex = ref(0)
const visibleFeed = computed(() => {
  const start = feedIndex.value % allFeed.length
  return [
    allFeed[start % allFeed.length],
    allFeed[(start + 1) % allFeed.length],
    allFeed[(start + 2) % allFeed.length],
  ]
})
let feedTimer

// ── Spark bar heights ─────────────────────────────────────────
const sparkHeights = ref([12, 20, 8, 28, 16, 24, 10, 32, 18, 14])

onMounted(() => {
  typeTimer = setTimeout(typeRole, 600)
  feedTimer = setInterval(() => { feedIndex.value++ }, 2800)
})
onUnmounted(() => {
  clearTimeout(typeTimer)
  clearInterval(feedTimer)
})
</script>

<style scoped>
/* ── Section base ──────────────────────────────────────────── */
.hero-section {
  min-height: 100svh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 100px 0 60px;
}

.blob-1 { width:600px;height:600px;background:rgba(108,99,255,.18);top:-150px;right:-100px;animation-delay:0s; }
.blob-2 { width:400px;height:400px;background:rgba(0,217,245,.12);bottom:-80px;left:-80px;animation-delay:4s; }
.blob-3 { width:300px;height:300px;background:rgba(176,110,255,.1);top:50%;left:40%;animation-delay:8s; }

.hero-grid {
  position:absolute;inset:0;
  background-image:
    linear-gradient(to right,var(--border-subtle) 1px,transparent 1px),
    linear-gradient(to bottom,var(--border-subtle) 1px,transparent 1px);
  background-size:60px 60px;
  mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,black,transparent);
  pointer-events:none;
}

/* ── Layout ─────────────────────────────────────────────────── */
.hero-inner {
  display:grid;grid-template-columns:1fr;gap:60px;
  align-items:center;position:relative;z-index:1;
}
@media(min-width:960px){
  .hero-inner{grid-template-columns:1fr 1fr;gap:80px;}
}

/* ── Left side (unchanged) ───────────────────────────────────── */
.status-badge {
  display:inline-flex;align-items:center;gap:8px;
  padding:6px 14px 6px 10px;border-radius:100px;
  border:1px solid rgba(0,217,245,.25);background:rgba(0,217,245,.06);
  color:var(--cyan);font-size:.8rem;margin-bottom:24px;
}
.status-dot {
  width:7px;height:7px;border-radius:50%;background:var(--cyan);
  animation:pulse-dot 2s ease infinite;
}
@keyframes pulse-dot {
  0%,100%{box-shadow:0 0 0 0 rgba(0,217,245,.5);}
  50%{box-shadow:0 0 0 6px rgba(0,217,245,0);}
}
.hero-name {
  font-size:clamp(2.5rem,7vw,5rem);font-weight:800;line-height:1.0;
  margin-bottom:20px;color:var(--text-primary);
}
.hero-role {
  font-size:clamp(1rem,2.5vw,1.3rem);color:var(--text-secondary);
  margin-bottom:24px;min-height:2em;display:flex;align-items:center;gap:2px;
}
.role-prefix{color:var(--accent);}
.role-text{color:var(--text-primary);font-weight:500;}
.role-cursor{color:var(--accent);animation:blink .9s step-end infinite;}
@keyframes blink{0%,100%{opacity:1;}50%{opacity:0;}}
.hero-desc {
  font-size:1.05rem;color:var(--text-secondary);line-height:1.75;
  max-width:460px;margin-bottom:36px;
}
.hero-ctas{display:flex;flex-wrap:wrap;gap:12px;margin-bottom:36px;}
.btn-lg{padding:14px 28px;font-size:.95rem;}
.hero-socials{display:flex;align-items:center;gap:4px;}
.social-link {
  display:flex;align-items:center;justify-content:center;
  width:38px;height:38px;border-radius:10px;color:var(--text-muted);
  transition:all 200ms;text-decoration:none;
}
.social-link:hover{color:var(--accent);background:var(--accent-dim);}
.social-divider{width:1px;height:20px;background:var(--border-subtle);margin:0 12px;}
.social-label{font-size:.72rem;letter-spacing:.1em;color:var(--text-muted);}

/* ═══════════════════════════════════════════════════════════════
   RIGHT SIDE — NEW DESIGN
═══════════════════════════════════════════════════════════════ */
.hero-visual {
  position:relative;
  width:100%;
  aspect-ratio:1/1;
  max-width:460px;
  margin:0 auto;
  display:flex;
  align-items:center;
  justify-content:center;
}

/* Outer ambient glow ring */
.v-glow-ring {
  position:absolute;
  width:340px;height:340px;
  border-radius:50%;
  background:transparent;
  border:1px solid rgba(108,99,255,.15);
  box-shadow:
    0 0 60px 20px rgba(108,99,255,.08),
    inset 0 0 60px 20px rgba(108,99,255,.04);
  animation:ring-breathe 4s ease-in-out infinite;
  pointer-events:none;
}
@keyframes ring-breathe {
  0%,100%{transform:scale(1);opacity:.7;}
  50%{transform:scale(1.04);opacity:1;}
}

/* ── Orbit rings ────────────────────────────────────────────── */
.orbit-ring {
  position:absolute;
  width:100%;height:100%;
  border-radius:50%;
  pointer-events:none;
}
.orbit-outer { animation:orbit-cw 22s linear infinite; }
.orbit-inner { animation:orbit-ccw 14s linear infinite; }

@keyframes orbit-cw   { from{transform:rotate(0deg);}   to{transform:rotate(360deg);}  }
@keyframes orbit-ccw  { from{transform:rotate(0deg);}   to{transform:rotate(-360deg);} }

.orbit-item {
  /* counter-rotate so icon stays upright */
  display:flex;flex-direction:column;align-items:center;gap:4px;
}
.orbit-outer .orbit-item { animation:counter-cw  22s linear infinite; }
.orbit-inner .orbit-item { animation:counter-ccw 14s linear infinite; }
@keyframes counter-cw  { from{transform:translate(-50%,-50%) rotate(0deg);}   to{transform:translate(-50%,-50%) rotate(-360deg);}  }
@keyframes counter-ccw { from{transform:translate(-50%,-50%) rotate(0deg);}   to{transform:translate(-50%,-50%) rotate(360deg);}   }

.orbit-icon {
  width:40px;height:40px;border-radius:12px;
  display:flex;align-items:center;justify-content:center;
  font-size:1.1rem;line-height:1;
  border:1px solid rgba(255,255,255,.08);
  backdrop-filter:blur(8px);
  box-shadow:0 4px 16px rgba(0,0,0,.3);
  transition:transform 200ms;
}
.orbit-icon:hover{transform:scale(1.15);}
.orbit-icon.sm{width:30px;height:30px;border-radius:9px;font-size:.85rem;}
.orbit-label{font-size:.55rem;font-family:var(--font-mono);color:var(--text-muted);letter-spacing:.06em;white-space:nowrap;}

/* ── Center card ────────────────────────────────────────────── */
.v-center-card {
  position:absolute;
  left:50%;top:50%;transform:translate(-50%,-50%);
  width:230px;
  background:var(--bg-glass);
  border:1px solid var(--border);
  border-radius:24px;
  backdrop-filter:blur(24px);
  -webkit-backdrop-filter:blur(24px);
  padding:20px 16px;
  box-shadow:
    0 0 0 1px rgba(108,99,255,.12),
    0 24px 64px rgba(0,0,0,.5),
    0 0 80px rgba(108,99,255,.1);
  display:flex;flex-direction:column;align-items:center;gap:14px;
  z-index:10;
}

/* Avatar */
.v-avatar-wrap {
  position:relative;
  width:68px;height:68px;
  flex-shrink:0;
}
.v-avatar {
  width:68px;height:68px;border-radius:50%;
  background:linear-gradient(135deg,var(--accent),var(--cyan));
  padding:2px;
}
.v-avatar-inner {
  width:100%;height:100%;border-radius:50%;
  background:var(--bg-card);
  display:flex;align-items:center;justify-content:center;
}
.v-avatar-initials {
  font-family:var(--font-display);font-size:1.3rem;font-weight:800;
  background:var(--gradient-hero);-webkit-background-clip:text;
  -webkit-text-fill-color:transparent;background-clip:text;
}
.v-avatar-ring {
  position:absolute;inset:-5px;border-radius:50%;
  border:1.5px dashed rgba(108,99,255,.35);
  animation:ring-spin 10s linear infinite;
  pointer-events:none;
}
@keyframes ring-spin{to{transform:rotate(360deg);}}
.v-online-dot {
  position:absolute;bottom:2px;right:2px;
  width:12px;height:12px;border-radius:50%;
  background:#28C840;border:2px solid var(--bg-card);
  animation:pulse-dot 2s ease infinite;
}
@keyframes pulse-dot{
  0%,100%{box-shadow:0 0 0 0 rgba(40,200,64,.5);}
  50%{box-shadow:0 0 0 5px rgba(40,200,64,0);}
}

/* Identity */
.v-identity{text-align:center;}
.v-name{font-size:.95rem;font-weight:700;color:var(--text-primary);margin-bottom:2px;}
.v-title{font-size:.62rem;color:var(--accent);letter-spacing:.06em;}

/* Activity feed */
.v-activity{width:100%;}
.v-activity-header{
  display:flex;align-items:center;gap:6px;margin-bottom:8px;
}
.v-activity-dot{
  width:5px;height:5px;border-radius:50%;background:var(--cyan);
  animation:pulse-dot-sm 1.4s ease infinite;
}
@keyframes pulse-dot-sm{
  0%,100%{opacity:1;}50%{opacity:.4;}
}

.v-feed{
  display:flex;flex-direction:column;gap:5px;
  min-height:82px;overflow:hidden;
}
.v-feed-item{
  display:flex;align-items:center;gap:6px;
  padding:5px 8px;border-radius:8px;
  background:rgba(255,255,255,.03);
  border:1px solid rgba(255,255,255,.05);
}
.v-feed-icon{font-size:.75rem;flex-shrink:0;}
.v-feed-text{font-size:.6rem;color:var(--text-secondary);flex:1;min-width:0;
  overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.v-feed-time{font-size:.55rem;color:var(--text-muted);flex-shrink:0;}

/* Feed transition */
.feed-enter-active,.feed-leave-active{transition:all 400ms var(--ease-out-expo);}
.feed-enter-from{opacity:0;transform:translateY(-10px);}
.feed-leave-to  {opacity:0;transform:translateY(8px);}
.feed-move      {transition:transform 400ms var(--ease-out-expo);}

/* Stat pills */
.v-pills{
  display:flex;gap:6px;width:100%;
}
.v-pill{
  flex:1;display:flex;flex-direction:column;align-items:center;
  padding:8px 4px;border-radius:10px;
  background:rgba(108,99,255,.07);
  border:1px solid rgba(108,99,255,.12);
  gap:1px;
}
.v-pill-val{font-family:var(--font-display);font-size:.95rem;font-weight:800;line-height:1;}
.v-pill-lbl{font-size:.5rem;color:var(--text-muted);text-align:center;line-height:1.3;letter-spacing:.03em;}

/* ── Floating accent cards ───────────────────────────────────── */
.v-float-card {
  position:absolute;
  background:var(--bg-glass);
  border:1px solid rgba(255,255,255,.08);
  backdrop-filter:blur(16px);
  -webkit-backdrop-filter:blur(16px);
  border-radius:14px;
  padding:10px 14px;
  display:flex;align-items:center;gap:10px;
  box-shadow:0 8px 32px rgba(0,0,0,.35);
  z-index:20;
  pointer-events:none;
  white-space:nowrap;
}

/* Card 1 — delivered project */
.fc-1 {
  top:6%;left:-2%;
  animation:float-a 4s ease-in-out infinite;
}
.fc-icon-check{color:#28C840;flex-shrink:0;}
.fc-title{font-size:.7rem;font-weight:600;color:var(--text-primary);}
.fc-sub{font-size:.58rem;color:var(--text-muted);}

/* Card 2 — spark chart */
.fc-2 {
  bottom:8%;left:-4%;
  animation:float-b 5.5s ease-in-out infinite;
  flex-direction:column;align-items:flex-start;gap:6px;
}
.fc-spark-row{display:flex;align-items:flex-end;gap:3px;height:32px;}
.fc-spark-bar{
  width:6px;border-radius:3px;
  background:linear-gradient(to top,var(--accent),var(--cyan));
  animation:spark-bounce 1.4s ease-in-out infinite alternate;
}
@keyframes spark-bounce{
  from{opacity:.5;transform:scaleY(.6);}
  to{opacity:1;transform:scaleY(1);}
}
.fc-spark-label{font-size:.58rem;color:var(--text-muted);}

/* Card 3 — rating */
.fc-3 {
  top:6%;right:-2%;
  animation:float-a 6s ease-in-out infinite reverse;
}
.fc-star{color:#FFD580;flex-shrink:0;}

/* Float keyframes */
@keyframes float-a{0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);}}
@keyframes float-b{0%,100%{transform:translateY(0) rotate(-1deg);}50%{transform:translateY(-8px) rotate(1deg);}}

/* ── Scroll indicator ─────────────────────────────────────────── */
.scroll-indicator {
  position:absolute;bottom:28px;left:50%;transform:translateX(-50%);
  display:flex;flex-direction:column;align-items:center;gap:8px;
  color:var(--text-muted);animation:bounce 2s ease-in-out infinite;
}
.scroll-mouse{
  width:22px;height:36px;border:1.5px solid var(--border);
  border-radius:12px;display:flex;justify-content:center;padding-top:7px;
}
.scroll-wheel{
  width:3px;height:6px;border-radius:2px;background:var(--accent);
  animation:scroll-wheel 2s ease-in-out infinite;
}
@keyframes scroll-wheel{0%,100%{transform:translateY(0);opacity:1;}50%{transform:translateY(8px);opacity:.3;}}
@keyframes bounce{0%,100%{transform:translateX(-50%) translateY(0);}50%{transform:translateX(-50%) translateY(-4px);}}
</style>
