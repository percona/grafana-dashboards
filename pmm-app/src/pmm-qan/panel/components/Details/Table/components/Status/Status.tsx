import React, { useCallback, useEffect, useState } from 'react';
import { Spin, Table } from 'antd';
import { ActionResult, Databases } from '../../../Details.types';
import { mysqlMethods } from '../../../database-models';
import { processTableData } from '../../TableContainer.tools';
import { useActionResult } from '../../../Details.tools';
import { Messages } from '../../../Details.messages';

export const Status = (props) => {
  const { tableName, databaseType, example } = props;
  const [data, setData] = useState<{ columns: any[]; rows: any[] }>({ columns: [], rows: [] });
  const [status, setStatus] = useState<ActionResult>({
    error: '',
    loading: true,
    value: null,
  });

  const getStatuses = useCallback(async () => {
    let id;

    if (databaseType === Databases.mysql) {
      id = await mysqlMethods.getStatuses(({ example, tableName }));
    }

    const result = await useActionResult(id);

    setStatus(result);
    setData(processTableData(result.value));
  }, [databaseType]);

  useEffect(() => {
    getStatuses();
  }, [databaseType]);

  return (
    <div>
      <Spin spinning={status.loading}>
        {status.error ? <pre>{status.error}</pre> : null}
        {!status.error && data.rows.length ? (
          <Table
            dataSource={data.rows}
            columns={data.columns}
            scroll={{ x: '90%' }}
            pagination={false}
            size="small"
            bordered
          />
        ) : null}
        {!status.error && !data.rows.length ? <pre>{Messages.noDataFound}</pre> : null}
      </Spin>
    </div>
  );
};
