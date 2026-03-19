import React, {
  FC, useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { Button, Spinner } from '@grafana/ui';
import { css } from '@emotion/css';
import highlight from 'highlight.js';
import { SERVICE_ID_PREFIX } from 'shared/core';
import { stripPrefix } from '../database-models/utils';
import { QueryExampleResponseItem } from '../Details.types';
import { Messages } from '../Details.messages';
import { fetchQanInsights, fetchQanInsightsCache } from './AiInsights.service';
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
    word-break: break-word;
    max-height: 400px;
    overflow: auto;
    font-family: inherit;
    font-size: 13px;
    line-height: 1.6;

    h1, h2, h3, h4 {
      margin: 12px 0 6px;
      font-weight: 600;
    }
    h1 { font-size: 18px; }
    h2 { font-size: 16px; }
    h3 { font-size: 14px; }

    p { margin: 4px 0 8px; }

    ul, ol {
      margin: 4px 0 8px;
      padding-left: 20px;
    }

    pre {
      background: rgba(0, 0, 0, 0.15);
      border-radius: 4px;
      padding: 10px 12px;
      overflow-x: auto;
      margin: 6px 0 10px;
      font-size: 12px;
      line-height: 1.4;
    }

    code {
      font-family: 'Roboto Mono', monospace;
      font-size: 12px;
    }

    code:not(pre code) {
      background: rgba(0, 0, 0, 0.1);
      padding: 1px 4px;
      border-radius: 3px;
    }

    strong { font-weight: 600; }
    em { font-style: italic; }
  `,
  error: css`
    color: var(--error-text-color, #e02f44);
  `,
  header: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
  `,
  cachedAt: css`
    font-size: 11px;
    opacity: 0.7;
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

const formatTimestamp = (iso: string): string => {
  try {
    const d = new Date(iso);

    if (Number.isNaN(d.getTime())) return iso;

    return d.toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
};

/**
 * Lightweight markdown-to-HTML for environments without react-markdown.
 * Handles fenced code blocks (with highlight.js), headers, bold, italic,
 * inline code, unordered/ordered lists, and paragraphs.
 */
const markdownToHtml = (md: string): string => {
  const lines = md.split('\n');
  const out: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Fenced code block
    const fenceMatch = line.match(/^```(\w*)/);

    if (fenceMatch) {
      const lang = fenceMatch[1] || '';
      const codeLines: string[] = [];

      i += 1;

      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i += 1;
      }

      i += 1; // skip closing ```

      const raw = codeLines.join('\n');
      let highlighted: string;

      try {
        highlighted = lang && highlight.getLanguage(lang)
          ? highlight.highlight(raw, { language: lang }).value
          : highlight.highlightAuto(raw).value;
      } catch {
        highlighted = raw.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      }

      out.push(`<pre><code class="hljs${lang ? ` language-${lang}` : ''}">${highlighted}</code></pre>`);
      continue;
    }

    // Headers
    const headerMatch = line.match(/^(#{1,4})\s+(.*)/);

    if (headerMatch) {
      const level = headerMatch[1].length;
      const text = headerMatch[2];

      out.push(`<h${level}>${inlineFormat(text)}</h${level}>`);
      i += 1;
      continue;
    }

    // Unordered list items
    if (line.match(/^\s*[-*]\s+/)) {
      out.push('<ul>');

      while (i < lines.length && lines[i].match(/^\s*[-*]\s+/)) {
        const content = lines[i].replace(/^\s*[-*]\s+/, '');

        out.push(`<li>${inlineFormat(content)}</li>`);
        i += 1;
      }

      out.push('</ul>');
      continue;
    }

    // Ordered list items
    if (line.match(/^\s*\d+\.\s+/)) {
      out.push('<ol>');

      while (i < lines.length && lines[i].match(/^\s*\d+\.\s+/)) {
        const content = lines[i].replace(/^\s*\d+\.\s+/, '');

        out.push(`<li>${inlineFormat(content)}</li>`);
        i += 1;
      }

      out.push('</ol>');
      continue;
    }

    // Empty line
    if (line.trim() === '') {
      i += 1;
      continue;
    }

    // Paragraph
    out.push(`<p>${inlineFormat(line)}</p>`);
    i += 1;
  }

  return out.join('\n');
};

