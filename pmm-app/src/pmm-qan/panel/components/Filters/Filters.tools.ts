import { getTemplateSrv } from '@grafana/runtime';
import { FILTERS_GROUPS } from './Filters.constants';

export const getSelectedCheckboxes = (filters) => FILTERS_GROUPS.map((group) => filters[group.dataKey])
  .filter(Boolean)
  .map((item) => item.name)
  .flat()
  .some((item) => item.checked);

export const getServiceType = (value: string, name: string): string | undefined => {
  const variables = getTemplateSrv().getVariables();
  const variable = variables.find((v) => v.name === name) as any;
  const index = variable?.options.findIndex((opt) => opt.value === value);
  const serviceType = variables.find((v) => v.name === `service_type_by_${name}`) as any;

  return serviceType?.options[index]?.value;
};
