import { time } from "console";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  conversations: defineTable({
    threadId: v.string(),
    organizationId: v.string(),
    contactSessionId: v.id("contactSessions"),
    status: v.union(
      v.literal("unresolved"),
      v.literal("resolved"),
      v.literal("escalated")
    ),
  })
    .index("by_organization_Id", ["organizationId"])
    .index("by_contact_Session_Id", ["contactSessionId"])
    .index("by_status_and_organization_Id", ["status", "organizationId"])
    .index("by_thread_Id", ["threadId"]),
  contactSessions: defineTable({
    name: v.string(),
    email: v.string(),
    organizationId: v.string(),
    expiresAt: v.number(),
    metadata: v.optional(
      v.object({
        userAgent: v.optional(v.string()),
        language: v.optional(v.string()),
        languages: v.optional(v.string()),
        platform: v.optional(v.string()),
        vendor: v.optional(v.string()),
        screenResolution: v.optional(v.string()),
        referrer: v.optional(v.string()),
        currentUrl: v.optional(v.string()),
        timezoneOffset: v.optional(v.number()),
        timezone: v.optional(v.string()),
        viewportSize: v.optional(v.string()),
        cookieEnabled: v.optional(v.boolean()),
      })
    ),
  })
    .index("by_organizationId", ["organizationId"])
    .index("by_expiresAt", ["expiresAt"]),
  users: defineTable({
    name: v.string(),
    email: v.string(),
  }),
});
