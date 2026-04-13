import { ResumeData } from "@/types/resume";
import { JobAnalysis, MatchResult } from "@/types/job";

const ACTION_VERBS = [
  "Architected", "Engineered", "Developed", "Built", "Implemented",
  "Optimized", "Reduced", "Improved", "Increased", "Led", "Mentored",
  "Collaborated", "Delivered", "Shipped", "Migrated", "Refactored",
  "Designed", "Integrated", "Automated", "Streamlined",
];

function normalizeKeyword(kw: string): string {
  return kw.toLowerCase().replace(/[.\s-]/g, "");
}

function resumeContainsKeyword(resume: ResumeData, keyword: string): boolean {
  const norm = normalizeKeyword(keyword);
  const searchText = [
    resume.summary,
    ...resume.skills.flatMap((s) => s.items),
    ...resume.experience.flatMap((e) => [...e.bullets, ...e.techStack]),
    ...resume.projects.flatMap((p) => [...p.highlights, ...p.techStack]),
  ]
    .join(" ")
    .toLowerCase()
    .replace(/[.\s-]/g, "");

  return searchText.includes(norm);
}

function generateBulletSuggestion(bullet: string, keywords: string[]): string {
  const lower = bullet.toLowerCase();
  const relevantKws = keywords.filter((kw) => lower.includes(kw.toLowerCase()));

  if (relevantKws.length === 0) return bullet;

  const startsWithVerb = ACTION_VERBS.some((v) => bullet.startsWith(v));
  if (!startsWithVerb) {
    const verb = ACTION_VERBS[Math.floor(Math.random() * 5)];
    return `${verb} ${bullet.charAt(0).toLowerCase()}${bullet.slice(1)}`;
  }

  return bullet;
}

export function optimizeResume(resume: ResumeData, analysis: JobAnalysis): MatchResult {
  const { keywords, requiredSkills } = analysis;

  const matchedKeywords: string[] = [];
  const missingKeywords: string[] = [];

  keywords.forEach((kw) => {
    if (resumeContainsKeyword(resume, kw)) {
      matchedKeywords.push(kw);
    } else {
      missingKeywords.push(kw);
    }
  });

  const score = keywords.length > 0 ? Math.round((matchedKeywords.length / keywords.length) * 100) : 0;

  const suggestions: string[] = [];

  if (missingKeywords.length > 0) {
    suggestions.push(
      `Add these missing keywords to your resume: ${missingKeywords.slice(0, 5).join(", ")}`
    );
  }

  const missingRequired = requiredSkills.filter((s) => !resumeContainsKeyword(resume, s));
  if (missingRequired.length > 0) {
    suggestions.push(
      `Critical missing skills: ${missingRequired.join(", ")} — these are required for this role`
    );
  }

  if (score < 50) {
    suggestions.push("Your resume has low keyword overlap. Consider tailoring your summary and skills section.");
  } else if (score < 75) {
    suggestions.push("Good match! Add a few more keywords from the job description to improve your score.");
  } else {
    suggestions.push("Excellent match! Your resume is well-aligned with this job description.");
  }

  suggestions.push("Quantify your achievements with metrics (%, $, time saved) for stronger impact.");
  suggestions.push("Ensure your summary directly mirrors the job title and key requirements.");

  const optimizedBullets: Record<string, string[]> = {};
  resume.experience.forEach((exp) => {
    optimizedBullets[exp.id] = exp.bullets.map((b) =>
      generateBulletSuggestion(b, keywords)
    );
  });

  return {
    score,
    matchedKeywords,
    missingKeywords,
    suggestions,
    optimizedBullets,
  };
}
