# API Endpoints

## Base URL
`https://api.anthropic.com/v1`

## Available Endpoints

### Text Completion
```typescript
POST /v1/complete
Content-Type: application/json

{
  "prompt": "Hello, I am",
  "max_tokens_to_sample": 300,
  "model": "claude-3-opus-20240229"
}
```

### Chat Completion
```typescript
POST /v1/messages
Content-Type: application/json

{
  "model": "claude-3-opus-20240229",
  "max_tokens": 1024,
  "messages": [
    {
      "role": "user",
      "content": "Hello, how are you?"
    }
  ]
}
```
