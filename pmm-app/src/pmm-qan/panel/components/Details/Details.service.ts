import { apiRequestQAN } from 'shared/components/helpers/api';
import { getLabelQueryParams } from 'pmm-qan/panel/QueryAnalytics.tools';

const getExample = async ({
  filterBy, groupBy, labels = [], from, to, tables = [],
}) => {
  const data = {
    filter_by: filterBy,
    group_by: groupBy,
    labels: getLabelQueryParams(labels),
    period_start_from: from,
    period_start_to: to,
    tables,
  };

  return apiRequestQAN.post<any, any>('/ObjectDetails/GetQueryExample', data);
};

export default {
  getExample,
};
