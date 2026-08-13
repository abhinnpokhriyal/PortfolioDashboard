import { extractKeywords } from '../keywordExtractor';
import { JobAnalysis } from '@/types/job';

describe('keywordExtractor', () => {
  describe('extractKeywords', () => {
    it('should extract basic tech keywords from job description', () => {
      const jd = `
        We are looking for a Senior Frontend Engineer with expertise in React, TypeScript, and Next.js.
        Must have 5+ years of experience building scalable web applications.
      `;

      const result = extractKeywords(jd);

      expect(result.toolsAndTech).toContain('react');
      expect(result.toolsAndTech).toContain('typescript');
      expect(result.toolsAndTech).toContain('next.js');
    });

    it('should extract role-specific keywords', () => {
      const jd = `
        Senior Frontend Engineer position requiring strong UI/UX skills.
        Lead developer to architect scalable solutions.
      `;

      const result = extractKeywords(jd);

      expect(result.roleKeywords).toContain('frontend');
      expect(result.roleKeywords).toContain('senior');
      expect(result.roleKeywords).toContain('ui');
      expect(result.roleKeywords).toContain('lead');
    });

    it('should handle empty job description', () => {
      const result = extractKeywords('');

      expect(result.keywords).toEqual([]);
      expect(result.toolsAndTech).toEqual([]);
      expect(result.roleKeywords).toEqual([]);
      expect(result.requiredSkills).toEqual([]);
      expect(result.niceToHaveSkills).toEqual([]);
    });

    it('should extract keywords case-insensitively', () => {
      const jd = 'REACT TYPESCRIPT JavaScript';

      const result = extractKeywords(jd);

      expect(result.toolsAndTech).toContain('react');
      expect(result.toolsAndTech).toContain('typescript');
      expect(result.toolsAndTech).toContain('javascript');
    });

    it('should split required vs nice-to-have skills', () => {
      const jd = `
        Required: React, TypeScript, Jest
        Nice to have: GraphQL, Docker, AWS
      `;

      const result = extractKeywords(jd);

      expect(result.requiredSkills).toContain('react');
      expect(result.requiredSkills).toContain('typescript');
      expect(result.requiredSkills).toContain('jest');
      
      expect(result.niceToHaveSkills).toContain('graphql');
      expect(result.niceToHaveSkills).toContain('docker');
      expect(result.niceToHaveSkills).toContain('aws');
    });

    it('should handle "nice to have" variation in splitting', () => {
      const jd = `
        Must have: React, TypeScript
        Good to have: Docker
      `;

      const result = extractKeywords(jd);

      expect(result.requiredSkills).toContain('react');
      expect(result.niceToHaveSkills).toContain('docker');
    });

    it('should handle "preferred" variation in splitting', () => {
      const jd = `
        Required: React
        Preferred: AWS, Kubernetes
      `;

      const result = extractKeywords(jd);

      expect(result.niceToHaveSkills).toContain('aws');
      expect(result.niceToHaveSkills).toContain('kubernetes');
    });

    it('should extract common tech stack combinations', () => {
      const jd = `
        Full stack role: React, Next.js, Node.js, PostgreSQL, Docker, AWS
      `;

      const result = extractKeywords(jd);

      expect(result.toolsAndTech).toContain('react');
      expect(result.toolsAndTech).toContain('next.js');
      expect(result.toolsAndTech).toContain('node.js');
      expect(result.toolsAndTech).toContain('postgresql');
      expect(result.toolsAndTech).toContain('docker');
      expect(result.toolsAndTech).toContain('aws');
    });

    it('should handle hyphenated and dotted variations', () => {
      const jd = 'Next.js, Node.js, front-end, fullstack';

      const result = extractKeywords(jd);

      expect(result.toolsAndTech).toContain('next.js');
      expect(result.toolsAndTech).toContain('node.js');
      expect(result.roleKeywords).toContain('front-end');
      expect(result.roleKeywords).toContain('fullstack');
    });

    it('should extract design and collaboration tools', () => {
      const jd = 'Experience with Figma, Sketch, Agile, Scrum, Jira';

      const result = extractKeywords(jd);

      expect(result.toolsAndTech).toContain('figma');
      expect(result.toolsAndTech).toContain('sketch');
      expect(result.toolsAndTech).toContain('agile');
      expect(result.toolsAndTech).toContain('scrum');
      expect(result.toolsAndTech).toContain('jira');
    });

    it('should de-duplicate keywords', () => {
      const jd = 'React React React TypeScript TypeScript';

      const result = extractKeywords(jd);

      // Count occurrences
      const reactCount = result.toolsAndTech.filter(k => k === 'react').length;
      const tsCount = result.toolsAndTech.filter(k => k === 'typescript').length;

      expect(reactCount).toBe(1);
      expect(tsCount).toBe(1);
    });

    it('should handle special characters in job description', () => {
      const jd = `
        React.js & TypeScript || Next.js (3+ years)
        CSS3 / HTML5 -- Modern web standards!
      `;

      const result = extractKeywords(jd);

      expect(result.toolsAndTech).toContain('react');
      expect(result.toolsAndTech).toContain('typescript');
      expect(result.toolsAndTech).toContain('next.js');
      expect(result.toolsAndTech).toContain('css');
      expect(result.toolsAndTech).toContain('html');
    });

    it('should return consistent structure even with minimal input', () => {
      const result = extractKeywords('JavaScript developer');

      expect(result).toHaveProperty('keywords');
      expect(result).toHaveProperty('requiredSkills');
      expect(result).toHaveProperty('niceToHaveSkills');
      expect(result).toHaveProperty('roleKeywords');
      expect(result).toHaveProperty('toolsAndTech');

      expect(Array.isArray(result.keywords)).toBe(true);
      expect(Array.isArray(result.requiredSkills)).toBe(true);
      expect(Array.isArray(result.niceToHaveSkills)).toBe(true);
      expect(Array.isArray(result.roleKeywords)).toBe(true);
      expect(Array.isArray(result.toolsAndTech)).toBe(true);
    });

    it('should fallback to splitting required/nice-to-have when no explicit section', () => {
      const jd = 'React TypeScript Next.js Docker AWS Kubernetes';

      const result = extractKeywords(jd);

      // Should split approximately 70/30
      expect(result.requiredSkills.length).toBeGreaterThan(0);
      expect(result.niceToHaveSkills.length).toBeGreaterThan(0);
      // Total should be less than or equal to toolsAndTech (soft skills may be in keywords but not toolsAndTech)
      expect(result.requiredSkills.length + result.niceToHaveSkills.length).toBeLessThanOrEqual(result.toolsAndTech.length + 1);
    });

    it('should handle real-world job description format', () => {
      const jd = `
        Senior Frontend Engineer - Remote
        
        We're looking for an experienced React developer to join our team.
        
        Requirements:
        - 5+ years of experience with React and TypeScript
        - Strong understanding of Next.js, Redux, and modern JavaScript
        - Experience with testing frameworks like Jest and React Testing Library
        - Proficiency in HTML5, CSS3, and responsive design
        
        Nice to have:
        - Experience with GraphQL and REST APIs
        - Familiarity with Docker and CI/CD pipelines
        - Knowledge of AWS or other cloud platforms
        
        We offer competitive salary and great benefits.
      `;

      const result = extractKeywords(jd);

      // Check required skills
      expect(result.requiredSkills).toContain('react');
      expect(result.requiredSkills).toContain('typescript');
      expect(result.requiredSkills).toContain('next.js');
      expect(result.requiredSkills).toContain('jest');

      // Check nice-to-have skills
      expect(result.niceToHaveSkills).toContain('graphql');
      expect(result.niceToHaveSkills).toContain('docker');
      expect(result.niceToHaveSkills).toContain('aws');

      // Check role keywords
      expect(result.roleKeywords).toContain('senior');
      expect(result.roleKeywords).toContain('frontend');
      expect(result.roleKeywords).toContain('engineer');
    });
  });
});
