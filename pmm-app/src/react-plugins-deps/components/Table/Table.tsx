import React, { ReactNode, FC, useEffect } from 'react';
import { useRowSelect, useTable } from 'react-table';
import { Spinner, useTheme } from '@grafana/ui';
import { getStyles } from './Table.styles';

interface RowSelection {
  onChange?: (selected: any) => void;
}
interface TableProps {
  rowSelection?: RowSelection;
  columns: object[];
  data: object[];
  noData?: ReactNode;
  actionPanel?: (selected: any[]) => ReactNode;
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

export const Table: FC<TableProps> = ({ columns, rowSelection = {}, data, noData, loading, rowKey }) => {
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
      if (rowSelection.onChange) {
        hooks.visibleColumns.push(columns => [
          {
            id: 'selection',
            Header: props => (
              <div data-qa="select-all">
                {/*
                  // @ts-ignore */}
                <TableCheckbox {...props.getToggleAllRowsSelectedProps()} />
              </div>
            ),
            Cell: ({ row }) => {
              return (
                <div data-qa="select-row">
                  {/*
                  // @ts-ignore */}
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
    if (rowSelection.onChange) {
      rowSelection.onChange(selectedFlatRows);
    }
  }, [selectedFlatRows]);
  // Render the UI for your table
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
              {headerGroups.map(headerGroup => (
                // eslint-disable-next-line react/jsx-key
                <tr data-qa="table-header" {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, index) => (
                    // eslint-disable-next-line react/jsx-key
                    <th
                      {...column.getHeaderProps()}
                      className={index === 0 && rowSelection.onChange ? styles.checkboxColumn : ''}
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
                          className={index === 0 && rowSelection.onChange ? styles.checkboxColumn : ''}
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
