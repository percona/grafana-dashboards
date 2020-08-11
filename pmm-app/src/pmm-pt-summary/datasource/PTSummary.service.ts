import { apiRequestQAN } from 'shared/components/helpers/api';

export const PTSummaryService = {
  async getPTSummary(body) {
    return apiRequestQAN.post<any, any>('/ObjectDetails/GetMetrics', body);
  }
};
