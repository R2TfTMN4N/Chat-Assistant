import { v } from "convex/values";
import { internalQuery } from "../_generated/server";

/**
 * Internal query to get widget settings by organization ID
 * Used by the AI agent to determine which model to use
 */
export const getByOrganizationId = internalQuery({
  args: {
    organizationId: v.string(),
  },
  handler: async (ctx, args) => {
    const widgetSettings = await ctx.db
      .query("widgetSettings")
      .withIndex("by_organizationId", (q) =>
        q.eq("organizationId", args.organizationId),
      )
      .unique();
    return widgetSettings;
  },
});
