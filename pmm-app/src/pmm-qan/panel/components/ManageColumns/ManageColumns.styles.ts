import { css } from 'emotion';

const placeholderColor = 'rgba(255, 255, 255, 0.8)';

export const styles = {
  placeholder: css`
    font-size: 16px;
    color: ${placeholderColor};
  `,
  placeholderAdd: css`
    font-size: 14px;
    color: ${placeholderColor};
  `,
  placeholderPadding: css`
    padding-left: 11px;
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
    transition: background 0.3s ease;
    &:hover {
      background-color: #2d2e2f;
    }
  `,
  metricsTooltip: css`
    display: flex;
    flex-direction: column;
  `,
};
