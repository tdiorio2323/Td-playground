import { openai, isOpenAIConfigured } from "@/lib/openaiClient";

// Default configuration for OpenAI API calls
const DEFAULT_MODEL = "gpt-3.5-turbo";
const DEFAULT_TEMPERATURE = 0.7;
const DEFAULT_MAX_TOKENS = 500;

/**
 * Validates OpenAI configuration and logs warning if not configured
 * @returns true if configured, false otherwise
 */
function validateOpenAIConfig(): boolean {
  if (!isOpenAIConfigured() || !openai) {
    console.warn("OpenAI is not configured. Please set VITE_OPENAI_API_KEY.");
    return false;
  }
  return true;
}

/**
 * Example usage of OpenAI client for chat completions
 *
 * @param prompt - The user's prompt
 * @param systemMessage - Optional system message to set behavior
 * @returns The AI response text or null if OpenAI is not configured
 *
 * @example
 * ```tsx
 * const response = await getChatCompletion('Tell me a joke');
 * if (response) {
 *   console.log(response);
 * }
 * ```
 */
export async function getChatCompletion(
  prompt: string,
  systemMessage: string = "You are a helpful assistant.",
): Promise<string | null> {
  if (!validateOpenAIConfig()) {
    return null;
  }

  try {
    const completion = await openai!.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: prompt },
      ],
      temperature: DEFAULT_TEMPERATURE,
      max_tokens: DEFAULT_MAX_TOKENS,
    });

    return completion.choices[0]?.message?.content || null;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return null;
  }
}

/**
 * Example usage of OpenAI client for streaming chat completions
 *
 * @param prompt - The user's prompt
 * @param onChunk - Callback function called with each chunk of text
 * @param systemMessage - Optional system message to set behavior
 *
 * @example
 * ```tsx
 * await streamChatCompletion(
 *   'Write a short story',
 *   (chunk) => console.log(chunk)
 * );
 * ```
 */
export async function streamChatCompletion(
  prompt: string,
  onChunk: (text: string) => void,
  systemMessage: string = "You are a helpful assistant.",
): Promise<void> {
  if (!validateOpenAIConfig()) {
    return;
  }

  try {
    const stream = await openai!.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: prompt },
      ],
      temperature: DEFAULT_TEMPERATURE,
      max_tokens: DEFAULT_MAX_TOKENS,
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        onChunk(content);
      }
    }
  } catch (error) {
    console.error("Error streaming from OpenAI API:", error);
  }
}
