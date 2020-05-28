import React from 'react';
import { Collapse, Spin, Tabs } from 'antd';
import TableCreate from './components/Table/Table';
import { Styling } from '../Explain/Explain.styles';
import { Indexes } from './components/Indexes/Indexes';
import { Status } from './components/Status/Status';
import { DATABASE } from '../Details.constants';

const { TabPane } = Tabs;
const { Panel } = Collapse;

const TableCreateContainer = ({ databaseType, examples, tables }) => (
  <Spin spinning={false}>
    {tables && tables.length ? (
      <Tabs defaultActiveKey="0" onChange={() => {}} tabPosition="top">
        {tables.map((table, index) => (
          <TabPane tab={<span>{table}</span>} key={index}>
            <Collapse bordered={false} defaultActiveKey={['1']} className={Styling.collapse}>
              <Panel header="Table" key="1" className={Styling.panel}>
                <TableCreate
                  tableName={table}
                  example={examples[0]}
                  databaseType={databaseType}
                  schema={examples[0].schema}
                />
              </Panel>
              {databaseType === DATABASE.mysql ? (
                <Panel header="Status" key="2" className={Styling.panel}>
                  <Status
                    tableName={table}
                    example={examples[0]}
                    databaseType={databaseType}
                    schema={examples[0].schema}
                  />
                </Panel>
              ) : null}
              <Panel header="Indexes" key="3" className={Styling.panel}>
                <Indexes
                  tableName={table}
                  example={examples[0]}
                  databaseType={databaseType}
                  schema={examples[0].schema}
                />
              </Panel>
            </Collapse>
          </TabPane>
        ))}
      </Tabs>
    ) : (
      <div>
        <pre> Couldn&apos;t get tables info neither from example nor explain </pre>
      </div>
    )}
  </Spin>
);

export default TableCreateContainer;
