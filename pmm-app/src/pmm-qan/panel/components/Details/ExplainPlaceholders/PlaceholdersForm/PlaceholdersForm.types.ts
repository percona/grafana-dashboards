import { QueryExampleResponseItem } from 'pmm-qan/panel/components/Details/Details.types';

export interface PlaceholdersFormProps {
  example: QueryExampleResponseItem;
  onSubmit: (values: PlaceholdersFormValues) => void;
}

export interface PlaceholdersFormValues {
  placeholders: string[];
}

export interface PlaceholderInput {
  label: string;
  fieldName: `placeholders.${number}`;
}
