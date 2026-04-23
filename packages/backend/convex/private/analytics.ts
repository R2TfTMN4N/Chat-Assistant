import { ConvexError, v } from "convex/values";
import { query } from "../_generated/server";

export const getStats = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Identity not found",
      });
    }
    const orgId = identity.orgId as string;
    if (!orgId) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Organization not found",
      });
    }

    // Get all conversations
    const conversations = await ctx.db
      .query("conversations")
      .withIndex("by_organization_Id", (q) => q.eq("organizationId", orgId))
      .collect();

    // Calculate status counts
    const totalConversations = conversations.length;
    const unresolvedCount = conversations.filter(
      (c) => c.status === "unresolved",
    ).length;
    const resolvedCount = conversations.filter(
      (c) => c.status === "resolved",
    ).length;
    const escalatedCount = conversations.filter(
      (c) => c.status === "escalated",
    ).length;

    // Calculate percentages
    const resolutionRate =
      totalConversations > 0
        ? ((resolvedCount / totalConversations) * 100).toFixed(1)
        : "0";
    const escalationRate =
      totalConversations > 0
        ? ((escalatedCount / totalConversations) * 100).toFixed(1)
        : "0";

    // Get contact sessions count
    const contactSessions = await ctx.db
      .query("contactSessions")
      .withIndex("by_organizationId", (q) => q.eq("organizationId", orgId))
      .collect();
    const totalContacts = contactSessions.length;

    return {
      totalConversations,
      unresolvedCount,
      resolvedCount,
      escalatedCount,
      resolutionRate: parseFloat(resolutionRate),
      escalationRate: parseFloat(escalationRate),
      totalContacts,
    };
  },
});

export const getConversationTrends = query({
  args: {
    days: v.optional(v.number()), // Default to 7 days
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Identity not found",
      });
    }
    const orgId = identity.orgId as string;
    if (!orgId) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Organization not found",
      });
    }

    const days = args.days || 7;
    const now = Date.now();
    const startTime = now - days * 24 * 60 * 60 * 1000;

    // Get all conversations
    const conversations = await ctx.db
      .query("conversations")
      .withIndex("by_organization_Id", (q) => q.eq("organizationId", orgId))
      .collect();

    // Group by day
    const dailyData: Record<
      string,
      { unresolved: number; resolved: number; escalated: number }
    > = {};

    // Initialize all days
    for (let i = 0; i < days; i++) {
      const date = new Date(now - i * 24 * 60 * 60 * 1000);
      const dateKey = date.toISOString().split("T")[0];
      if (dateKey) {
        dailyData[dateKey] = { unresolved: 0, resolved: 0, escalated: 0 };
      }
    }

    // Count conversations by day and status
    conversations.forEach((conv) => {
      if (conv._creationTime >= startTime) {
        const date = new Date(conv._creationTime);
        const dateKey = date.toISOString().split("T")[0];
        if (dateKey && dailyData[dateKey]) {
          dailyData[dateKey][conv.status]++;
        }
      }
    });

    // Convert to array and sort by date
    const trends = Object.entries(dailyData)
      .map(([date, counts]) => ({
        date: new Date(date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        ...counts,
      }))
      .reverse(); // Oldest to newest

    return trends;
  },
});

export const getTopContacts = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Identity not found",
      });
    }
    const orgId = identity.orgId as string;
    if (!orgId) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Organization not found",
      });
    }

    const limit = args.limit || 10;

    // Get all conversations
    const conversations = await ctx.db
      .query("conversations")
      .withIndex("by_organization_Id", (q) => q.eq("organizationId", orgId))
      .collect();

    // Count conversations per contact
    const contactCounts = new Map<
      string,
      { count: number; name: string; email: string }
    >();

    for (const conv of conversations) {
      const contactSession = await ctx.db.get(conv.contactSessionId);
      if (contactSession) {
        const current = contactCounts.get(contactSession._id) || {
          count: 0,
          name: contactSession.name,
          email: contactSession.email,
        };
        contactCounts.set(contactSession._id, {
          ...current,
          count: current.count + 1,
        });
      }
    }

    // Convert to array, sort, and limit
    const topContacts = Array.from(contactCounts.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);

    return topContacts;
  },
});

