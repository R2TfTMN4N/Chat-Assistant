import { v } from "convex/values";
import { query } from "../_generated/server";
import { rag } from "../system/ai/rag";

/**
 * Get suggested questions based on knowledge base content
 * Uses RAG to find relevant topics and generate question suggestions
 */
export const getSuggestedQuestions = query({
  args: {
    organizationId: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 5;

    try {
      // Search for general topics in the knowledge base
      const searchResults = await rag.search(ctx, "", {
        namespace: args.organizationId,
        limit: 10,
      });

      // Extract unique topics/questions from search results
      const suggestions: Array<{ text: string; source?: string }> = [];
      const seenTexts = new Set<string>();

      for (const result of searchResults) {
        if (suggestions.length >= limit) break;

        // Extract meaningful snippets from the content
        const content = result.document.text;

        // Try to find question-like patterns or headers
        const lines = content.split("\n");
        for (const line of lines) {
          if (suggestions.length >= limit) break;

          const trimmed = line.trim();

          // Look for questions or important topics (headers, bullet points)
          if (
            (trimmed.endsWith("?") ||
              trimmed.match(/^#+\s+/) ||
              trimmed.match(/^[-*]\s+/)) &&
            trimmed.length > 10 &&
            trimmed.length < 150 &&
            !seenTexts.has(trimmed)
          ) {
            let questionText = trimmed
              .replace(/^#+\s+/, "") // Remove markdown headers
              .replace(/^[-*]\s+/, "") // Remove bullet points
              .trim();

            // If it's not a question, make it one
            if (!questionText.endsWith("?")) {
              questionText = `What about ${questionText.toLowerCase()}?`;
            }

            suggestions.push({
              text: questionText,
              source: result.document.metadata?.fileName as string | undefined,
            });
            seenTexts.add(trimmed);
          }
        }
      }

      // If no specific questions found, generate generic helpful ones
      if (suggestions.length === 0) {
        return [
          { text: "How can I get started?", source: "general" },
          { text: "What are your main features?", source: "general" },
          { text: "How does pricing work?", source: "general" },
          { text: "Do you offer support?", source: "general" },
          { text: "What integrations are available?", source: "general" },
        ].slice(0, limit);
      }

      return suggestions.slice(0, limit);
    } catch (error) {
      console.error("Error getting suggested questions:", error);
      // Fallback to default questions
      return [
        { text: "How can I get started?", source: "general" },
        { text: "What features do you offer?", source: "general" },
        { text: "How can I contact support?", source: "general" },
      ].slice(0, limit);
    }
  },
});
