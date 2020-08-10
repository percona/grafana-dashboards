import { css } from 'emotion';

export const styles = {
  getFiltersWrapper: (height) => css`
    border: 1px solid rgb(40, 40, 40);
    overflow-y: scroll;
    height: ${height}px !important;
  `,
  filtersContentArea: css`
    padding: 5px 16px !important;
  `,
  filtersField: css`
    width: 100%;
    border: 1px solid rgba(255, 255, 255, 0.8) !important;
  `,
  filtersHeader: css`
    display: flex;
    align-items: baseline;
    padding: 5px 0px !important;
    height: 50px !important;
    padding-top: 15px !important;
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
    // margin-right: 15px;
    color: rgba(255, 255, 255, 0.8) !important;
  `,
  resetButton: css`
    padding: 0 !important;
    height: auto;
    // margin-left: auto !important;
  `,
};
