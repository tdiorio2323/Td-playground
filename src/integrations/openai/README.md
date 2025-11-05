# OpenAI Integration

This directory contains utilities for integrating OpenAI's API into the TD Playground application.

## Setup

1. Get your OpenAI API key from [platform.openai.com](https://platform.openai.com/api-keys)
2. Add it to your `.env.local` file:
   ```
   VITE_OPENAI_API_KEY=sk-...
   ```

## Usage

### Chat Completions

```tsx
import { getChatCompletion } from "@/integrations/openai/chat";

// Basic usage
const response = await getChatCompletion("What is React?");
console.log(response);

// With custom system message
const response = await getChatCompletion("Write a haiku", "You are a creative poet.");
```

### Streaming Chat

```tsx
import { streamChatCompletion } from "@/integrations/openai/chat";

// Stream response chunks
await streamChatCompletion("Tell me a story", (chunk) => {
  // Update UI with each chunk
  setContent((prev) => prev + chunk);
});
```

## Available Functions

### `getChatCompletion(prompt, systemMessage?)`

Generates a complete chat response from OpenAI.

- **Parameters:**
  - `prompt` (string): The user's message
  - `systemMessage` (string, optional): System instructions for the AI
- **Returns:** `Promise<string | null>` - The AI's response or null if not configured
- **Model:** gpt-3.5-turbo

### `streamChatCompletion(prompt, onChunk, systemMessage?)`

Streams chat response chunks in real-time.

- **Parameters:**
  - `prompt` (string): The user's message
  - `onChunk` (function): Callback for each text chunk
  - `systemMessage` (string, optional): System instructions for the AI
- **Returns:** `Promise<void>`
- **Model:** gpt-3.5-turbo

## Best Practices

1. **Always check if OpenAI is configured** before calling functions (they handle this internally)
2. **Handle errors gracefully** - functions return null on failure
3. **Respect rate limits** - implement debouncing/throttling for user input
4. **Secure your API key** - never commit `.env.local` to git
5. **Use streaming** for better UX with longer responses

## Security Note

⚠️ **Client-side API key usage**: The OpenAI client is configured with `dangerouslyAllowBrowser: true` for development and prototyping.

For production applications, you should:

- Move OpenAI API calls to a backend server
- Never expose your API key in client-side code
- Implement rate limiting and user authentication
- Use environment variables only for development
