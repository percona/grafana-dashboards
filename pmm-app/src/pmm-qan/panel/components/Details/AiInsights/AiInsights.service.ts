import { apiRequest } from 'shared/components/helpers/api';

export interface AdreQanInsightsRequest {
  serviceId: string;
  queryText: string;
  queryId?: string;
  fingerprint?: string;
  timeFrom?: string;
  timeTo?: string;
}

export interface AdreQanInsightsResponse {
  analysis: string;
}

export const fetchQanInsights = async (
  body: AdreQanInsightsRequest,
): Promise<AdreQanInsightsResponse> => apiRequest.post<AdreQanInsightsResponse, AdreQanInsightsRequest>(
  '/v1/adre/qan-insights',
  body,
  true,
);
