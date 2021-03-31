import { Interval } from 'pmm-check/types';

export const checkIntervalOptions = Object.keys(Interval).map(intervalKey => ({
  value: intervalKey, label: Interval[intervalKey],
}))
