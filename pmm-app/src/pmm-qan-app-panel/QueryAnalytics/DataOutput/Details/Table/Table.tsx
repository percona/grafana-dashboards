import React, { useEffect, useState } from 'react';
import ExampleService from '../Example/Example.service';
import TableService from './Table.service';

const TableCreate = props => {
  const { queryId, groupBy, from, to, labels, tables, databaseType } = props;
  const [showCreateTable, setShowCreateTable] = useState('');
  const [errorText, setErrorText] = useState('');
  const [example, setExample] = useState({});

  const showCreateTableAction = example => {
    switch (databaseType) {
      case 'mysql':
        if (!('example' in example) || example.example === '' || !example.schema || !example.table_name) {
          setErrorText(
            'Cannot display table info without query example, schema or table name at this moment.'
          );
          return;
        }
        setErrorText('');
        startClassic(example);
        break;
      case 'postgresql':
        setErrorText('Not implemented for postgresql databases :(');
        break;
    }
  };

  const startClassic = async example => {
    const { action_id } = await TableService.getShowCreateTable({
      database: example.schema,
      table_name: example.table_name,
      service_id: example.service_id,
    });
    const table = await TableService.getActionResult({
      action_id,
    });
    setShowCreateTable(table.output);
  };

  useEffect(() => {
    (async () => {
      try {
        const result = await ExampleService.getExample({
          filterBy: queryId,
          groupBy,
          from,
          to,
          labels,
          tables,
        });
        const queryExample = result['query_examples'][0];
        setExample(queryExample);
      } catch (e) {
        //TODO: add error handling
      }
    })();
  }, [queryId]);

  useEffect(() => {
    showCreateTableAction(example);
  }, [example]);

  return <div>{errorText ? <pre>{errorText}</pre> : <pre>{showCreateTable}</pre>}</div>;
};

export default TableCreate;
