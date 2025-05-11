export const stripPrefix = (text: string, prefix: string): string => {
  if (text.startsWith(prefix)) {
    return text.slice(prefix.length);
  }

  return text;
};
