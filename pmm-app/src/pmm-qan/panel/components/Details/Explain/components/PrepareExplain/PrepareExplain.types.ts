import { QueryExampleResponseItem } from '../../../Details.types';

export interface PrepareExplainProps {
  example: QueryExampleResponseItem;
  onPlaceholdersSubmit: (placeholders: string[]) => void;
}
