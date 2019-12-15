class ExampleService {
  static async getExample({ filterBy, groupBy, labels, periodStartFrom, periodStartTo, tables }) {
    const data = {
      filter_by: filterBy,
      group_by: groupBy,
      labels: labels || [],
      period_start_from: periodStartFrom,
      period_start_to: periodStartTo,
      tables: tables || [],
    };

    const response = await fetch('/v0/qan/ObjectDetails/GetQueryExample', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    return response.json();
  }
}

export default ExampleService;
