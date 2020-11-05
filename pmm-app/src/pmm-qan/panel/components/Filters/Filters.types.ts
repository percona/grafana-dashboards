import { RawTimeRange } from '@grafana/data';

export interface FiltersContainerProps {
  filters: any;
  disabled?: boolean;
  rawTime: RawTimeRange;
}
