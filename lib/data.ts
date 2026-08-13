import { ResumeData } from "@/types/resume";

export const resumeData: ResumeData = {
  name: "Abhinn Pokhriyal",
  title: "Software Developer | Frontend Engineer",
  email: "abhinnpokhriyal@gmail.com",
  phone: "+91 9599754526",
  location: "Delhi, India",
  linkedin: "https://linkedin.com/in/abhinn-pokhriyal-a26279194",
  github: "https://github.com/abhinnpokhriyal",
  website: "https://portfolio-dashboard-six-zeta.vercel.app",
  summary:
    "Frontend Engineer with 4+ years building scalable, accessible enterprise healthcare web applications. Expert in React.js, Next.js, TypeScript, Redux Toolkit, and RESTful API integration within Agile/Scrum teams across 96 sprints and 48 production releases. Delivers pixel-accurate Figma-to-code conversions at 10+ components per sprint with end-to-end ownership from design handoff to production.",

  education: [
    {
      id: "edu1",
      degree: "B.Tech, Computer Science",
      institution: "KCC Institute of Technology and Management",
      location: "Greater Noida, Uttar Pradesh",
      startYear: "2018",
      endYear: "2022",
      highlights: [],
    },
  ],

  experience: [
    {
      id: "exp1",
      title: "Software Developer – Frontend Engineer",
      company: "Optum (via Omnie Solutions India Private Limited)",
      location: "Noida, India",
      startDate: "Apr 2022",
      endDate: "Present",
      current: true,
      bullets: [
        "Promoted through three roles – Trainee Engineer → Associate Software Engineer → Software Developer – reflecting consistent performance growth",
        "Engineered scalable enterprise healthcare portals (Specialty Patient & Provider) using React.js, TypeScript, Redux Toolkit, Material UI, and AEM with end-to-end ownership",
        "Drove full Scrum lifecycle across 96 sprints and 48 production releases spanning both portals – daily standups, sprint planning, demos, and retrospectives",
        "Converted Figma designs into 10+ production-ready React components per sprint via Figma-to-code workflows, ensuring pixel-accurate, design-consistent UI delivery",
        "Led Material UI v4→v5 and CMS→AEM migrations with zero downtime, delivering both in production without user disruption",
        "Optimized Jest and React Testing Library CI/CD configurations, cutting test execution time by 65% (1,500s→<500s)",
        "Achieved 80%+ unit test coverage and full SonarQube Quality Gate compliance",
        "Integrated GitHub Copilot for automated test generation – cutting time by 70% and generating 400+ test cases in a single sprint",
      ],
      techStack: ["React.js", "Next.js", "TypeScript", "Redux Toolkit", "Material UI", "AEM", "Jest", "Figma", "GitHub Copilot"],
    },
  ],

  projects: [
    {
      id: "proj2",
      name: "Specialty Patient Portal",
      description:
        "Migrated large-scale application from Material UI v4 to v5 across multiple shared repositories. Built reusable component libraries improving scalability and development speed. Enhanced accessibility, performance, and user experience for patient-facing platform.",
      startDate: "2022",
      endDate: "2024",
      techStack: ["React.js", "TypeScript", "Material UI", "Redux Toolkit"],
      highlights: [
        "Zero-downtime MUI v4→v5 migration across shared repos",
        "Built scalable component libraries",
        "Enhanced WCAG accessibility compliance",
      ],
      liveUrl: "",
    },
    {
      id: "proj1",
      name: "Specialty Provider Portal",
      description:
        "Guided frontend enhancements and performance optimizations for provider workflows. Improved test efficiency and reduced execution time significantly through Jest optimizations. Contributed to AEM migration improving content scalability and maintainability.",
      startDate: "2024",
      endDate: "2026",
      techStack: ["React.js", "TypeScript", "AEM", "Jest", "Material UI"],
      highlights: [
        "65% CI/CD speed improvement (1,500s→<500s)",
        "CMS to AEM migration with zero downtime",
        "80%+ unit test coverage via TDD",
      ],
      liveUrl: "",
    },
    {
      id: "proj3",
      name: "Portfolio Dashboard",
      description:
        "Built from scratch using React & Next.js with AI-assisted development. Implemented modern UI patterns and performance optimizations. Delivered production-ready portfolio with ATS-focused features and real-world use cases.",
      startDate: "2026",
      endDate: "Present",
      techStack: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
      highlights: [
        "Figma UI designs translated to responsive React components",
        "AI-assisted iteration with GitHub Copilot",
        "Deployed on Vercel with lazy loading",
      ],
      liveUrl: "https://portfolio-dashboard-six-zeta.vercel.app",
      githubUrl: "https://github.com/abhinnpokhriyal",
    },
  ],

  skills: [
    {
      category: "Frontend Core",
      items: ["React.js", "Next.js", "TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3", "SCSS", "Tailwind CSS", "React Hooks"],
    },
    {
      category: "State Management",
      items: ["Redux", "Redux Toolkit", "Context API"],
    },
    {
      category: "Agile & Design Collaboration",
      items: ["Agile/Scrum", "Sprint Planning", "Story-Point Estimation", "Rally", "Figma", "Figma Dev Mode", "Figma-to-Code"],
    },
    {
      category: "UI / Design Systems",
      items: ["Material UI (v4 & v5)", "Responsive Web Design", "Semantic HTML", "WCAG Accessibility"],
    },
    {
      category: "Testing & Quality",
      items: ["Jest", "React Testing Library (RTL)", "Unit Testing", "Integration Testing", "SonarQube", "TDD", "Code Coverage"],
    },
    {
      category: "APIs & Data Flow",
      items: ["RESTful APIs", "API Error Handling", "Mock Data Workflows", "Frontend Data Architecture"],
    },
    {
      category: "Build & Performance",
      items: ["Webpack", "Code Splitting", "Lazy Loading", "Core Web Vitals", "Vercel", "Bundle Optimization"],
    },
    {
      category: "CI/CD & DevOps",
      items: ["Jenkins", "GitHub Actions", "JFrog Artifactory", "Git", "GitHub"],
    },
    {
      category: "AI & Tooling",
      items: ["GitHub Copilot", "AI-Driven Debugging", "Refactoring", "Test Generation"],
    },
    {
      category: "CMS & Platforms",
      items: ["Adobe Experience Manager (AEM)", "Headless CMS", "Content Fragments"],
    },
  ],

  achievements: [
    {
      id: "ach1",
      title: "Career Progression",
      description:
        "Promoted through three roles – Trainee Engineer → Associate Software Engineer → Software Developer – demonstrating consistent performance growth and technical leadership",
      year: "2022-Present",
    },
    {
      id: "ach2",
      title: "CI/CD Performance Optimization",
      description:
        "Cut Jest test execution time by 65% (1,500s→<500s), accelerating deployment frequency across 48 production releases",
      year: "2024",
    },
    {
      id: "ach3",
      title: "AI-Driven Development Efficiency",
      description:
        "Integrated GitHub Copilot for test generation and refactoring – 70% time reduction and 400+ test cases generated in a single sprint",
      year: "2024",
    },
    {
      id: "ach4",
      title: "Zero-Downtime Migrations",
      description:
        "Led Material UI v4→v5 and CMS→AEM migrations across enterprise healthcare portals without business disruption or user impact",
      year: "2023-2024",
    },
    {
      id: "ach5",
      title: "Agile Delivery at Scale",
      description:
        "Delivered 96 sprints and 48 production releases across two enterprise portals with 10+ components per sprint via Figma-to-code workflows",
      year: "2022-Present",
    },
    {
      id: "ach6",
      title: "Quality & Test Coverage Excellence",
      description:
        "Maintained 80%+ unit test coverage with full SonarQube Quality Gate compliance, strengthening release confidence",
      year: "2023-Present",
    },
  ],
};

export const socialLinks = [
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/abhinn-pokhriyal-a26279194",
    icon: "linkedin",
    color: "bg-blue-600 hover:bg-blue-700",
  },
  {
    name: "GitHub",
    url: "https://github.com/abhinnpokhriyal",
    icon: "github",
    color: "bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600",
  },
  {
    name: "Gmail",
    url: "mailto:abhinnpokhriyal@gmail.com",
    icon: "mail",
    color: "bg-red-500 hover:bg-red-600",
  },
];
