import Api from 'typescript-api';

const filtersApi = new Api.FiltersApi();

const setCheckedLabels = (paramLabels, labels: any) => {
  const result = Object.assign(labels);
  if (labels) {
    Object.keys(result).forEach(label => {
      result[label].name.forEach(metric => {
        const passedVariables = paramLabels[label];
        metric.checked =
          passedVariables &&
          passedVariables.some(variable => {
            if (!metric.value) {
              metric.value = '';
            }
            return variable === metric.value;
          });
      });
    });
  }
  return result;
};

class FiltersService {
  static async getQueryOverviewFiltersList(paramLabels, from, to, mainMetric) {
    const requestLabels = Object.keys(paramLabels).map(key => {
      return {
        key: key,
        value: paramLabels[key],
      };
    });

    const { labels } = await filtersApi.get({
      body: {
        labels: requestLabels,
        main_metric_name: mainMetric,
        period_start_from: from,
        period_start_to: to,
      },
    });

    return setCheckedLabels(paramLabels, labels);
  }
}

export default FiltersService;
