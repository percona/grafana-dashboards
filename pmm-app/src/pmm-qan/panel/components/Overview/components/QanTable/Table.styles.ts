import { css } from '@emotion/css';
import { GrafanaTheme } from '@grafana/data';
import { stylesFactory } from '@grafana/ui';
import { getPmmTheme } from 'shared/components/helpers/getPmmTheme';

export const getStyles = stylesFactory((theme: GrafanaTheme) => {
  const parameters = getPmmTheme(theme);

  const selectedRowColor = theme.isLight ? 'deepskyblue' : '#234682';

  return {
    tableWrap: (size) => css`
      display: block;
      max-width: ${size.x ? `${size.x}px` : '100%'};
      max-height: ${size.y ? `${size.y}px` : 'auto'};
      border: 1px solid ${parameters.table.borderColor};
    `,
    table: css`
      /* This is required to make the table full-width */
      display: block;
      max-width: 100%;
      border-collapse: separate; /* Don't collapse */
      border-spacing: 0;

      .simplebar-mask {
        margin-right: -21px !important;
      }

      .table {
        /* Make sure the inner table is always as wide as needed */
        width: 100%;
        border-spacing: 0;

        .selected-overview-row {
          .td {
            background-color: ${selectedRowColor};
          }
        }
        .tr {
          cursor: pointer;
          border-right: 21px solid transparent;
          box-sizing: content-box !important;
        }
        .th,
        .td {
          background-color: ${parameters.table.backgroundColor};
          margin: 0;
          padding: 3px;
          border-bottom: 1px solid ${parameters.table.borderColor};
          border-right: 1px solid ${parameters.table.borderColor};
          color: ${parameters.table.textColor};
          display: flex;
          justify-content: space-between;

          :last-child {
            border-right: 0;
          }
        }

        .th {
          background-color: ${parameters.table.headerBackground};
          position: -webkit-sticky; /* for Safari */
          position: sticky;
          top: 0;
          z-index: 2;
        }
      }

      .tr .td:first-child {
        position: -webkit-sticky; /* for Safari */
        position: sticky;
        left: 0;
        z-index: 1;
      }

      .tr .td:nth-child(2) {
        position: -webkit-sticky; /* for Safari */
        position: sticky;
        left: 40px;
        z-index: 1;
      }
      .th:first-child {
        display: flex !important;
        justify-content: center !important;
        left: 0;
        z-index: 3;
      }
      .th:nth-child(2) {
        position: -webkit-sticky; /* for Safari */
        position: sticky;
        left: 40px;
        z-index: 3;
      }
      .pagination {
        padding: 0.5rem;
      }
    `,
    empty: (height) => css`
      display: flex;
      width: 100%;
      height: ${height - 70}px;
      justify-content: center;
      align-items: center;
      border: 1px solid ${parameters.table.borderColor};
    `,
    checkboxColumn: css`
      width: 20px;
    `,
    header: (width) => css`
      min-width: ${width}px;
      max-width: ${width}px;
    `,
    headerContent: css`
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      .header-wrapper {
        width: 100%;
      }
    `,
    tableWrapper: css`
      scroll: auto;
    `,
    sortBy: css`
      display: flex;
      flex-direction: column;
      padding: 10px;

      .sort-by:before,
      .sort-by:after {
        border: 6px solid transparent;
        content: '';
        display: block;
        height: 0;
        right: 13px;
        top: 50%;
        position: absolute;
        width: 0;
      }
      .sort-by:before {
        border-bottom-color: gray;
        margin-top: -13px;
      }
      .sort-by:after {
        border-top-color: gray;
        margin-top: 1px;
      }
      .sort-by.asc:after {
        border-top-color: deepskyblue;
      }

      .sort-by.desc:before {
        border-bottom-color: deepskyblue;
      }
    `,
    headerRow: css`
      position: sticky;
      top: 0;
      z-index: 999;
    `,
    tableCell: css`
      display: flex !important;
      justify-content: flex-end !important;
      flex-direction: row !important;
      align-items: center !important;
      padding-right: 8px !important;
    `,
    rowNumberCell: css`
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
    `,
    tableDisabled: css`
      opacity: 0.6;
      pointer-events: none;
    `,
  };
});
