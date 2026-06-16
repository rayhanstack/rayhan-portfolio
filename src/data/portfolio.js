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
  resumeUrl: import.meta.env.VITE_RESUME_URL || '#',
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
      { name: 'Vue.js',       level: 95, icon: '⚡' },
      { name: 'React.js',     level: 80, icon: '⚛️' },
      { name: 'JavaScript',   level: 92, icon: '𝗝𝗦' },
      { name: 'Tailwind CSS', level: 75, icon: '🎨' },
      { name: 'Bootstrap',    level: 95, icon: '🅱️' },
      { name: 'Inertia.js',   level: 90, icon: '🔗' },
      { name: 'TypeScript',   level: 60, icon: '🔷' },
    ],
  },
  {
    category: 'Backend',
    color: 'cyan',
    icon: 'Server',
    items: [
      { name: 'PHP',        level: 90, icon: '🐘' },
      { name: 'Laravel',    level: 95, icon: '🔴' },
      { name: 'REST API',   level: 92, icon: '📡' },
    ],
  },
  {
    category: 'Database',
    color: 'violet',
    icon: 'Database',
    items: [
      { name: 'MySQL',      level: 90, icon: '🐬' },
      { name: 'Sqlite',     level: 85, icon: '🗄️' },
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
      { name: 'Git / GitHub / GitLab', level: 93, icon: '🐙' },
      { name: 'Docker',       level: 70, icon: '🐳' },
      { name: 'Figma',        level: 75, icon: '🎭' },
      { name: 'Postman',      level: 88, icon: '📮' },
      { name: 'Vercel / VPS / AWS', level: 82, icon: '🚀' },
      { name: 'CI/CD',         level: 65, icon: '🔄' },
      { name: 'Linux',        level: 80, icon: '🐧' },
      { name: 'Microservices', level: 60, icon: '⚙️' },
      { name: 'Kubernetes',   level: 50, icon: '⚙️' },
    ],
  },
  {
    category: 'AI & Automation',
    color: 'violet',
    icon: 'Robot',
    items: [
      { name: 'Prompt Engineering', level: 65, icon: '📝' },
      { name: 'OpenAI API', level: 70, icon: '🤖' },
      { name: 'Claude API', level: 70, icon: '🤖' },
      { name: 'AI Chatbot Development', level: 65, icon: '🤖' },
      { name: 'Workflow Automation', level: 60, icon: '⚙️' },
      { name: 'MCP (Model Context Protocol)', level: 50, icon: '🔗' },
    ],
  }
]

