import { v } from "convex/values";
import { action } from "../_generated/server";
import { internal } from "../_generated/api";
import { pl } from "zod/v4/locales";
import { getSecretValue, parseSecretString } from "../libs/secrets";

export const getVapiSecrets = action({
  args: {
    organizationId: v.string(),
  },
  handler: async (ctx, args) => {
    const plugin = await ctx.runQuery(
      internal.system.plugins.getByOrganizationIdAndService,
      {
        organizationId: args.organizationId,
        service: "vapi",
      }
    );
    if (!plugin) {
      return null;
    }
    const secretName = plugin.secretName;
    const secret = await getSecretValue(secretName);
    const secretData = parseSecretString<{
      privateApiKey: string;
      publicApiKey: string;
    }>(secret);
    if (!secretData) {
      return null;
    }
    if (!secretData.privateApiKey || !secretData.publicApiKey) {
      return null;
    }
    return {
      publicApiKey: secretData.publicApiKey,
    };
  },
});
