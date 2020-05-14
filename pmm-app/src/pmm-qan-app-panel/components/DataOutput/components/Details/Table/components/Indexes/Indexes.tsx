import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useActionResult } from '../../../Details.hooks';
import { databaseFactory } from '../../../database-models';
import { processTableData } from '../../TableContainer.tools';

export const Indexes = props => {
  const { tableName, databaseType, example } = props;
  const [data, setData] = useState({ columns: [], rows: [] });
  const [errorText, setErrorText] = useState('');
  const [indexes, setActionId] = useActionResult();

  useEffect(() => {
    setErrorText('');
    const database = databaseFactory(databaseType);
    database.getIndexes({ example, tableName, setErrorText, setActionId });
  }, [databaseType]);

  useEffect(() => {
    if (!indexes) {
      return;
    }
    setData(processTableData(indexes));
  }, [indexes]);

  return (
    <div>
      {errorText ? (
        <pre>{errorText}</pre>
      ) : data.rows.length > 1 ? (
        <Table
          dataSource={data.rows}
          columns={data.columns}
          scroll={{ x: '90%' }}
          pagination={false}
          size="small"
          bordered
        />
      ) : (
        <pre> No data found</pre>
      )}
    </div>
  );
};
