import React, { useEffect, useState } from 'react';
import TableService from './Table.service';
import { DATABASE } from '../../../Details.constants';
import { useActionResult } from '../../../Details.hooks';

// TODO: refactor example parameters passing
const TableCreate = props => {
  const { schema, tableName, databaseType, example } = props;
  const [errorText, setErrorText] = useState('');
  const [showCreateTable, setActionId] = useActionResult();
  const showCreateTableAction = example => {
    setErrorText('');
    switch (databaseType) {
      case DATABASE.mysql:
        if (!tableName) {
          setErrorText(
            'Cannot display table info without query example, schema or table name at this moment.'
          );
          return;
        }
        getMySQL(example);
        break;
      case DATABASE.postgresql:
        if (!tableName) {
          setErrorText(
            'Cannot display table info without query example, schema or table name at this moment.'
          );
          return;
        }
        getPostgreSQL(example);
        break;
    }
  };

  const getMySQL = async example => {
    const { action_id } = await TableService.getShowCreateTableMySQL({
      // database: example.schema,
      table_name: tableName,
      service_id: example.service_id,
    });
    setActionId(action_id as string);
  };

  const getPostgreSQL = async example => {
    const { action_id } = await TableService.getShowCreateTablePostgreSQL({
      table_name: tableName,
      service_id: example.service_id,
    });
    setActionId(action_id as string);
  };

  useEffect(() => {
    showCreateTableAction(example);
  }, [databaseType]);

  return <div>{errorText ? <pre>{errorText}</pre> : <pre>{showCreateTable}</pre>}</div>;
};

export default TableCreate;
