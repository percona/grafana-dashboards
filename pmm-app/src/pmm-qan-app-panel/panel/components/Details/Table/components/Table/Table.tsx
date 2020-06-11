import React, { useCallback, useEffect, useState } from 'react';
import { Spin } from 'antd';
import Highlight from 'react-highlight.js';
import { useActionResult } from '../../../Details.hooks';
import { ActionResult } from '../../../Details.types';
import { mysqlMethods, postgresqlMethods } from '../../../database-models';
import { DATABASE } from '../../../Details.constants';

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
    if (databaseType === DATABASE.postgresql) {
      id = await mysqlMethods.getShowCreateTables({ example, tableName });
    } else if (databaseType === DATABASE.mysql) {
      id = await postgresqlMethods.getShowCreateTables({ example, tableName });
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
