import React, { useContext } from 'react';
import TableCreate from './components/Table/Table';
import { Collapse, Spin, Tabs } from 'antd';
import { Styling } from '../Explain/Explain.styles';
import { Indexes } from './components/Indexes/Indexes';
import { Status } from './components/Status/Status';
import { DATABASE } from '../Details.constants';
import { DetailsProvider } from '../Details.provider';

const { TabPane } = Tabs;
const { Panel } = Collapse;

const TableCreateContainer = () => {
  const {
    detailsState: { databaseType, examples, tables },
  } = useContext(DetailsProvider);
  console.log(tables, '------');
  return (
    <Spin spinning={false}>
      {tables.length ? (
        <Tabs defaultActiveKey="1" onChange={() => {}} tabPosition="top">
          {tables.map((table, index) => {
            console.log(tables, 'table');
            return (
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
