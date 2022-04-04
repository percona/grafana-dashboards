import { useCallback, useEffect, useState } from 'react';
import { ActionResult, getActionResult } from 'shared/components/Actions';
import { Databases } from 'shared/core';
import { mysqlMethods, postgresqlMethods } from '../../../database-models';
import { processTableData } from '../../TableContainer.tools';

interface StatusDataColumns {
  Header: string;
  key: string;
  accessor: string;
}

interface StatusData {
  columns: StatusDataColumns[];
  rows: object[];
}

const actionResult = {
  error: '',
  loading: true,
  value: null,
};

const DATABASE_INSTANCES = {
  [Databases.postgresql]: postgresqlMethods.getIndexes,
  [Databases.mysql]: mysqlMethods.getIndexes,
};

export const useIndexes = (databaseType, example, tableName, database): [StatusData, ActionResult] => {
  const [data, setData] = useState<StatusData>({ columns: [], rows: [] });
  const [indexes, setIndexes] = useState<ActionResult>(actionResult);

  const getIndexes = useCallback(async () => {
    let id;

    const getIndexes = DATABASE_INSTANCES[databaseType];

    if (getIndexes) {
      id = await getIndexes({ example, tableName, database });
    }

    const result = await getActionResult(id);

    setIndexes(result);
    setData(processTableData(result.value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [databaseType]);

  useEffect(() => {
    getIndexes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [databaseType]);

  return [data, indexes];
};