const escapeHtml = (s: string): string => s
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

const inlineFormat = (text: string): string => {
  const escaped = escapeHtml(text);

  return escaped
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');
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
  const [cachedAt, setCachedAt] = useState<string | null>(null);
  const [apiLoading, setApiLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const runOnceRef = useRef(false);
  const styles = getStyles();

  const firstExample = useMemo(
    () => examples?.find((e) => e.service_id && (e.example || e.explain_fingerprint)),
    [examples],
  );

  const serviceId = useMemo(
    () => (firstExample ? stripPrefix(firstExample.service_id, SERVICE_ID_PREFIX) : ''),
    [firstExample],
  );
  const queryText = useMemo(
    () => (firstExample ? (firstExample.example || firstExample.explain_fingerprint || '') : ''),
    [firstExample],
  );

  // Reset when the user selects a different query so the effect re-runs
  useEffect(() => {
    runOnceRef.current = false;
    setAnalysis(null);
    setCachedAt(null);
    setError(null);
  }, [queryId, fingerprint]);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setElapsed(0);
    timerRef.current = setInterval(() => setElapsed((prev) => prev + 1), 1000);
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const runAnalysis = useCallback((force: boolean) => {
    if (!serviceId.trim() || !queryText.trim()) return;

    setApiLoading(true);
    setError(null);
    startTimer();

    fetchQanInsights({
      service_id: serviceId,
      query_text: queryText,
      ...(queryId && { query_id: queryId }),
      ...(fingerprint && { fingerprint }),
      ...(from && { time_from: from }),
      ...(to && { time_to: to }),
      force,
    })
      .then((res) => {
        setAnalysis(res.analysis ?? '');
        setCachedAt(res.created_at ?? null);
        setError(null);
      })
      .catch((err: Error & { response?: { data?: { error?: string } } }) => {
        const msg = err?.response?.data?.error ?? err?.message ?? Messages.tabs.aiInsights.error;

        setError(msg);
        setAnalysis(null);
      })
      .finally(() => {
        setApiLoading(false);
        stopTimer();
      });
  }, [serviceId, queryText, queryId, fingerprint, from, to, startTimer, stopTimer]);

  useEffect(() => {
    if (runOnceRef.current) return () => {};
    if (examplesLoading) return () => {};

    if (!firstExample || !serviceId.trim() || !queryText.trim()) {
      setError(Messages.tabs.aiInsights.noExample);

      return () => {};
    }

    runOnceRef.current = true;

    // Try cache first, then fall back to a fresh analysis
    if (queryId) {
      setApiLoading(true);
      fetchQanInsightsCache(queryId, serviceId)
        .then((cached) => {
          if (cached?.analysis) {
            setAnalysis(cached.analysis);
            setCachedAt(cached.created_at ?? null);
            setApiLoading(false);
          } else {
            runAnalysis(false);
          }
        })
        .catch(() => {
          runAnalysis(false);
        });
    } else {
      runAnalysis(false);
    }

    return () => stopTimer();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examplesLoading, firstExample, serviceId, queryText, queryId]);

  const analysisHtml = useMemo(
    () => (analysis ? markdownToHtml(analysis) : ''),
    [analysis],
  );

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
        <div className={styles.header}>
          <span className={styles.cachedAt}>
            {cachedAt ? `Last analyzed: ${formatTimestamp(cachedAt)}` : ''}
          </span>
          <Button
            variant="secondary"
            size="sm"
            icon="sync"
            onClick={() => runAnalysis(true)}
            disabled={apiLoading}
          >
            Re-run Analysis
          </Button>
        </div>
        {/* eslint-disable-next-line react/no-danger */}
        <div className={styles.analysis} dangerouslySetInnerHTML={{ __html: analysisHtml }} />
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
