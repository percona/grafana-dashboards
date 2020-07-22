import React, { useCallback, useEffect, useState } from 'react';
import { Spin } from 'antd';
import Highlight from 'react-highlight.js';
import { ActionResult, Databases } from '../../../Details.types';
import { mysqlMethods, postgresqlMethods } from '../../../database-models';
import { useActionResult } from '../../../Details.tools';

// TODO: refactor example parameters passing

const TableCreate = (props) => {
  const { tableName, databaseType, example } = props;
  const [showCreateTable, setShowCreateTable] = useState<ActionResult>({
    error: '',
    loading: true,
    value: null,
  });

  const getDatabase = useCallback(async () => {
    let id;

    if (databaseType === Databases.postgresql) {
      id = await postgresqlMethods.getShowCreateTables({ example, tableName });
    } else if (databaseType === Databases.mysql) {
      id = await mysqlMethods.getShowCreateTables({ example, tableName });
    }

    const result = await useActionResult(id);

    setShowCreateTable(result);
  }, [databaseType]);

  useEffect(() => {
    getDatabase();
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
