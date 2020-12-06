import { apiRequestQAN } from 'shared/components/helpers/api';
import { getLabelQueryParams } from 'pmm-qan/panel/QueryAnalytics.tools';

export const markCheckedLabels = (labels, paramLabels) => {
  Object.keys(labels).forEach((label) => {
    labels[label].name.forEach((metric) => {
      const passedVariables = paramLabels[label];

      if (!passedVariables) {
        return;
      }

      const isChecked = passedVariables.some((variable) => {
        if (!metric.value) {
          // eslint-disable-next-line no-param-reassign
          metric.value = '';
        }

        return variable === metric.value;
      });

      // eslint-disable-next-line no-param-reassign
      metric.checked = isChecked;
    });
  });

  return labels;
};

export default {
  getQueryOverviewFiltersList: async (paramLabels, from, to, mainMetric) => {
    const { labels } = await apiRequestQAN.post<any, any>('/Filters/Get', {
      labels: getLabelQueryParams(paramLabels),
      main_metric_name: mainMetric,
      period_start_from: from,
      period_start_to: to,
    });

    return markCheckedLabels(labels, paramLabels);
  },
};
