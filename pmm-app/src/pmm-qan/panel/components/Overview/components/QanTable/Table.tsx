import React, {
  FC, ReactElement, ReactNode, useEffect, useCallback
} from 'react';
import {
  Column,
  TableOptions,
  TableState,
  useBlockLayout,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table';
import { Spinner, useTheme } from '@grafana/ui';
import { cx } from 'emotion';
import { getStyles } from './Table.styles';

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
}) => {
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
            <div data-qa="row-number-header" className={styles.rowNumberCell}>
              #
            </div>
          ),
          Cell: ({ row }: { row: any }) => (
            <div data-qa="row-number-cell" className={styles.rowNumberCell}>
              {rowNumber ? rowNumber(row.index) : row.index}
            </div>
          ),
        },
        ...columns,
      ]);
    },
    useBlockLayout
  );

  useEffect(() => {
    if (onRowSelection) {
      onRowSelection(selectedFlatRows);
    }
  }, [selectedFlatRows]);

  let isFirstLoad = true;

  useEffect(() => {
    if (isFirstLoad) {
      isFirstLoad = false;

      return;
    }

    onSortChange((state as any).sortBy);
  }, [(state as any).sortBy]);

  const RenderRow = useCallback(
    ({ index, style }) => {
      const row = rows[index];

      prepareRow(row);

      return (
        <>
          {index === 0
            ? headerGroups.map((headerGroup) => (
              <div {...headerGroup.getHeaderGroupProps()} className={cx('tr', styles.headerRow)}>
                {headerGroup.headers.map((c) => {
                  const column = c as any;

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
                    <div {...column.getHeaderProps()} className="th">
                      <div className={styles.headerContent}>
                        <div className="header-wrapper">{column.render('Header')}</div>
                        {column.sortable ? (
                          <span className={styles.sortBy} {...column.getSortByToggleProps()}>
                            <span className={`sort-by ${sorted}`} />
                          </span>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))
            : null}
          <div
            {...row.getRowProps({
              style,
            })}
            className={cx('tr', rowClassName(row.original, row.index))}
            onClick={() => onRowClick(row)}
          >
            {row.cells.map((cell) => (
              <div {...cell.getCellProps()} className={cx('td', styles.tableCell)}>
                {cell.render('Cell')}
              </div>
            ))}
          </div>
        </>
      );
    },
    [prepareRow, rows, rowClassName]
  );

  return (
    <div>
      <div className={styles.table}>
        <div className={styles.tableWrap(scroll)}>
          {loading ? (
            <div data-qa="table-loading" className={styles.empty(scroll.y)}>
              <Spinner />
            </div>
          ) : null}
          {!rows.length && !loading ? (
            <div data-qa="table-no-data" className={styles.empty(scroll.y)}>
              {noData || <h1>No data</h1>}
            </div>
          ) : null}
          {rows.length && !loading ? (
            <div {...getTableProps()} className="table">
              <div {...getTableBodyProps()} className={styles.tableBody(scroll.y)}>
                {rows.map(RenderRow)}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
