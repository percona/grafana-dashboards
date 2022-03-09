import React, { FC, useEffect } from 'react';
import { useRowSelect, useTable } from 'react-table';
import { Spinner, useTheme } from '@grafana/ui';
import { cx } from '@emotion/css';
import { getCheckboxStyles } from 'shared/components/Form/Checkbox/Checkbox.styles';
import { getStyles } from './Table.styles';
import { TableCheckboxProps, TableProps } from './Table.types';

const TableCheckbox = (props: TableCheckboxProps) => {
  const theme = useTheme();
  const styles = getCheckboxStyles(theme);
  const {
    checked, onChange, style, title,
  } = props;

  return (
    <label className={cx(styles.checkboxContainer, 'checkbox-container--main', 'no-gap')}>
      <input type="checkbox" checked={checked} onChange={onChange} style={style} title={title} />
      <span className="checkbox-container__checkmark" />
    </label>
  );
};

export const Table: FC<TableProps> = ({
  className,
  columns,
  rowSelection = false,
  onRowSelection,
  data,
  noData,
  loading,
  rowKey,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const {
    // @ts-ignore
    getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, selectedFlatRows,
  } = useTable(
    {
      columns,
      data,
    },
    useRowSelect,
    (hooks) => {
      if (rowSelection) {
        hooks.visibleColumns.push((columns) => [
          {
            id: 'selection',
            Header: ({ getToggleAllRowsSelectedProps }: any) => (
              <div data-testid="select-all">
                <TableCheckbox {...getToggleAllRowsSelectedProps()} />
              </div>
            ),
            Cell: ({ row }: { row: any }) => (
              <div data-testid="select-row">
                <TableCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns,
        ]);
      }
    },
  );

  useEffect(() => {
    if (onRowSelection) {
      onRowSelection(selectedFlatRows);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFlatRows]);

  return (
    <div className={cx(styles.table, className)}>
      <div className={styles.tableWrap}>
        {loading ? (
          <div data-testid="table-loading" className={styles.empty}>
            <Spinner />
          </div>
        ) : null}
        {!rows.length && !loading ? (
          <div data-testid="table-no-data" className={styles.empty}>
            {noData || <h1>No data</h1>}
          </div>
        ) : null}
        {rows.length && !loading ? (
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup, i) => (
                <tr data-testid="table-header" {...headerGroup.getHeaderGroupProps()} key={i}>
                  {headerGroup.headers.map((column, index) => (
                    <th
                      {...column.getHeaderProps()}
                      className={index === 0 && rowSelection ? styles.checkboxColumn : ''}
                      key={index}
                    >
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, i) => {
                prepareRow(row);

                return (
                  <tr data-testid="table-row" {...row.getRowProps()} key={rowKey ? rowKey(row) : i}>
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
