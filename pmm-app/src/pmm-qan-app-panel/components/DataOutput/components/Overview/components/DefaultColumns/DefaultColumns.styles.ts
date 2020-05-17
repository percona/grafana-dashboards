import { css } from 'emotion';

export const rowNumber = css`
  word-wrap: normal;
  word-break: normal;
`;

export const mainMetric = (mainMetricColumnWidth, isTotal) => css`
  word-wrap: break-word !important;
  word-break: break-word !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
  max-width: ${mainMetricColumnWidth - 40}px !important;
  color: ${isTotal ? 'rgb(38, 139, 64)' : '#32b3e3'};
`;
