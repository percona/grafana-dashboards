import { apiRequestManagement } from 'shared/components/helpers/api';
import { PTSummaryRequest, PTSummaryResponse } from './PTSummary.types';

export const PTSummaryService = {
  async getPTSummary(body: PTSummaryRequest): Promise<PTSummaryResponse> {
    return apiRequestManagement.post<any, any>('/Actions/StartPTSummary', body);
  }
};
