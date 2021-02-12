import React, { FC } from 'react';
import { Collapse, Tabs } from 'antd';
import { TableCreate } from './components/TableCreate/TableCreate';
import { styles } from './TableContainer.styles';
import { Indexes } from './components/Indexes/Indexes';
import { Status } from './components/Status/Status';
import { TableTabs } from './TableContainer.constants';
import { TableContainerProps } from './TableContainer.types';
import { useTables } from './TableContainer.hooks';
import { Messages } from '../Details.messages';
import { Databases } from '../Details.types';

const { TabPane } = Tabs;
const { Panel } = Collapse;

const TableCreateContainer: FC<TableContainerProps> = ({
  databaseType,
  examples,
}) => {
  const [tables] = useTables(examples, databaseType);

  return (
    tables && tables.length ? (
      <Tabs defaultActiveKey="0" onChange={() => {}} tabPosition="top">
        {tables.map((table) => (
          <TabPane tab={<span>{table}</span>} key={table}>
            <Collapse bordered={false} defaultActiveKey={[TableTabs.table]} className={styles.collapse}>
              <Panel header={TableTabs.table} key={TableTabs.table} className={styles.panel}>
                <TableCreate
                  tableName={table}
                  example={examples[0]}
                  databaseType={databaseType}
                />
              </Panel>
              {databaseType === Databases.mysql ? (
                <Panel header={TableTabs.status} key={TableTabs.status} className={styles.panel}>
                  <Status
                    tableName={table}
                    example={examples[0]}
                    databaseType={databaseType}
                  />
                </Panel>
              ) : null}
              <Panel header={TableTabs.indexes} key={TableTabs.indexes} className={styles.panel}>
                <Indexes
                  tableName={table}
                  example={examples[0]}
                  databaseType={databaseType}
                />
              </Panel>
            </Collapse>
          </TabPane>
        ))}
      </Tabs>
    ) : (
      <div>
        <pre>{Messages.cantExtractTables}</pre>
      </div>
    )
  );
};

export default TableCreateContainer;
