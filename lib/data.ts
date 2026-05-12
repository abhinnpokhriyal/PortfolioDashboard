import { ResumeData } from "@/types/resume";

export const resumeData: ResumeData = {
  name: "Abhinn Pokhriyal",
  title: "Software Developer",
  email: "abhinnpokhriyal@gmail.com",
  phone: "+91 9599754526",
  location: "Delhi, India",
  linkedin: "https://linkedin.com/in/abhinn-pokhriyal-a26279194",
  github: "https://github.com/abhinnpokhriyal",
  website: "",
  summary:
    "Software Developer (4+ yrs) driving scalable healthcare platforms, delivering 65% CI performance gains, 80%+ test coverage, and large-scale UI migrations (MUI, AEM) at enterprise scale.",

  education: [
    {
      id: "edu1",
      degree: "B. Tech, Computer Science",
      institution: "KCC Institute of Technology",
      location: "Greater Noida, Uttar Pradesh",
      startYear: "2018",
      endYear: "2022",
      highlights: [],
    },
  ],

  experience: [
    {
      id: "exp1",
      title: "Frontend Engineer",
      company: "Optum (via Omnie Solutions)",
      location: "Noida",
      startDate: "2022",
      endDate: "Present",
      current: true,
      bullets: [
        "Improved CI execution by 65% (1500s→<500s), accelerating release cycles across teams",
        "Achieved 80%+ test coverage in 10 days, reducing production defects and improving code reliability",
        "Directed MUI v4→v5 migration across multiple repos with zero downtime",
        "Drove CMS→AEM migration, optimizing asset delivery and reducing bundle size",
        "Built dynamic AEM-driven UI systems enabling non-technical stakeholders to manage content",
        "Optimized frontend performance using lazy loading & code splitting",
        "Resolved critical production issues under SLA ensuring system stability",
      ],
      techStack: ["React.js", "TypeScript", "Next.js", "Redux", "AEM", "Jest", "Material UI", "CI/CD"],
    },
  ],

  projects: [
    {
      id: "proj1",
      name: "Specialty Provider Portal",
      description:
        "Guided frontend enhancements and performance optimizations for provider workflows. Improved test efficiency and reduced execution time significantly through Jest optimizations. Contributed to AEM migration improving content scalability and maintainability.",
      startDate: "2024",
      endDate: "2026",
      techStack: ["React.js", "TypeScript", "AEM", "Jest", "Material UI"],
      highlights: [],
      liveUrl: "Specialty Provider Portal",
    },
    {
      id: "proj2",
      name: "Specialty Patient Portal",
      description:
        "Migrated large-scale application from MUI v4 to v5 across multiple shared repositories. Built reusable component libraries improving scalability and development speed. Enhanced accessibility, performance, and user experience for patient-facing platform.",
      startDate: "2022",
      endDate: "2024",
      techStack: ["React.js", "TypeScript", "Material UI", "Redux"],
      highlights: [],
      liveUrl: "Specialty Patient Portal",
    },
    {
      id: "proj3",
      name: "Portfolio Dashboard",
      description:
        "Built from scratch using React & Next.js with AI-assisted development. Implemented modern UI patterns and performance optimizations. Delivered production-ready portfolio with ATS-focused features and real-world use cases.",
      startDate: "2026",
      endDate: "Present",
      techStack: ["React.js", "Next.js", "TypeScript", "Tailwind CSS"],
      highlights: [],
      liveUrl: "Portfolio Dashboard",
    },
  ],

  skills: [
    {
      category: "Languages",
      items: ["JavaScript (ES6+)", "TypeScript"],
    },
    {
      category: "Frontend Development",
      items: ["React.js", "Next.js", "Material UI"],
    },
    {
      category: "State Management",
      items: ["Redux"],
    },
    {
      category: "Web Technologies",
      items: ["HTML", "CSS"],
    },
    {
      category: "Monitoring & Analytics",
      items: ["Datadog", "Adobe Experience Manager (AEM)", "Dynatrace", "SonarQube"],
    },
    {
      category: "Version Control",
      items: ["Git", "GitHub", "GitHub Desktop"],
    },
    {
      category: "CI/CD & DevOps",
      items: ["Jenkins", "GitHub Actions"],
    },
    {
      category: "Testing",
      items: ["Jest", "Unit Testing", "Integration Testing"],
    },
    {
      category: "API & Integration",
      items: ["Rest APIs", "API Integration"],
    },
  ],

  achievements: [
    {
      id: "ach1",
      title: "CI Performance Optimization",
      description:
        "Improved CI execution by 65%, reducing pipeline execution time from 1500 seconds to under 500 seconds, accelerating release cycles across teams",
      year: "2024",
    },
    {
      id: "ach2",
      title: "Test Coverage Excellence",
      description:
        "Achieved 80%+ test coverage within 10 days through Jest optimization and improved testing practices, reducing production defects and improving application stability",
      year: "2024",
    },
    {
      id: "ach3",
      title: "Large-Scale UI Migration",
      description:
        "Successfully led Material UI v4 to v5 migration across multiple repositories with zero downtime, improving UI consistency and maintainability",
      year: "2023",
    },
    {
      id: "ach4",
      title: "CMS to AEM Migration",
      description:
        "Contributed to CMS to Adobe Experience Manager migration, improving frontend maintainability and content scalability",
      year: "2023",
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
