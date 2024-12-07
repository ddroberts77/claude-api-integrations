# Firebase Usage Guide

## Basic Operations

### Reading Data
```typescript
async function readConversation(conversationId: string) {
  const snapshot = await admin.database()
    .ref(`conversations/${conversationId}`)
    .once('value');
  return snapshot.val();
}
```

### Writing Data
```typescript
async function saveMessage(conversationId: string, message: any) {
  await admin.database()
    .ref(`conversations/${conversationId}/messages`)
    .push(message);
}
```

## Real-time Updates
```typescript
const conversationRef = admin.database()
  .ref(`conversations/${conversationId}`);

conversationRef.on('value', (snapshot) => {
  console.log('Data changed:', snapshot.val());
});
```
