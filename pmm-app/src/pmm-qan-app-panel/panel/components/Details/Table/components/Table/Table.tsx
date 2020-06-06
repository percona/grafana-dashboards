import React, { useEffect } from 'react';
import { Spin } from 'antd';
import Highlight from 'react-highlight.js';
import { useActionResult } from '../../../Details.hooks';
import { databaseFactory } from '../../../database-models';

// TODO: refactor example parameters passing

const TableCreate = (props) => {
  const { tableName, databaseType, example } = props;
  const [showCreateTable, setActionId] = useActionResult();

  useEffect(() => {
    const database = databaseFactory(databaseType);
    database.getShowCreateTables({ example, tableName, setActionId });
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
