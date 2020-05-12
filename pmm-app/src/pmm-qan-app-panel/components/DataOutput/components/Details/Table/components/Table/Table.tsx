import React, { useEffect, useState } from 'react';
import { useActionResult } from '../../../Details.hooks';
import { databaseFactory } from '../../../database-models';

// TODO: refactor example parameters passing

const TableCreate = props => {
  const { tableName, databaseType, example } = props;
  const [errorText, setErrorText] = useState('');
  const [showCreateTable, setActionId] = useActionResult();

  useEffect(() => {
    setErrorText('');
    const database = databaseFactory(databaseType);
    database.getShowCreateTables({ example, tableName, setErrorText, setActionId });
  }, [databaseType]);

  return <div>{errorText ? <pre>{errorText}</pre> : <pre>{showCreateTable}</pre>}</div>;
};

export default TableCreate;
