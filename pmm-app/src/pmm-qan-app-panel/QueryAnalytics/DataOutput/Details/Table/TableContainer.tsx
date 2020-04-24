import React from 'react';
import TableCreate from './Table';
import { Spin, Tabs } from 'antd';
import { useExamples } from '../Example/Example.hooks';
import { useDatabaseType } from '../Details.hooks';

const { TabPane } = Tabs;

const TableCreateContainer = () => {
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
          <pre> Cannot display table info without query example at this moment. </pre>
        </div>
      )}
    </Spin>
  );
};

export default TableCreateContainer;
