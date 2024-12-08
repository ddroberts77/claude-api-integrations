/**
 * Claude API client wrapper
 */
const { Client } = require('@anthropic-ai/sdk');

class ClaudeClient {
  /**
   * Create a new Claude API client
   * @param {string} apiKey - Claude API key
   */
  constructor(apiKey) {
    this.client = new Client(apiKey);
  }

  /**
   * Send a message to Claude
   * @param {string} message - Message to send
   * @returns {Promise<string>} Claude's response
   */
  async sendMessage(message) {
    const response = await this.client.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: 1024,
      messages: [{ role: 'user', content: message }]
    });
    return response.content[0].text;
  }
}

module.exports = ClaudeClient;