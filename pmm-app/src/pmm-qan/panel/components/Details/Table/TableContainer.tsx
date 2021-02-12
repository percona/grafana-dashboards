import React, { FC, useState } from 'react';
import { Tabs } from 'antd';
import { Collapse } from '@grafana/ui';
import { TableCreate } from './components/TableCreate/TableCreate';
import { Indexes } from './components/Indexes/Indexes';
import { Status } from './components/Status/Status';
import { TableTabs } from './TableContainer.constants';
import { TableContainerProps } from './TableContainer.types';
import { useTables } from './TableContainer.hooks';
import { Messages } from '../Details.messages';
import { Databases } from '../Details.types';

const { TabPane } = Tabs;

const TableCreateContainer: FC<TableContainerProps> = ({ databaseType, examples }) => {
  const [tables] = useTables(examples, databaseType);
  const [isTableTableOpen, setTableTableOpen] = useState(true);
  const [isTableStatusOpen, setTableStatusOpen] = useState(true);
  const [isTableIndexesOpen, setTableIndexesOpen] = useState(true);

  return tables && tables.length ? (
    <Tabs defaultActiveKey="0" onChange={() => {}} tabPosition="top">
      {tables.map((table) => (
        <TabPane tab={<span>{table}</span>} key={table}>
          <div>
            <Collapse
              collapsible
              label={TableTabs.table}
              isOpen={isTableTableOpen}
              onToggle={() => setTableTableOpen(!isTableTableOpen)}
            >
              <TableCreate tableName={table} example={examples[0]} databaseType={databaseType} />
            </Collapse>
            {databaseType === Databases.mysql ? (
              <Collapse
                collapsible
                label={TableTabs.status}
                isOpen={isTableStatusOpen}
                onToggle={() => setTableStatusOpen(!isTableStatusOpen)}
              >
                <Status tableName={table} example={examples[0]} databaseType={databaseType} />
              </Collapse>
            ) : null}
            <Collapse
              collapsible
              label={TableTabs.indexes}
              isOpen={isTableIndexesOpen}
              onToggle={() => setTableIndexesOpen(!isTableIndexesOpen)}
            >
              <Indexes tableName={table} example={examples[0]} databaseType={databaseType} />
            </Collapse>
          </div>
        </TabPane>
      ))}
    </Tabs>
  ) : (
    <div>
      <pre>{Messages.cantExtractTables}</pre>
    </div>
  );
};

export default TableCreateContainer;
