import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import { Collapse, Spin, Table } from 'antd';
import { ReactJSON } from 'shared/components/Elements/ReactJSON/ReactJSON';
import { processClassicExplain } from './Explain.tools';
import { styles } from './Explain.styles';
import { Databases } from '../Details.constants';
import { ClassicExplain, ExplainProps, ExplainTabs } from './Explain.types';
import { useExplains } from './Explain.hooks';
import { Messages } from '../Details.messages';

const { Panel } = Collapse;


const Explain: FC<ExplainProps> = ({
  databaseType,
  examples
}) => {
  const [data, setData] = useState<ClassicExplain>({ columns: [], rows: [] });
  const [jsonExplain, classicExplain] = useExplains(examples, databaseType);

  useEffect(() => {
    setData(processClassicExplain(classicExplain.value));
  }, [classicExplain]);

  return (
    <div>
      <Collapse
        bordered={false}
        defaultActiveKey={[ExplainTabs.classic, ExplainTabs.json]}
        className={styles.collapse}
      >
        {databaseType !== Databases.mongodb ? (
          <Panel header={ExplainTabs.classic} key={ExplainTabs.classic} className={styles.panel}>
            <Spin spinning={classicExplain.loading} wrapperClassName={styles.spinnerWrapper}>
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
                <pre>{Messages.noClassicExplain}</pre>
              ) : null}
            </Spin>
          </Panel>
        ) : null}
        <Panel header={ExplainTabs.json} key={ExplainTabs.json} className={styles.panel}>
          <Spin spinning={jsonExplain.loading} wrapperClassName={styles.spinnerWrapper}>
            {!jsonExplain.loading && jsonExplain.error ? <pre>{jsonExplain.error}</pre> : null}
            {!jsonExplain.error && !jsonExplain.loading && jsonExplain.value ? (
              <ReactJSON json={JSON.parse(jsonExplain.value)} />
            ) : null}
            {!jsonExplain.error && !jsonExplain.loading && !jsonExplain.value ? (
              <pre>{Messages.noJsonExplain}</pre>
            ) : null}
          </Spin>
        </Panel>
      </Collapse>
    </div>
  );
};

export default Explain;
