import { css } from '@emotion/css';

import { stylesFactory } from '@grafana/ui';

export const getStyles = stylesFactory(() => ({
  latencyTooltip: css`
    .ant-tooltip-content {
      box-sizing: border-box;

      /* Popup shadow */
      box-shadow: 0px 2px 10px rgba(50, 116, 217, 0.25);
      border-radius: 2px !important;
    }

    .ant-tooltip-inner {
      background-color: #3274d9;
      border-radius: 2px !important;
      padding: 0;
    }

    .ant-tooltip-arrow:before {
      background-color: #3274d9;
    }
    `,
}));
