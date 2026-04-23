import { openai } from "@ai-sdk/openai";
import { components } from "../../_generated/api";
import { RAG } from "@convex-dev/rag";
const rag = new RAG(components.rag, {
  textEmbeddingModel: openai.embedding("text-embedding-3-small"),
  embeddingDimension: 1536,
});
export default rag;
