import { useCallback, useEffect, useState } from 'react';
import { ActionResult, getActionResult } from 'shared/components/Actions';
import { Databases } from 'shared/core';
import { mysqlMethods, postgresqlMethods } from '../../../database-models';
import { processTableData } from '../../TableContainer.tools';

interface StatusData {
  columns: any[];
  rows: any[];
}

const actionResult = {
  error: '',
  loading: true,
  value: null,
};

export const useIndexes = (databaseType, example, tableName, database): [StatusData, ActionResult] => {
  const [data, setData] = useState<StatusData>({ columns: [], rows: [] });
  const [indexes, setIndexes] = useState<ActionResult>(actionResult);

  const getIndexes = useCallback(async () => {
    let id;

    if (databaseType === Databases.postgresql) {
      id = await postgresqlMethods.getIndexes({ example, tableName, database });
    } else if (databaseType === Databases.mysql) {
      id = await mysqlMethods.getIndexes({ example, tableName, database });
    }

    const result = await getActionResult(id);

    setIndexes(result);
    setData(processTableData(result.value));
  }, [databaseType]);

  useEffect(() => {
    getIndexes();
  }, [databaseType]);

  return [data, indexes];
};
