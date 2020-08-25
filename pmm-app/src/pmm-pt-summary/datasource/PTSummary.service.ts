import { apiRequestManagement } from 'shared/components/helpers/api';

export const PTSummaryService = {
  async getPTSummary(body) {
    return apiRequestManagement.post<any, any>('/Actions/StartPTSummary', body);
  }
};
