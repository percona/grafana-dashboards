import { css } from '@emotion/css';

import { stylesFactory } from '@grafana/ui';
import { GrafanaTheme } from '@grafana/data';
import { getPmmTheme } from 'shared/components/helpers/getPmmTheme';

export const getStyles = stylesFactory((theme: GrafanaTheme) => {
  const parameters = getPmmTheme(theme);

  return {
    scrollArea: css`
      height: 100%;
    `,
    zeroMargin: css`
      margin: 0 !important;
    `,
    detailsGrid: css`
      background-color: ${parameters.table.backgroundColor};
      display: grid;
      grid-template-areas: 'details-tabs';
      grid-template-rows: auto;
      grid-template-columns: auto;
      min-height: 60px;
      height: auto;
      margin: 0;

      .details-tabs {
        grid-area: details-tabs;
        margin-top: 10px;
      }
    `,
    closeDetailsButton: css`
      margin-left: auto;
      margin-right: 10px;
      align-self: center;
    `,
  };
});
