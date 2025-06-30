import { en } from "./en";

export const translations = {
  en,
} as const;

export type Language = keyof typeof translations;

export const t = (key: string, language: Language = "en"): string => {
  try {
    const keys = key.split(".");
    let value: unknown = translations[language];

    for (const k of keys) {
      value = (value as Record<string, unknown>)?.[k];
    }

    return typeof value === "string" ? value : key;
  } catch {
    return key;
  }
};
