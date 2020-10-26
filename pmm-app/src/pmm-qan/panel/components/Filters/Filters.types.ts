import { RawTimeRange } from '@grafana/data';

export interface FiltersContainerProps {
  form: any;
  filters: any;
  disabled?: boolean;
  rawTime: RawTimeRange;
}
