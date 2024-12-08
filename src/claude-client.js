const { Client } = require('@anthropic-ai/sdk');

class ClaudeClient {
  constructor(apiKey) {
    if (!apiKey) {
      throw new Error('API key is required');
    }
    this.client = new Client(apiKey);
  }

  async sendMessage(message, options = {}) {
    try {
      const defaultOptions = {
        model: 'claude-3-opus-20240229',
        max_tokens: 1024,
        messages: [{ role: 'user', content: message }]
      };

      const response = await this.client.messages.create({
        ...defaultOptions,
        ...options
      });

      return response.content[0].text;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  async streamMessage(message, options = {}) {
    try {
      const defaultOptions = {
        model: 'claude-3-opus-20240229',
        max_tokens: 1024,
        messages: [{ role: 'user', content: message }]
      };

      const stream = await this.client.messages.create({
        ...defaultOptions,
        ...options,
        stream: true
      });

      return stream;
    } catch (error) {
      console.error('Error streaming message:', error);
      throw error;
    }
  }
}

module.exports = ClaudeClient;