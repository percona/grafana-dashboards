import { apiRequestQAN } from '../../../react-plugins-deps/components/helpers/api';

class FiltersService {
  static async getQueryOverviewFiltersList(paramLabels, from, to, mainMetric) {
    const requestLabels = Object.keys(paramLabels).map(key => {
      return {
        key: key,
        value: paramLabels[key],
      };
    });

    const { labels } = await apiRequestQAN.post<any, any>('/Filters/Get', {
      labels: requestLabels,
      main_metric_name: mainMetric,
      period_start_from: from,
      period_start_to: to,
    });

    Object.keys(labels).forEach(label => {
      labels[label].name.forEach(metric => {
        const passedVariables = paramLabels[label];
        metric.checked = passedVariables && passedVariables.some(variable => variable === metric.value);
      });
    });

    return labels;
  }
}

export default FiltersService;
