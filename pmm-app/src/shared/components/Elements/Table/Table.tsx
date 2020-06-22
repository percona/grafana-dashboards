// @ts-nocheck
import React, { ReactNode, FC, useEffect } from 'react';
import {
  useRowSelect, useTable, Column, useSortBy
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
  columns: Column[];
  data: object[];
  noData?: ReactNode;
  loading?: boolean;
  rowKey?: (rec: any) => any;
}

const TableCheckbox = (props) => (
  <label className="checkbox-container checkbox-container--main no-gap">
    <input type="checkbox" {...props} indeterminate="false" />
    <span className="checkbox-container__checkmark" />
  </label>
);

export const Table: FC<TableProps> = ({
  columns,
  rowSelection = false,
  onRowSelection,
  scroll,
  rowClassName,
  onRowClick,
  data,
  noData,
  loading,
  rowKey,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const {
    // @ts-ignore
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data,
      manualSortBy: true,
    },
    useSortBy,
    useRowSelect,
    (hooks) => {
      if (rowSelection) {
        hooks.visibleColumns.push((columns) => [
          {
            id: 'selection',
            Header: ({ getToggleAllRowsSelectedProps }: any) => (
              <div data-qa="select-all">
                <TableCheckbox {...getToggleAllRowsSelectedProps()} />
              </div>
            ),
            Cell: ({ row }: { row: any }) => (
              <div data-qa="select-row">
                <TableCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns,
        ]);
      }
    }
  );

  useEffect(() => {
    if (onRowSelection) {
      onRowSelection(selectedFlatRows);
    }
  }, [selectedFlatRows]);

  return (
    <div className={styles.table}>
      <div className={styles.tableWrap(scroll)}>
        {loading ? (
          <div data-qa="table-loading" className={styles.empty}>
            <Spinner />
          </div>
        ) : null}
        {!rows.length && !loading ? (
          <div data-qa="table-no-data" className={styles.empty}>
            {noData || <h1>No data</h1>}
          </div>
        ) : null}
        {rows.length && !loading ? (
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup, i) => (
                <tr data-qa="table-header" {...headerGroup.getHeaderGroupProps()} key={i}>
                  {headerGroup.headers.map((column, index) => {
                    const { HeaderAccessor } = column;

                    column.Header = () => HeaderAccessor();

                    return (
                      <th
                        {...column.getHeaderProps()}
                        className={cx(
                          styles.header(column.width),
                          index === 0 && rowSelection ? styles.checkboxColumn : ''
                        )}
                        key={index}
                        {...column.getSortByToggleProps()}
                      >
                        <div className={styles.headerContent}>
                          <div style={{ width: '80%' }}>{column.render('Header')}</div>
                          <span style={{ display: 'flex', flexDirection: 'column' }}>
                            {/* eslint-disable-next-line no-nested-ternary */}
                            {column.isSorted ? (
                              column.isSortedDesc ? (
                                '🔽'
                              ) : (
                                ' 🔼'
                              )
                            ) : (
                              <>
                                {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
                                <span>🔼</span>
                                {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
                                <span>🔽</span>
                              </>
                            )}
                          </span>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, i) => {
                prepareRow(row);

                return (
                  <tr
                    data-qa="table-row"
                    className={rowClassName(row.original, row.index)}
                    {...row.getRowProps()}
                    key={rowKey ? rowKey(row) : i}
                    onClick={() => onRowClick(row)}
                  >
                    {row.cells.map((cell, index) => (
                      // eslint-disable-next-line react/jsx-key
                      <td
                        {...cell.getCellProps()}
                        className={index === 0 && rowSelection ? styles.checkboxColumn : ''}
                        key={index}
                      >
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : null}
      </div>
    </div>
  );
};
