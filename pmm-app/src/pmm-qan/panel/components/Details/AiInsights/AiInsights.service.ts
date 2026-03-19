import { apiRequest } from 'shared/components/helpers/api';

export interface AdreQanInsightsRequest {
  service_id: string;
  query_text: string;
  query_id?: string;
  fingerprint?: string;
  time_from?: string;
  time_to?: string;
  force?: boolean;
}

export interface AdreQanInsightsResponse {
  analysis: string;
  created_at?: string;
  cached?: boolean;
}

export const fetchQanInsights = async (
  body: AdreQanInsightsRequest,
): Promise<AdreQanInsightsResponse> => apiRequest.post<AdreQanInsightsResponse, AdreQanInsightsRequest>(
  '/v1/adre/qan-insights',
  body,
  true,
);

export const fetchQanInsightsCache = async (
  queryId: string,
  serviceId: string,
): Promise<AdreQanInsightsResponse | null> => {
  try {
    return await apiRequest.get<AdreQanInsightsResponse, { query_id: string; service_id: string }>(
      '/v1/adre/qan-insights',
      { params: { query_id: queryId, service_id: serviceId } },
    );
  } catch {
    return null;
  }
};
