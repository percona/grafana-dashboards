import { metricsMock } from './metrics-mock';
class MetricsService {
  static async getMetrics({ filterBy, groupBy, labels, periodStartFrom, periodStartTo, tables }) {
    const data = {
      filter_by: filterBy,
      group_by: groupBy,
      labels: labels || [],
      period_start_from: periodStartFrom,
      period_start_to: periodStartTo,
      tables: tables || [],
    };

    const response = await fetch('/v0/qan/ObjectDetails/GetMetrics', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    console.log(response);
    return metricsMock;
    // return response.json();
  }
}

export default MetricsService;
