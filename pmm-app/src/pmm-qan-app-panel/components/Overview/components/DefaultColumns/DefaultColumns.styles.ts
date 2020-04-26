import { css } from 'emotion';

export const rowNumber = css`
  word-wrap: normal;
  word-break: normal;
`;

export const mainMetric = mainMetricColumnWidth => css`
  word-wrap: break-word !important;
  word-break: break-word !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
  max-width: ${mainMetricColumnWidth - 40}px !important;
  color: rgb(50, 179, 227);
`;
