import React, { FC } from 'react';
import { Table } from 'shared/components/Elements/Table';
import { Overlay } from 'shared/components/Elements/Overlay/Overlay';
import { Messages } from '../../../Details.messages';
import { TableProps } from '../Table.types';
import { useIndexes } from './Indexes.hooks';

export const Indexes: FC<TableProps> = ({
  tableName, databaseType, example, database,
}) => {
  const [data, indexes] = useIndexes(databaseType, example, tableName, database);

  return (
    <div>
      <Overlay isPending={indexes.loading}>
        {indexes.error ? <pre>{indexes.error}</pre> : null}
        {!indexes.error && data.rows.length ? (
          <Table columns={data.columns} data={data.rows} noData={null} />
        ) : null}
        {!indexes.error && !data.rows.length ? <pre>{Messages.noDataFound}</pre> : null}
      </Overlay>
    </div>
  );
};
