import { ResumeData } from "@/types/resume";

export const resumeData: ResumeData = {
  name: "Abhinn Pokhriyal",
  title: "Frontend Engineer",
  email: "abhinnpokhriyal@gmail.com",
  phone: "+91 9599754526",
  location: "Delhi, India",
  linkedin: "https://linkedin.com/in/abhinn-pokhriyal-a26279194",
  github: "https://github.com/abhinnpokhriyal",
  website: "",
  summary:
    "I am a Frontend Engineer with over 4 years of experience focusing on scalable web applications in the healthcare and pharmaceutical sectors. I take pride in optimizing CI test execution times by 65% and achieving over 80% unit test coverage rapidly. With proficiency in React.js, TypeScript, and Adobe Experience Manager, I prioritize performance and robust delivery pipelines to drive project success",

  education: [
    {
      id: "edu1",
      degree: "Bachelor of Technology (B.Tech)",
      institution: "KCC Institute of Technology and Management",
      location: "Greater Noida, Uttar Pradesh",
      startYear: "08/2018",
      endYear: "06/2022",
      highlights: [],
    },
  ],

  experience: [
    {
      id: "exp1",
      title: "Software Developer / Frontend Engineer",
      company: "Optum (via Omnie Solutions)",
      location: "Noida",
      startDate: "11/2023",
      endDate: "",
      current: true,
      bullets: [
        "Directed JFrog artifact repository migration within 20 days, improving CI/CD reliability and deployment consistency across environments",
        "Reduced CI test execution time from 1500+ seconds to under 500 seconds (65% improvement) by streamlining Jest configuration and enabling parallel execution",
        "Achieved 80%+ unit test coverage within 10 days, ensuring SonarQube quality gate compliance and improving code reliability",
        "Enhanced application performance by migrating static assets to AEM, resulting in reduced bundle size and faster load times",
        "Developed a configurable notification banner system using AEM, enabling non-technical stakeholders to manage content independently",
        "Streamlined deployment workflows across development, staging, and production environments, reducing release turnaround time",
        "Resolved high-severity production issues, ensuring system stability and availability for enterprise applications",
        "Utilized AI-powered tools to improve development speed, code quality, and overall productivity",
      ],
      techStack: ["React.js", "TypeScript", "Redux", "AEM", "Jest", "JFrog", "SonarQube", "CI/CD"],
    },
    {
      id: "exp2",
      title: "Associate Software Developer",
      company: "Optum (via Omnie Solutions)",
      location: "Noida",
      startDate: "11/2022",
      endDate: "11/2023",
      current: false,
      bullets: [
        "Managed migration from Material UI v4 to v5 across two enterprise applications and shared component libraries with zero production downtime",
        "Improved scalability and maintainability by refactoring reusable component libraries and standardizing design patterns",
        "Contributed to CMS to AEM migration, enhancing content delivery via REST APIs and improving asset performance",
        "Enhanced frontend performance through code splitting, lazy loading, and efficient asset handling",
        "Coordinated deployment cycles across multiple environments, ensuring stable and consistent releases",
        "Collaborated with cross-functional teams including backend, QA, and DevOps to deliver high-quality features",
      ],
      techStack: ["React.js", "TypeScript", "Material UI", "AEM", "Redux", "Jest", "REST APIs"],
    },
    {
      id: "exp3",
      title: "Trainee Software Developer",
      company: "Optum (via Omnie Solutions)",
      location: "Noida",
      startDate: "04/2022",
      endDate: "11/2022",
      current: false,
      bullets: [
        "Introduced modular architecture by extracting reusable features into shared React packages, improving code reuse across projects",
        "Built responsive and accessible UI components using React.js and TypeScript for enterprise applications",
        "Integrated REST APIs and debugged performance issues to enhance user experience",
        "Supported code reviews, testing, and documentation, contributing to improved development practices",
      ],
      techStack: ["React.js", "JavaScript", "TypeScript", "HTML5", "CSS3", "REST APIs"],
    },
  ],

  projects: [
    {
      id: "proj1",
      name: "Portfolio Website (React.js & Next.js)",
      description:
        "Developed a production-ready portfolio showcasing frontend expertise, including an ATS-optimized resume generator and performance-focused UI",
      techStack: ["React.js", "Next.js", "TypeScript", "Tailwind CSS"],
      highlights: [],
      liveUrl: "Portfolio Website",
    },
    {
      id: "proj2",
      name: "Enterprise Pharma Portal – MUI Migration",
      description:
        "Executed migration from Material UI v4 to v5, improving UI consistency, maintainability, and developer efficiency",
      techStack: ["React.js", "TypeScript", "Material UI v5", "Redux"],
      highlights: [],
      liveUrl: "Enterprise Pharma Portal Migration",
    },
    {
      id: "proj3",
      name: "AEM Migration & CI/CD Optimization",
      description:
        "Delivered CMS to AEM migration and improved CI/CD pipeline efficiency, reducing execution time by 65%",
      techStack: ["AEM", "React.js", "TypeScript", "JFrog", "Jest", "CI/CD"],
      highlights: [],
      liveUrl: "AEM Migration & Optimization",
    },
  ],

  skills: [
    {
      category: "Frontend",
      items: ["React", "TypeScript", "Next.js", "Redux", "AEM", "Gmail", "GitHub"],
    },
    {
      category: "Core Technologies",
      items: ["Adobe Experience Manager", "JavaScript ES6+", "HTML", "Redux Toolkit", "React Router"],
    },
    {
      category: "Styling & UI",
      items: ["Material UI", "Tailwind", "SCSS"],
    },
    {
      category: "Testing & Tools",
      items: ["JFrog", "Sonar", "Jest", "Unit Testing", "Integration Testing", "Git", "Webpack"],
    },
    {
      category: "Other",
      items: ["REST", "Modular", "ATS"],
    },
  ],

  achievements: [
    {
      id: "ach1",
      title: "Performance Improvements and CI/CD Efficiency",
      description:
        "Demonstrated success in improving CI test execution time by 65%, achieving 80%+ unit test coverage within 10 days, and executing large-scale frontend and platform migrations",
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
