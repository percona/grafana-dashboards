import { css } from 'emotion';
import { GrafanaTheme } from '@grafana/data';
import { stylesFactory } from '@grafana/ui';
import { getPmmTheme } from 'shared/components/helpers/getPmmTheme';

export const getStyles = stylesFactory((theme: GrafanaTheme) => {
  const parameters = getPmmTheme(theme);

  return {
    overviewHeader: css`
      display: flex;
      justify-content: flex-end;
      padding: 13px 2px 5px 0px;
      height: 50px;
    `,
    overviewFooter: css`
      display: flex;
      justify-content: flex-start;
      padding: 13px 2px 5px 0px;
      height: 50px;
    `,
    splitterWrapper: css`
      height: 1200px;
      position: relative;
    `,
    detailsWrapper: css`
      height: 100%;
    `,
    paginationWrapper: css`
      display: flex;
      align-items: center;

      .ant-pagination-item-link,
      .ant-select-selection,
      svg,
      a {
        background-color: ${parameters.table.backgroundColor} !important;
        color: ${parameters.mainTextColor} !important;
      }
    `,
    showTotal: css`
      color: ${parameters.mainTextColor};
    `,
    tableWrapper: css`
      min-height: 1000px;
    `,
    getContainerWrapper: (size) => css`
      width: ${(size || 1500) - 260}px;
      height: 100%;
      position: relative;
    `,
  };
});
