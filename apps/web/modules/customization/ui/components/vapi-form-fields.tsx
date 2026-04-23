import { UseFormReturn } from "react-hook-form";
import {
  useVapiAssistants,
  useVapiPhoneNumbers,
} from "@/modules/plugins/hooks/use-vapi-data";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { FormSchema } from "../types";
interface VapiFormFieldsProps {
  form: UseFormReturn<FormSchema>;
}
export const VapiFormFields = ({ form }: VapiFormFieldsProps) => {
  const { data: asistants, isLoading: assistansLoading } = useVapiAssistants();
  const { data: phoneNumbers, isLoading: phoneNumbersLoading } =
    useVapiPhoneNumbers();
  const disabled = form.formState.isSubmitting;

  return (
    <div>
      <FormField
        control={form.control}
        name="vapiSettings.assistantId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Voice Assistant</FormLabel>

            <Select
              value={field.value}
              onValueChange={field.onChange}
              disabled={disabled || assistansLoading}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      assistansLoading ? "Loading..." : "Select an assistant"
                    }
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                {asistants?.map((assistant) => (
                  <SelectItem key={assistant.id} value={assistant.id}>
                    {assistant.name || "Unnamed Assistant"} -{" "}
                    {assistant.model?.model || "Unknown Model"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>
              Choose a voice assistant to integrate with your chat widget.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      ></FormField>
      <FormField
        control={form.control}
        name="vapiSettings.phoneNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Voice Assistant Phone Number</FormLabel>

            <Select
              value={field.value}
              onValueChange={field.onChange}
              disabled={disabled || phoneNumbersLoading}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      phoneNumbersLoading
                        ? "Loading..."
                        : "Select a phone number"
                    }
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                {phoneNumbers?.map((phone) => (
                  <SelectItem key={phone.id} value={phone.number || phone.id}>
                    {phone.number || "Unknown"} - {phone.name || "No Name"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>
              Phone number to use for voice interactions with the assistant.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      ></FormField>
    </div>
  );
};