export const projects = [
  {
    id: 1,
    title: 'TrustedHRM',
    category: 'CodeCanyon Product',
    description:
      'Contributed to the development of a commercial Human Resource Management (HRM) system built with Laravel, designed for enterprise-level workforce management. Played a key role in backend development, business logic implementation, and RESTful API development to support seamless mobile application integration.',
    thumbnail: null,
    tags: ['Laravel', 'Bootstrap', 'Rest API'],
    features: ['Payroll', 'Project Management', 'Employee 360° Performance', 'Discord Channel Integration', 'Attendance & Device Sync', 'Multi-Language System','Live Chat'],
    challenge: 'Implemented a robust, scalable REST API architecture to support seamless integration with the mobile app, ensuring high performance and security under heavy load.',
    liveUrl:   'https://demo.trustedhrm.com',
    githubUrl: '#',
    featured:  true,
    accentColor: '#6C63FF',
  },
  {
    id: 2,
    title: 'AI-Powered News Script Platforms',
    category: 'CodeCanyon Product',
    description:
      'Led the development of an AI-powered news publishing platform built with Laravel, designed for automated content management and multi-platform news distribution. As the Project Lead, directed module architecture, AI feature integration, and overall backend development. Implemented intelligent automation features and scalable content modules to enhance newsroom efficiency and digital media management.',
    thumbnail: null,
    tags: ['Laravel', 'Rest API', 'AI Integration'],
    features: ['AI Auto Language-wise Translator', 'News Archive System', 'E-Paper Management', 'Instagram News Feed Integration', 'Automated News Scraper', 'Media Gallery System','Advertisement Management System'],
    challenge: 'Architected a modular, scalable backend system to support complex AI-driven content management features while ensuring high performance and security for a commercial product.',
    liveUrl:   'https://demo.newsscript.com',
    githubUrl: '#',
    featured:  true,
    accentColor: '#6C63FF',
  },
  {
    id: 3,
    title: 'LandLord',
    category: 'CodeCanyon Product',
    description:
      'Contributed to the development of a feature-rich Property Management Software built with Laravel, designed to streamline tenant, lease, rent, and sales operations. Played a key role in implementing AI-driven search functionality, payment integrations, and automated financial workflows to enhance system efficiency and user experience.',
    thumbnail: null,
    tags: ['Laravel', 'Blade', 'Payment Gateway', 'AI Integration'],
    features: ['AI-Based Natural Language Property Search (Plain text to SQL conversion)', 'Multiple Payment Gateway Integrations', 'Tenant Rent, Sale & Lease Management', 'Automated Invoice Generation System', 'Bill Payment & Reminder System', 'Add-ons Installation & Module Management'],
    challenge: 'Implemented an AI-driven natural language search feature that converts plain text queries into optimized SQL, significantly improving the user experience for property searches while maintaining high performance and security.',
    liveUrl:   'https://landlord.onesttech.com',
    githubUrl: '#',
    featured:  true,
    accentColor: '#6C63FF',
  },
  {
    id: 4,
    title: 'LiveTV Streaming App',
    category: 'Web App',
    description:
      'A production-ready live TV streaming frontend built with React 19 + TypeScript. Features 48 channels, HLS.js playback, category filtering, and a hero carousel.',
    thumbnail: null,
    tags: ['React 19', 'TypeScript', 'Zustand', 'Video.js', 'HLS.js'],
    features: ['48 channel catalog', 'HLS stream playback', 'Category filtering', 'Responsive UI'],
    challenge:
      'Implemented seamless HLS stream switching with Video.js and Zustand state without re-mounting the player component.',
    liveUrl:   'https://rayhantv.vercel.app',
    githubUrl: 'https://github.com/rayhanstack/tv-app',
    featured:  true,
    accentColor: '#00D9F5',
  },
  {
    id: 5,
    title: 'ERP Software for Local Business',
    category: 'Web App',
    description:
      'Contributed to the development of an in-house ERP system to streamline internal operations and performance management. Developed RESTful APIs and backend business logic using Laravel, supporting React.js frontend integration.',
    thumbnail: null,
    tags: ['Laravel', 'Bootstrap', 'Ajax', 'MySQL'],
    features: ['PM Goal Management', 'Employee Evaluation', 'Daily Submission Tracking', 'Attendance System', 'Performance Analytics Dashboard'],
    challenge:
      'Designed and implemented a modular API architecture to support complex performance management features while ensuring data integrity and security in a production environment.',
    liveUrl:   '#',
    githubUrl: 'https://github.com/mdrayhanseopage1',
    featured:  false,
    accentColor: '#B06EFF',
  },
  {
    id: 6,
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
    company: 'Dream71, Dhaka',
    role: 'Software Engineer',
    duration: 'Mar 2026 - Present',
    description:
      'Engineer and maintain high-impact software solutions for local government entities and international clients. Collaborate in cross-functional teams to architect, build, and deploy scalable, microservices-driven features. Optimize application performance utilizing caching and containerization, while enforcing robust, industry-standard security protocols.',
    technologies: ['Laravel', 'Vue 3', 'React', 'MySQL', 'PgSQL', 'Microservices', 'Redis', 'Docker'],
  },
  {
    company: 'OnestTech, Dhaka',
    role: 'Software Engineer',
    duration: 'July 2025 — May 2026',
    description:
      'Develop and maintain a commercial CodeCanyon product, ensuring high availability and code quality. Collaborate with cross-functional teams to design, architect, and deploy scalable new features. Optimize application performance for faster load times and implement industry-standard security best practices.',
    technologies: ['Laravel', 'Vue 3', 'React', 'MySQL', 'Tailwind'],
  },
  {
    company: 'DR. Myatt Academy, Canada',
    role: 'Backend Developer',
    duration: 'Oct 2023 — Apr 2024',
    description:
      'Contributed as a Remote Backend Developer in the development of a comprehensive school management system. Focused on building RESTful APIs, database design, and integrating third-party services to enhance functionality.',
    technologies: ['Laravel', 'React.js', 'MySQL', 'Redis', 'Docker'],
  },
  {
    company: 'Seopage1,Dhaka',
    role: 'Junior Laravel Developer',
    duration: 'Mar 2023 — Feb 2025',
    description:
      'Developed in-house ERP system. Gained strong fundamentals in PHP, MySQL, and frontend development with real production constraints.',
    technologies: ['PHP', 'jQuery', 'MySQL', 'Bootstrap'],
  },
]

export const education = [
  {
    degree: 'B.Sc. in Computer Science & Engineering',
    institution: 'Europa University',
    duration: '2025 — Present',
  },
  {
    degree: 'Diploma in Computer Science & Engineering',
    institution: 'Bangladesh Polytechnic Institute',
    duration: '2018 — 2022',
  },
]

export const certifications = [
  { title: 'DevOps', issuer: 'UDEMY',            year: 'Apr 2026 - Present', icon: '🏆' },
  { title: 'PHP with Laravel Framework',          issuer: 'BASIS-SEIP (BITM)',            year: 'Sep 2022 - Dec 2022', icon: '🔴' },
  { title: 'Full Stack Web Development',              issuer: 'OSTAD LIMITED',             year: 'Nov 2024 - Apr 2025', icon: '⚡' },
  { title: 'PHP with Laravel Framework',         issuer: 'BOHUBRIHI',     year: 'Jan 2021 - Mar 2021', icon: '☁️' },
]

export const testimonials = [
  {
    name:     'Babu K',
    position: 'DGM, Seopage1',
    avatar:   null,
    review:   "Rayhan delivered our API integration two weeks ahead of schedule with zero bugs in production. His clean architecture made it trivial for our team to extend later.",
  },
  {
    name:     'Dr. Tam',
    position: 'Founder, myattacademy',
    avatar:   null,
    review:   "Exceptional attention to detail. The admin dashboard Rayhan built is intuitive, fast, and exactly what we envisioned — plus features we didn't even think to ask for.",
  },
  {
    name:     'Shahriar Rahat',
    position: 'Project Manager, OnestTech',
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
