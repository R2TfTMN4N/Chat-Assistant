import { z } from "zod";
export const widgetSettingsSchema = z.object({
  greetMessage: z
    .string()
    .min(1, "Greeting message must be at least 1 character")
    .max(100, "Greeting message must be at most 100 characters"),
  defaultSuggestions: z.object({
    suggestion1: z.string().optional(),
    suggestion2: z.string().optional(),
    suggestion3: z.string().optional(),
  }),
  vapiSettings: z.object({
    assistantId: z.string().optional(),
    phoneNumber: z.string().optional(),
  }),
  themeColor: z.string().optional(),
  inlayTextColor: z.string().optional(),
  themeStyle: z.string().optional(),
  darkMode: z.boolean().optional(),
});
