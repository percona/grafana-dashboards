import React, { useEffect, useState } from 'react';
import { DATABASE } from '../../../Details.constants';
import IndexesService from './Indexes.service';
import { Table } from 'antd';
import { useActionResult } from '../../../Details.hooks';
import { processTableData } from '../../../Details.tools';

const getMysqlIndexesData = async ({ example, tableName, setErrorText, setActionId }) => {
  if (!tableName) {
    setErrorText('Cannot display indexes info without query example, schema or table name at this moment.');
    return;
  }
  const { action_id } = await IndexesService.getMysqlIndex({
    database: example.schema,
    table_name: tableName,
    service_id: example.service_id,
  });
  setActionId(action_id as string);
};

const getPostgreSQLIndexesData = async ({ example, tableName, setErrorText, setActionId }) => {
  if (!tableName) {
    setErrorText('Cannot display indexes info without table name at this moment.');
    return;
  }
  const { action_id } = await IndexesService.getPostgreSQLIndex({
    table_name: tableName,
    service_id: example.service_id,
  });
  setActionId(action_id as string);
};

const getDatabaseIndexesFactory = databaseType => ({ example, tableName, setErrorText, setActionId }) => {
  switch (databaseType) {
    case DATABASE.mysql:
      return getMysqlIndexesData({ example, tableName, setErrorText, setActionId });
    case DATABASE.postgresql:
      return getPostgreSQLIndexesData({ example, tableName, setErrorText, setActionId });
    default:
      throw new Error('Unknown database type');
  }
};

export const Indexes = props => {
  const { tableName, databaseType, example } = props;
  const [data, setData] = useState({ columns: [], rows: [] });
  const [errorText, setErrorText] = useState('');
  const [indexes, setActionId] = useActionResult();

  useEffect(() => {
    setErrorText('');
    const getDatabaseData = getDatabaseIndexesFactory(databaseType);
    getDatabaseData({ example, tableName, setErrorText, setActionId });
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
