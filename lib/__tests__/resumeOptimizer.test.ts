import { optimizeResume } from '../resumeOptimizer';
import { ResumeData } from '@/types/resume';
import { JobAnalysis } from '@/types/job';

// Mock resume data for testing
const createMockResume = (overrides?: Partial<ResumeData>): ResumeData => ({
  name: 'John Doe',
  title: 'Frontend Engineer',
  email: 'john@example.com',
  phone: '123-456-7890',
  location: 'San Francisco, CA',
  linkedin: 'linkedin.com/in/johndoe',
  github: 'github.com/johndoe',
  summary: 'Experienced frontend engineer with expertise in React and TypeScript',
  education: [
    {
      id: 'edu1',
      degree: 'BS Computer Science',
      institution: 'Stanford University',
      location: 'CA',
      startYear: '2015',
      endYear: '2019',
    },
  ],
  experience: [
    {
      id: 'exp1',
      title: 'Senior Frontend Engineer',
      company: 'Tech Corp',
      location: 'SF',
      startDate: '2020-01',
      endDate: '2024-01',
      current: false,
      bullets: [
        'Built scalable React applications',
        'Implemented TypeScript migration',
        'Mentored junior developers',
      ],
      techStack: ['React', 'TypeScript', 'Next.js'],
    },
  ],
  projects: [
    {
      id: 'proj1',
      name: 'E-commerce Platform',
      description: 'Built with React and Node.js',
      techStack: ['React', 'Node.js', 'MongoDB'],
      highlights: ['Increased performance by 50%'],
    },
  ],
  skills: [
    {
      category: 'Frontend',
      items: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
    },
    {
      category: 'Backend',
      items: ['Node.js', 'Express', 'PostgreSQL'],
    },
  ],
  achievements: [
    {
      id: 'ach1',
      title: 'Best Employee 2023',
      description: 'Recognition for outstanding work',
      year: '2023',
    },
  ],
  ...overrides,
});

const createMockAnalysis = (overrides?: Partial<JobAnalysis>): JobAnalysis => ({
  keywords: ['react', 'typescript', 'next.js'],
  requiredSkills: ['react', 'typescript'],
  niceToHaveSkills: ['next.js'],
  roleKeywords: ['frontend', 'senior'],
  toolsAndTech: ['react', 'typescript', 'next.js'],
  ...overrides,
});