export const getRecentActivity = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Identity not found",
      });
    }
    const orgId = identity.orgId as string;
    if (!orgId) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Organization not found",
      });
    }

    const limit = args.limit || 10;

    // Get recent conversations
    const conversations = await ctx.db
      .query("conversations")
      .withIndex("by_organization_Id", (q) => q.eq("organizationId", orgId))
      .order("desc")
      .take(limit);

    // Enrich with contact session data
    const activities = await Promise.all(
      conversations.map(async (conv) => {
        const contactSession = await ctx.db.get(conv.contactSessionId);
        return {
          _id: conv._id,
          _creationTime: conv._creationTime,
          status: conv.status,
          contactName: contactSession?.name || "Unknown",
          contactEmail: contactSession?.email || "",
        };
      }),
    );

    return activities;
  },
});

export const getBrowserStats = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Identity not found",
      });
    }
    const orgId = identity.orgId as string;
    if (!orgId) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Organization not found",
      });
    }

    // Get all contact sessions
    const contactSessions = await ctx.db
      .query("contactSessions")
      .withIndex("by_organizationId", (q) => q.eq("organizationId", orgId))
      .collect();

    // Count by platform
    const platformCounts = new Map<string, number>();

    contactSessions.forEach((session) => {
      const platform = session.metadata?.platform || "Unknown";
      platformCounts.set(platform, (platformCounts.get(platform) || 0) + 1);
    });

    // Convert to array
    const platforms = Array.from(platformCounts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    return platforms;
  },
});

export const getHourlyActivity = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Identity not found",
      });
    }
    const orgId = identity.orgId as string;
    if (!orgId) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Organization not found",
      });
    }

    // Get all conversations
    const conversations = await ctx.db
      .query("conversations")
      .withIndex("by_organization_Id", (q) => q.eq("organizationId", orgId))
      .collect();

    // Group by hour of day (0-23)
    const hourlyData: Record<number, number> = {};
    for (let i = 0; i < 24; i++) {
      hourlyData[i] = 0;
    }

    conversations.forEach((conv) => {
      const date = new Date(conv._creationTime);
      const hour = date.getHours();
      if (hourlyData[hour] !== undefined) {
        hourlyData[hour]++;
      }
    });

    // Convert to array
    const hourlyActivity = Object.entries(hourlyData).map(([hour, count]) => ({
      hour: `${String(hour).padStart(2, "0")}:00`,
      count,
    }));

    return hourlyActivity;
  },
});

export const getStatusTimeline = query({
  args: {
    days: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Identity not found",
      });
    }
    const orgId = identity.orgId as string;
    if (!orgId) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Organization not found",
      });
    }

    const days = args.days || 7;
    const now = Date.now();
    const startTime = now - days * 24 * 60 * 60 * 1000;

    // Get conversations
    const conversations = await ctx.db
      .query("conversations")
      .withIndex("by_organization_Id", (q) => q.eq("organizationId", orgId))
      .collect();

    // Filter by time and count by status
    const recentConversations = conversations.filter(
      (c) => c._creationTime >= startTime,
    );

    const avgResolutionTime = recentConversations
      .filter((c) => c.status === "resolved")
      .reduce((sum, c, _, arr) => {
        // Simplified: using creation time only (in real app, track resolution time)
        const timeToResolve = 3600000; // Placeholder: 1 hour average
        return sum + timeToResolve / arr.length;
      }, 0);

    return {
      avgResolutionTimeHours: (avgResolutionTime / 3600000).toFixed(1),
      totalRecent: recentConversations.length,
      resolvedRecent: recentConversations.filter((c) => c.status === "resolved")
        .length,
    };
  },
});

export const getResponseMetrics = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Identity not found",
      });
    }
    const orgId = identity.orgId as string;
    if (!orgId) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Organization not found",
      });
    }

    const conversations = await ctx.db
      .query("conversations")
      .withIndex("by_organization_Id", (q) => q.eq("organizationId", orgId))
      .collect();

    // Calculate average response metrics (simplified)
    const metrics = {
      avgResponseTime: "2.5", // Minutes (placeholder)
      avgConversationLength: "8", // Messages (placeholder)
      avgResolutionTime: "45", // Minutes (placeholder)
    };

    return metrics;
  },
});
