import { css } from '@emotion/css';

import { stylesFactory } from '@grafana/ui';
import { GrafanaTheme } from '@grafana/data';
import { getPmmTheme } from 'shared/components/helpers/getPmmTheme';

export const getStyles = stylesFactory((theme: GrafanaTheme) => {
  const parameters = getPmmTheme(theme);

  return {
    label: css`
      display: grid;
      grid-template-areas: 'filtername dashboardlink percentagearea';
      grid-template-rows: 30px;
      grid-template-columns: 130px 20px 40px;
      grid-gap: 10px;
      height: auto;
      margin: 0;
    `,
    filterName: css`
      grid-area: filtername;
    `,
    percentage: css`
      grid-area: percentagearea;
      display: flex;
      justify-content: flex-end;
      color: ${parameters.mainTextColor};
    `,
    dashboardLink: css`
      grid-area: dashboardlink;
      a {
        color: ${theme.colors.text} !important;
        &:hover {
          color: ${theme.colors.linkHover} !important;
        }
      }
    `,
    filterHeaderWrapper: css`
      display: flex;
      justify-items: space-between;
      margin-bottom: 0 !important;
      margin-top: 20px !important;
    `,
    filterHeader: css`
      margin-right: auto;
      font-weight: 400;
      font-size: 16px;
      color: ${parameters.mainTextColor};
    `,
    notTopWrapper: css`
      display: flex;
      justify-items: space-between;
      margin-bottom: 0 !important;
      margin-top: 5px !important;
      margin-bottom: 5px !important;
    `,
    notTopHeader: css`
      margin-right: auto;
      font-weight: 400;
      font-size: 12px;
      color: ${parameters.mainTextColor};
    `,
    divider: css`
      margin-top: 3px !important;
      margin-bottom: 12px !important;
      height: 1px !important;
      background-color: #3d3d3d !important;
    `,
    showModeSwitcher: css`
      color: rgb(50, 179, 227) !important;
      cursor: pointer;
    `,
  };
});
