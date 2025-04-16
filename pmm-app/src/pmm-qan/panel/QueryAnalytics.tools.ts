import { config } from '@grafana/runtime';
import { ALL_VARIABLE_TEXT, ALL_VARIABLE_VALUE } from './QueryAnalytics.constants';

const hasAllValueOrText = (element) => element !== ALL_VARIABLE_VALUE && element !== ALL_VARIABLE_TEXT;

export const getLabelQueryParams = (labels) => Object.keys(labels)
  .filter((key) => key !== 'interval')
  .map((key) => ({
    key,
    value: labels[key],
  }))
  .filter((item) => item.value.filter(hasAllValueOrText).length) || [];

export const toUnixTimestamp = (date: string) => Math.floor(new Date(date).getTime());

export function buildShareLink(from: number, to: number) {
  const {
    origin,
    pathname,
    search,
  } = window.location;
  const baseUrl = origin + pathname;
  const params = new URLSearchParams(search.substring(1));

  params.set('from', `${from}`);
  params.set('to', `${to}`);
  params.set('orgId', `${config.bootData.user.orgId}`);

  return `${baseUrl}?${params.toString()}`;
}
