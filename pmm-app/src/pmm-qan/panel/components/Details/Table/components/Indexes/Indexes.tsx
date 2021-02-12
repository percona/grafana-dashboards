import React, {
  FC, useCallback, useEffect, useState,
} from 'react';
import { ActionResult, getActionResult } from 'shared/components/Actions';
import { Table } from 'shared/components/Elements/Table';
import { Overlay } from 'shared/components/Elements/Overlay/Overlay';
import { Databases } from '../../../Details.types';
import { mysqlMethods, postgresqlMethods } from '../../../database-models';
import { processTableData } from '../../TableContainer.tools';
import { Messages } from '../../../Details.messages';
import { TableProps } from '../Table.types';

export const Indexes: FC<TableProps> = ({ tableName, databaseType, example }) => {
  const [data, setData] = useState<{ columns: any[]; rows: any[] }>({ columns: [], rows: [] });
  const [indexes, setIndexes] = useState<ActionResult>({
    error: '',
    loading: true,
    value: null,
  });

  const getIndexes = useCallback(async () => {
    let id;

    if (databaseType === Databases.postgresql) {
      id = await postgresqlMethods.getIndexes({ example, tableName });
    } else if (databaseType === Databases.mysql) {
      id = await mysqlMethods.getIndexes({ example, tableName });
    }

    const result = await getActionResult(id);

    setIndexes(result);
    setData(processTableData(result.value));
  }, [databaseType]);

  useEffect(() => {
    getIndexes();
  }, [databaseType]);

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