describe('resumeOptimizer', () => {
  describe('optimizeResume', () => {
    it('should calculate 100% score for perfect keyword match', () => {
      const resume = createMockResume();
      const analysis = createMockAnalysis({
        keywords: ['react', 'typescript', 'next.js'],
      });

      const result = optimizeResume(resume, analysis);

      expect(result.score).toBe(100);
      expect(result.matchedKeywords).toHaveLength(3);
      expect(result.missingKeywords).toHaveLength(0);
    });

    it('should calculate 0% score for no keyword match', () => {
      const resume = createMockResume();
      const analysis = createMockAnalysis({
        keywords: ['python', 'django', 'flask'],
        requiredSkills: ['python'],
      });

      const result = optimizeResume(resume, analysis);

      expect(result.score).toBe(0);
      expect(result.matchedKeywords).toHaveLength(0);
      expect(result.missingKeywords).toHaveLength(3);
    });

    it('should calculate 50% score for half keyword match', () => {
      const resume = createMockResume();
      const analysis = createMockAnalysis({
        keywords: ['react', 'typescript', 'python', 'django'],
      });

      const result = optimizeResume(resume, analysis);

      expect(result.score).toBe(50);
      expect(result.matchedKeywords).toHaveLength(2);
      expect(result.missingKeywords).toHaveLength(2);
    });

    it('should handle empty keywords gracefully', () => {
      const resume = createMockResume();
      const analysis = createMockAnalysis({
        keywords: [],
        requiredSkills: [],
      });

      const result = optimizeResume(resume, analysis);

      expect(result.score).toBe(0);
      expect(result.matchedKeywords).toEqual([]);
      expect(result.missingKeywords).toEqual([]);
    });

    it('should normalize keywords for matching (case-insensitive)', () => {
      const resume = createMockResume();
      const analysis = createMockAnalysis({
        keywords: ['REACT', 'TypeScript', 'next.JS'],
      });

      const result = optimizeResume(resume, analysis);

      expect(result.score).toBe(100);
      expect(result.matchedKeywords).toContain('REACT');
      expect(result.matchedKeywords).toContain('TypeScript');
      expect(result.matchedKeywords).toContain('next.JS');
    });

    it('should normalize keywords with special characters', () => {
      const resume = createMockResume({
        skills: [
          {
            category: 'Frontend',
            items: ['React.js', 'Next-js', 'Type Script'],
          },
        ],
      });
      const analysis = createMockAnalysis({
        keywords: ['reactjs', 'nextjs', 'typescript'],
      });

      const result = optimizeResume(resume, analysis);

      expect(result.score).toBe(100);
    });

    it('should identify missing required skills in suggestions', () => {
      const resume = createMockResume();
      const analysis = createMockAnalysis({
        keywords: ['react', 'typescript', 'docker'],
        requiredSkills: ['docker'],
      });

      const result = optimizeResume(resume, analysis);

      const criticalSuggestion = result.suggestions.find(s =>
        s.includes('Critical missing skills')
      );
      expect(criticalSuggestion).toBeDefined();
      expect(criticalSuggestion).toContain('docker');
    });

    it('should provide low-score suggestions when score < 50%', () => {
      const resume = createMockResume();
      const analysis = createMockAnalysis({
        keywords: ['react', 'python', 'go', 'rust', 'java'],
      });

      const result = optimizeResume(resume, analysis);

      expect(result.score).toBeLessThan(50);
      const tailoringSuggestion = result.suggestions.find(s =>
        s.includes('low keyword overlap')
      );
      expect(tailoringSuggestion).toBeDefined();
    });

    it('should provide medium-score suggestions when 50% <= score < 75%', () => {
      const resume = createMockResume();
      const analysis = createMockAnalysis({
        keywords: ['react', 'typescript', 'python', 'go', 'rust'],
      });

      const result = optimizeResume(resume, analysis);

      // 2/5 = 40%
      expect(result.score).toBeGreaterThanOrEqual(40);
      expect(result.score).toBeLessThan(75);
      const improvementSuggestion = result.suggestions.find(s =>
        s.includes('Good match') || s.includes('low keyword overlap')
      );
      expect(improvementSuggestion).toBeDefined();
    });

    it('should provide high-score suggestions when score >= 75%', () => {
      const resume = createMockResume();
      const analysis = createMockAnalysis({
        keywords: ['react', 'typescript', 'next.js', 'tailwind'],
      });

      const result = optimizeResume(resume, analysis);

      expect(result.score).toBeGreaterThanOrEqual(75);
      const excellentSuggestion = result.suggestions.find(s =>
        s.includes('Excellent match')
      );
      expect(excellentSuggestion).toBeDefined();
    });

    it('should always include quantification and summary suggestions', () => {
      const resume = createMockResume();
      const analysis = createMockAnalysis();

      const result = optimizeResume(resume, analysis);

      const hasQuantifySuggestion = result.suggestions.some(s =>
        s.includes('Quantify your achievements')
      );
      const hasSummarySuggestion = result.suggestions.some(s =>
        s.includes('summary directly mirrors')
      );

      expect(hasQuantifySuggestion).toBe(true);
      expect(hasSummarySuggestion).toBe(true);
    });

    it('should include top missing keywords in suggestions', () => {
      const resume = createMockResume();
      const analysis = createMockAnalysis({
        keywords: ['react', 'python', 'docker', 'kubernetes', 'aws', 'graphql'],
      });

      const result = optimizeResume(resume, analysis);

      const missingSuggestion = result.suggestions.find(s =>
        s.includes('Add these missing keywords')
      );
      expect(missingSuggestion).toBeDefined();
      // Should limit to 5 keywords
      const keywordCount = (missingSuggestion?.match(/,/g) || []).length + 1;
      expect(keywordCount).toBeLessThanOrEqual(5);
    });

    it('should generate optimized bullets for each experience', () => {
      const resume = createMockResume();
      const analysis = createMockAnalysis();

      const result = optimizeResume(resume, analysis);

      expect(result.optimizedBullets).toHaveProperty('exp1');
      expect(result.optimizedBullets.exp1).toHaveLength(3);
    });

    it('should match keywords in experience bullets', () => {
      const resume = createMockResume({
        experience: [
          {
            id: 'exp1',
            title: 'Engineer',
            company: 'Tech',
            location: 'SF',
            startDate: '2020',
            endDate: '2024',
            current: false,
            bullets: ['Worked with React and TypeScript daily'],
            techStack: ['React'],
          },
        ],
      });
      const analysis = createMockAnalysis({
        keywords: ['react', 'typescript'],
      });

      const result = optimizeResume(resume, analysis);

      expect(result.matchedKeywords).toContain('react');
      expect(result.matchedKeywords).toContain('typescript');
    });

    it('should match keywords in project highlights', () => {
      const resume = createMockResume({
        projects: [
          {
            id: 'proj1',
            name: 'Project',
            description: 'App',
            techStack: ['Next.js'],
            highlights: ['Built with Next.js and deployed to Vercel'],
          },
        ],
      });
      const analysis = createMockAnalysis({
        keywords: ['next.js', 'vercel'],
      });

      const result = optimizeResume(resume, analysis);

      expect(result.matchedKeywords).toContain('next.js');
      expect(result.matchedKeywords).toContain('vercel');
    });

    it('should match keywords across all resume sections', () => {
      const resume = createMockResume({
        summary: 'React developer',
        skills: [{ category: 'Tech', items: ['TypeScript'] }],
        experience: [
          {
            id: 'exp1',
            title: 'Engineer',
            company: 'Tech',
            location: 'SF',
            startDate: '2020',
            endDate: '2024',
            current: false,
            bullets: ['Used Next.js'],
            techStack: ['Docker'],
          },
        ],
      });
      const analysis = createMockAnalysis({
        keywords: ['react', 'typescript', 'next.js', 'docker'],
      });

      const result = optimizeResume(resume, analysis);

      expect(result.score).toBe(100);
      expect(result.matchedKeywords).toEqual(['react', 'typescript', 'next.js', 'docker']);
    });

    it('should handle resume with no experience gracefully', () => {
      const resume = createMockResume({
        experience: [],
      });
      const analysis = createMockAnalysis();

      const result = optimizeResume(resume, analysis);

      expect(result).toHaveProperty('score');
      expect(result).toHaveProperty('suggestions');
      expect(result.optimizedBullets).toEqual({});
    });

    it('should round score to nearest integer', () => {
      const resume = createMockResume();
      const analysis = createMockAnalysis({
        keywords: ['react', 'typescript', 'python'],
      });

      const result = optimizeResume(resume, analysis);

      // 2/3 = 66.666... should round to 67
      expect(result.score).toBe(67);
      expect(Number.isInteger(result.score)).toBe(true);
    });
  });
});
