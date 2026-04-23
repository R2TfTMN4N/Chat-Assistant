import { api } from "@workspace/backend/_generated/api";
import { useAction } from "convex/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type PhoneNumbers = typeof api.private.vapi.getPhoneNumbers._returnType;
type Assistants = typeof api.private.vapi.getAssistants._returnType;

export const useVapiPhoneNumbers = (): {
  data: PhoneNumbers | null;
  isLoading: boolean;
  error: Error | null;
} => {
  const [data, setData] = useState<PhoneNumbers | null>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const getPhoneNumbers = useAction(api.private.vapi.getPhoneNumbers);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await getPhoneNumbers();
        setData(result);
        setError(null);
      } catch (e) {
        setError(e as Error);
        toast.error("Failed to fetch Vapi phone numbers. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [getPhoneNumbers]);
  return { data, isLoading, error };
};
export const useVapiAssistants = (): {
  data: Assistants | null;
  isLoading: boolean;
  error: Error | null;
} => {
  const [data, setData] = useState<Assistants | null>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const getAssistants = useAction(api.private.vapi.getAssistants);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await getAssistants();
        setData(result);
        setError(null);
      } catch (e) {
        setError(e as Error);
        toast.error("Failed to fetch Vapi assistants. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [getAssistants]);
  return { data, isLoading, error };
};
