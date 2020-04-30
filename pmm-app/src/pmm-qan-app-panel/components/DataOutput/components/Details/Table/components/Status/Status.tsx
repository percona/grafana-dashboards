import React, { useEffect, useState } from 'react';
import { DATABASE } from '../../../Details.constants';
import StatusService from './Status.service';
import { Table } from 'antd';
import { useActionResult } from '../../TableContainer.hooks';

export const Status = props => {
  const { schema, tableName, databaseType, example } = props;
  const [data, setData] = useState({ columns: [], rows: [] });
  const [errorText, setErrorText] = useState('');
  const [status, setActionId] = useActionResult();

  const getstatus = example => {
    setErrorText('');
    switch (databaseType) {
      case DATABASE.mysql:
        if (!('example' in example) || example.example === '' || !schema || !tableName) {
          setErrorText(
            'Cannot display status info without query example, schema or table name at this moment.'
          );
          return;
        }
        getMySQL(example);
        break;
    }
  };

  const getMySQL = async example => {
    const { action_id } = await StatusService.getMysqlTableStatus({
      database: example.schema,
      table_name: tableName,
      service_id: example.service_id,
    });
    setActionId(action_id as string);
  };

  useEffect(() => {
    getstatus(example);
  }, [databaseType]);

  useEffect(() => {
    if (!status) {
      return;
    }
    const [header, ...data] = JSON.parse(status);
    const headerList = header
      .map(e => e.trim())
      .filter(Boolean)
      .map(title => ({ title: title, key: title, dataIndex: title }));

    const rowsList = data.map(item =>
      item
        .map(e => (e ? e.trim() : ''))
        .filter(Boolean)
        .reduce((acc, item, index) => {
          acc[headerList[index].title] = item;
          return acc;
        }, {})
    );
    setData({ columns: headerList, rows: rowsList });
  }, [status]);

  return (
    <div>
      {errorText ? (
        <pre>{errorText}</pre>
      ) : (
        <Table dataSource={data.rows} columns={data.columns} pagination={false} size="small" bordered />
      )}
    </div>
  );
};
