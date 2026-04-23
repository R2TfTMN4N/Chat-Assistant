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
]

export const CustomizationForm = ({
  initialData,
  hasVapiPlugin,
}: CustomizationFormProps) => {
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
    },
  });
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
        <Card>
          <CardHeader>
            <CardTitle>General</CardTitle>
            <CardDescription>
              Customize the general settings of your chat widget.
            </CardDescription>
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
.                <FormField
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
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>
              Customize the appearance of your chat widget.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
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
                      onChange={field.onChange}
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
                      onChange={field.onChange}
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
          <Card>
            <CardHeader>
              <CardTitle>Voice Assistant Settings</CardTitle>
              <CardDescription>
                Configure the VAPI voice assistant integration for your chat
                widget.
              </CardDescription>
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

