import sqlFormatter from 'sql-formatter';

export const replacePlaceholders = (fingerprint: string, placeholders: string[] = []): string => {
  let replaced = fingerprint || '';

  placeholders.forEach((value, idx) => {
    const fingerprintIdx = idx + 1;

    if (value && replaced.includes(`::${fingerprintIdx}`)) {
      replaced = replaced.replace(new RegExp(`::${fingerprintIdx}`, 'g'), value);
    } else if (value) {
      replaced = replaced.replace(new RegExp(`:${fingerprintIdx}`, 'g'), value);
    }
  });

  return sqlFormatter.format(replaced);
};
