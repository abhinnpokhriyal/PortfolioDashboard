import { ResumeData } from "@/types/resume";

export const resumeData: ResumeData = {
  name: "Abhinn Pokhriyal",
  title: "Frontend Engineer | React.js | TypeScript | Next.js | Redux | HTML5 | CSS3 | AEM | CI/CD | Performance Optimization | 4+ Years",
  email: "abhinnpokhriyal@gmail.com",
  phone: "+91 9599754526",
  location: "Delhi, India",
  linkedin: "https://linkedin.com/in/abhinn-pokhriyal-a26279194",
  github: "https://github.com/abhinnpokhriyal",
  website: "",
  summary:
    "Frontend Engineer with 4+ years of experience building, modernizing, and optimizing enterprise-scale React.js and TypeScript web applications in the healthcare/pharma domain. Proven track record of delivering measurable results: reduced CI test execution time by ~65% (1500s → <500s), achieved 80%+ Jest test coverage within 10 days, and completed JFrog migration in under 20 days. Deep expertise in AEM content services, MUI component libraries, Redux state management, and CI/CD pipeline optimization. Adept at cross-functional collaboration, production deployments, and leveraging AI tools to accelerate development velocity.",

  education: [
    {
      id: "edu1",
      degree: "Bachelor of Technology (B.Tech) — Computer Science Engineering",
      institution: "KCC Institute of Technology and Management",
      location: "Greater Noida, Uttar Pradesh",
      startYear: "2018",
      endYear: "2022",
      highlights: [
        "Specialized in Computer Science Engineering with focus on data structures, algorithms, and web technologies",
        "Developed strong foundation in object-oriented programming and software engineering principles",
      ],
    },
    {
      id: "edu2",
      degree: "High School Diploma — Mathematics & Computer Science",
      institution: "St. Martin's Diocesan School",
      location: "Delhi, India",
      startYear: "2016",
      endYear: "2018",
      highlights: [
        "Focused on Mathematics and Computer Science",
        "Built early interest in programming and problem solving",
      ],
    },
  ],

  experience: [
    {
      id: "exp1",
      title: "Software Developer / Frontend Engineer",
      company: "Optum (via Omnie Solutions)",
      location: "Noida, India",
      startDate: "Nov 2023",
      endDate: "",
      current: true,
      bullets: [
        "Delivered JFrog artifact management migration in under 20 days, improving CI/CD pipeline reliability and deployment consistency across environments",
        "Reduced bundle size and improved page load time by migrating static assets to AEM content services, enabling optimized caching strategies",
        "Built a configurable notification banner system using AEM, enabling non-developers to manage content independently and reducing engineering dependency for updates",
        "Upgraded Jest from v27 to v29 and achieved 80%+ unit test coverage within 10 days, ensuring SonarQube Quality Gate compliance",
        "Reduced CI test execution time from 1500+ seconds to under 500 seconds (~65% improvement) through test optimization and parallelization",
        "Improved deployment workflows across test, staging, and production environments, reducing release turnaround time significantly",
        "Resolved critical and high-severity production issues, maintaining high availability and system stability for enterprise healthcare applications",
        "Leveraged AI tools (GitHub Copilot, Claude Sonnet, ChatGPT) to accelerate development workflows and improve code quality",
      ],
      techStack: ["React.js", "TypeScript", "Redux", "AEM", "Jest", "JFrog", "SonarQube", "CI/CD", "GitHub Copilot"],
    },
    {
      id: "exp2",
      title: "Associate Software Developer",
      company: "Optum (via Omnie Solutions)",
      location: "Noida, India",
      startDate: "Nov 2022",
      endDate: "Nov 2023",
      current: false,
      bullets: [
        "Executed MUI v4 to v5 migration across 2 enterprise repositories (main app + shared UI component libraries), ensuring zero-downtime production rollout",
        "Updated custom React component libraries and CSS frameworks to align with MUI v5 theming standards, improving maintainability and developer experience",
        "Contributed to CMS to Adobe Experience Manager (AEM) migration, improving content delivery via REST APIs and reducing asset load times",
        "Reduced bundle size and enhanced frontend performance through optimized asset handling and code splitting strategies",
        "Managed end-to-end deployments across test, staging, and production environments with minimal release friction",
      ],
      techStack: ["React.js", "TypeScript", "MUI v4/v5", "AEM", "Redux", "Jest", "React Testing Library", "REST APIs"],
    },
    {
      id: "exp3",
      title: "Trainee Software Developer",
      company: "Optum (via Omnie Solutions)",
      location: "Noida, India",
      startDate: "Apr 2022",
      endDate: "Nov 2022",
      current: false,
      bullets: [
        "Introduced modular architecture by extracting common features into reusable React packages, improving code reusability and maintainability across teams",
        "Built responsive UI components using React.js and TypeScript for enterprise pharma web applications",
        "Worked on REST API integration, debugging, and frontend performance fixes to improve user experience",
        "Collaborated with senior developers on code reviews and documentation, contributing to team knowledge sharing",
      ],
      techStack: ["React.js", "JavaScript", "TypeScript", "HTML5", "CSS3", "Jest", "REST APIs", "Git"],
    },
  ],

  projects: [
    {
      id: "proj1",
      name: "Portfolio Website — React.js & Next.js",
      description:
        "Built and deployed a production-ready personal portfolio from scratch using React.js and Next.js, showcasing frontend engineering skills with a focus on performance optimization, responsive UI, and ATS-optimized resume tooling.",
      techStack: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      highlights: [
        "Built and deployed production-ready portfolio with performance optimization and responsive design",
        "Integrated AI-assisted development workflow for faster iteration and debugging",
        "Implemented ATS resume optimizer with job description keyword matching",
      ],
    },
    {
      id: "proj2",
      name: "Enterprise Pharma Portal — MUI v5 Migration",
      description:
        "Led the complete migration of 2 enterprise pharma applications from MUI v4 to MUI v5, including shared custom component libraries. Improved theming consistency, maintainability, and developer experience with zero production downtime.",
      techStack: ["React.js", "TypeScript", "MUI v5", "Redux", "Jest", "React Testing Library"],
      highlights: [
        "Migrated 2 full enterprise applications with zero downtime",
        "Improved theming consistency and reduced component library maintenance overhead by ~40%",
        "Ensured backward compatibility across all shared UI libraries",
      ],
    },
    {
      id: "proj3",
      name: "CMS to AEM Migration & CI/CD Optimization",
      description:
        "Led end-to-end migration from legacy CMS to Adobe Experience Manager (AEM), moving all assets to AEM Assets. Simultaneously completed JFrog migration in under 20 days and reduced CI test execution time by ~65% through Jest optimization.",
      techStack: ["AEM", "React.js", "TypeScript", "JFrog", "Jest", "CI/CD", "REST APIs"],
      highlights: [
        "Reduced CI test execution time from 1500s to <500s (~65% improvement)",
        "Completed JFrog migration in under 20 days, improving artifact management",
        "Optimized asset delivery and caching via AEM, reducing page load time",
      ],
    },
  ],

  skills: [
    {
      category: "Core Languages",
      items: ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3"],
    },
    {
      category: "Frameworks & Libraries",
      items: ["React.js", "Next.js", "Redux", "Redux Toolkit", "Material UI v4", "Material UI v5", "React Router", "React Testing Library"],
    },
    {
      category: "Styling",
      items: ["CSS Modules", "SCSS", "Styled Components", "Material UI", "Responsive Design", "Tailwind CSS"],
    },
    {
      category: "CMS & Platforms",
      items: ["Adobe Experience Manager (AEM)", "JFrog", "SonarQube"],
    },
    {
      category: "Testing & Quality",
      items: ["Jest (v27–v29)", "React Testing Library", "Unit Testing", "Integration Testing", "80%+ Test Coverage"],
    },
    {
      category: "Tools & DevOps",
      items: ["Git", "GitHub", "CI/CD Pipelines", "Webpack", "Vite", "Agile/Scrum", "REST APIs"],
    },
    {
      category: "AI & Productivity Tools",
      items: ["GitHub Copilot", "Claude Sonnet", "ChatGPT"],
    },
  ],

  achievements: [
    {
      id: "ach1",
      title: "CI/CD Performance — 65% Faster Test Execution",
      description:
        "Reduced Jest test execution time from 1500+ seconds to under 500 seconds (~65% improvement) through test optimization and parallelization, significantly improving CI pipeline efficiency.",
      year: "2024",
    },
    {
      id: "ach2",
      title: "80%+ Test Coverage in 10 Days",
      description:
        "Upgraded Jest from v27 to v29 and achieved 80%+ unit test coverage within 10 days, ensuring SonarQube Quality Gate compliance across enterprise modules.",
      year: "2024",
    },
    {
      id: "ach3",
      title: "JFrog Migration — Delivered in Under 20 Days",
      description:
        "Completed end-to-end JFrog artifact management migration in under 20 days, improving CI/CD pipeline reliability and deployment consistency.",
      year: "2024",
    },
    {
      id: "ach4",
      title: "MUI v5 Migration Lead — Zero Downtime",
      description:
        "Led migration of 2 enterprise pharma applications from MUI v4 to MUI v5 including shared component libraries, with zero production downtime and improved theming consistency.",
      year: "2024",
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
