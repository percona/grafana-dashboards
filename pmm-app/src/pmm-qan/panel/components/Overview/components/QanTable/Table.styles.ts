import { css } from 'emotion';
import { GrafanaTheme } from '@grafana/data';
import { selectThemeVariant, stylesFactory } from '@grafana/ui';

export const getStyles = stylesFactory((theme: GrafanaTheme) => {
  const backgroundColor = selectThemeVariant({ light: 'rgb(247, 247, 249)', dark: '#0b0c0e' }, theme.type);
  const borderColor = selectThemeVariant(
    { light: (theme.colors as any).gray85, dark: '#292929' },
    theme.type
  );
  const headerBackground = selectThemeVariant({ light: 'rgb(247, 247, 249)', dark: '#202226' }, theme.type);
  const textColor = selectThemeVariant(
    { light: (theme.colors as any).gray85, dark: 'rgba(255, 255, 255, 0.8)' },
    theme.type
  );

  return {
    /* This will make the table scrollable when it gets too small */
    tableWrap: (size) => css`
      display: block;
      max-width: ${size.x ? `${size.x}px` : '100%'};
      max-height: ${size.y ? `${size.y}px` : 'auto'};
      border: 1px solid ${borderColor};
    `,
    table: css`
      /* This is required to make the table full-width */
      display: block;
      max-width: 100%;
      border-collapse: separate; /* Don't collapse */
      border-spacing: 0;

      .table {
        /* Make sure the inner table is always as wide as needed */
        width: 100%;
        border-spacing: 0;

        .selected-overview-row {
          .td {
            background-color: #234682;
          }
        }
        .tr {
          cursor: pointer;
        }
        .th,
        .td {
          background-color: ${backgroundColor};
          margin: 0;
          padding: 3px;
          border-bottom: 1px solid ${borderColor};
          border-right: 1px solid ${borderColor};
          color: ${textColor};
          display: flex;
          justify-content: space-between;

          :last-child {
            border-right: 0;
          }
        }

        .th {
          background-color: ${headerBackground};
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
        // outline: 1px solid ${borderColor};
      }

      .tr .td:nth-child(2) {
        position: -webkit-sticky; /* for Safari */
        position: sticky;
        left: 40px;
        z-index: 1;
        // outline: 1px solid ${borderColor};
      }
      .th:first-child {
        position: -webkit-sticky; /* for Safari */
        position: sticky;
        left: 0;
        z-index: 3;
        // outline: 1px solid ${borderColor};
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
      border: 1px solid ${borderColor};
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
        width: 80%;
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
        right: 5px;
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
    tableBody: (height) => css`
      overflow: scroll;
      height: ${height - 70}px;
    `,
    tableDisabled: css`
      opacity: 0.6;
      pointer-events: none;
    `,
  };
});
