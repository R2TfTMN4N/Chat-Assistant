import { Vapi, VapiClient } from "@vapi-ai/server-sdk";
import { getSecretValue, parseSecretString } from "../libs/secrets";
import { action } from "../_generated/server";
import { ConvexError } from "convex/values";

import { internal } from "../_generated/api";
export const getPhoneNumbers = action({
  args: {},
  handler: async (ctx): Promise<Vapi.ListPhoneNumbersResponseItem[]> => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError({
        code: "Unauthorized",
        message: "Identity not found",
      });
    }
    const orgId = identity.orgId as string;
    if (!orgId) {
      throw new ConvexError({
        code: "Unauthorized",
        message: "Organization ID not found",
      });
    }
    const plugin = await ctx.runQuery(
      internal.system.plugins.getByOrganizationIdAndService,
      {
        organizationId: orgId,
        service: "vapi",
      }
    );
    if (!plugin) {
      throw new ConvexError({
        code: "Not Found",
        message: "Vapi plugin not found for organization",
      });
    }
    const secretName = plugin.secretName;
    const secretValue = await getSecretValue(secretName);
    const secretData = parseSecretString<{
      privateApiKey: string;
      publicApiKey: string;
    }>(secretValue);
    if (!secretData) {
      throw new ConvexError({
        code: "Not Found",
        message: "Credentialsnot found",
      });
    }
    if (!secretData.privateApiKey || !secretData.publicApiKey) {
      throw new ConvexError({
        code: "Not Found",
        message: "Incomplete credentials. Please reconnect your Vapi account.",
      });
    }
    const vapiClient = new VapiClient({
      token: secretData.privateApiKey,
    });
    const phoneNumbers = await vapiClient.phoneNumbers.list();
    return phoneNumbers;
  },
});
export const getAssistants = action({
  args: {},
  handler: async (ctx, args): Promise<Vapi.Assistant[]> => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError({
        code: "Unauthorized",
        message: "Identity not found",
      });
    }
    const orgId = identity.orgId as string;
    if (!orgId) {
      throw new ConvexError({
        code: "Unauthorized",
        message: "Organization ID not found",
      });
    }
    const plugin = await ctx.runQuery(
      internal.system.plugins.getByOrganizationIdAndService,
      {
        organizationId: orgId,
        service: "vapi",
      }
    );
    if (!plugin) {
      throw new ConvexError({
        code: "Not Found",
        message: "Vapi plugin not found for organization",
      });
    }
    const secretName = plugin.secretName;
    const secretValue = await getSecretValue(secretName);
    const secretData = parseSecretString<{
      privateApiKey: string;
      publicApiKey: string;
    }>(secretValue);
    if (!secretData) {
      throw new ConvexError({
        code: "Not Found",
        message: "Credentialsnot found",
      });
    }
    if (!secretData.privateApiKey || !secretData.publicApiKey) {
      throw new ConvexError({
        code: "Not Found",
        message: "Incomplete credentials. Please reconnect your Vapi account.",
      });
    }
    const vapiClient = new VapiClient({
      token: secretData.privateApiKey,
    });
    const assistants = await vapiClient.assistants.list();
    return assistants;
  },
});
