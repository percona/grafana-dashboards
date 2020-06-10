import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import Highlight from 'react-highlight.js';
import { useActionResult } from '../../../Details.hooks';
import { databaseFactory } from '../../../database-models';

// TODO: refactor example parameters passing

const TableCreate = (props) => {
  const { tableName, databaseType, example } = props;
  const [showCreateTable, setShowCreateTable] = useState({});

  useEffect(() => {
    const getData = async () => {
      const database = databaseFactory(databaseType);
      const id = await database.getShowCreateTables({ example, tableName });
      const result = await useActionResult(id);
      setShowCreateTable(result);
    };
    getData();
  }, [databaseType]);

  return (
    <Spin spinning={showCreateTable.loading}>
      <div>
        {showCreateTable.loading ? <pre>{showCreateTable.loading}</pre> : null}
        {!showCreateTable.loading && showCreateTable.error ? <pre>{showCreateTable.error}</pre> : null}
        {!showCreateTable.loading && !showCreateTable.error ? (
          <Highlight language="sql">{showCreateTable.value}</Highlight>
        ) : null}
      </div>
    </Spin>
  );
};

export default TableCreate;
