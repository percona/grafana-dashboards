import { css } from 'emotion';
import { stylesFactory } from '@grafana/ui';
import { GrafanaTheme } from '@grafana/data';
import { getPmmTheme } from '../../../../../../shared/components/helpers/getPmmTheme';

export const getStyles = stylesFactory((theme: GrafanaTheme) => {
  const parameters = getPmmTheme(theme);

  return {
    groupByWrapper: css`
      display: flex;
      align-items: center;

      .group-by-selector {
        width: 150px;
        color: ${parameters.mainTextColor};
        > div {
          background-color: transparent;
        }
      }
    `,
    groupByHeader: css`
      margin: 0 !important;
      margin-right: 15px !important;
      color: ${parameters.mainTextColor};
    `,
  };
});
