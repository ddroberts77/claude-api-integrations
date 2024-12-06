import { JobAnalyzer } from './index';

describe('JobAnalyzer', () => {
  let analyzer: JobAnalyzer;

  beforeEach(() => {
    analyzer = new JobAnalyzer();
  });

  describe('analyzeResume', () => {
    it('should analyze resume content', async () => {
      const resume = 'Test resume content';
      const result = await analyzer.analyzeResume(resume);
      expect(result).toBeDefined();
      expect(result.score).toBeDefined();
      expect(result.suggestions).toBeInstanceOf(Array);
    });

    it('should handle empty resume', async () => {
      await expect(analyzer.analyzeResume(''))
        .rejects
        .toThrow('Resume content cannot be empty');
    });
  });

  describe('matchJob', () => {
    it('should match resume with job description', async () => {
      const resume = 'Test resume content';
      const jobDescription = 'Test job description';
      
      const result = await analyzer.matchJob(resume, jobDescription);
      expect(result).toBeDefined();
      expect(result.matchScore).toBeDefined();
      expect(result.recommendations).toBeInstanceOf(Array);
    });
  });
});