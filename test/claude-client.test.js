const ClaudeClient = require('../src/claude-client');

describe('ClaudeClient', () => {
  let client;
  const mockApiKey = 'test-api-key';

  beforeEach(() => {
    client = new ClaudeClient(mockApiKey);
  });

  test('should require API key', () => {
    expect(() => new ClaudeClient()).toThrow('API key is required');
  });

  test('should initialize with API key', () => {
    expect(client.client).toBeDefined();
  });

  describe('sendMessage', () => {
    beforeEach(() => {
      // Mock the Claude API client's create method
      client.client.messages.create = jest.fn().mockResolvedValue({
        content: [{ text: 'Test response' }]
      });
    });

    test('should send message with default options', async () => {
      const response = await client.sendMessage('Test message');
      expect(response).toBe('Test response');
      expect(client.client.messages.create).toHaveBeenCalledWith(
        expect.objectContaining({
          model: 'claude-3-opus-20240229',
          max_tokens: 1024,
          messages: [{ role: 'user', content: 'Test message' }]
        })
      );
    });

    test('should handle API errors', async () => {
      const errorMessage = 'API Error';
      client.client.messages.create = jest.fn().mockRejectedValue(new Error(errorMessage));
      
      await expect(client.sendMessage('Test')).rejects.toThrow(errorMessage);
    });
  });
});