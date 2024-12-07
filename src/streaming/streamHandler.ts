import { EventEmitter } from 'events';

export class StreamHandler extends EventEmitter {
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 3;
  private backoffMs: number = 1000;

  constructor() {
    super();
  }

  async handleStream(prompt: string) {
    try {
      for await (const chunk of this.streamResponse(prompt)) {
        this.emit('data', chunk);
      }
      this.emit('end');
    } catch (error) {
      await this.handleError(error);
    }
  }

  private async* streamResponse(prompt: string) {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
        'x-api-key': process.env.CLAUDE_API_KEY
      },
      body: JSON.stringify({
        model: 'claude-3-opus-20240229',
        messages: [{ role: 'user', content: prompt }],
        stream: true
      })
    });

    const reader = response.body?.getReader();
    if (!reader) throw new Error('Failed to get reader');

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        yield new TextDecoder().decode(value);
      }
    } finally {
      reader.releaseLock();
    }
  }

  private async handleError(error: unknown) {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = this.backoffMs * Math.pow(2, this.reconnectAttempts - 1);
      this.emit('reconnecting', { attempt: this.reconnectAttempts, delay });
      await new Promise(resolve => setTimeout(resolve, delay));
      // Retry logic here
    } else {
      this.emit('error', error);
    }
  }

  reset() {
    this.reconnectAttempts = 0;
  }
}