import { apiRequest } from '../../../react-plugins-deps/components/helpers/api';

class FiltersService {
  static getAutocompleteFiltersList(selectedVariables) {
    const selected: any[] = [];
    const options: any[] = [];
    const labels = result.labels;

    Object.keys(labels).forEach(label => {
      labels[label].name.forEach(metric => {
        const passedVariables = selectedVariables[label];

        metric.checked = passedVariables && passedVariables.some(variable => variable === metric.value);

        metric.key = `${label}:${metric.value}`;
        // @ts-ignore
        options.push(metric);
        if (metric.checked) {
          // @ts-ignore
          selected.push(`${label}:${metric.value}`);
        }
      });
    });

    return { selected, options };
  }

  static async getQueryOverviewFiltersList(paramLabels, from, to) {
    const { labels } = await apiRequest.post<any, any>('/v0/qan/Filters/Get', {
      labels: Object.keys(paramLabels).map(key => {
        return {
          key: key,
          value: paramLabels[key],
        };
      }),
      main_metric_name: '',
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
