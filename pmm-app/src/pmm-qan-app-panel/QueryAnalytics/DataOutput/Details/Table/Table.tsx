import React, { useEffect, useState } from 'react';
import TableService from './Table.service';

const TableCreate = props => {
  const { schema, tableName, databaseType, example } = props;
  const [showCreateTable, setShowCreateTable] = useState('');
  const [errorText, setErrorText] = useState('');

  const showCreateTableAction = example => {
    if (!('example' in example) || example.example === '' || !schema || !tableName) {
      setErrorText('Cannot display table info without query example, schema or table name at this moment.');
      return;
    }
    setErrorText('');
    switch (databaseType) {
      case 'mysql':
        getMySQL(example);
        break;
      case 'postgresql':
        getPostgreSQL(example);
        break;
    }
  };

  const getMySQL = async example => {
    const { action_id } = await TableService.getShowCreateTableMySQL({
      database: example.schema,
      table_name: example.tableName,
      service_id: example.service_id,
    });
    const table = await TableService.getActionResult({
      action_id,
    });
    setShowCreateTable(table.output);
  };

  const getPostgreSQL = async example => {
    const { action_id } = await TableService.getShowCreateTablePostgreSQL({
      database: example.schema,
      table_name: example.tableName,
      service_id: example.service_id,
    });
    const table = await TableService.getActionResult({
      action_id,
    });
    setShowCreateTable(table.output);
  };

  useEffect(() => {
    showCreateTableAction(example);
  }, []);

  return <div>{errorText ? <pre>{errorText}</pre> : <pre>{showCreateTable}</pre>}</div>;
};

export default TableCreate;
