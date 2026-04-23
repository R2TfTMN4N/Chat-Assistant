import { openai } from "@ai-sdk/openai";
import { google } from "@ai-sdk/google";

export type AIModelId =
  | "gpt-4o"
  | "gpt-4o-mini"
  | "gpt-4-turbo"
  | "gpt-3.5-turbo"
  | "gemini-2.0-flash-exp"
  | "gemini-1.5-pro"
  | "gemini-1.5-flash";

/**
 * Returns the appropriate AI model based on the model ID
 * @param modelId - The ID of the model to use
 * @returns The AI model instance
 */
export function getAIModel(modelId?: string) {
  const model = (modelId || "gpt-4o-mini") as AIModelId;

  switch (model) {
    // OpenAI models
    case "gpt-4o":
      return openai.chat("gpt-4o");
    case "gpt-4o-mini":
      return openai.chat("gpt-4o-mini");
    case "gpt-4-turbo":
      return openai.chat("gpt-4-turbo");
    case "gpt-3.5-turbo":
      return openai.chat("gpt-3.5-turbo");

    // Google models
    case "gemini-2.0-flash-exp":
      return google.chat("gemini-2.0-flash-exp");
    case "gemini-1.5-pro":
      return google.chat("gemini-1.5-pro");
    case "gemini-1.5-flash":
      return google.chat("gemini-1.5-flash");

    default:
      return openai.chat("gpt-4o-mini");
  }
}
