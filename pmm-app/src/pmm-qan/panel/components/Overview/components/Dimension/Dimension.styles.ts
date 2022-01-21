import { css } from '@emotion/css';
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
        border: 1px solid ${parameters.mainTextColor};
        width: 150px;
        font-size: 16px !important;
        color: ${parameters.mainTextColor};

        .ant-select-selection {
          background-color: transparent !important;
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
