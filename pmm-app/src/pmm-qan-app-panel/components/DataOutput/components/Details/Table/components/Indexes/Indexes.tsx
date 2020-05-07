import React, { useEffect, useState } from 'react';
import { DATABASE } from '../../../Details.constants';
import IndexesService from './Indexes.service';
import { Table } from 'antd';
import { useActionResult } from '../../../Details.hooks';
import { processTableData } from '../../../Details.tools';

export const Indexes = props => {
  const { tableName, databaseType, example } = props;
  const [data, setData] = useState({ columns: [], rows: [] });
  const [errorText, setErrorText] = useState('');
  const [indexes, setActionId] = useActionResult();

  const getIndexes = example => {
    setErrorText('');
    switch (databaseType) {
      case DATABASE.mysql:
        if (!tableName) {
          setErrorText(
            'Cannot display indexes info without query example, schema or table name at this moment.'
          );
          return;
        }
        getMySQL(example);
        break;
      case DATABASE.postgresql:
        if (!tableName) {
          setErrorText('Cannot display indexes info without table name at this moment.');
          return;
        }
        getPostgreSQL(example);
        break;
    }
  };

  const getMySQL = async example => {
    const { action_id } = await IndexesService.getMysqlIndex({
      database: example.schema,
      table_name: tableName,
      service_id: example.service_id,
    });
    setActionId(action_id as string);
  };

  const getPostgreSQL = async example => {
    const { action_id } = await IndexesService.getPostgreSQLIndex({
      table_name: tableName,
      service_id: example.service_id,
    });
    setActionId(action_id as string);
  };

  useEffect(() => {
    getIndexes(example);
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
