import { ConvexError, v } from "convex/values";
import { query } from "../_generated/server";

export const getOneByConversationId = query({
  args: {
    conversationId: v.id("conversations"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("User is not authenticated");
    }
    const orgId = identity.orgId as string;
    if (!orgId) {
      throw new Error("Organization ID is missing in user identity");
    }
    const conversation = await ctx.db.get(args.conversationId);
    if (!conversation || conversation.organizationId !== orgId) {
      throw new ConvexError({
        code: "not_found",
        message: "Conversation not found",
      });
    }
    const contactSession = await ctx.db.get(conversation.contactSessionId);
    return contactSession;
  },
});
