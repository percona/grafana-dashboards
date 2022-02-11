import { useCallback, useEffect, useState } from 'react';
import { ActionResult, getActionResult } from 'shared/components/Actions';
import { Databases } from 'shared/core';
import { mysqlMethods } from '../../../database-models';
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

export const useTableStatus = (databaseType, example, tableName, database): [StatusData, ActionResult] => {
  const [data, setData] = useState<StatusData>({ columns: [], rows: [] });
  const [status, setStatus] = useState<ActionResult>(actionResult);

  const getStatuses = useCallback(async () => {
    let id;

    if (databaseType === Databases.mysql) {
      id = await mysqlMethods.getStatuses({ example, tableName, database });
    }

    const result = await getActionResult(id);

    setStatus(result);
    setData(processTableData(result.value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [databaseType]);

  useEffect(() => {
    getStatuses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [databaseType]);

  return [data, status];
};
