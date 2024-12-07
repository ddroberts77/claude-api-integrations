import { Configuration, OpenAIApi } from 'openai';
import { JobAnalyzerConfig, ResumeAnalysis, JobMatch, Feedback } from './types';
import { formatPrompt, parseResponse } from './utils/prompt-handler';
import { validateInput } from './utils/validators';
import { logger } from './utils/logger';

export class JobAnalyzer {
  private claude: OpenAIApi;
  private config: JobAnalyzerConfig;

  constructor(config: JobAnalyzerConfig) {
    this.config = config;
    this.claude = new OpenAIApi(new Configuration({
      apiKey: config.apiKey
    }));
  }

  async analyzeResume(resume: string): Promise<ResumeAnalysis> {
    try {
      validateInput({ resume });

      const prompt = formatPrompt('analyze_resume', { resume });
      
      const response = await this.claude.createCompletion({
        model: this.config.model || 'claude-3',
        prompt,
        max_tokens: 1000,
        temperature: 0.7
      });

      return parseResponse(response.data.choices[0].text) as ResumeAnalysis;
    } catch (error) {
      logger.error('Error analyzing resume:', error);
      throw new Error('Failed to analyze resume');
    }
  }

  async matchJob(resume: string, jobDescription: string): Promise<JobMatch> {
    try {
      validateInput({ resume, jobDescription });

      const prompt = formatPrompt('match_job', { resume, jobDescription });
      
      const response = await this.claude.createCompletion({
        model: this.config.model || 'claude-3',
        prompt,
        max_tokens: 1000,
        temperature: 0.7
      });

      return parseResponse(response.data.choices[0].text) as JobMatch;
    } catch (error) {
      logger.error('Error matching job:', error);
      throw new Error('Failed to match job');
    }
  }

  async generateFeedback(resume: string, jobDescription?: string): Promise<Feedback> {
    try {
      validateInput({ resume, jobDescription });

      const prompt = formatPrompt('generate_feedback', { resume, jobDescription });
      
      const response = await this.claude.createCompletion({
        model: this.config.model || 'claude-3',
        prompt,
        max_tokens: 1500,
        temperature: 0.8
      });

      return parseResponse(response.data.choices[0].text) as Feedback;
    } catch (error) {
      logger.error('Error generating feedback:', error);
      throw new Error('Failed to generate feedback');
    }
  }

  async improveResume(resume: string, targetJob?: string): Promise<string> {
    try {
      validateInput({ resume, targetJob });

      const prompt = formatPrompt('improve_resume', { resume, targetJob });
      
      const response = await this.claude.createCompletion({
        model: this.config.model || 'claude-3',
        prompt,
        max_tokens: 2000,
        temperature: 0.8
      });

      return response.data.choices[0].text.trim();
    } catch (error) {
      logger.error('Error improving resume:', error);
      throw new Error('Failed to improve resume');
    }
  }
}