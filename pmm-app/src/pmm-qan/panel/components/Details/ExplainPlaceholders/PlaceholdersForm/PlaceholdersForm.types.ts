import { FormAPI } from '@grafana/ui';
import { QueryExampleResponseItem } from 'pmm-qan/panel/components/Details/Details.types';

export interface PlaceholdersFormProps {
  form: FormAPI<PlaceholdersFormValues>;
  example: QueryExampleResponseItem;
}

export interface PlaceholdersFormValues {
  placeholders: string[];
}

export interface PlaceholderInput {
  label: string;
  fieldName: `placeholders.${number}`;
}
