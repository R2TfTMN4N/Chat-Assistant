import { Agent } from "@convex-dev/agent";
import { openai } from "@ai-sdk/openai";
import { components } from "../../../_generated/api";
import { google } from "@ai-sdk/google";
import { resolveConversation } from "../tools/resolveConversation";
import { escalateConversation } from "../tools/escalateConversation";
import { SUPPORT_AGENT_PROMPT } from "../constants";
import { getAIModel } from "../helpers/getAIModel";

// Default agent with gpt-4o-mini
export const supportAgent = new Agent(components.agent, {
  chat: openai.chat("gpt-4o-mini"),
  instructions: SUPPORT_AGENT_PROMPT,
});

/**
 * Creates a support agent with a specific AI model
 * @param modelId - The ID of the AI model to use
 * @returns An Agent instance configured with the specified model
 */
export function createSupportAgent(modelId?: string) {
  return new Agent(components.agent, {
    chat: getAIModel(modelId),
    instructions: SUPPORT_AGENT_PROMPT,
  });
}
