import React, { FC } from 'react';
import { ActiveCheck, Severity } from 'pmm-check/types';
import { Failed } from '../Failed/Failed';
import { Details } from '../Details/Details';
import { Severities } from '../Severities/Severities';


interface TableBodyProps {
  data: ActiveCheck[];
}

export const TableBody: FC<TableBodyProps> = ({ data }) => (
  <tbody>
    {data.map((row) => {
      const {
        key, name, failed, details
      } = row;

      const severities = details.map((detail) => detail.labels.severity as Severity);

      return (
        <tr key={key}>
          <td>{name}</td>
          <td>
            <Failed failed={failed} />
          </td>
          <td style={{ padding: 0 }}>
            <Severities severities={severities} />
          </td>
          <td style={{ padding: 0 }}>
            <Details details={details} />
          </td>
        </tr>
      );
    })}
  </tbody>
);
