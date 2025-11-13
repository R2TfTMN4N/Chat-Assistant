import { atom } from "jotai";
import { WidgetScreen } from "../types";

export const screenAtom = atom<WidgetScreen>("error");

export const errorMessageAtom = atom<string | null>(
  "Invalid configuration. Please contact support."
);
