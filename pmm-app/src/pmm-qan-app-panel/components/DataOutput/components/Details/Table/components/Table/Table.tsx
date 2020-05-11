import React, { useEffect, useState } from 'react';
import TableService from './Table.service';
import { DATABASE } from '../../../Details.constants';
import { useActionResult } from '../../../Details.hooks';

// TODO: refactor example parameters passing

const getMysqlTablesData = async ({ example, tableName, setErrorText, setActionId }) => {
  if (!tableName) {
    setErrorText('Cannot display table info without query example, schema or table name at this moment.');
    return;
  }
  const { action_id } = await TableService.getShowCreateTableMySQL({
    table_name: tableName,
    service_id: example.service_id,
  });
  setActionId(action_id as string);
};

const getPostgreSQLTablesData = async ({ example, tableName, setErrorText, setActionId }) => {
  if (!tableName) {
    setErrorText('Cannot display table info without query example, schema or table name at this moment.');
    return;
  }
  const { action_id } = await TableService.getShowCreateTablePostgreSQL({
    table_name: tableName,
    service_id: example.service_id,
  });
  setActionId(action_id as string);
};

const getDatabaseTablesFactory = databaseType => ({ example, tableName, setErrorText, setActionId }) => {
  switch (databaseType) {
    case DATABASE.mysql:
      return getMysqlTablesData({ example, tableName, setErrorText, setActionId });
    case DATABASE.postgresql:
      return getPostgreSQLTablesData({ example, tableName, setErrorText, setActionId });
    default:
      throw new Error('Unknown database type');
  }
};

const TableCreate = props => {
  const { tableName, databaseType, example } = props;
  const [errorText, setErrorText] = useState('');
  const [showCreateTable, setActionId] = useActionResult();

  useEffect(() => {
    setErrorText('');
    const getDatabaseData = getDatabaseTablesFactory(databaseType);
    getDatabaseData({ example, tableName, setErrorText, setActionId });
  }, [databaseType]);

  return <div>{errorText ? <pre>{errorText}</pre> : <pre>{showCreateTable}</pre>}</div>;
};

export default TableCreate;
