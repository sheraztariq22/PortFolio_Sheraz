export interface PersonalInfo {
  name: string;
  age: number;
  location: string;
  title: string;
  tagline: string;
  /** One quantified, above-the-fold proof point for the hero. Real numbers / scope only. */
  proofPoint?: string;
  email: string;
  phone?: string;
  handle: string;
  bio: string;
  avatar: string;
  fallbackAvatar: string;
}

export interface Education {
  current: {
    degree: string;
    institution: string;
    duration: string;
    cgpa: string;
    graduationDate: string;
  };
  previous?: {
    degree: string;
    institution: string;
    duration: string;
    percentage?: string;
    completionDate?: string;
  };
  achievements: string[];
}

export interface Experience {
  company: string;
  position: string;
  type: string;
  duration: string;
  description: string;
  technologies: string[];
}

export interface Skills {
  languages: string[];
  genai_agents: string[];
  ai_ml: string[];
  backend_web: string[];
  cloud_data: string[];
  enterprise_crm: string[];
}

export interface ProjectLink {
  name: string;
  url: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
}

/** A single stat block. Real numbers or concrete scope only — never invented percentages. */
export interface Metric {
  label: string;
  value: string;
}

/** Structured case-study narrative for featured projects: problem → approach → role → impact. */
export interface CaseStudy {
  problem: string;
  approach: string;
  role: string;
  impact: string;
}

export interface Project {
  title: string;
  category: string;
  description: string;
  techStack: string[];
  date: string;
  status: string;
  featured: boolean;
  caseStudy?: CaseStudy;
  achievements?: string[];
  metrics?: Metric[];
  links: ProjectLink[];
  images: ProjectImage[];
}

export interface Social {
  linkedin: string;
  github: string;
  twitter: string;
  leetcode: string;
  liveProduct?: string;
  portfolio?: string;
}

export interface Internship {
  seeking: boolean;
  duration: string;
  startDate: string;
  preferredLocation: string;
  focusAreas: string[];
  availability: string;
  workStyle: string;
  goals: string;
}

export interface Personality {
  traits: string[];
  interests: string[];
  funFacts: string[];
  workingStyle: string;
  motivation: string;
}

export interface Resume {
  title: string;
  description: string;
  fileType: string;
  lastUpdated: string;
  fileSize: string;
  downloadUrl: string;
}

export interface Chatbot {
  name: string;
  personality: string;
  tone: string;
  language: string;
  responseStyle: string;
  useEmojis: boolean;
  topics: string[];
}

export interface PresetQuestions {
  me: string[];
  professional: string[];
  projects: string[];
  contact: string[];
  fun: string[];
}

export interface Meta {
  configVersion: string;
  lastUpdated: string;
  generatedBy: string;
  description: string;
}

export interface PortfolioConfig {
  personal: PersonalInfo;
  education: Education;
  certifications?: string[];
  experience: Experience[];
  skills: Skills;
  projects: Project[];
  social: Social;
  internship: Internship;
  personality: Personality;
  resume: Resume;
  chatbot: Chatbot;
  presetQuestions: PresetQuestions;
  meta: Meta;
}

// Utility types for component props
export interface ProjectContentProps {
  project: {
    title: string;
  };
}

export interface ContactInfo {
  name: string;
  email: string;
  handle: string;
  socials: Array<{
    name: string;
    url: string;
  }>;
}

export interface ProfileInfo {
  name: string;
  title: string;
  tagline: string;
  age: string;
  location: string;
  description: string;
  src: string;
  fallbackSrc: string;
}

export interface SkillCategory {
  category: string;
  icon: React.ReactNode;
  skills: string[];
  color: string;
}
