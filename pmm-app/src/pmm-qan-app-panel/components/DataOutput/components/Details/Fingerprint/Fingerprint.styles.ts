import { css } from 'emotion';

export const Styling = {
  fingerprintWrapper: css`
    display: flex;
    justify-content: center;
    margin-top: 10px;
    align-items: center;
    position: relative;
  `,
  controlSum: css`
    color: gray;
  `,
  fingerprintView: css`
    display: flex;
    align-items: baseline;
  `,
  fingerprint: css`
    white-space: nowrap;
    text-overflow: ellipsis;
    min-width: 300px;
    max-width: 600px;
    overflow: hidden;
  `,
  closeButton: css`
    position: absolute;
    right: 10px;
  `,
  tooltipIcon: css`
    margin-left: 5px;
    cursor: help;
  `,
};
