# Firebase Integration

## Setup

1. **Install Dependencies**
```bash
npm install @claude-api-integrations/firebase
```

2. **Configure Firebase**
```typescript
import { initializeApp } from 'firebase-admin';

initializeApp({
  credential: applicationDefault(),
  projectId: 'your-project-id'
});
```

3. **Initialize Integration**
```typescript
import { FirebaseIntegration } from '@claude-api-integrations/firebase';

const firebase = new FirebaseIntegration();
```

## Usage

### Store Responses
```typescript
await firebase.storeResponse({
  prompt: 'User query',
  response: 'AI response',
  metadata: { timestamp: Date.now() }
});
```

### Retrieve Responses
```typescript
const responses = await firebase.getResponses({
  userId: 'user123',
  limit: 10
});
```

### Real-time Updates
```typescript
firebase.onNewResponse((response) => {
  console.log('New response:', response);
});
```

## Security Rules

Recommended Firestore rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /responses/{response} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```