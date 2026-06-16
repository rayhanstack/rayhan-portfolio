// src/data/portfolio.js — All portfolio content in one place

export const personal = {
  name: 'Rayhan',
  title: 'Full Stack Developer',
  roles: ['Full Stack Developer','PHP & Laravel Expert','Vue.js Specialist','React Developer','REST API Architect','SaaS Application Developer','Performance Optimization Expert'],
  tagline: 'Crafting digital experiences that matter.',
  description:
    'I build robust, scalable web applications with clean code and elegant interfaces. Specializing in Laravel & Vue.js ecosystems.',
  email: 'rayhanali0907@gmail.com',
  phone: '+880 1797-736085',
  location: 'Dhaka, Bangladesh',
  resumeUrl: '#',
  availableForWork: true,
  socials: [
    { name: 'GitHub',   url: 'https://github.com/rayhanstack',   icon: 'Github' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/rayhanali0977',  icon: 'Linkedin' },
    { name: 'Facebook',  url: 'https://facebook.com/Rayhan0977',   icon: 'Facebook' },
  ],
}

export const stats = [
  { value: '3+',  label: 'Years Experience' },
  { value: '40+', label: 'Projects Completed' },
  { value: '20+', label: 'Happy Clients' },
  { value: '15+', label: 'Technologies' },
]

export const about = {
  bio: "I'm a passionate Full Stack Developer based in Dhaka, Bangladesh, with over 3 years of experience building production-grade web applications. I specialize in the Laravel + Vue.js ecosystem, crafting backends that are secure and performant, paired with frontends that feel alive.",
  approach:
    "My approach is simple: understand the problem deeply before writing a single line of code. I believe great software is born from clarity of thought, disciplined architecture, and relentless attention to detail.",
}

export const skills = [
  {
    category: 'Frontend',
    color: 'accent',
    icon: 'Monitor',
    items: [
      { name: 'Vue.js 3',     level: 95, icon: '⚡' },
      { name: 'React',        level: 80, icon: '⚛️' },
      { name: 'JavaScript',   level: 92, icon: '𝗝𝗦' },
      { name: 'Tailwind CSS', level: 95, icon: '🎨' },
      { name: 'Inertia.js',   level: 90, icon: '🔗' },
      { name: 'TypeScript',   level: 75, icon: '🔷' },
    ],
  },
  {
    category: 'Backend',
    color: 'cyan',
    icon: 'Server',
    items: [
      { name: 'Laravel',    level: 95, icon: '🔴' },
      { name: 'PHP',        level: 90, icon: '🐘' },
      { name: 'REST API',   level: 92, icon: '📡' },
      { name: 'Node.js',    level: 70, icon: '🟩' },
    ],
  },
  {
    category: 'Database',
    color: 'violet',
    icon: 'Database',
    items: [
      { name: 'MySQL',      level: 90, icon: '🐬' },
      { name: 'PostgreSQL', level: 80, icon: '🐘' },
      { name: 'Redis',      level: 72, icon: '🔴' },
      { name: 'SQLite',     level: 85, icon: '🗄️' },
    ],
  },
  {
    category: 'Tools & DevOps',
    color: 'accent',
    icon: 'Wrench',
    items: [
      { name: 'Git / GitHub', level: 93, icon: '🐙' },
      { name: 'Docker',       level: 70, icon: '🐳' },
      { name: 'Vite',         level: 90, icon: '⚡' },
      { name: 'Figma',        level: 75, icon: '🎭' },
      { name: 'Postman',      level: 88, icon: '📮' },
      { name: 'Vercel / VPS', level: 82, icon: '🚀' },
    ],
  },
]

export const projects = [
  {
    id: 1,
    title: 'Portfolio Admin Panel',
    category: 'Dashboard',
    description:
      'A feature-rich admin panel built with Laravel 12, Inertia.js, and Vue 3. Includes CRUD for Services, Education, Certifications, and web push notifications.',
    thumbnail: null,
    tags: ['Laravel', 'Vue 3', 'Inertia.js', 'Tailwind'],
    features: ['Role-based access', 'File uploads', 'Web Push notifications', 'Dynamic CRUD'],
    challenge: 'Architected a single-page admin experience with Inertia.js, removing the need for a separate API while keeping the codebase maintainable.',
    liveUrl:   '#',
    githubUrl: '#',
    featured:  true,
    accentColor: '#6C63FF',
  },
  {
    id: 2,
    title: 'LiveTV Streaming App',
    category: 'Web App',
    description:
      'A production-ready live TV streaming frontend built with React 19 + TypeScript. Features 48 channels, HLS.js playback, category filtering, and a hero carousel.',
    thumbnail: null,
    tags: ['React 19', 'TypeScript', 'Zustand', 'Video.js', 'HLS.js'],
    features: ['48 channel catalog', 'HLS stream playback', 'Category filtering', 'Responsive UI'],
    challenge:
      'Implemented seamless HLS stream switching with Video.js and Zustand state without re-mounting the player component.',
    liveUrl:   '#',
    githubUrl: '#',
    featured:  true,
    accentColor: '#00D9F5',
  },
  {
    id: 3,
    title: 'E-Commerce Platform',
    category: 'Web App',
    description:
      'Full-featured e-commerce platform with cart management, Stripe payments, order tracking, and admin dashboard built on Laravel + Vue.',
    thumbnail: null,
    tags: ['Laravel', 'Vue 3', 'Stripe', 'MySQL'],
    features: ['Shopping cart', 'Payment gateway', 'Order management', 'Admin reports'],
    challenge:
      'Designed an event-driven order pipeline with Laravel queues to handle payment webhooks reliably at scale.',
    liveUrl:   '#',
    githubUrl: '#',
    featured:  false,
    accentColor: '#B06EFF',
  },
  {
    id: 4,
    title: 'REST API Boilerplate',
    category: 'API',
    description:
      'A Laravel REST API starter kit with JWT auth, role-based permissions, rate limiting, versioning, and comprehensive test coverage.',
    thumbnail: null,
    tags: ['Laravel', 'PHP', 'JWT', 'Pest'],
    features: ['JWT authentication', 'Sanctum support', 'API versioning', 'Pest test suite'],
    challenge:
      'Built a clean, opinionated structure that scales from small APIs to enterprise services without complexity creep.',
    liveUrl:   '#',
    githubUrl: '#',
    featured:  false,
    accentColor: '#6C63FF',
  },
]

export const services = [
  { icon: 'Layers',        title: 'Full Stack Development',   description: 'End-to-end web application development from database schema to polished UI, delivered as a cohesive product.' },
  { icon: 'Monitor',       title: 'Frontend Development',     description: 'Pixel-perfect Vue.js / React interfaces with smooth animations, accessibility, and mobile-first responsive design.' },
  { icon: 'Server',        title: 'Backend & API Development',description: 'Robust Laravel APIs with clean architecture, comprehensive test coverage, and production-grade security.' },
  { icon: 'Zap',           title: 'Performance Optimization', description: 'Auditing and optimizing existing applications — query tuning, caching strategies, and bundle size reduction.' },
  { icon: 'Shield',        title: 'Code Review & Consulting', description: 'Expert review of your codebase with actionable architectural recommendations and refactoring guidance.' },
  { icon: 'Wrench',        title: 'Maintenance & Support',    description: 'Ongoing support, bug fixing, and feature additions to keep your application healthy and up to date.' },
]

export const experience = [
  {
    company: 'Freelance',
    role: 'Senior Full Stack Developer',
    duration: '2022 — Present',
    description:
      'Delivering high-quality web applications for clients across Bangladesh and internationally. Projects span SaaS dashboards, e-commerce, and custom CMSes.',
    technologies: ['Laravel', 'Vue 3', 'React', 'MySQL', 'Tailwind'],
  },
  {
    company: 'TechStartup BD',
    role: 'Full Stack Developer',
    duration: '2021 — 2022',
    description:
      'Built and maintained a multi-tenant SaaS platform serving 500+ businesses, focusing on performance, reliability, and iterative feature delivery.',
    technologies: ['Laravel', 'Vue.js', 'PostgreSQL', 'Redis', 'Docker'],
  },
  {
    company: 'WebAgency Dhaka',
    role: 'Junior Web Developer',
    duration: '2020 — 2021',
    description:
      'Developed client websites and internal tools. Gained strong fundamentals in PHP, MySQL, and frontend development with real production constraints.',
    technologies: ['PHP', 'jQuery', 'MySQL', 'Bootstrap'],
  },
]

export const education = [
  {
    degree: 'B.Sc. in Computer Science & Engineering',
    institution: 'University of Dhaka',
    duration: '2017 — 2021',
    grade: 'CGPA 3.7 / 4.0',
    highlights: ['Data Structures & Algorithms', 'Database Management', 'Software Engineering'],
  },
  {
    degree: 'HSC — Science',
    institution: 'Dhaka College',
    duration: '2015 — 2017',
    grade: 'GPA 5.0 / 5.0',
    highlights: ['Physics', 'Mathematics', 'Chemistry'],
  },
]

export const certifications = [
  { title: 'Laravel Certification',          issuer: 'Laravel LLC',            year: '2023', icon: '🔴' },
  { title: 'Vue.js 3 Advanced',              issuer: 'Vue Mastery',             year: '2023', icon: '⚡' },
  { title: 'AWS Cloud Practitioner',         issuer: 'Amazon Web Services',     year: '2022', icon: '☁️' },
  { title: 'JavaScript Algorithms — Expert', issuer: 'freeCodeCamp',            year: '2022', icon: '🏆' },
]

export const testimonials = [
  {
    name:     'Sarah Johnson',
    position: 'CTO, FinTech Startup',
    avatar:   null,
    review:   "Rayhan delivered our API integration two weeks ahead of schedule with zero bugs in production. His clean architecture made it trivial for our team to extend later.",
  },
  {
    name:     'Mohammed Al-Rashid',
    position: 'Founder, E-Commerce Platform',
    avatar:   null,
    review:   "Exceptional attention to detail. The admin dashboard Rayhan built is intuitive, fast, and exactly what we envisioned — plus features we didn't even think to ask for.",
  },
  {
    name:     'Priya Sharma',
    position: 'Product Manager, SaaS Company',
    avatar:   null,
    review:   "Working with Rayhan felt like having a co-founder with technical superpowers. He understood our business goals and translated them into software that works beautifully.",
  },
]

export const navLinks = [
  { label: 'About',          href: '#about' },
  { label: 'Skills',         href: '#skills' },
  { label: 'Projects',       href: '#projects' },
  { label: 'Services',       href: '#services' },
  { label: 'Experience',     href: '#experience' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact',        href: '#contact' },
]
