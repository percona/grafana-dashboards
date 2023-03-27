import { useCallback, useEffect, useState } from 'react';
import { ActionResult, getActionResult } from 'shared/components/Actions';
import { Databases } from 'shared/core';
import { mysqlMethods, postgresqlMethods } from '../../../database-models';

export const useShowCreateTable = (databaseType, example, tableName, database) => {
  const [showCreateTable, setShowCreateTable] = useState<ActionResult>({
    error: '',
    loading: true,
    value: null,
  });

  const getDatabase = useCallback(async () => {
    let id;

    if (databaseType === Databases.postgresql) {
      id = await postgresqlMethods.getShowCreateTables({ example, tableName, database });
    } else if (databaseType === Databases.mysql) {
      id = await mysqlMethods.getShowCreateTables({ example, tableName, database });
    }

    const result = await getActionResult(id);

    setShowCreateTable(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [databaseType]);

  useEffect(() => {
    getDatabase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [databaseType]);

  return [showCreateTable];
};
