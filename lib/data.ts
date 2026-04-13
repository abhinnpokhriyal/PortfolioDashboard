import { ResumeData } from "@/types/resume";

export const resumeData: ResumeData = {
  name: "Abhinn Pokhriyal",
  title: "Frontend Engineer | React.js | Next.js | TypeScript | JavaScript | HTML | CSS | Performance Optimization | 4+ Years of Experience",
  email: "abhinnpokhriyal@gmail.com",
  phone: "+91 9599754526",
  location: "Delhi, India",
  linkedin: "https://linkedin.com/in/abhinn-pokhriyal-a26279194",
  github: "https://github.com/abhinnpokhriyal",
  website: "",
  summary:
    "Frontend Engineer with 4+ years of experience building, modernizing, and optimizing enterprise-scale web applications in the pharma domain. Specialized in React.js and TypeScript with a strong focus on clean architecture, maintainability, and user experience. Hands-on expertise in migrating legacy systems, improving performance, and delivering production-grade solutions in complex enterprise environments.",

  education: [
    {
      id: "edu1",
      degree: "Bachelor of Technology (B.Tech) — Computer Science",
      institution: "KCC Institute of Technology and Management",
      location: "Greater Noida, Uttar Pradesh",
      startYear: "2018",
      endYear: "2022",
      highlights: [
        "Specialized in Computer Science Engineering",
        "Developed strong foundation in data structures, algorithms, and web technologies",
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
      title: "Software Developer",
      company: "Omnie Solutions (I) Pvt Ltd",
      location: "Noida, India",
      startDate: "Nov 2025",
      endDate: "",
      current: true,
      bullets: [
        "Leading frontend development for enterprise-scale pharma applications using React.js and TypeScript",
        "Driving performance optimization initiatives including asset restructuring, caching strategies, and bundle size reduction",
        "Collaborating with cross-functional teams to deliver high-quality, production-grade UI solutions",
        "Leveraging AI tools (GitHub Copilot, Claude Sonnet, ChatGPT) to accelerate development workflows and improve code quality",
        "Ensuring SonarQube Quality Gate compliance and maintaining ~80% test coverage across modules",
      ],
      techStack: ["React.js", "TypeScript", "Redux", "AEM", "Jest", "SonarQube", "GitHub Copilot"],
    },
    {
      id: "exp2",
      title: "Associate Software Developer",
      company: "Omnie Solutions (I) Pvt Ltd",
      location: "Noida, India",
      startDate: "Dec 2023",
      endDate: "Oct 2025",
      current: false,
      bullets: [
        "Successfully migrated 2 enterprise applications from MUI v4 to MUI v5, including custom component libraries — improving maintainability, theming consistency, and developer experience",
        "Led end-to-end migration from CMS to Adobe Experience Manager (AEM), moving assets (images, CSS, content APIs) to AEM Assets — resulting in optimized bundles, improved caching, and faster load times",
        "Completed JFrog migration for an enterprise application, streamlining artifact management and improving CI/CD reliability",
        "Enhanced frontend performance by restructuring asset delivery (images, icons, styles), leading to better caching strategies and reduced load time",
        "Resolved critical and high-severity UI vulnerabilities, ensuring secure and stable production releases",
      ],
      techStack: ["React.js", "TypeScript", "MUI v5", "AEM", "JFrog", "Redux", "Jest", "React Testing Library"],
    },
    {
      id: "exp3",
      title: "Trainee Software Developer",
      company: "Omnie Solutions (I) Pvt Ltd",
      location: "Noida, India",
      startDate: "Apr 2022",
      endDate: "Nov 2023",
      current: false,
      bullets: [
        "Built and maintained responsive UI components for enterprise pharma web applications using React.js",
        "Improved test coverage to ~80% and achieved SonarQube Quality Gate compliance through optimized and scalable test strategies",
        "Collaborated with senior developers to understand enterprise architecture patterns and best practices",
        "Contributed to code reviews and documentation, improving team productivity and knowledge sharing",
      ],
      techStack: ["React.js", "JavaScript", "HTML5", "CSS3", "Jest", "REST APIs", "Git"],
    },
  ],

  projects: [
    {
      id: "proj1",
      name: "Enterprise Pharma Portal — MUI v5 Migration",
      description:
        "Led the complete migration of 2 enterprise pharma applications from MUI v4 to MUI v5, including custom component libraries. Improved theming consistency, maintainability, and developer experience across the platform.",
      techStack: ["React.js", "TypeScript", "MUI v5", "Redux", "Jest", "React Testing Library"],
      highlights: [
        "Migrated 2 full enterprise applications with zero downtime",
        "Improved theming consistency and developer experience",
        "Reduced component library maintenance overhead by 40%",
      ],
    },
    {
      id: "proj2",
      name: "CMS to AEM Migration",
      description:
        "Led end-to-end migration from legacy CMS to Adobe Experience Manager (AEM), moving all assets including images, CSS, and content APIs to AEM Assets. Resulted in optimized bundles, improved caching, and significantly faster load times.",
      techStack: ["AEM", "React.js", "TypeScript", "CSS", "REST APIs", "JFrog"],
      highlights: [
        "Optimized asset delivery and caching strategies",
        "Reduced page load time significantly post-migration",
        "Streamlined CI/CD pipeline via JFrog artifact management",
      ],
    },
    {
      id: "proj3",
      name: "AI-Assisted Development Workflow",
      description:
        "Integrated AI tools (GitHub Copilot, Claude Sonnet v4, ChatGPT) into daily development workflows to accelerate unit test writing, code refactoring, debugging, and code quality improvements.",
      techStack: ["GitHub Copilot", "Claude Sonnet", "ChatGPT", "React.js", "TypeScript", "Jest"],
      highlights: [
        "Increased development productivity through AI-assisted workflows",
        "Automated unit test generation for complex components",
        "Improved code quality and reduced debugging time",
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
      items: ["React.js", "Next.js", "Redux", "Redux Toolkit", "MUI (v4 & v5)", "React Router"],
    },
    {
      category: "Styling",
      items: ["CSS Modules", "SCSS", "Styled Components", "Material UI", "Responsive Design"],
    },
    {
      category: "CMS & Platforms",
      items: ["Adobe Experience Manager (AEM)", "JFrog", "SonarQube"],
    },
    {
      category: "Testing",
      items: ["Jest", "React Testing Library", "Unit Testing", "Integration Testing"],
    },
    {
      category: "Tools & DevOps",
      items: ["Git", "GitHub", "CI/CD", "Webpack", "Vite", "VS Code", "GitHub Copilot"],
    },
    {
      category: "AI Tools",
      items: ["GitHub Copilot", "Claude Sonnet (v4)", "ChatGPT"],
    },
  ],

  achievements: [
    {
      id: "ach1",
      title: "MUI v5 Migration Lead",
      description:
        "Successfully led migration of 2 enterprise pharma applications from MUI v4 to MUI v5, improving maintainability and theming consistency.",
      year: "2024",
    },
    {
      id: "ach2",
      title: "AEM Migration Champion",
      description:
        "Led end-to-end CMS to Adobe Experience Manager migration, resulting in optimized bundles, improved caching, and faster load times.",
      year: "2024",
    },
    {
      id: "ach3",
      title: "80% Test Coverage Achievement",
      description:
        "Improved test coverage to ~80% and achieved SonarQube Quality Gate compliance through optimized and scalable test strategies.",
      year: "2023",
    },
    {
      id: "ach4",
      title: "AI-Driven Productivity",
      description:
        "Integrated AI tools (GitHub Copilot, Claude Sonnet, ChatGPT) into daily workflows, significantly reducing development time while maintaining high coding standards.",
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
