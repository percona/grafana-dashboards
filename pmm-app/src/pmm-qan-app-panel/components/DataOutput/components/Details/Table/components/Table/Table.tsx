import React, { useEffect } from 'react';
import { useActionResult } from '../../../Details.hooks';
import { databaseFactory } from '../../../database-models';
import { Spin } from 'antd';

// TODO: refactor example parameters passing

const TableCreate = props => {
  const { tableName, databaseType, example } = props;
  const [showCreateTable, setActionId] = useActionResult();

  useEffect(() => {
    const database = databaseFactory(databaseType);
    database.getShowCreateTables({ example, tableName, setActionId });
  }, [databaseType]);

  return (
    <Spin spinning={showCreateTable.loading}>
      <div>
        {showCreateTable.loading ? (
          <pre>{showCreateTable.loading}</pre>
        ) : (
          <pre>{showCreateTable.error || showCreateTable.value}</pre>
        )}
      </div>
    </Spin>
  );
};

export default TableCreate;
