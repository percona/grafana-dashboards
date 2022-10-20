import { times } from 'lodash';
import { PlaceholderInput } from './PrepareExplainForm.types';

export const prepareInputs = (count: number): PlaceholderInput[] => times(count, (idx) => ({
  label: `:${idx + 1}`,
  fieldName: `placeholders.${idx}`,
}));
