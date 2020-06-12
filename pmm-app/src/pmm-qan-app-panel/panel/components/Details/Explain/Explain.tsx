import * as React from 'react';
import { useEffect, useState } from 'react';
import { Collapse, Spin, Table } from 'antd';
import { ReactJSON } from 'shared/components/Elements/ReactJSON/ReactJSON';
import { processClassicExplain } from './Explain.tools';
import { styles } from './Explain.styles';
import { DATABASE } from '../Details.constants';
import { ExplainTabs } from './Explain.constants';
import { ExplainProps } from './Explain.types';

const { Panel } = Collapse;


const Explain = ({
  classicExplain,
  jsonExplain,
  databaseType,
}: ExplainProps) => {
  const [data, setData] = useState({ columns: [], rows: [] });
  useEffect(() => {
    setData(processClassicExplain(classicExplain.value));
  }, [classicExplain]);

  return (
    <div>
      {/* eslint-disable-next-line max-len */}
      <Collapse
        bordered={false}
        defaultActiveKey={[ExplainTabs.classic, ExplainTabs.json]}
        className={styles.collapse}
      >
        {databaseType !== DATABASE.mongodb ? (
          <Panel header={ExplainTabs.classic} key={ExplainTabs.classic} className={styles.panel}>
            <Spin spinning={classicExplain.loading}>
              {classicExplain.error ? <pre>{classicExplain.error}</pre> : null}
              {!classicExplain.error && !classicExplain.loading && data.rows.length ? (
                <Table
                  dataSource={data.rows}
                  columns={data.columns}
                  pagination={false}
                  size="small"
                  bordered
                />
              ) : null}
              {/* eslint-disable-next-line max-len */}
              {!classicExplain.error && !classicExplain.loading && !data.rows.length ? (
                <pre>No classic explains found</pre>
              ) : null}
            </Spin>
          </Panel>
        ) : null}
        <Panel header={ExplainTabs.json} key={ExplainTabs.json} className={styles.panel}>
          <Spin spinning={jsonExplain.loading}>
            {!jsonExplain.loading && jsonExplain.error ? <pre>{jsonExplain.error}</pre> : null}
            {!jsonExplain.error && !jsonExplain.loading && jsonExplain.value ? (
              <ReactJSON json={JSON.parse(jsonExplain.value)} />
            ) : null}
            {!jsonExplain.error && !jsonExplain.loading && !jsonExplain.value ? (
              <pre>No JSON explains found</pre>
            ) : null}
          </Spin>
        </Panel>
      </Collapse>
    </div>
  );
};

export default Explain;
