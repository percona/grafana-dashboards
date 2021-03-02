import React, { FC, useEffect, useState } from 'react';
import {
  Collapse, Tab, TabContent, TabsBar,
} from '@grafana/ui';
import { Databases } from 'shared/core';
import { Messages } from 'pmm-qan/panel/components/Details/Details.messages';
import { TableCreate } from './components/TableCreate/TableCreate';
import { Indexes } from './components/Indexes/Indexes';
import { Status } from './components/Status/Status';
import { TableTabs } from './TableContainer.constants';
import { TableContainerProps } from './TableContainer.types';
import { useTables } from './TableContainer.hooks';

const TableCreateContainer: FC<TableContainerProps> = ({ databaseType, examples, database }) => {
  const [tables] = useTables(examples, databaseType);
  const [isTableTableOpen, setTableTableOpen] = useState(true);
  const [isTableStatusOpen, setTableStatusOpen] = useState(true);
  const [isTableIndexesOpen, setTableIndexesOpen] = useState(true);
  const [activeTab, changeActiveTab] = useState(tables[0]);

  useEffect(() => {
    changeActiveTab(tables[0]);
  }, [tables]);

  const tabs = tables.map((table) => ({
    label: table,
    key: table,
    component: (
      <div>
        <Collapse
          collapsible
          label={TableTabs.table}
          isOpen={isTableTableOpen}
          onToggle={() => setTableTableOpen(!isTableTableOpen)}
        >
          <TableCreate
            tableName={table}
            example={examples[0]}
            databaseType={databaseType}
            database={database}
          />
        </Collapse>
        {databaseType === Databases.mysql ? (
          <Collapse
            collapsible
            label={TableTabs.status}
            isOpen={isTableStatusOpen}
            onToggle={() => setTableStatusOpen(!isTableStatusOpen)}
          >
            <Status tableName={table} example={examples[0]} databaseType={databaseType} database={database} />
          </Collapse>
        ) : null}
        <Collapse
          collapsible
          label={TableTabs.indexes}
          isOpen={isTableIndexesOpen}
          onToggle={() => setTableIndexesOpen(!isTableIndexesOpen)}
        >
          <Indexes tableName={table} example={examples[0]} databaseType={databaseType} database={database} />
        </Collapse>
      </div>
    ),
  }));

  return tables && tables.length ? (
    <>
      <TabsBar>
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            active={tab.key === activeTab}
            onChangeTab={() => {
              changeActiveTab(tab.key);
            }}
          />
        ))}
      </TabsBar>
      <TabContent>{tabs.map((tab) => tab.key === activeTab && tab.component)}</TabContent>
    </>
  ) : (
    <div>
      <pre>{Messages.cantExtractTables}</pre>
    </div>
  );
};

export default TableCreateContainer;
