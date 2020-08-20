import { SelectableValue } from '@grafana/data';
import { Messages } from 'pmm-settings/Settings.messages';
import { MetricsResolutions } from 'pmm-settings/Settings.types';
import { MetricsResolutionPresets } from './MetricsResolution.types';

const { metrics: { options } } = Messages;

export const resolutionsOptions: SelectableValue[] = [
  { key: MetricsResolutionPresets.rare, value: options.rare },
  { key: MetricsResolutionPresets.standard, value: options.standard },
  { key: MetricsResolutionPresets.frequent, value: options.frequent },
  { key: MetricsResolutionPresets.custom, value: options.custom },
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

export const resolutionMin = 1;
export const resolutionMax = 1000000000;
