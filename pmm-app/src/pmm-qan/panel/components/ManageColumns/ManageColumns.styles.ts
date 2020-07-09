import { css } from 'emotion';

export const styles = {
  placeholder: css`
    font-size: 16px;
    color: rgba(255, 255, 255, 0.8);
  `,
  iconMargin: css`
    margin-right: 4px;
  `,
  dividerMargin: css`
    margin: 0 !important;
    margin-right: 4px !important;
  `,
  actionElement: css`
    padding: 4px 8px;
    cursor: pointer;
    background-color: #3d3d3d;
  `,
  metricsTooltip: css`
    display: flex;
    flex-direction: column;
  `,
  optionWrapper: css`
    align-items: center;
    display: flex;
    justify-content: space-between;
  `,
  optionText: css`
    display: flex;
    flex-direction: column;
    max-width: 75%;
    white-space: normal;
  `,
  optionTitle: css`
    color: #d8d9da;
  `,
  optionDescription: css`
    color: #8e8e8e;
    font-size: 10px;
  `,
  tagWrapper: css`
    margin-left: 4px;
  `,
  tag: css`
    background-color: #646464;
    border: 1px solid #8A8A8A;
    border-radius: 3px;
    color: #f2f2f2;
    font-size: 11px;
    margin-left: 6px;
    padding: 2px 4px;
  `,
};
