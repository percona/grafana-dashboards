import { getTemplateSrv } from '@grafana/runtime';
import { FILTERS_GROUPS } from './Filters.constants';

export const getSelectedCheckboxes = (filters) => FILTERS_GROUPS.map((group) => filters[group.dataKey])
  .filter(Boolean)
  .map((item) => item.name)
  .reduce((acc, item) => acc.concat(item), [])
  .some((item) => item.checked);

export const getServiceType = (value: string, name: string): string | undefined => {
  const variables = getTemplateSrv().getVariables();
  const variable = variables.find((v) => v.name === 'filter_data') as any;
  let serviceType = '';

  // finds value in current query result and its service type
  variable?.options.forEach((opt) => {
    const matches = opt.value.match(`${name}="(.*?)"`);
    const currentValue = matches?.length > 1 ? matches[1] : '';

    if (currentValue && currentValue === value) {
      // eslint-disable-next-line prefer-destructuring
      serviceType = opt.value.match('service_type="(.*?)"')[1];
    }
  });

  return serviceType;
};
