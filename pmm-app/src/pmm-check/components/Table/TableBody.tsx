import React, { FC } from 'react';
import { ActiveCheck } from 'pmm-check/types';
import { Failed } from '../Failed/Failed';
import { Details } from '../Details/Details';

interface TableBodyProps {
  data: ActiveCheck[];
}

export const TableBody: FC<TableBodyProps> = ({ data }) => (
  <tbody>
    {data.map((row) => {
      const {
        key, name, failed, details,
      } = row;

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
