import React, {
  FC, useCallback, useEffect, useState
} from 'react';
import Highlight from 'react-highlight.js';
import { Overlay } from 'shared/components/Elements/Overlay/Overlay';
import { useActionResult } from 'shared/components/Actions/Actions.hooks';
import { ActionResult } from 'shared/components/Actions/Actions.types';
import { Databases } from '../../../Details.types';
import { mysqlMethods, postgresqlMethods } from '../../../database-models';
import { TableProps } from '../Table.types';

export const TableCreate: FC<TableProps> = ({
  tableName,
  databaseType,
  example
}) => {
  const [showCreateTable, setShowCreateTable] = useState<ActionResult>({
    error: '',
    loading: true,
    value: null,
  });

  const getDatabase = useCallback(async () => {
    let id;

    if (databaseType === Databases.postgresql) {
      id = await postgresqlMethods.getShowCreateTables({ example, tableName });
    } else if (databaseType === Databases.mysql) {
      id = await mysqlMethods.getShowCreateTables({ example, tableName });
    }

    const result = await useActionResult(id);

    setShowCreateTable(result);
  }, [databaseType]);

  useEffect(() => {
    getDatabase();
  }, [databaseType]);

  return (
    <Overlay isPending={showCreateTable.loading}>
      {showCreateTable.error ? <pre>{showCreateTable.error}</pre> : null}
      {!showCreateTable.error ? (
        <Highlight language="sql">{showCreateTable.value}</Highlight>
      ) : null}
    </Overlay>
  );
};
