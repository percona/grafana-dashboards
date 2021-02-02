import { getTemplateSrv } from '@grafana/runtime';
import { apiRequestManagement } from 'shared/components/helpers/api';
import { PTSummaryRequest, PTSummaryResponse, DatabaseSummaryRequest } from './PTSummary.types';

export const PTSummaryService = {
  async getPTSummary() {
    const body: PTSummaryRequest = { node_id: getTemplateSrv().replace('$node_id') };

    return apiRequestManagement.post<PTSummaryResponse, any>('/Actions/StartPTSummary', body, true);
  },
  async getMysqlPTSummary() {
    const body: DatabaseSummaryRequest = {
      service_id: getTemplateSrv().replace('$service_name'),
      environment: getTemplateSrv().replace('$environment'),
    };

    return apiRequestManagement.post<PTSummaryResponse, any>('/Actions/StartPTMySQLSummary', body, true);
  },
  async getPostgresqlPTSummary() {
    const body: DatabaseSummaryRequest = {
      service_id: getTemplateSrv().replace('$service_name'),
      environment: getTemplateSrv().replace('$environment'),
    };

    return apiRequestManagement.post<PTSummaryResponse, any>('/Actions/StartPTPostgreSQLSummary', body, true);
  },
  async getMongodbPTSummary() {
    const body: DatabaseSummaryRequest = {
      service_id: getTemplateSrv().replace('$service_name'),
      environment: getTemplateSrv().replace('$environment'),
    };

    return apiRequestManagement.post<PTSummaryResponse, any>('/Actions/StartPTMongoDBSummary', body, true);
  },
};
