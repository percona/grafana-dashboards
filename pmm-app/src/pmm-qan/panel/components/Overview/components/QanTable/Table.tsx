import React, {
  FC, ReactElement, ReactNode, useCallback, useEffect, useState,
} from 'react';
import {
  Column,
  HeaderGroup,
  TableOptions,
  TableState,
  useBlockLayout,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table';
import { Spinner, useTheme } from '@grafana/ui';
import { cx } from '@emotion/css';
import useWindowSize from 'shared/components/hooks/WindowSize.hooks';
import { Scrollbar } from 'shared/components/Elements/Scrollbar/Scrollbar';
import { getStyles } from './Table.styles';
import { getAllColumnsWidth, getMainColumnWidth } from '../DefaultColumns/DefaultColumns';
import { NAVIGATION_HEIGHT } from './Table.constants';

interface TableProps {
  rowSelection?: boolean;
  onRowSelection?: (selected: any) => void;
  rowClassName?: any;
  scroll?: any;
  onRowClick?: any;
  onSortChange?: any;
  columns: Column[];
  data: object[];
  noData?: ReactNode;
  loading?: boolean;
  orderBy?: string;
  disabled?: boolean;
  rowKey?: (rec: any) => any;
  rowNumber?: (number) => ReactElement | number;
}

export const Table: FC<TableProps> = ({
  columns,
  onRowSelection,
  onSortChange,
  scroll,
  rowClassName,
  onRowClick,
  rowNumber,
  orderBy,
  data,
  noData,
  loading,
  disabled,
}) => {
  useWindowSize();

  const changeMainColumnWidth = useCallback(() => {
    setTimeout(() => {
      const width = getMainColumnWidth(columns.length);
      const allColumnsWidth = getAllColumnsWidth(width, columns.length);

      document.querySelectorAll('.table-body .tr>div:nth-child(2)').forEach((element) => {
        (element as HTMLElement).style['min-width'] = `${width}px`;
      });
      document.querySelectorAll('.table-body .tr').forEach((element) => {
        (element as HTMLElement).style['min-width'] = `${allColumnsWidth}px`;
      });
    }, 150);
  }, [columns]);

  useEffect(changeMainColumnWidth);

  const theme = useTheme();
  const styles = getStyles(theme);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state,
  }: any = useTable(
    {
      columns,
      data,
      manualSortBy: true,
      disableSortRemove: true,
      initialState: {
        sortBy: orderBy ? [{ id: orderBy.replace('-', ''), desc: !orderBy.startsWith('-') }] : [],
      } as TableState,
    } as TableOptions<any>,
    useSortBy,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: 'number',
          width: 40,
          sortable: false,
          HeaderAccessor: () => (
            <div data-testid="row-number-header" className={styles.rowNumberCell}>
              #
            </div>
          ),
          Cell: ({ row }: { row: any }) => (
            <div data-testid="row-number-cell" className={styles.rowNumberCell}>
              {rowNumber ? rowNumber(row.index) : row.index}
            </div>
          ),
        },
        ...columns,
      ]);
    },
    useBlockLayout,
  );

  useEffect(() => {
    if (onRowSelection) {
      onRowSelection(selectedFlatRows);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFlatRows]);

  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);

      return;
    }

    onSortChange((state as any).sortBy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [(state as any).sortBy]);

  const RenderHeader = ({ headers, getHeaderGroupProps }: HeaderGroup) => (
    <div {...getHeaderGroupProps()} className={cx('tr', styles.headerRow)}>
      {headers.map((column: any, index) => {
        const { HeaderAccessor } = column;

        column.Header = () => HeaderAccessor();
        let sorted = '';

        if (column.isSorted) {
          if (column.isSortedDesc) {
            sorted = 'desc';
          } else {
            sorted = 'asc';
          }
        }

        return (
          <div {...column.getHeaderProps()} className={cx('th', { [styles.rowNumberCell]: index === 0 })}>
            <div className={styles.headerContent}>
              <div className="header-wrapper">{column.render('Header')}</div>
              {column.sortable ? (
                <a className={styles.sortBy} {...column.getSortByToggleProps()} data-testid="sort-by-control">
                  <span className={`sort-by ${sorted}`} />
                </a>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );

  const RenderRow = useCallback(
    ({ index, style }) => {
      const row = rows[index];

      prepareRow(row);

      return (
        <div
          {...row.getRowProps({
            style,
          })}
          className={cx('tr', `tr-${row.index}`, rowClassName(row.original, row.index))}
          onClick={() => {
            const selectedColumn = document.querySelector(`.tr-${row.index}`);
            const tableBody = document.querySelector('.table-wrapper .table-body');

            if (selectedColumn && tableBody) {
              setTimeout(() => {
                tableBody.scroll(0, (selectedColumn as HTMLElement).offsetTop - 55);
              });
            }

            onRowClick(row);
          }}
        >
          {row.cells.map((cell) => (
            <div {...cell.getCellProps()} className={cx('td', styles.tableCell)}>
              {cell.render('Cell')}
            </div>
          ))}
        </div>
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [prepareRow, rows, rowClassName],
  );

  return (
    <div>
      <div className={cx(styles.table, { [styles.tableDisabled]: disabled })}>
        <div className={styles.tableWrap(scroll)}>
          {loading ? (
            <div data-testid="table-loading" className={styles.empty(scroll.y)}>
              <Spinner />
            </div>
          ) : null}
          {!loading ? (
            <div {...getTableProps()} className="table">
              <div
                {...getTableBodyProps()}
                className={cx('table-body')}
                style={{ height: scroll.y - NAVIGATION_HEIGHT }}
              >
                <Scrollbar forceVisible="x" style={{ maxHeight: scroll.y - NAVIGATION_HEIGHT }}>
                  {headerGroups.map(RenderHeader)}
                  {!!rows.length && rows.map(RenderRow)}
                  {!rows.length && (
                    <div data-testid="table-no-data" className={styles.empty(scroll.y)}>
                      {noData || <h1>No data</h1>}
                    </div>
                  )}
                </Scrollbar>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
