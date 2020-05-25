import React, { ReactElement } from 'react';
import { useRowSelect, useTable } from 'react-table';
import { Spinner, useTheme } from '@grafana/ui';
import { getStyles } from './Table.styles';

interface TableProps {
  columns: object[];
  data: object[];
  noData?: ReactElement;
  actionPanel?: (selected: any[]) => ReactElement;
  loading?: boolean;
  rowKey?: (rec: any) => any;
}

const TableCheckbox = props => {
  return (
    <label className="checkbox-container checkbox-container--main no-gap">
      <input type="checkbox" {...props} />
      <span className="checkbox-container__checkmark"></span>
    </label>
  );
};

function Table({ columns, data, actionPanel, noData, loading, rowKey }: TableProps) {
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
      if (actionPanel) {
        // @ts-ignore
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
              // @ts-ignore
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

  // Render the UI for your table
  return (
    <div className={styles.table}>
      {actionPanel && rows.length ? actionPanel(selectedFlatRows) : null}
      <div className="tableWrap">
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
                      style={index === 0 && actionPanel ? { width: '20px' } : {}}
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
                          style={index === 0 && actionPanel ? { width: '20px' } : {}}
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
}

export default Table;
