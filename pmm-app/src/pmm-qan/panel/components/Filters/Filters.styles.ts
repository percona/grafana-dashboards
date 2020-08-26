import { css } from 'emotion';

export const styles = {
  getFiltersWrapper: (height) => css`
    border: 1px solid rgb(40, 40, 40);
    height: ${height}px;
    padding: 10px 16px !important;
  `,
  filtersField: css`
    width: 100%;
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
    color: rgba(255, 255, 255, 0.8) !important;
  `,
  resetButton: css`
    padding: 0 !important;
    height: auto;
  `,
};
