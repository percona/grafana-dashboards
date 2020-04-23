import React, { useEffect, useState } from 'react';
import ExampleService from '../Example/Example.service';
import TableCreate from './Table';
import { Spin, Tabs } from 'antd';
import { useExamples } from '../Example/Example.hooks';
import { useDatabaseType } from '../Details.hooks';

const { TabPane } = Tabs;

const TableCreateContainer = props => {
  const [examples, loading] = useExamples();
  const databaseType = useDatabaseType();

  return (
    <Spin spinning={loading}>
      {examples.length && examples[0].tables ? (
        <Tabs defaultActiveKey="1" onChange={() => {}} tabPosition="top">
          {examples[0].tables.map((table, index) => {
            return (
              <TabPane tab={<span>{table}</span>} key={index}>
                <TableCreate
                  tableName={table}
                  example={examples[0]}
                  databaseType={databaseType}
                  schema={examples[0].schema}
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
