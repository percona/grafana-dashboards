
import { css } from 'emotion';
import { GrafanaTheme } from '@grafana/data';
import { selectThemeVariant, stylesFactory } from '@grafana/ui';
import { getThemeParameters } from 'shared/components/helpers/selectThemeVariant';

export const getStyles = stylesFactory((theme: GrafanaTheme) => {
  const parameters = getThemeParameters(theme);


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
    height: 1000px;
    position: relative;
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
