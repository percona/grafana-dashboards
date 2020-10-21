import React, { FC, useEffect, useState } from 'react';
import { Collapse, Table } from 'antd';
import { ReactJSON } from 'shared/components/Elements/ReactJSON/ReactJSON';
import { Overlay } from 'shared/components/Elements/Overlay/Overlay';
import { Scrollbar } from 'shared/components/Elements/Scrollbar/Scrollbar';
import { processClassicExplain } from './Explain.tools';
import { styles } from './Explain.styles';
import { ClassicExplain, ExplainProps, ExplainTabs } from './Explain.types';
import { useExplains } from './Explain.hooks';
import { Messages } from '../Details.messages';
import { Databases } from '../Details.types';

const { Panel } = Collapse;

const Explain: FC<ExplainProps> = ({ databaseType, examples }) => {
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
            <Overlay isPending={classicExplain.loading}>
              <Scrollbar>
                {classicExplain.error ? <pre>{classicExplain.error}</pre> : null}
                {!classicExplain.error && data.rows.length ? (
                  <Table
                    dataSource={data.rows}
                    columns={data.columns}
                    pagination={false}
                    size="small"
                    bordered
                  />
                ) : null}
                {!classicExplain.error && !data.rows.length ? <pre>{Messages.noClassicExplain}</pre> : null}
              </Scrollbar>
            </Overlay>
          </Panel>
        ) : null}
        <Panel header={ExplainTabs.json} key={ExplainTabs.json} className={styles.panel}>
          <Overlay isPending={jsonExplain.loading}>
            <Scrollbar>
              {jsonExplain.error ? <pre>{jsonExplain.error}</pre> : null}
              {!jsonExplain.error && jsonExplain.value ? (
                <ReactJSON json={JSON.parse(jsonExplain.value)} />
              ) : null}
              {!jsonExplain.error && !jsonExplain.value ? <pre>{Messages.noJsonExplain}</pre> : null}
            </Scrollbar>
          </Overlay>
        </Panel>
      </Collapse>
    </div>
  );
};

export default Explain;
