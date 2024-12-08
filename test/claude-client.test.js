const ClaudeClient = require('../src/claude-client');

describe('ClaudeClient', () => {
  let client;

  beforeEach(() => {
    client = new ClaudeClient('test-key');
  });

  test('should initialize with API key', () => {
    expect(client).toBeDefined();
    expect(client.client).toBeDefined();
  });

  test('should send messages', async () => {
    // Mock the Claude API call
    client.client.messages.create = jest.fn().mockResolvedValue({
      content: [{ text: 'Test response' }]
    });

    const response = await client.sendMessage('Test message');
    expect(response).toBe('Test response');
  });
});