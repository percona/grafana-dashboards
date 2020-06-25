import { css } from 'emotion';

export const styles = {
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
    color: rgba(32, 215, 255, 0.8);
  `,
  closeButton: css`
    cursor: pointer;
    position: absolute;
    right: 10px;
    top: 14px;
  `,
  tooltipIcon: css`
    margin-left: 5px;
    cursor: help;
  `,
};
