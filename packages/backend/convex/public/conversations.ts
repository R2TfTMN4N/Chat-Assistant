import { ConvexError, v } from "convex/values";
import { mutation, query } from "../_generated/server";
import { stat } from "fs";
export const getOne = query({
  args: {
    conversationId: v.id("conversations"),
    // organizationId: v.string(),
    contactSessionId: v.id("contactSessions"),
  },
  handler: async (ctx, args) => {
    const session = await ctx.db.get(args.contactSessionId);
    if (!session || session.expiresAt < Date.now()) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Invalid or expired contact session",
      });
    }
    const conversation = await ctx.db.get(args.conversationId);
    if (!conversation) {
      return null;
    }
    return {
      _id: conversation._id,
      status: conversation.status,
      threadId: conversation.threadId,
      // organizationId:conversation.organizationId,
      // contactSessionId:conversation.contactSessionId
    };
  },
});

export const create = mutation({
  args: {
    organizationId: v.string(),
    contactSessionId: v.id("contactSessions"),
  },
  handler: async (ctx, args) => {
    const session = await ctx.db.get(args.contactSessionId);
    if (!session || session.expiresAt < Date.now()) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Invalid or expired contact session",
      });
    }
    const threadId = "123";
    const conversationId = await ctx.db.insert("conversations", {
      contactSessionId: session._id,
      status: "unresolved",
      organizationId: args.organizationId,
      threadId: threadId,
    });
    return conversationId;
  },
});
