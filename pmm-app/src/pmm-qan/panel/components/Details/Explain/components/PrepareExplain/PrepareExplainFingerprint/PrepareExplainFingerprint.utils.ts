import sqlFormatter from 'sql-formatter';

export const replacePlaceholders = (fingerprint: string, placeholders: string[] = []): string => {
  let replaced = fingerprint || '';

  placeholders.forEach((value, idx) => {
    if (value) {
      replaced = replaced.replace(new RegExp(`:${idx + 1}`, 'g'), value);
    }
  });

  return sqlFormatter.format(replaced);
};
