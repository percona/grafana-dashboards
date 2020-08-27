import { apiRequestManagement } from 'shared/components/helpers/api';
import { PTSummaryRequest, PTSummaryResponse } from './PTSummary.types';

export const PTSummaryService = {
  async getPTSummary(body: PTSummaryRequest) {
    return apiRequestManagement.post<PTSummaryResponse, any>('/Actions/StartPTSummary', body, true);
  },
};
