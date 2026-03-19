import React, {
  FC, useEffect, useMemo, useRef, useState,
} from 'react';
import { Spinner } from '@grafana/ui';
import { css } from '@emotion/css';
import { SERVICE_ID_PREFIX } from 'shared/core';
import { stripPrefix } from '../database-models/utils';
import { QueryExampleResponseItem } from '../Details.types';
import { Messages } from '../Details.messages';
import { fetchQanInsights } from './AiInsights.service';
import { OVERLAY_LOADER_SIZE } from '../Details.constants';

export interface AiInsightsProps {
  queryId?: string;
  from: string;
  to: string;
  fingerprint?: string;
  examples: QueryExampleResponseItem[];
  examplesLoading: boolean;
}

const getStyles = () => ({
  container: css`
    padding: 12px;
    min-height: 120px;
  `,
  loadingContainer: css`
    padding: 12px;
    min-height: 120px;
    display: flex;
    align-items: center;
    gap: 8px;
  `,
  message: css`
    color: inherit;
    white-space: pre-wrap;
    word-break: break-word;
  `,
  analysis: css`
    white-space: pre-wrap;
    word-break: break-word;
    max-height: 400px;
    overflow: auto;
    font-family: inherit;
    font-size: 13px;
    line-height: 1.5;
  `,
  error: css`
    color: var(--error-text-color, #e02f44);
  `,
});

const formatElapsed = (seconds: number): string => {
  if (seconds < 60) {
    return `${seconds}s`;
  }

  const m = Math.floor(seconds / 60);
  const s = seconds % 60;

  return `${m}m ${s}s`;
};

export const AiInsights: FC<AiInsightsProps> = ({
  queryId,
  from,
  to,
  fingerprint,
  examples,
  examplesLoading,
}) => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [apiLoading, setApiLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const styles = getStyles();

  const firstExample = useMemo(
    () => examples?.find((e) => e.service_id && (e.example || e.explain_fingerprint)),
    [examples],
  );

  const exampleKey = firstExample
    ? `${firstExample.service_id}|${firstExample.example || firstExample.explain_fingerprint}`
    : '';

  useEffect(() => {
    setAnalysis(null);
    setError(null);
    setElapsed(0);

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (!firstExample) {
      if (!examplesLoading) {
        setError(Messages.tabs.aiInsights.noExample);
      }

      return () => {};
    }

    const serviceId = stripPrefix(firstExample.service_id, SERVICE_ID_PREFIX);
    const queryText = firstExample.example || firstExample.explain_fingerprint || '';

    if (!serviceId.trim() || !queryText.trim()) {
      setError(Messages.tabs.aiInsights.noExample);

      return () => {};
    }

    let cancelled = false;

    setApiLoading(true);
    timerRef.current = setInterval(() => {
      if (!cancelled) {
        setElapsed((prev) => prev + 1);
      }
    }, 1000);

    fetchQanInsights({
      service_id: serviceId,
      query_text: queryText,
      ...(queryId && { query_id: queryId }),
      ...(fingerprint && { fingerprint }),
      ...(from && { time_from: from }),
      ...(to && { time_to: to }),
    })
      .then((res) => {
        if (!cancelled) {
          setAnalysis(res.analysis ?? '');
          setError(null);
        }
      })
      .catch((err: Error & { response?: { data?: { error?: string } } }) => {
        if (!cancelled) {
          const msg = err?.response?.data?.error ?? err?.message ?? Messages.tabs.aiInsights.error;

          setError(msg);
          setAnalysis(null);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setApiLoading(false);

          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
        }
      });

    return () => {
      cancelled = true;

      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  // Depend on a stable key derived from the first example, not the array reference
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryId, from, to, fingerprint, exampleKey, examplesLoading]);

  if (examplesLoading || apiLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Spinner size={OVERLAY_LOADER_SIZE} />
        <span className={styles.message}>
          {Messages.tabs.aiInsights.loading}
          {elapsed > 0 ? ` (${formatElapsed(elapsed)})` : ''}
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <p className={styles.error}>{error}</p>
      </div>
    );
  }

  if (analysis) {
    return (
      <div className={styles.container}>
        <div className={styles.analysis}>{analysis}</div>
      </div>
    );
  }

  return (
    <div className={styles.loadingContainer}>
      <Spinner size={OVERLAY_LOADER_SIZE} />
      <span className={styles.message}>{Messages.tabs.aiInsights.loading}</span>
    </div>
  );
};

export default AiInsights;
