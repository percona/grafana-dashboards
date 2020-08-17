import { css } from 'emotion';

export const styles = {
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
