import React, { useEffect, useState } from 'react';
import ExampleService from '../Example/Example.service';
import TableService from './Table.service';
import TableCreate from './Table';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const TableCreateContainer = props => {
  const { queryId, groupBy, from, to, labels, tables, databaseType } = props;

  const [example, setExample] = useState({});

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

  // return <div>{errorText ? <pre>{errorText}</pre> : <pre>{showCreateTable}</pre>}</div>;
  return example && example.tables ? (
    <Tabs defaultActiveKey="1" onChange={() => {}} tabPosition="top">
      {example.tables.map((table, index) => {
        return (
          <TabPane tab={<span>{table}</span>} key={index}>
            <TableCreate
              tableName={table}
              example={example}
              databaseType={databaseType}
              schema={example.schema}
            />
          </TabPane>
        );
      })}
    </Tabs>
  ) : (
    <div>
      <pre>Sorry, no tables found =(</pre>
    </div>
  );
};

export default TableCreateContainer;
