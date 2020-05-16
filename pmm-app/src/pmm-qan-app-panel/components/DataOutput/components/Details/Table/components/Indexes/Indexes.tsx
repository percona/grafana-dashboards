import React, { useEffect, useState } from 'react';
import { Spin, Table } from 'antd';
import { useActionResult_with_errors } from '../../../Details.hooks';
import { databaseFactory } from '../../../database-models';
import { processTableData } from '../../TableContainer.tools';

export const Indexes = props => {
  const { tableName, databaseType, example } = props;
  const [data, setData] = useState<{ columns: any[]; rows: any[] }>({ columns: [], rows: [] });
  const [indexes, setActionId] = useActionResult_with_errors();

  useEffect(() => {
    const database = databaseFactory(databaseType);
    database.getIndexes({ example, tableName, setActionId });
  }, [databaseType]);

  useEffect(() => {
    setData(processTableData(indexes.value));
  }, [indexes.value]);

  return (
    <div>
      <Spin spinning={indexes.loading}>
        {indexes.error ? (
          <pre>{indexes.error}</pre>
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
      </Spin>
    </div>
  );
};
