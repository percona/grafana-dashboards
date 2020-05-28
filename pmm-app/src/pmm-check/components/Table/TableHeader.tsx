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
        {widths.map((width, key) => (width ? (
            <col key={key} style={{ width: `${width}px`, minWidth: `${width}px` }} />
          ) : (
            <col key={key} />
          )
        )}
      </colgroup>
      <thead>
        <tr>
          {titles.map((title, key) => (
            <th key={key}>{title}</th>
          ))}
        </tr>
      </thead>
    </>
  );
};
