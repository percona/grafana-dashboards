import { QueryExampleResponseItem } from '../../../Details.types';

export interface PrepareExplainProps {
  examples: QueryExampleResponseItem[];
  onPlaceholdersSubmit: (placeholders: string[]) => void;
}
