import { getTemplateSrv } from '@grafana/runtime';
import { apiRequestManagement } from 'shared/components/helpers/api';
import { PTSummaryRequest, PTSummaryResponse, DatabaseSummaryRequest } from './PTSummary.types';

export const PTSummaryService = {
  async getPTSummary(variableName) {
    const body: PTSummaryRequest = { node_id: getTemplateSrv().replace(`$${variableName || 'node_id'}`) };

    return apiRequestManagement.post<PTSummaryResponse, any>('/Actions/StartPTSummary', body, true);
  },
  async getMysqlPTSummary(variableName) {
    const body: DatabaseSummaryRequest = {
      service_id: getTemplateSrv().replace(`$${variableName || 'service_name'}`),
    };

    return apiRequestManagement.post<PTSummaryResponse, any>('/Actions/StartPTMySQLSummary', body, true);
  },
  async getPostgresqlPTSummary(variableName) {
    const body: DatabaseSummaryRequest = {
      service_id: getTemplateSrv().replace(`$${variableName || 'service_name'}`),
    };

    return apiRequestManagement.post<PTSummaryResponse, any>('/Actions/StartPTPgSummary', body, true);
  },
  async getMongodbPTSummary(variableName) {
    const body: DatabaseSummaryRequest = {
      service_id: getTemplateSrv().replace(`$${variableName || 'service-name'}`),
    };

    return apiRequestManagement.post<PTSummaryResponse, any>('/Actions/StartPTMongoDBSummary', body, true);
  },
};
