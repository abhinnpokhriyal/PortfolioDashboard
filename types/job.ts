export interface JobAnalysis {
  keywords: string[];
  requiredSkills: string[];
  niceToHaveSkills: string[];
  roleKeywords: string[];
  toolsAndTech: string[];
}

export interface MatchResult {
  score: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
  optimizedBullets: Record<string, string[]>;
}
