import { times } from 'lodash';
import { DatabasesType } from '../../Details.types';
import { PlaceholderInput } from './PlaceholdersForm.types';

export const prepareInputs = (count: number, database: DatabasesType): PlaceholderInput[] => times(
  count, (idx) => ({
    label: getPlaceholder(idx, database),
    fieldName: `placeholders.${idx}`,
  }),
);

export const getPlaceholder = (idx: number, database: DatabasesType) => (database === 'postgresql' ? `$${idx + 1}` : `:${idx + 1}`);
