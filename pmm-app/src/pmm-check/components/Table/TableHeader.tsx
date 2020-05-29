import React, { FC } from 'react';
import { Column } from 'pmm-check/types';

interface TableHeaderProps {
  columns: Column[];
}

export const TableHeader: FC<TableHeaderProps> = ({ columns }) => {
  const widths = columns.map((col) => col.width);
  const titles = columns.map((col) => col.title);

  return (
    <>
      <colgroup>
        {widths.map((width, key) => (
          // eslint-disable-next-line react/no-array-index-key
          <col key={key} style={width ? { width: `${width}px`, minWidth: `${width}px` } : {}} />
        ))}
      </colgroup>
      <thead>
        <tr>
          {titles.map((title, key) => (
            // eslint-disable-next-line react/no-array-index-key
            <th key={key}>{title}</th>
          ))}
        </tr>
      </thead>
    </>
  );
};
