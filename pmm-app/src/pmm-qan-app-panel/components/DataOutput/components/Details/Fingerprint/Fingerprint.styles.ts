import { css } from 'emotion';

export const Styling = {
  fingerprintWrapper: css`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
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
    width: 600px;
    overflow: hidden;
    color: #32b3e3 !important;
    cursor: help;
  `,
};
