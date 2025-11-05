import OpenAI from "openai";

// Support Vite environment variable convention
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

if (!apiKey) {
  console.warn("Missing OpenAI API key. Some AI features may not be available.");
}

// Create OpenAI client instance only if API key is provided
export const openai = apiKey
  ? new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true, // Required for client-side usage in browser
    })
  : null;

// Helper to check if OpenAI is configured
export const isOpenAIConfigured = (): boolean => {
  return apiKey !== undefined && apiKey !== "";
};
