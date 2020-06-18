import { FILTERS_GROUPS } from './Filters.constants';

export const getSelectedCheckboxes = (filters) => FILTERS_GROUPS.map((group) => filters[group.dataKey])
  .filter(Boolean)
  .map((item) => item.name)
  .flat()
  .some((item) => item.checked);
