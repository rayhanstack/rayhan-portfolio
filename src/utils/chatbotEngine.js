import {
  personal,
  about,
  skills,
  projects,
  experience,
  education,
  certifications,
  testimonials,
  services,
} from '@/data/portfolio'

export const quickQuestions = [
  'What are his skills?',
  'Show me his projects',
  'What is his work experience?',
  'How can I contact him?',
]

function normalize(str) {
  return str.toLowerCase().trim()
}

const intents = [
  {
    name: 'greeting',
    patterns: ['hi', 'hello', 'hey', 'assalamu', 'salam', 'good morning', 'good evening', 'good afternoon'],
    reply: () =>
      `Hey there! 👋 I'm ${personal.name}'s AI assistant. Ask me about his skills, projects, experience, education, or how to get in touch.`,
  },
  {
    name: 'about',
    patterns: ['who are you', 'who is', 'about him', 'about you', 'tell me about him', 'bio', 'introduce', 'background'],
    reply: () => about.bio,
  },
  {
    name: 'skills',
    patterns: ['skill', 'technology', 'technologies', 'tech stack', 'stack', 'language', 'programming', 'know'],
    reply: () => {
      const lines = skills.map((cat) => `• ${cat.category}: ${cat.items.map((i) => i.name).join(', ')}`)
      return `Here's ${personal.name}'s tech stack:\n\n${lines.join('\n')}`
    },
  },
  {
    name: 'projects',
    patterns: ['project', 'built', 'portfolio', 'app', 'apps', 'made', 'work sample', 'showcase'],
    reply: () => {
      const top = projects.filter((p) => p.featured)
      const lines = top.map((p) => `• ${p.title} — ${p.category}`)
      return `A few notable projects:\n\n${lines.join('\n')}\n\nAsk me "tell me about <project name>" for more detail on any of them.`
    },
  },
  {
    name: 'experience',
    patterns: ['experience', 'job', 'company', 'career', 'work history', 'years of experience', 'currently work', 'where does he work'],
    reply: () => {
      const lines = experience.map((e) => `• ${e.role} at ${e.company} (${e.duration})`)
      return `${personal.name}'s work experience:\n\n${lines.join('\n')}`
    },
  },
  {
    name: 'education',
    patterns: ['education', 'degree', 'study', 'university', 'school', 'qualification', 'academic'],
    reply: () => education.map((e) => `• ${e.degree} — ${e.institution} (${e.duration})`).join('\n'),
  },
  {
    name: 'certifications',
    patterns: ['certification', 'certificate', 'course'],
    reply: () => certifications.map((c) => `• ${c.title} — ${c.issuer} (${c.year})`).join('\n'),
  },
  {
    name: 'services',
    patterns: ['service', 'offer', 'help with', 'do you do', 'can he build', 'what can he do'],
    reply: () => services.map((s) => `• ${s.title}: ${s.description}`).join('\n'),
  },
  {
    name: 'testimonials',
    patterns: ['testimonial', 'review', 'client say', 'feedback', 'recommend'],
    reply: () => testimonials.map((t) => `"${t.review}" — ${t.name}, ${t.position}`).join('\n\n'),
  },
  {
    name: 'availability',
    patterns: ['available', 'freelance', 'hire him', 'open to work', 'open for', 'looking for work'],
    reply: () =>
      personal.availableForWork
        ? `Yes — ${personal.name} is currently available for freelance and full-time opportunities!`
        : `${personal.name} isn't taking new work right now, but feel free to reach out anyway.`,
  },
  {
    name: 'contact',
    patterns: ['contact', 'email', 'phone', 'reach', 'number', 'whatsapp', 'linkedin', 'github', 'social', 'hire'],
    reply: () =>
      `You can reach ${personal.name} at ${personal.email} or ${personal.phone}, based in ${personal.location}. His social links are also in the footer of this site.`,
  },
  {
    name: 'thanks',
    patterns: ['thank', 'thanks', 'dhonnobad', 'appreciate'],
    reply: () => `You're welcome! Anything else you'd like to know about ${personal.name}?`,
  },
]

function findProjectMatch(text) {
  return projects.find((p) => text.includes(p.title.toLowerCase()))
}

function scoreIntent(text, intent) {
  return intent.patterns.reduce((score, fragment) => (text.includes(fragment) ? score + 1 : score), 0)
}

const fallbackReply = () =>
  `I'm not totally sure about that one 🤔 — try asking about ${personal.name}'s skills, projects, experience, education, or how to contact him.`


export function getBotReply(rawText) {
  const text = normalize(rawText)
  if (!text) return fallbackReply()

  const project = findProjectMatch(text)
  if (project) {
    const liveLine = project.liveUrl && project.liveUrl !== '#' ? `\n\nLive demo: ${project.liveUrl}` : ''
    return `**${project.title}** (${project.category})\n\n${project.description}\n\nTech used: ${project.tags.join(', ')}${liveLine}`
  }

  let bestIntent = null
  let bestScore = 0
  for (const intent of intents) {
    const score = scoreIntent(text, intent)
    if (score > bestScore) {
      bestScore = score
      bestIntent = intent
    }
  }

  return bestIntent ? bestIntent.reply() : fallbackReply()
}