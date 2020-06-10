import React, { useEffect, useState } from 'react';
import { Spin, Table } from 'antd';
import { useActionResult } from '../../../Details.hooks';
import { databaseFactory } from '../../../database-models';
import { processTableData } from '../../TableContainer.tools';

export const Indexes = (props) => {
  const { tableName, databaseType, example } = props;
  const [data, setData] = useState<{ columns: any[]; rows: any[] }>({ columns: [], rows: [] });
  const [indexes, setIndexes] = useState({});

  useEffect(() => {
    const getData = async () => {
      const database = databaseFactory(databaseType);
      const id = await database.getIndexes({ example, tableName });
      const result = await useActionResult(id);
      setIndexes(result);
    };
    getData();
  }, [databaseType]);

  useEffect(() => {
    setData(processTableData(indexes.value));
  }, [indexes.value]);

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
        {!indexes.error && !data.rows.length ? <pre> No data found</pre> : null}
      </Spin>
    </div>
  );
};
