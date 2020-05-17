import { css } from 'emotion';

export const Styling = {
  overviewHeader: css`
    display: flex;
    align-items: baseline;
    padding: 5px 0px;
    height: 50px;
    padding-top: 15px;
  `,
  overviewTitle: css`
    margin: 3px;
    margin-right: 40px;
    color: rgba(255, 255, 255, 0.8);
  `,
  splitterWrapper: css`
    height: 800px;
  `,
  paginationWrapper: css`
    display: flex;
    // margin-left: auto;
    align-items: center;
  `,
  showTotal: css`
    color: rgba(255, 255, 255, 0.8);
  `,
  manageColumnsWrapper: css`
    margin-left: auto;
  `,
  tableWrapper: css`
    min-height: 1000px;
  `,
  getContainerWrapper: size => css`
    width: ${(size || 1500) - 260}px;
    height: 100%;
    overflow-y: scroll;
    position: relative;
  `,
};
