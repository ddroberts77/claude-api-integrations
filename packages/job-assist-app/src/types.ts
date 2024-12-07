export interface JobAnalyzerConfig {
  apiKey: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface ResumeAnalysis {
  skills: string[];
  experience: {
    years: number;
    highlights: string[];
  };
  education: {
    level: string;
    field?: string;
  };
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
}

export interface JobMatch {
  score: number;
  matchedSkills: string[];
  missingSkills: string[];
  recommendations: string[];
  fitSummary: string;
}

export interface Feedback {
  overall: string;
  format: string;
  content: string;
  improvements: string[];
  strengths: string[];
  technicalScore?: number;
  presentationScore?: number;
}
