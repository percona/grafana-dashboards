import React, { useCallback, useEffect, useState } from 'react';
import { Spin, Table } from 'antd';
import { ActionResult, Databases } from '../../../Details.types';
import { mysqlMethods, postgresqlMethods } from '../../../database-models';
import { processTableData } from '../../TableContainer.tools';
import { useActionResult } from '../../../Details.tools';
import { Messages } from '../../../Details.messages';

export const Indexes = (props) => {
  const { tableName, databaseType, example } = props;
  const [data, setData] = useState<{ columns: any[]; rows: any[] }>({ columns: [], rows: [] });
  const [indexes, setIndexes] = useState<ActionResult>({
    error: '',
    loading: true,
    value: null,
  });


  const getIndexes = useCallback(async () => {
    let id;

    if (databaseType === Databases.postgresql) {
      id = await postgresqlMethods.getIndexes(({ example, tableName }));
    } else if (databaseType === Databases.mysql) {
      id = await mysqlMethods.getIndexes(({ example, tableName }));
    }

    const result = await useActionResult(id);

    setIndexes(result);
    setData(processTableData(result.value));
  }, [databaseType]);

  useEffect(() => {
    getIndexes();
  }, [databaseType]);

  return (
    <div>
      <Spin spinning={indexes.loading}>
        {indexes.error ? <pre>{indexes.error}</pre> : null}
        {!indexes.error && data.rows.length ? (
          <Table
            dataSource={data.rows}
            columns={data.columns}
            scroll={{ x: '90%' }}
            pagination={false}
            size="small"
            bordered
          />
        ) : null}
        {!indexes.error && !data.rows.length ? <pre>{Messages.noDataFound}</pre> : null}
      </Spin>
    </div>
  );
};
