import React, { FC } from 'react';
import { Failed } from '../Failed/Failed';
import { Details } from '../Details/Details';
import { ActiveCheck } from 'pmm-check/types';

interface TableBodyProps {
  data: ActiveCheck[];
}

export const TableBody: FC<TableBodyProps> = ({ data }) => {
  return (
    <tbody>
      {data.map(row => {
        const { key, name, failed, details } = row;
        return (
          <tr key={key}>
            <td>{name}</td>
            <td>
              <Failed failed={failed} />
            </td>
            <td>
              <Details details={details} />
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};
