// @ts-nocheck

import React from 'react';
import { useRowSelect, useTable } from 'react-table';
import { classNameTable } from './Table.styles';

function Table({ columns, data, ActionPanel }) {
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
            // The header can use the table's getToggleAllRowsSelectedProps method
            // to render a checkbox
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <div>
                <label className="checkbox-container checkbox-container--main">
                  <input type="checkbox" {...getToggleAllRowsSelectedProps()} />
                  <span className="checkbox-container__checkmark"></span>
                </label>
                {/*<IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />*/}
              </div>
            ),
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            Cell: propsData => {
              return (
                <div>
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
      {ActionPanel ? <ActionPanel selected={selectedFlatRows} /> : null}
      <div className="tableWrap">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.slice(0, 10).map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
