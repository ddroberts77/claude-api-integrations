import { readFileSync } from 'fs';
import { join } from 'path';

const PROMPTS_DIR = join(__dirname, '../prompts');

export function formatPrompt(type: string, data: Record<string, any>): string {
  const template = readFileSync(
    join(PROMPTS_DIR, `${type}.txt`),
    'utf-8'
  );

  return Object.entries(data).reduce((prompt, [key, value]) => {
    return prompt.replace(new RegExp(`{{${key}}}`, 'g'), value);
  }, template);
}

export function parseResponse(response: string): any {
  try {
    return JSON.parse(response);
  } catch {
    // If not JSON, return as is
    return response;
  }
}