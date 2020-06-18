import React, { FC } from 'react';
import { Collapse, Spin, Tabs } from 'antd';
import TableCreate from './components/Table/Table';
import { styles } from '../Explain/Explain.styles';
import { Indexes } from './components/Indexes/Indexes';
import { Status } from './components/Status/Status';
import { DATABASE } from '../Details.constants';
import { TableTabs } from './TableContainer.constants';
import { TableContainerProps } from './TableContainer.types';

const { TabPane } = Tabs;
const { Panel } = Collapse;

const TableCreateContainer: FC<TableContainerProps> = ({ databaseType, examples, tables }) => (
  <Spin spinning={false}>
    {tables && tables.length ? (
      <Tabs defaultActiveKey="0" onChange={() => {}} tabPosition="top">
        {tables.map((table) => (
          <TabPane tab={<span>{table}</span>} key={table}>
            <Collapse bordered={false} defaultActiveKey={[TableTabs.table]} className={styles.collapse}>
              <Panel header={TableTabs.table} key={TableTabs.table} className={styles.panel}>
                <TableCreate
                  tableName={table}
                  example={examples[0]}
                  databaseType={databaseType}
                  schema={examples[0].schema}
                />
              </Panel>
              {databaseType === DATABASE.mysql ? (
                <Panel header={TableTabs.status} key={TableTabs.status} className={styles.panel}>
                  <Status
                    tableName={table}
                    example={examples[0]}
                    databaseType={databaseType}
                    schema={examples[0].schema}
                  />
                </Panel>
              ) : null}
              <Panel header={TableTabs.indexes} key={TableTabs.indexes} className={styles.panel}>
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
