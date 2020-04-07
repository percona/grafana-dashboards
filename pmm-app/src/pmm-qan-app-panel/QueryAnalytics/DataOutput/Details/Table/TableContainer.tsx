import React, { useEffect, useState } from 'react';
import ExampleService from '../Example/Example.service';
import TableCreate from './Table';
import { Spin, Tabs } from 'antd';

const { TabPane } = Tabs;

const TableCreateContainer = props => {
  const { queryId, groupBy, from, to, labels, tables, databaseType } = props;

  const [example, setExample] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
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
        setLoading(false);
      } catch (e) {
        setLoading(false);
        //TODO: add error handling
      }
    })();
  }, [queryId]);

  return (
    <Spin spinning={loading}>
      {example && example.tables ? (
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
      )}
    </Spin>
  );
};

export default TableCreateContainer;
