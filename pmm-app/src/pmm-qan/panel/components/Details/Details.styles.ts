import { css } from 'emotion';

import { stylesFactory } from '@grafana/ui';
import { GrafanaTheme } from '@grafana/data';
import { getThemeParameters } from 'shared/components/helpers/selectThemeVariant';

export const getStyles = stylesFactory((theme: GrafanaTheme) => {
  const parameters = getThemeParameters(theme);

  return {
    zeroMargin: css`
    margin: 0 !important;
  `,
    detailsGrid: css`
      background-color: ${parameters.table.backgroundColor};
      display: grid;
      grid-template-areas:
        'details-tabs';
      grid-template-rows: auto;
      grid-template-columns: auto;
      min-height: 60px;
      height: auto;
      margin: 0;

      .ant-table-body {
        margin-left: 0 !important;
        margin-right: 0 !important;
      }

      .ant-collapse-header {
        background-color: ${parameters.table.headerBackground} !important;
        color: ${parameters.mainTextColor} !important;
      }
      .ant-tabs-tab {
        color: ${parameters.mainTextColor} !important;
      }

      .ant-collapse-content-active {
        color: ${parameters.mainTextColor} !important;
        background-color: ${parameters.table.backgroundColor} !important;
        border: 2px solid ${parameters.table.headerBackground};
        border-bottom-left-radius: 2px;
        border-bottom-right-radius: 2px;
      }

      .details-tabs {
        grid-area: details-tabs;
        margin-top: 10px;
      }
    `
  };
});
