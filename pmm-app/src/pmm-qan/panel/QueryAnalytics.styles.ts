import { css } from '@emotion/css';
import { GrafanaTheme } from '@grafana/data';
import { stylesFactory } from '@grafana/ui';
import { getPmmTheme } from 'shared/components/helpers/getPmmTheme';

const LAYOUT_SIZES = {
  headerHeight: 50,
  footerHeight: 50,
  splitterHeight: 1300,
  tableMinHeight: 1000,
};

export const getStyles = stylesFactory((theme: GrafanaTheme) => {
  const parameters = getPmmTheme(theme);

  return {
    overviewHeader: css`
      display: flex;
      justify-content: flex-end;
      padding: 13px 2px 5px 0px;
      height: ${LAYOUT_SIZES.headerHeight}px;

      button {
        margin-right: ${theme.spacing.sm} !important;
      }
    `,
    overviewFooter: css`
      display: flex;
      justify-content: flex-start;
      padding: 13px 2px 5px 0px;
      height: ${LAYOUT_SIZES.footerHeight}px;
    `,
    splitterWrapper: css`
      height: ${LAYOUT_SIZES.splitterHeight}px;
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
      margin-left: 10px;
      color: ${parameters.mainTextColor};
    `,
    tableWrapper: css`
      min-height: ${LAYOUT_SIZES.tableMinHeight}px;
    `,
    link: css`
      display: block;
      margin-top: ${theme.spacing.sm};
      text-decoration: underline;
    `,
  };
});
