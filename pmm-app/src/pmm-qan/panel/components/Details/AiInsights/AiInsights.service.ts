import { apiRequest } from 'shared/components/helpers/api';

export interface AdreQanInsightsRequest {
  service_id: string;
  query_text: string;
  query_id?: string;
  fingerprint?: string;
  time_from?: string;
  time_to?: string;
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
