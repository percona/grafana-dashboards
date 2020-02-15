import React, { Component, useEffect, useState } from 'react';
import ExampleService from '../Example/Example.service';
import TableService from './Table.service';

const TableCreate = props => {
  const { queryId, groupBy, from, to, labels, tables } = props;
  const [showCreateTable, setShowCreateTable] = useState('');

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
        const example = result['query_examples'][0];
        const { action_id } = await TableService.getShowCreateTable({
          database: example.schema,
          table_name: example.table_name,
          service_id: example.service_id,
        });
        const table = await TableService.getActionResult({
          action_id,
        });
        setShowCreateTable(table.output);
      } catch (e) {
        //TODO: add error handling
      }
    })();
  }, [queryId]);

  return (
    <div>
      <pre>{showCreateTable}</pre>
    </div>
  );
};

export default TableCreate;
