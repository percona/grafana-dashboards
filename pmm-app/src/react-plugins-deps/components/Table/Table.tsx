// @ts-nocheck

import React, { FC, ReactElement } from 'react';
import { useRowSelect, useTable } from 'react-table';
import { Spinner, useTheme } from '@grafana/ui';
import { getStyles } from './Table.styles';

interface TableInterface {
  columns: object[];
  data: object[];
  noData?: ReactElement;
  ActionPanel?: FC<{ selected: any[] }>;
  loading?: boolean;
  rowKey?: Function;
}
function Table({ columns, data, ActionPanel, noData, loading, rowKey }: TableInterface) {
  // Use the state and functions returned from useTable to build your UI
  const theme = useTheme();
  const Styling = getStyles(theme);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state: { selectedRowIds },
  } = useTable(
    {
      columns,
      data,
    },
    useRowSelect,
    hooks => {
      if (ActionPanel) {
        hooks.visibleColumns.push(columns => [
          {
            id: 'selection',
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <div data-qa="select-all">
                <label className="checkbox-container checkbox-container--main no-gap">
                  <input type="checkbox" {...getToggleAllRowsSelectedProps()} />
                  <span className="checkbox-container__checkmark"></span>
                </label>
              </div>
            ),
            Cell: propsData => {
              return (
                <div data-qa="select-row">
                  <label className="checkbox-container checkbox-container--main no-gap">
                    <input type="checkbox" {...propsData.row.getToggleRowSelectedProps()} />
                    <span className="checkbox-container__checkmark"></span>
                  </label>
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
    <div className={Styling.table}>
      {loading && <Spinner />}
      {ActionPanel && rows.length ? <ActionPanel selected={selectedFlatRows} /> : null}
      <div className="tableWrap">
        {rows.length ? (
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map(headerGroup => (
                // eslint-disable-next-line react/jsx-key
                <tr data-qa="table-header" {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, index) => (
                    <th
                      {...column.getHeaderProps()}
                      key={column.id}
                      style={index === 0 && ActionPanel ? { width: '20px' } : {}}
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
                        <td
                          {...cell.getCellProps()}
                          key={cell.id}
                          style={index === 0 && ActionPanel ? { width: '20px' } : {}}
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
        {!rows.length ? (
          <div data-qa="table-no-data" className={Styling.empty}>
            {noData ? noData : <h1>No data</h1>}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Table;
