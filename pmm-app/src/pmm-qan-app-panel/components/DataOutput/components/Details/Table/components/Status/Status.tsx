import React, { useEffect, useState } from 'react';
import { DATABASE } from '../../../Details.constants';
import StatusService from './Status.service';
import { Table } from 'antd';
import { useActionResult } from '../../../Details.hooks';
import { processTableData } from '../../../Details.tools';

const getMysqlStatusesData = async ({ example, tableName, setErrorText, setActionId }) => {
  if (!tableName) {
    setErrorText('Cannot display status info without query example, schema or table name at this moment.');
    return;
  }
  const { action_id } = await StatusService.getMysqlTableStatus({
    database: example.schema,
    table_name: tableName,
    service_id: example.service_id,
  });
  setActionId(action_id as string);
};

const getDatabaseStatusesFactory = databaseType => ({ example, tableName, setErrorText, setActionId }) => {
  switch (databaseType) {
    case DATABASE.mysql:
      return getMysqlStatusesData({ example, tableName, setErrorText, setActionId });
    default:
      throw new Error('Unknown database type');
  }
};

export const Status = props => {
  const { tableName, databaseType, example } = props;
  const [data, setData] = useState({ columns: [], rows: [] });
  const [errorText, setErrorText] = useState('');
  const [status, setActionId] = useActionResult();

  useEffect(() => {
    setErrorText('');
    const getStatusesData = getDatabaseStatusesFactory(databaseType);
    getStatusesData({ example, tableName, setErrorText, setActionId });
  }, [databaseType]);

  useEffect(() => {
    if (!status) {
      return;
    }
    setData(processTableData(status));
  }, [status]);

  return (
    <div>
      {errorText ? (
        <pre>{errorText}</pre>
      ) : (
        <Table
          dataSource={data.rows}
          columns={data.columns}
          scroll={{ x: '90%' }}
          pagination={false}
          size="small"
          bordered
        />
      )}
    </div>
  );
};
