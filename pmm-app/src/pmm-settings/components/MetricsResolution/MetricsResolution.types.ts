import { MetricsResolutions } from 'pmm-settings/Settings.types';
import { LoadingCallback } from 'pmm-settings/Settings.service';

export interface MetricsResolutionProps {
  metricsResolutions: MetricsResolutions;
  updateSettings: (body: any, callback: LoadingCallback) => void;
}
