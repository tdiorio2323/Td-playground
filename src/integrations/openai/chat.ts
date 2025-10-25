import { openai, isOpenAIConfigured } from '@/lib/openaiClient'

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
  systemMessage: string = 'You are a helpful assistant.'
): Promise<string | null> {
  if (!isOpenAIConfigured() || !openai) {
    console.warn('OpenAI is not configured. Please set VITE_OPENAI_API_KEY.')
    return null
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 500
    })

    return completion.choices[0]?.message?.content || null
  } catch (error) {
    console.error('Error calling OpenAI API:', error)
    return null
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
  systemMessage: string = 'You are a helpful assistant.'
): Promise<void> {
  if (!isOpenAIConfigured() || !openai) {
    console.warn('OpenAI is not configured. Please set VITE_OPENAI_API_KEY.')
    return
  }

  try {
    const stream = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 500,
      stream: true
    })

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content
      if (content) {
        onChunk(content)
      }
    }
  } catch (error) {
    console.error('Error streaming from OpenAI API:', error)
  }
}
