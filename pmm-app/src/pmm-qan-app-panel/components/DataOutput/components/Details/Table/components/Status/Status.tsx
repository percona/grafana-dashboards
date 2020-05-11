import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useActionResult } from '../../../Details.hooks';
import { processTableData } from '../../../Details.tools';
import { databaseFactory } from '../../database-models';

export const Status = props => {
  const { tableName, databaseType, example } = props;
  const [data, setData] = useState({ columns: [], rows: [] });
  const [errorText, setErrorText] = useState('');
  const [status, setActionId] = useActionResult();

  useEffect(() => {
    setErrorText('');
    const database = databaseFactory(databaseType);
    database.getStatuses({ example, tableName, setErrorText, setActionId });
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
