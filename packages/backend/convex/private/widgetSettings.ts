import { ConvexError, v } from "convex/values";
import { mutation, query } from "../_generated/server";

export const getOne = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError({
        code: "unauthorized",
        message: "Identity not found",
      });
    }
    const orgId = identity.orgId as string;
    if (!orgId) {
      throw new ConvexError({
        code: "unauthorized",
        message: "Organization ID not found",
      });
    }
    const widgetSettings = await ctx.db
      .query("widgetSettings")
      .withIndex("by_organizationId", (q) => q.eq("organizationId", orgId))
      .unique();
    return widgetSettings;
  },
});

export const upsert = mutation({
  args: {
    greetMessage: v.string(),
    defaultSuggestions: v.object({
      suggestion1: v.optional(v.string()),
      suggestion2: v.optional(v.string()),
      suggestion3: v.optional(v.string()),
    }),
    vapiSettings: v.object({
      assistantId: v.optional(v.string()),
      phoneNumber: v.optional(v.string()),
    }),
    themeColor: v.optional(v.string()),
    inlayTextColor: v.optional(v.string()),
    themeStyle: v.optional(v.string()),
    darkMode: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError({
        code: "unauthorized",
        message: "Identity not found",
      });
    }
    const orgId = identity.orgId as string;
    if (!orgId) {
      throw new ConvexError({
        code: "unauthorized",
        message: "Organization ID not found",
      });
    }
    const exstingWidgetSettings = await ctx.db
      .query("widgetSettings")
      .withIndex("by_organizationId", (q) => q.eq("organizationId", orgId))
      .unique();
    if (exstingWidgetSettings) {
      await ctx.db.patch(exstingWidgetSettings._id, {
        greetMessage: args.greetMessage,
        defaultSuggestions: args.defaultSuggestions,
        vapiSettings: args.vapiSettings,
        themeColor: args.themeColor,
        inlayTextColor: args.inlayTextColor,
        themeStyle: args.themeStyle,
        darkMode: args.darkMode,
      });
    } else {
      await ctx.db.insert("widgetSettings", {
        organizationId: orgId,
        greetMessage: args.greetMessage,
        defaultSuggestions: args.defaultSuggestions,
        vapiSettings: args.vapiSettings,
        themeColor: args.themeColor,
        inlayTextColor: args.inlayTextColor,
        themeStyle: args.themeStyle,
        darkMode: args.darkMode,
      });
    }
    return null;
  },
});
