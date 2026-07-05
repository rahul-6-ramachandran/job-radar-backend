import { engineeringKeywords, excludedKeywords } from "../../constants";

export const isRelevantJob = (title: string): boolean => {
  const t = title.toLowerCase();

  const included = engineeringKeywords.some(k =>
    t.includes(k),
  );

  const excluded = excludedKeywords.some(k =>
    t.includes(k),
  );

  return included && !excluded;
};

export const isRemoteJob = (
  location?: string | null,
): boolean => {
  if (!location) {
    return false;
  }

  const normalized =
    location.toLowerCase();

  return (
    normalized.includes('remote') ||
    normalized.includes('work from home') ||
    normalized.includes('anywhere')
  );
};