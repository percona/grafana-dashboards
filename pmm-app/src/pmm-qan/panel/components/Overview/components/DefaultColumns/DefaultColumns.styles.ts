import { css } from 'emotion';

export const rowNumber = css`
  word-wrap: normal;
  word-break: normal;
`;

export const mainColumn = css`
  cursor: pointer;
`;

export const tooltipIcon = css`
  margin-left: auto;
`;
export const metricWrapper = css`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 5px;
`;

export const mainMetric = (isTotal) => css`
  word-wrap: break-word !important;
  word-break: break-word !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
  max-width: calc(100% - 15px);
  color: ${isTotal ? '#8AA4FF' : 'rgba(32, 215, 255, 0.8)'};
`;
