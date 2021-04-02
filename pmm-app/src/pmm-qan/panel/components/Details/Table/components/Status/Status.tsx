import React, { FC } from 'react';
import { Table } from 'shared/components/Elements/Table';
import { Overlay } from 'shared/components/Elements/Overlay/Overlay';
import { Messages } from '../../../Details.messages';
import { TableProps } from '../Table.types';
import { useTableStatus } from './Status.hooks';

export const Status: FC<TableProps> = ({
  tableName, databaseType, example, database,
}) => {
  const [data, status] = useTableStatus(databaseType, example, tableName, database);

  return (
    <div>
      <Overlay isPending={status.loading}>
        {status.error ? <pre>{status.error}</pre> : null}
        {!status.error && data.rows.length ? (
          <Table columns={data.columns} data={data.rows} noData={null} />
        ) : null}
        {!status.error && !data.rows.length ? <pre>{Messages.noDataFound}</pre> : null}
      </Overlay>
    </div>
  );
};
