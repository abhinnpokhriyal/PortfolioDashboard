import { JobAnalysis } from "@/types/job";

const TECH_KEYWORDS = new Set([
  "react", "next.js", "nextjs", "typescript", "javascript", "node.js", "nodejs",
  "tailwind", "css", "html", "redux", "zustand", "graphql", "rest", "api",
  "webpack", "vite", "jest", "testing", "cypress", "playwright", "storybook",
  "git", "github", "docker", "kubernetes", "aws", "vercel", "netlify",
  "postgresql", "mongodb", "prisma", "sql", "nosql", "redis",
  "python", "java", "go", "rust", "php", "ruby",
  "vue", "angular", "svelte", "solid",
  "react query", "swr", "axios", "fetch",
  "framer motion", "gsap", "three.js",
  "figma", "sketch", "adobe xd",
  "agile", "scrum", "jira", "confluence",
  "ci/cd", "devops", "linux", "bash",
  "performance", "optimization", "seo", "accessibility", "wcag",
  "micro-frontend", "microfrontend", "module federation",
  "websocket", "webrtc", "pwa", "service worker",
  "monorepo", "turborepo", "nx", "lerna",
  "shadcn", "radix", "chakra", "material ui", "ant design",
  "express", "fastapi", "django", "spring",
  "oauth", "jwt", "authentication", "authorization",
]);

const ROLE_KEYWORDS = new Set([
  "frontend", "front-end", "front end", "ui", "ux", "full stack", "fullstack",
  "senior", "lead", "principal", "staff", "architect",
  "engineer", "developer", "programmer",
  "react developer", "frontend engineer", "ui engineer",
]);

const SOFT_SKILL_KEYWORDS = new Set([
  "communication", "leadership", "mentoring", "collaboration", "teamwork",
  "problem solving", "analytical", "ownership", "initiative", "agile",
  "cross-functional", "stakeholder", "product", "design",
]);

export function extractKeywords(jobDescription: string): JobAnalysis {
  const lower = jobDescription.toLowerCase();

  const techFound: string[] = [];
  const roleFound: string[] = [];
  const softFound: string[] = [];

  TECH_KEYWORDS.forEach((kw) => {
    if (lower.includes(kw)) techFound.push(kw);
  });
  ROLE_KEYWORDS.forEach((kw) => {
    if (lower.includes(kw)) roleFound.push(kw);
  });
  SOFT_SKILL_KEYWORDS.forEach((kw) => {
    if (lower.includes(kw)) softFound.push(kw);
  });

  const requiredSection = lower.split(/nice.to.have|good.to.have|preferred|bonus/i)[0];
  const niceSection = lower.split(/nice.to.have|good.to.have|preferred|bonus/i)[1] || "";

  const requiredSkills: string[] = [];
  const niceToHaveSkills: string[] = [];

  TECH_KEYWORDS.forEach((kw) => {
    if (requiredSection.includes(kw)) requiredSkills.push(kw);
    else if (niceSection.includes(kw)) niceToHaveSkills.push(kw);
  });

  const allKeywords = [...new Set([...techFound, ...roleFound, ...softFound])];

  return {
    keywords: allKeywords,
    requiredSkills: requiredSkills.length ? requiredSkills : techFound.slice(0, Math.ceil(techFound.length * 0.7)),
    niceToHaveSkills: niceToHaveSkills.length ? niceToHaveSkills : techFound.slice(Math.ceil(techFound.length * 0.7)),
    roleKeywords: roleFound,
    toolsAndTech: techFound,
  };
}
