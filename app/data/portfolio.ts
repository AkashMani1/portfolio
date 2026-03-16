export type SkillCategory = "languages" | "webMobile" | "database" | "tools" | "core";

export type ProjectLink = {
  live?: string;
  code?: string;
  caseStudy?: string;
};

export type ProjectItem = {
  title: string;
  desc: string;
  tags: string[];
  category: "Web" | "Mobile" | "Others";
  spotlight: string;
  status: string;
  highlights: string[];
  links: ProjectLink;
  video_url?: string;
};

export type CertificationItem = {
  title: string;
  issuer: string;
  desc: string;
  link?: string;
};

export const portfolioData = {
  personalInfo: {
    name: "Akash Mani",
    title: "Full-Stack Developer",
    tagline:
      "I build production-minded full-stack apps with clean UI, solid backend architecture, and room to scale.",
    availability: "Open to internships, freelance work, and junior full-stack roles",
    location: "Kolkata, India",
    email: "akashmani9955@gmail.com",
    phone: "+91-8969606915",
    github: "https://github.com/AkashMani1",
    linkedin: "https://linkedin.com/in/akashmani1",
    resumeLink: "/Developer_Resume.pdf",
  },
  heroStats: [
    { label: "Experience", value: "1 internship", note: "full-stack product work" },
    { label: "Focus", value: "Modern web apps", note: "frontend to backend delivery" },
    { label: "Strength", value: "Scalable foundations", note: "auth, APIs, data, DX" },
  ],
  summary: [
    "I am a full-stack developer with a strong foundation in React, Next.js, Node.js, Express, MongoDB, and TypeScript. I enjoy turning product ideas into fast, reliable applications with thoughtful UX and maintainable architecture.",
    "My recent work has focused on secure authentication, modular API design, database optimization, and shipping responsive interfaces that feel polished on real devices, not just in demos.",
    "Right now I am intentionally building toward what the market values most: backend depth, AI-assisted product workflows, deployment readiness, and strong collaboration habits with Git, testing, and structured iteration."
  ],
  marketPriorities: [
    {
      title: "Production-minded delivery",
      desc: "I approach projects as products: clear architecture, reusable components, validation, error handling, and clean deployment paths.",
    },
    {
      title: "Frontend + backend ownership",
      desc: "Comfortable moving across UI implementation, API design, authentication flows, database work, and admin/internal tooling.",
    },
    {
      title: "Current-market learning path",
      desc: "Actively deepening skills in Docker, PostgreSQL, Redis, cloud deployment, and AI-powered user experiences.",
    },
  ],
  currentFocus: [
    "API design, auth, and backend architecture",
    "Type-safe full-stack development with React and TypeScript",
    "Deployable apps with better performance and DX",
    "AI-assisted features and practical product workflows",
  ],
  education: [
    {
      degree: "B.Tech in Computer Science and Engineering",
      school: "Narula Institute of Technology, Kolkata",
      year: "2023 – Present",
      desc: "Building a strong base in software engineering, system design, and hands-on product development through coursework and independent projects."
    },
    {
      degree: "Higher Secondary (XII) – 76.17%",
      school: "T.N.B. Collegiate, Bhagalpur",
      year: "2022",
      desc: ""
    }
  ],
  skills: {
    languages: ["TypeScript", "JavaScript", "Java", "C++", "SQL"],
    webMobile: [
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "Angular",
      "Tailwind CSS",
      "REST APIs",
      "JWT Auth",
      "Android (Java/Kotlin)",
      "Django"
    ],
    database: ["MongoDB", "MySQL", "SQLite", "Firestore"],
    tools: ["Git", "GitHub", "Firebase", "Vercel", "Postman", "Linux", "Figma", "VS Code"],
    core: ["Data Structures & Algorithms", "OOP", "DBMS", "Operating Systems", "Computer Networks", "System Design Basics"]
  } satisfies Record<SkillCategory, string[]>,
  experience: [
    {
      role: "Full-Stack Developer Intern",
      company: "CodeCrafters Technologies",
      duration: "Apr 2025 – Jun 2025",
      stack: ["React", "Node.js", "MongoDB", "Express", "Redux Toolkit", "JWT", "GitHub Actions"],
      description:
        "Built and improved an e-commerce dashboard with a stronger frontend architecture, secure backend flows, and better operational reliability.",
      points: [
        "Developed modular React interfaces with Redux Toolkit for predictable state flows and a smoother product management experience.",
        "Implemented secure REST APIs with JWT authentication and role-based access control for protected admin workflows.",
        "Optimized MongoDB queries and aggregation pipelines to improve filtering performance on larger catalog datasets.",
        "Added stronger validation and error-handling patterns to reduce brittle API behavior and improve maintainability.",
        "Contributed to CI/CD-oriented development practices using GitHub Actions to make testing and deployment more consistent."
      ]
    }
  ],
  projects: [
    {
      title: "AI Portfolio Assistant",
      desc: "Personal portfolio experience with an integrated chatbot, command palette, analytics, and admin-managed content.",
      tags: ["Next.js", "React 19", "TypeScript", "Firebase", "OpenAI"],
      category: "Web",
      spotlight: "rgba(59, 130, 246, 0.2)",
      status: "Live portfolio system",
      highlights: [
        "Integrated conversational assistance and command-driven navigation",
        "Supports Firebase-backed content management with local fallbacks",
        "Built with modern React patterns and polished interaction design"
      ],
      links: { live: "#", code: "https://github.com/AkashMani1" }
    },
    {
      title: "Gamified Financial Literacy Platform",
      desc: "Interactive web platform for teaching budgeting and money habits through gamified learning flows.",
      tags: ["MEAN Stack", "MongoDB", "Angular", "Node.js"],
      category: "Web",
      spotlight: "rgba(16, 185, 129, 0.2)",
      status: "End-to-end web app",
      highlights: [
        "Designed learning journeys around engagement and habit formation",
        "Connected frontend dashboards to backend data flows",
        "Focused on scalable feature structure for future expansion"
      ],
      links: { live: "#", code: "#" }
    },
    {
      title: "Task Manager Web App",
      desc: "Full-stack productivity app with authenticated user flows, role-based access, and clean task operations.",
      tags: ["MERN", "MongoDB", "Express", "React", "Node.js"],
      category: "Web",
      spotlight: "rgba(244, 63, 94, 0.2)",
      status: "Backend-heavy full-stack project",
      highlights: [
        "Implemented login, authorization, and protected routes",
        "Structured backend services for maintainable CRUD workflows",
        "Built responsive UI flows for daily usage instead of static demos"
      ],
      links: { live: "#", code: "#" }
    },
    {
      title: "Medical App & Website",
      desc: "Android-first health companion for medicine guidance, dosage reminders, and accessible home-care information.",
      tags: ["Android", "SQLite", "Java", "Figma"],
      category: "Mobile",
      spotlight: "rgba(14, 165, 233, 0.2)",
      status: "Mobile + UX case study",
      highlights: [
        "Combined product design thinking with practical mobile implementation",
        "Used local data storage for a lightweight user experience",
        "Prioritized clarity and accessibility for health-related interactions"
      ],
      links: { live: "#", code: "#" }
    },
    {
      title: "College Event Management System",
      desc: "Web portal for student registrations, event schedules, and organizer-side event handling.",
      tags: ["Django", "MySQL", "HTML/CSS"],
      category: "Web",
      spotlight: "rgba(245, 158, 11, 0.2)",
      status: "Workflow-oriented web platform",
      highlights: [
        "Modeled real registration and scheduling flows",
        "Handled structured data storage and admin-facing operations",
        "Built around a clear user journey for student participants"
      ],
      links: { live: "#", code: "#" }
    },
    {
      title: "Algorithm Visualizer",
      desc: "Interactive visual learning tool for sorting and pathfinding concepts with an emphasis on clarity and feedback.",
      tags: ["React", "TypeScript", "Tailwind CSS"],
      category: "Others",
      spotlight: "rgba(168, 85, 247, 0.2)",
      status: "CS fundamentals showcase",
      highlights: [
        "Translated algorithm concepts into intuitive UI behavior",
        "Improved understanding through animation and state changes",
        "Reinforced frontend fundamentals with educational value"
      ],
      links: { live: "#", code: "#" }
    }
  ] satisfies ProjectItem[],
  certifications: [
    {
      title: "Android Development Training Program",
      issuer: "BCT Training",
      desc: "Completed a 60-hour hands-on training program and delivered a functioning Android to-do app as the final project.",
      link: "#"
    },
    {
      title: "MEAN Stack Development Training Program",
      issuer: "BCT Training",
      desc: "Built practical full-stack applications while strengthening Angular, Node.js, Express, and MongoDB fundamentals.",
      link: "#"
    }
  ] satisfies CertificationItem[]
};
