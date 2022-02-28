import React, { FC } from 'react';
import { Overlay } from 'shared/components/Elements/Overlay/Overlay';
import { Highlight } from 'shared/components/Hightlight/Highlight';
import { TableProps } from '../Table.types';
import { useShowCreateTable } from './TableCreate.hooks';

export const TableCreate: FC<TableProps> = ({
  tableName, databaseType, example, database,
}) => {
  const [showCreateTable] = useShowCreateTable(databaseType, example, tableName, database);

  return (
    <Overlay isPending={showCreateTable.loading}>
      {showCreateTable.error ? <pre>{showCreateTable.error}</pre> : null}
      {!showCreateTable.error ? <Highlight language="sql">{showCreateTable.value}</Highlight> : null}
    </Overlay>
  );
};
