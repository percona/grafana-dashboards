import { css } from '@emotion/css';
import { GrafanaTheme } from '@grafana/data';

export const getStyles = ({ spacing, border }: GrafanaTheme) => ({
  queryTooltip: (float: string) => css`
    max-width: 100%;
    background: #141619;

    .ant-tooltip-content {
      width: 600px;
      box-sizing: border-box;
    
      /* Popup shadow */
      box-shadow: 0px 2px 10px rgba(50, 116, 217, 0.25);
      border-radius: ${border.radius.sm};
      float: ${float};
    }

    .ant-tooltip-inner {
      background-color: transparent;
      border-radius: ${border.radius.sm};
      padding: 0;
    }

    .ant-tooltip-arrow:before {
      background-color: transparent;
    }
  `,
  queryTooltipDataWrapper: css`
    background-color: #282828;
    padding: ${spacing.sm};
    border-radius: ${border.radius.md};
  `,
  queryId: css`
    margin: ${spacing.md};
  `,
});
