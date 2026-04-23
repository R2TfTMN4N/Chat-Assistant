import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@workspace/ui/components/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Separator } from "@workspace/ui/components/separator";
import { Textarea } from "@workspace/ui/components/textarea";
import { z } from "zod";
import { Doc } from "@workspace/backend/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@workspace/ui/components/button";
import { VapiFormFields } from "./vapi-form-fields";
import { FormSchema } from "../types";
import { widgetSettingsSchema } from "../schemas";
import { ColorPicker } from "@workspace/ui/components/color-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { Switch } from "@workspace/ui/components/switch";
import { useThemeSwitcher } from "@/hooks/use-theme-switcher";
import { useDarkMode } from "@/hooks/use-dark-mode";
import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";

type WidgetSettings = Doc<"widgetSettings">;
interface CustomizationFormProps {
  initialData?: WidgetSettings | null;
  hasVapiPlugin: boolean;
}

const themeColors = [
  "#000000",
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#FF00FF",
  "#00FFFF",
];

const inlayTextColors = [
  "#FFFFFF",
  "#000000",
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#FF00FF",
  "#00FFFF",
];

export const CustomizationForm = ({
  initialData,
  hasVapiPlugin,
}: CustomizationFormProps) => {
  const { currentTheme, changeTheme, availableThemes } = useThemeSwitcher();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const upsertWidgetSettings = useMutation(api.private.widgetSettings.upsert);
  const form = useForm<FormSchema>({
    resolver: zodResolver(widgetSettingsSchema),
    defaultValues: {
      greetMessage: initialData?.greetMessage || "Hello! How can I help you?",
      defaultSuggestions: {
        suggestion1: initialData?.defaultSuggestions?.suggestion1 || "",
        suggestion2: initialData?.defaultSuggestions?.suggestion2 || "",
        suggestion3: initialData?.defaultSuggestions?.suggestion3 || "",
      },
      vapiSettings: {
        assistantId: initialData?.vapiSettings?.assistantId || "",
        phoneNumber: initialData?.vapiSettings?.phoneNumber || "",
      },
      themeColor: initialData?.themeColor || "#000000",
      inlayTextColor: initialData?.inlayTextColor || "#FFFFFF",
      themeStyle: initialData?.themeStyle || "globals",
      darkMode: initialData?.darkMode || false,
    },
  });

  // Sync theme from database on load
  useEffect(() => {
    if (initialData?.themeStyle && initialData.themeStyle !== currentTheme) {
      changeTheme(initialData.themeStyle as any);
    }
    if (
      initialData?.darkMode !== undefined &&
      initialData.darkMode !== isDarkMode
    ) {
      toggleDarkMode();
    }
  }, [initialData]);
  const onSubmit = async (values: FormSchema) => {
    try {
      const vapiSettings: WidgetSettings["vapiSettings"] = {
        assistantId:
          values.vapiSettings.assistantId === "none"
            ? ""
            : values.vapiSettings.assistantId,
        phoneNumber:
          values.vapiSettings.phoneNumber === "none"
            ? ""
            : values.vapiSettings.phoneNumber,
      };
      await upsertWidgetSettings({
        greetMessage: values.greetMessage,
        defaultSuggestions: values.defaultSuggestions,
        vapiSettings,
        themeColor: values.themeColor,
        inlayTextColor: values.inlayTextColor,
        themeStyle: currentTheme,
        darkMode: isDarkMode,
      });
      toast.success("Widget settings saved successfully.");
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error("Failed to save widget settings:", error);
      toast.error("Failed to save widget settings.");
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card className="bg-background/80 backdrop-blur-sm border-border/50 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <div>
                <CardTitle className="text-lg">General Settings</CardTitle>
                <CardDescription>
                  Customize the general settings of your chat widget
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="greetMessage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Greeting Message</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Welcome message shown when chat opens"
                      rows={3}
                    ></Textarea>
                  </FormControl>
                  <FormDescription>
                    The message displayed to users when they open the chat
                    widget.
                  </FormDescription>
                </FormItem>
              )}
            ></FormField>
            <Separator />
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">Default Suggestions</h3>
                <p className="text-muted-foreground text-sm">
                  These are the default suggestions shown to users when they
                  open the chat widget.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="defaultSuggestions.suggestion1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Suggestion 1</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="e.g.. How do I get started?"
                          rows={1}
                        ></Textarea>
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  control={form.control}
                  name="defaultSuggestions.suggestion2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Suggestion 2</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="e.g.. What features are available?"
                          rows={1}
                        ></Textarea>
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
                .{" "}
                <FormField
                  control={form.control}
                  name="defaultSuggestions.suggestion3"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Suggestion 3</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="e.g.. I need help with my account"
                          rows={1}
                        ></Textarea>
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-background/80 backdrop-blur-sm border-border/50 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
                  <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
                  <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
                  <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z" />
                </svg>
              </div>
              <div>
                <CardTitle className="text-lg">Appearance</CardTitle>
                <CardDescription>
                  Customize the look and feel of your chat widget
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <FormLabel>Theme Style</FormLabel>
              <Select
                value={currentTheme}
                onValueChange={(value) => changeTheme(value as any)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a theme" />
                </SelectTrigger>
                <SelectContent>
                  {availableThemes.map((theme) => (
                    <SelectItem key={theme.value} value={theme.value}>
                      {theme.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription className="mt-2">
                Choose a theme style for the entire application interface.
              </FormDescription>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <FormLabel>Dark Mode</FormLabel>
                <FormDescription>
                  Toggle between light and dark variants of the selected theme.
                </FormDescription>
              </div>
              <div className="flex items-center gap-2">
                <Sun className="h-4 w-4 text-muted-foreground" />
                <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} />
                <Moon className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <Separator />
            <FormField
              control={form.control}
              name="themeColor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Theme Color</FormLabel>
                  <FormControl>
                    <ColorPicker
                      colors={themeColors}
                      value={field.value}
                      onValueChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>
                    The primary color of the chat widget.
                  </FormDescription>
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="inlayTextColor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Inlay Text Color</FormLabel>
                  <FormControl>
                    <ColorPicker
                      colors={inlayTextColors}
                      value={field.value}
                      onValueChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>
                    The color of the text inside the chat widget.
                  </FormDescription>
                </FormItem>
              )}
            ></FormField>
          </CardContent>
        </Card>
        {hasVapiPlugin && (
          <Card className="bg-background/80 backdrop-blur-sm border-border/50 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" x2="12" y1="19" y2="22" />
                  </svg>
                </div>
                <div>
                  <CardTitle className="text-lg">Voice Assistant</CardTitle>
                  <CardDescription>
                    Configure VAPI voice assistant for your chat widget
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <VapiFormFields form={form} />
            </CardContent>
          </Card>
        )}
        <div className="justify-end flex">
          <Button disabled={form.formState.isSubmitting}>Save Settings</Button>
        </div>
      </form>
    </Form>
  );
};
