import { SelectableValue } from '@grafana/data';
import { Messages } from 'pmm-settings/Settings.messages';
import { MetricsResolutions } from 'pmm-settings/Settings.types';

const { metrics: { options } } = Messages;

export const resolutionsOptions: SelectableValue[] = [
  { key: 'rare', value: options.rare },
  { key: 'standard', value: options.standard },
  { key: 'frequent', value: options.frequent },
  { key: 'custom', value: options.custom },
];

export const defaultResolutions: MetricsResolutions[] = [
  {
    hr: '60s',
    mr: '180s',
    lr: '300s',
  },
  {
    hr: '5s',
    mr: '10s',
    lr: '60s',
  },
  {
    hr: '1s',
    mr: '5s',
    lr: '30s',
  },
];
