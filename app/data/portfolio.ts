export const portfolioData = {
  personalInfo: {
    name: "Akash Mani",
    title: "Computer Science Student & Full-Stack Developer",
    tagline: "I build clean, scalable web and mobile experiences.",
    location: "Kolkata, India",
    email: "akashmani9955@gmail.com",
    phone: "+91-8969606915",
    github: "https://github.com/AkashMani1",
    linkedin: "https://linkedin.com/in/akashmani1",
    resumeLink: "/Developer_Resume.pdf", 
  },
  summary: [
    "Motivated Computer Science student skilled in Java, C++, and MEAN stack development. I have a strong foundation in full-stack application design, Android app creation, and data-driven problem solving.",
    "Adept at transforming ideas into working solutions with attention to usability, scalability, and performance. I am seeking opportunities to contribute to impactful projects while growing in backend and full-stack engineering.",
    "I am deeply interested in system design, improving DSA skills, and contributing to open-source. I maintain a habit of writing clean, readable code and using Git/GitHub for effective collaboration."
  ],
  education: [
    {
      degree: "B.Tech in Computer Science and Engineering",
      school: "Narula Institute of Technology, Kolkata",
      year: "2023 – Present",
      desc: "Actively participating in coding, development activities, and project-based learning."
    },
    {
      degree: "Higher Secondary (XII) – 76.17%",
      school: "T.N.B. Collegiate, Bhagalpur",
      year: "2022",
      desc: ""
    }
  ],
  skills: {
    languages: ["Java", "C++", "JavaScript", "TypeScript"],
    webMobile: ["MEAN Stack", "React", "Next.js", "Node.js", "Express", "Angular", "Tailwind CSS", "Android (Java/Kotlin)", "Django"],
    database: ["MongoDB", "MySQL", "SQLite"],
    tools: ["Git", "GitHub", "VS Code", "Figma", "Adobe XD", "Linux", "Vercel"],
    core: ["Data Structures & Algorithms", "OOP", "DBMS", "Operating Systems", "Computer Networks"]
  },
  experience: [
    {
      role: "Full-Stack Developer Intern", 
      company: "CodeCrafters Technologies",
      duration: "Apr 2025 – Jun 2025",
      stack: ["React", "Node.js", "MongoDB", "Express", "Redux Toolkit", "JWT"],
      description: "Spearheaded the development of a scalable e-commerce dashboard, moving from monolithic patterns to modular service-based architecture.",
      points: [
        "Engineered a high-performance React frontend using Redux Toolkit for global state management, reducing unnecessary re-renders by 30%.",
        "Architected secure RESTful APIs implementing JWT Authentication and Role-Based Access Control (RBAC) to protect sensitive user data.",
        "Optimized MongoDB aggregation pipelines to handle complex product filtering, improving query response times by 40%.",
        "Integrated extensive error handling and validation middleware (Zod/Joi) to ensure API robustness and fail-safe data entry.",
        "Established a CI/CD workflow using GitHub Actions to automate testing and deployment, reducing manual merge conflicts."
      ]
    }
  ],
  projects: [
    {
      title: "Medical App & Website",
      desc: "Android app providing medicine recommendations, dosage instructions, and home remedies.",
      tags: ["Android", "SQLite", "Figma", "Adobe XD"],
      category: "Mobile",
      // Custom Glow: Emerald Green
      spotlight: "rgba(16, 185, 129, 0.2)",
      links: { live: "#", code: "#" }
    },
    {
      title: "Gamified Financial Literacy Platform",
      desc: "Interactive platform teaching financial management via gamification.",
      tags: ["MEAN Stack", "MongoDB", "Angular", "Node.js"],
      category: "Web",
      // Custom Glow: Violet
      spotlight: "rgba(139, 92, 246, 0.2)",
      links: { live: "#", code: "#" }
    },
    {
      title: "Personal Portfolio Website",
      desc: "Minimalistic, responsive portfolio showcasing projects and skills (This site).",
      tags: ["Next.js", "React", "TypeScript", "Tailwind", "Framer Motion"],
      category: "Web",
      // Custom Glow: Blue
      spotlight: "rgba(59, 130, 246, 0.2)",
      links: { live: "#", code: "#" }
    },
    {
      title: "Task Manager Web App",
      desc: "Full-stack task management app with JWT authentication and role-based access.",
      tags: ["MERN", "MongoDB", "Express", "React", "Node.js"],
      category: "Web",
      // Custom Glow: Rose
      spotlight: "rgba(244, 63, 94, 0.2)",
      links: { live: "#", code: "#" }
    },
    {
      title: "College Event Management System",
      desc: "Web portal for students to register for events and track schedules.",
      tags: ["Django", "MySQL", "HTML/CSS"],
      category: "Web",
      // Custom Glow: Amber
      spotlight: "rgba(245, 158, 11, 0.2)",
      links: { live: "#", code: "#" }
    },
    {
      title: "Algorithm Visualizer",
      desc: "Interactive interface to visualize sorting and pathfinding algorithms.",
      tags: ["React", "TypeScript", "Tailwind"],
      category: "Others",
      // Custom Glow: Sky Blue
      spotlight: "rgba(14, 165, 233, 0.2)",
      links: { live: "#", code: "#" }
    }
  ],
  certifications: [
    {
      title: "Android Development Training Program",
      issuer: "BCT Training",
      desc: "60-hour program; developed a functional to-do list Android app as final project."
    },
    {
      title: "MEAN Stack Development Training Program",
      issuer: "BCT Training",
      desc: "Earned certification by completing hands-on projects and building end-to-end applications."
    }
  ]
};