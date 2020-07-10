import { css } from 'emotion';

export const styles = {
  overviewHeader: css`
    display: flex;
    align-items: baseline;
    padding: 5px 0px;
    height: 50px;
    padding-top: 13px;
  `,
  overviewTitle: css`
    margin: 3px;
    margin-right: 40px;
    color: rgba(255, 255, 255, 0.8);
  `,
  splitterWrapper: css`
    height: 1000px;
    position: relative;
  `,
  paginationWrapper: css`
    display: flex;
    align-items: center;
  `,
  showTotal: css`
    color: rgba(255, 255, 255, 0.8);
  `,
  manageColumnsWrapper: css`
    margin-left: auto;
    margin-right: 2px;
  `,
  tableWrapper: css`
    min-height: 1000px;
  `,
  getContainerWrapper: (size) => css`
    width: ${(size || 1500) - 260}px;
    height: 100%;
    overflow-y: scroll;
    position: relative;
  `,
};
