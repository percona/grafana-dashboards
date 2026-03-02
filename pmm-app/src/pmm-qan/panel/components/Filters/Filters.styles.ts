import { css } from '@emotion/css';

import { stylesFactory } from '@grafana/ui';
import { GrafanaTheme } from '@grafana/data';
import { getPmmTheme } from 'shared/components/helpers/getPmmTheme';
import { TABLE_HEIGHT } from './Filters.constants';

export const getStyles = stylesFactory((theme: GrafanaTheme) => {
  const parameters = getPmmTheme(theme);

  return {
    filtersWrapper: css`
      border: 1px solid ${theme.colors.border2};
      height: calc(${TABLE_HEIGHT} + 45px);
      padding: 10px 16px !important;
      border-radius: 3px;
    `,
    filtersField: css`
      width: 100%;
      input {
        color: ${parameters.mainTextColor} !important;
        background-color: ${parameters.table.backgroundColor} !important;
      }
    `,
    icon: css`
      fill: ${theme.colors.textWeak};
    `,
    filtersHeader: css`
      display: flex;
      align-items: baseline;
      padding: 15px 0px 5px;
      height: 50px;
      justify-content: space-between;
    `,
    filtersDisabled: css`
      opacity: 0.6;
      pointer-events: none;
    `,
    showAllButton: css`
      padding: 0 !important;
      height: auto;
    `,
    title: css`
      margin: 3px;
      color: ${parameters.mainTextColor} !important;
    `,
    resetButton: css`
      padding: 0 !important;
      height: auto;
    `,
  };
});
