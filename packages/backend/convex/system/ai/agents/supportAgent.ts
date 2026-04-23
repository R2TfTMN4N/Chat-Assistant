import { Agent } from "@convex-dev/agent";
import { openai } from "@ai-sdk/openai";
import { components } from "../../../_generated/api";
import { google } from "@ai-sdk/google";
import { resolveConversation } from "../tools/resolveConversation";
import { escalateConversation } from "../tools/escalateConversation";

export const supportAgent = new Agent(components.agent, {
  chat: openai.chat("gpt-4o-mini"),
  instructions: `You are a customer support agent. Use "resolveConversation" tool when user expresses finalization of the conversation and "escalateConversation" tool when user requests to escalate the conversation to a human operator or expresses frustration.`,
});
