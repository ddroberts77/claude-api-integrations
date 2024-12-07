import { StreamHandler } from '../../src/streaming/streamHandler';

describe('StreamHandler', () => {
  let streamHandler: StreamHandler;

  beforeEach(() => {
    streamHandler = new StreamHandler();
  });

  test('should emit data events', (done) => {
    const mockData = 'test data';
    let receivedData = '';

    streamHandler.on('data', (chunk: string) => {
      receivedData += chunk;
    });

    streamHandler.on('end', () => {
      expect(receivedData).toContain(mockData);
      done();
    });

    // Add your test implementation here
  });

  test('should handle reconnection', (done) => {
    let reconnectAttempts = 0;

    streamHandler.on('reconnecting', ({ attempt }) => {
      reconnectAttempts = attempt;
    });

    streamHandler.on('error', () => {
      expect(reconnectAttempts).toBe(3);
      done();
    });

    // Add your test implementation here
  });
});