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
    // Cache miss is HTTP 404 from PMM. Do not use apiRequest.get here: it shows a Grafana error toast
    // and rethrows on any non-2xx. We treat 404 as "no cache yet" and fall back to POST in AiInsights.tsx.
    const res = await apiRequest.axiosInstance.get<AdreQanInsightsResponse>('/v1/adre/qan-insights', {
      params: { query_id: queryId, service_id: serviceId },
      validateStatus: (status) => status === 200 || status === 404,
    });
    if (res.status === 404) {
      return null;
    }

    return res.data ?? null;
  } catch {
    return null;
  }
};
