import React, { ReactNode, FC, useEffect } from 'react';
import { useRowSelect, useTable, Column } from 'react-table';
import { Spinner, useTheme } from '@grafana/ui';
import { getStyles } from './Table.styles';

interface TableProps {
  rowSelection?: boolean;
  onRowSelection?: (selected: any) => void;
  columns: Column[];
  data: object[];
  noData?: ReactNode;
  loading?: boolean;
  rowKey?: (rec: any) => any;
}

const TableCheckbox = props => {
  return (
    <label className="checkbox-container checkbox-container--main no-gap">
      <input type="checkbox" {...props} indeterminate="false" />
      <span className="checkbox-container__checkmark"></span>
    </label>
  );
};

export const Table: FC<TableProps> = ({
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
  // @ts-ignore
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, selectedFlatRows } = useTable(
    {
      columns,
      data,
    },
    useRowSelect,
    hooks => {
      if (rowSelection) {
        hooks.visibleColumns.push(columns => [
          {
            id: 'selection',
            Header: ({ getToggleAllRowsSelectedProps }: any) => (
              <div data-qa="select-all">
                <TableCheckbox {...getToggleAllRowsSelectedProps()} />
              </div>
            ),
            Cell: ({ row }: { row: any }) => {
              return (
                <div data-qa="select-row">
                  <TableCheckbox {...row.getToggleRowSelectedProps()} />
                </div>
              );
            },
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
      <div className={styles.tableWrap}>
        {loading ? (
          <div data-qa="table-loading" className={styles.empty}>
            <Spinner />
          </div>
        ) : null}
        {!rows.length && !loading ? (
          <div data-qa="table-no-data" className={styles.empty}>
            {noData ? noData : <h1>No data</h1>}
          </div>
        ) : null}
        {rows.length && !loading ? (
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup, i) => (
                <tr data-qa="table-header" {...headerGroup.getHeaderGroupProps()} key={i}>
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
                  <tr data-qa="table-row" {...row.getRowProps()} key={rowKey ? rowKey(row) : i}>
                    {row.cells.map((cell, index) => {
                      return (
                        // eslint-disable-next-line react/jsx-key
                        <td
                          {...cell.getCellProps()}
                          className={index === 0 && rowSelection ? styles.checkboxColumn : ''}
                          key={index}
                        >
                          {cell.render('Cell')}
                        </td>
                      );
                    })}
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
