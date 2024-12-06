# API Documentation

## Authentication

```typescript
import { ClaudeClient } from '@claude-api-integrations/core';

const client = new ClaudeClient({
  apiKey: process.env.CLAUDE_API_KEY
});
```

## Core Features

### Text Generation
```typescript
const response = await client.complete({
  prompt: 'Analyze this code:',
  maxTokens: 1000
});
```

### Error Handling
```typescript
try {
  const response = await client.complete(prompt);
} catch (error) {
  if (error instanceof RateLimitError) {
    // Handle rate limiting
  }
}
```

## Integration Examples

### Firebase
```typescript
import { FirebaseIntegration } from '@claude-api-integrations/firebase';

const firebase = new FirebaseIntegration();
await firebase.storeResponse(response);
```

### Job Assistant
```typescript
import { JobAnalyzer } from '@claude-api-integrations/job-assist';

const analyzer = new JobAnalyzer();
const analysis = await analyzer.analyzeResume(resume);
```