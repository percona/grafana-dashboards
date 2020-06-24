// @ts-nocheck
import React, { FC, ReactNode, useEffect } from 'react';
import {
  Column, useBlockLayout, useRowSelect, useSortBy, useTable
} from 'react-table';
import { Spinner, useTheme } from '@grafana/ui';
import { FixedSizeList } from 'react-window';
import { getStyles } from './Table.styles';

// const Styles = styled.div`
//   padding: 1rem;
//
//   .table {
//     display: inline-block;
//     border-spacing: 0;
//     border: 1px solid black;
//
//     .tr {
//       :last-child {
//         .td {
//           border-bottom: 0;
//         }
//       }
//     }
//
//     .th,
//     .td {
//       margin: 0;
//       padding: 0.5rem;
//       border-bottom: 1px solid black;
//       border-right: 1px solid black;
//
//       :last-child {
//         border-right: 0;
//       }
//     }
//   }
// `;

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
  // rowClassName,
  // onRowClick,
  data,
  noData,
  loading,
  // rowKey,
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
    totalColumnsWidth,
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
    },
    useBlockLayout
  );

  useEffect(() => {
    if (onRowSelection) {
      onRowSelection(selectedFlatRows);
    }
  }, [selectedFlatRows]);

  const RenderRow = React.useCallback(
    ({ index, style }) => {
      const row = rows[index];

      prepareRow(row);

      return (
        <div
          {...row.getRowProps({
            style,
          })}
          className="tr"
        >
          {row.cells.map((cell) => (
            <div {...cell.getCellProps()} className="td">
              {cell.render('Cell')}
            </div>
          ))}
        </div>
      );
    },
    [prepareRow, rows]
  );

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
          <div {...getTableProps()} className="table">
            <div>
              {headerGroups.map((headerGroup) => (
                <div {...headerGroup.getHeaderGroupProps()} className="tr">
                  {headerGroup.headers.map((column) => (
                    <div {...column.getHeaderProps()} className="th">
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
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div {...getTableBodyProps()}>
              <FixedSizeList height={400} itemCount={rows.length} itemSize={35} width={totalColumnsWidth}>
                {RenderRow}
              </FixedSizeList>
            </div>
          </div>
        ) // <div {...getTableProps()} className={'table'}>
        //   <thead>
        //     {headerGroups.map((headerGroup, i) => (
        //       <tr data-qa="table-header" {...headerGroup.getHeaderGroupProps()} key={i}>
        //         {headerGroup.headers.map((column, index) => {
        //           const { HeaderAccessor } = column;
        //
        //           column.Header = () => HeaderAccessor();
        //
        //           return (
        //             <th
        //               {...column.getHeaderProps()}
        //               className={cx(
        //                 styles.header(column.width),
        //                 index === 0 && rowSelection ? styles.checkboxColumn : ''
        //               )}
        //               key={index}
        //               {...column.getSortByToggleProps()}
        //             >
        //               <div className={styles.headerContent}>
        //                 <div style={{ width: '80%' }}>{column.render('Header')}</div>
        //                 <span style={{ display: 'flex', flexDirection: 'column' }}>
        //                   {/* eslint-disable-next-line no-nested-ternary */}
        //                   {column.isSorted ? (
        //                     column.isSortedDesc ? (
        //                       '🔽'
        //                     ) : (
        //                       ' 🔼'
        //                     )
        //                   ) : (
        //                     <>
        //                       {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
        //                       <span>🔼</span>
        //                       {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
        //                       <span>🔽</span>
        //                     </>
        //                   )}
        //                 </span>
        //               </div>
        //             </th>
        //           );
        //         })}
        //       </tr>
        //     ))}
        //   </thead>
        //   <div {...getTableBodyProps()}>
        //     <FixedSizeList height={400} itemCount={rows.length} itemSize={35} width={totalColumnsWidth}>
        //       {RenderRow}
        //     </FixedSizeList>
        //     {/*{rows.map((row, i) => {*/}
        //     {/*  prepareRow(row);*/}
        //
        //     {/*  return (*/}
        //     {/*    <tr*/}
        //     {/*      data-qa="table-row"*/}
        //     {/*      className={rowClassName(row.original, row.index)}*/}
        //     {/*      {...row.getRowProps()}*/}
        //     {/*      key={rowKey ? rowKey(row) : i}*/}
        //     {/*      onClick={() => onRowClick(row)}*/}
        //     {/*    >*/}
        //     {/*      {row.cells.map((cell, index) => (*/}
        //     {/*        // eslint-disable-next-line react/jsx-key*/}
        //     {/*        <td*/}
        //     {/*          {...cell.getCellProps()}*/}
        //     {/*          className={index === 0 && rowSelection ? styles.checkboxColumn : ''}*/}
        //     {/*          key={index}*/}
        //     {/*        >*/}
        //     {/*          {cell.render('Cell')}*/}
        //     {/*        </td>*/}
        //     {/*      ))}*/}
        //     {/*    </tr>*/}
        //     {/*  );*/}
        //     {/*})}*/}
        //   </div>
        // </div>
          : null}
      </div>
    </div>
  );
};
