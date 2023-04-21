import { CONST_VARIABLES } from './Filters';
import { FILTERS_GROUPS } from './Filters.constants';

export const getSelectedCheckboxes = (filters) => FILTERS_GROUPS.map((group) => filters[group.dataKey])
  .filter(Boolean)
  .map((item) => item.name)
  .reduce((acc, item) => acc.concat(item), [])
  .some((item) => item.checked);

export const getServiceType = (value: string, name: string): string | undefined => {
  const variable = CONST_VARIABLES.find((v) => v.name === 'filter_data') as any;
  const namePattern = new RegExp(`${name}="(.*?)"`);
  const typePattern = new RegExp('service_type="(.*?)"');
  let serviceType = '';

  for (let i = 0; i < variable.options.length; i += 1) {
    const opt = variable.options[i];
    const matches = opt.value.match(namePattern);
    const currentValue = matches?.[1] || '';

    if (currentValue && currentValue === value) {
      // eslint-disable-next-line prefer-destructuring
      serviceType = opt.value.match(typePattern)[1];
      break;
    }
  }

  return serviceType;
};
