import sqlFormatter from 'sql-formatter';
import { DatabasesType } from '../../Details.types';

export const replacePlaceholders = (
  database: DatabasesType,
  fingerprint: string,
  placeholders: string[] = [],
): string => {
  let replaced = fingerprint || '';

  placeholders.forEach((value, idx) => {
    if (value && replaced.includes(getPlaceholderArray(database, idx))) {
      replaced = replaced.replace(new RegExp(getPlaceholderArray(database, idx), 'g'), value);
    } else if (value) {
      replaced = replaced.replace(new RegExp(getPlaceholder(database, idx), 'g'), value);
    }
  });

  return sqlFormatter.format(replaced);
};

export const getPlaceholder = (database: DatabasesType, idx: number): string => {
  if (database === 'mysql') {
    return `:${idx + 1}`;
  }

  if (database === 'postgresql') {
    return `\\$${idx + 1}`;
  }

  return '';
};

export const getPlaceholderArray = (database: DatabasesType, idx: number): string => {
  if (database === 'mysql') {
    return `::${idx + 1}`;
  }

  if (database === 'postgresql') {
    // todo: check
    return `\\$\\$${idx + 1}`;
  }

  return '';
};
