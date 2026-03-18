import React, { FC, useEffect, useState } from 'react';
import { Spinner } from '@grafana/ui';
import { css } from '@emotion/css';
import { stripPrefix } from '../database-models/utils';
import { SERVICE_ID_PREFIX } from 'shared/core';
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
  const styles = getStyles();

  useEffect(() => {
    setAnalysis(null);
    setError(null);

    const firstExample = examples?.find(
      (e) => e.service_id && (e.example || e.explain_fingerprint),
    );
    if (!firstExample) {
      if (!examplesLoading && examples?.length !== undefined) {
        setError(Messages.tabs.aiInsights.noExample);
      }

      return;
    }

    const serviceId = stripPrefix(firstExample.service_id, SERVICE_ID_PREFIX);
    const queryText = firstExample.example || firstExample.explain_fingerprint || '';
    if (!serviceId.trim() || !queryText.trim()) {
      setError(Messages.tabs.aiInsights.noExample);

      return;
    }

    let cancelled = false;
    setApiLoading(true);
    fetchQanInsights({
      serviceId,
      queryText,
      ...(queryId && { queryId }),
      ...(fingerprint && { fingerprint }),
      ...(from && { timeFrom: from }),
      ...(to && { timeTo: to }),
    })
      .then((res) => {
        if (!cancelled) {
          setAnalysis(res.analysis ?? '');
          setError(null);
        }
      })
      .catch((err: Error & { response?: { data?: { message?: string } } }) => {
        if (!cancelled) {
          const msg =
            err?.response?.data?.message ?? err?.message ?? Messages.tabs.aiInsights.error;
          setError(msg);
          setAnalysis(null);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setApiLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [queryId, from, to, fingerprint, examples, examplesLoading]);

  if (examplesLoading || apiLoading) {
    return (
      <div className={styles.container}>
        <Spinner size={OVERLAY_LOADER_SIZE} />
        <span className={styles.message}>{Messages.tabs.aiInsights.loading}</span>
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
    <div className={styles.container}>
      <span className={styles.message}>{Messages.tabs.aiInsights.loading}</span>
    </div>
  );
};

export default AiInsights;
