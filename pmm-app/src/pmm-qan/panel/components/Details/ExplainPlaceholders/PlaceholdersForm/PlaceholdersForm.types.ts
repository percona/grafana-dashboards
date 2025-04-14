import { DatabasesType, QueryExampleResponseItem } from 'pmm-qan/panel/components/Details/Details.types';

export interface PlaceholdersFormProps {
  database: DatabasesType;
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
