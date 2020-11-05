import { RawTimeRange } from '@grafana/data';

export interface FiltersContainerProps {
  filters: any;
  disabled?: boolean;
  rawTime: RawTimeRange;
  filter: string;
  onFilterChange: (string) => void;
}
