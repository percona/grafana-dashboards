import { RawTimeRange } from '@grafana/data';

export interface FiltersContainerProps {
  contextActions: any;
  form: any;
  filters: any;
  disabled?: boolean;
  rawTime: RawTimeRange;
}
