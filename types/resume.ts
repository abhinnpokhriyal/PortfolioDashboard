export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startYear: string;
  endYear: string;
  gpa?: string;
  highlights?: string[];
}

export interface WorkExperience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
  techStack: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  highlights: string[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  year: string;
}

export interface ResumeData {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  website?: string;
  summary: string;
  education: Education[];
  experience: WorkExperience[];
  projects: Project[];
  skills: Skill[];
  achievements: Achievement[];
}
