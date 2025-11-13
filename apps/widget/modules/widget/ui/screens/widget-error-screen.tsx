"use client";
import { useAtomValue } from "jotai";
import { errorMessageAtom } from "../../atoms/widget-atoms";
import { WidgetHeader } from "../components/widget-header";
import { AlertTriangleIcon } from "lucide-react";
export const WidgetErrorScreen = () => {
  const errorMessage = useAtomValue(errorMessageAtom);
  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2 px-2 py-6">
          <p className="text-3xl">Hi there! Welcome to the Widget View.</p>
          <p className="text-lg">Let's get started!</p>
        </div>
      </WidgetHeader>
      <div className="flex flex-1 flex-col gap-y-4 p-4 items-center justify-center">
        <AlertTriangleIcon />
        <p className="text-sm">
          {errorMessage || "Invalid configuration. Please contact support."}
        </p>
      </div>
    </>
  );
};
