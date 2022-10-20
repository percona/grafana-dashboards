import { QueryExampleResponseItem } from 'pmm-qan/panel/components/Details/Details.types';

export interface PrepareExplainFormProps {
  example: QueryExampleResponseItem;
  onPlaceholdersSubmit: (placeholders: string[]) => void;
}

export interface PrepareExplainFormValues {
  placeholders: string[];
}

export interface PlaceholderInput {
  label: string;
  fieldName: `placeholders.${number}`;
}
