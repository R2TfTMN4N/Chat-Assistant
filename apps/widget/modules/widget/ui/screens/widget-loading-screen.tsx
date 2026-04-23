"use client";

import { useAtomValue, useSetAtom } from "jotai";
import {
  contactSessionIdAtomFamily,
  errorMessageAtom,
  loadingMessageAtom,
  organizationIdAtom,
  screenAtom,
} from "../../atoms/widget-atoms";
import { WidgetHeader } from "../components/widget-header";
import { LoaderIcon } from "lucide-react";
import { use, useEffect, useState } from "react";
import { useAction, useMutation } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { Id } from "@workspace/backend/_generated/dataModel";

type InitStep = "org" | "session" | "done" | "vapi" | "settings";

export const WidgetLoadingScreen = ({
  organizationId,
}: {
  organizationId: string | null;
}) => {
  const [step, setStep] = useState<InitStep>("org");
  const [sessionValid, setSessionValid] = useState(false);

  const setErrorMessage = useSetAtom(errorMessageAtom);
  const setLoadingMessage = useSetAtom(loadingMessageAtom);
  const setOrganizationId = useSetAtom(organizationIdAtom);
  const loadingMessage = useAtomValue(loadingMessageAtom);
  const setScreen = useSetAtom(screenAtom);

  const contactSessionId = useAtomValue(
    contactSessionIdAtomFamily(organizationId || "")
  );

  const validateOrganization = useAction(api.public.organizations.validate);
  const validateContactSession = useMutation(
    api.public.contactSessions.validate
  );

  // ------------------------------
  // Effect 1: Validate Organization
  // ------------------------------
  useEffect(() => {
    if (step !== "org") return;

    setLoadingMessage("Loading organization...");

    if (!organizationId) {
      setErrorMessage("Organization ID is missing.");
      setScreen("error");
      return;
    }

    setLoadingMessage("Validating organization...");
    validateOrganization({ organizationId })
      .then((result) => {
        if (result.valid) {
          setOrganizationId(organizationId);
          setStep("session");
        } else {
          setErrorMessage(result.reason || "Invalid organization ID.");
          setScreen("error");
        }
      })
      .catch(() => {
        setErrorMessage("Error validating organization ID.");
        setScreen("error");
      });
  }, [
    step,
    organizationId,
    validateOrganization,
    setErrorMessage,
    setScreen,
    setOrganizationId,
    setStep,
    setLoadingMessage,
  ]);

  // ------------------------------
  // Effect 2: Validate Contact Session
  // ------------------------------
  useEffect(() => {
    if (step !== "session") return;

    setLoadingMessage("Finding contact session Id...");

    if (!contactSessionId) {
      setSessionValid(false);
      setStep("done");
      return;
    }

    setLoadingMessage("Validating contact session...");
    validateContactSession({
      contactSessionId: contactSessionId as Id<"contactSessions">,
    })
      .then((result) => {
        setSessionValid(result.valid);
        setStep("done");
      })
      .catch(() => {
        setSessionValid(false);
        setStep("done");
      });
  }, [step, contactSessionId, validateContactSession, setLoadingMessage]);
  useEffect(() => {
    if (step !== "done") return;
    const hasValidSession = contactSessionId && sessionValid;
    setScreen(hasValidSession ? "selection" : "auth");
  }, [step, contactSessionId, sessionValid, setScreen]);

  // ------------------------------
  // UI
  // ------------------------------
  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2 px-2 py-6">
          <p className="text-3xl">Hi there! Welcome to the Widget View.</p>
          <p className="text-lg">Let's get started!</p>
        </div>
      </WidgetHeader>
      <div className="flex flex-1 flex-col gap-y-4 p-4 items-center justify-center">
        <LoaderIcon className="animate-spin" />
        <p className="text-sm">{loadingMessage ?? "Loading..."}</p>
      </div>
    </>
  );
};
