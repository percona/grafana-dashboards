// @ts-nocheck

import React from 'react';
import { useRowSelect, useTable } from 'react-table';
import { classNameTable, empty } from './Table.styles';

function Table({ columns, data, ActionPanel, noData }) {
  // Use the state and functions returned from useTable to build your UI
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
                <label className="checkbox-container checkbox-container--main">
                  <input type="checkbox" {...getToggleAllRowsSelectedProps()} />
                  <span className="checkbox-container__checkmark"></span>
                </label>
              </div>
            ),
            Cell: propsData => {
              return (
                <div data-qa="select-row">
                  <label className="checkbox-container checkbox-container--main">
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
    <div className={classNameTable}>
      {ActionPanel && rows.length ? <ActionPanel selected={selectedFlatRows} /> : null}
      <div className="tableWrap">
        {rows.length ? (
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map(headerGroup => (
                // eslint-disable-next-line react/jsx-key
                <tr data-qa="table-header" {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()} key={column.id}>
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
                  // eslint-disable-next-line react/jsx-key
                  <tr data-qa="table-row" {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return (
                        <td {...cell.getCellProps()} key={cell.id}>
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
          <div data-qa="table-no-data" className={empty}>
            {noData ? noData : <h1>No data</h1>}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Table;
