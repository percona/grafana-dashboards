import React from 'react';
import { Collapse } from 'antd';
import { ReactJSON } from '../../../../../react-plugins-deps/components/ReactJSON/ReactJSON';
import { css } from 'emotion';
const { Panel } = Collapse;

const Styling = {
  collapse: css`
    background: #1f1d1d !important;
    margin-bottom: 10 !important;
    border: 1 !important;
    border-color: white !important;
    color: white !important;
    text-color: white !important;
  `,
  panel: css`
    background: transparent !important;
    margin-bottom: 10 !important;
    border: 1 !important;
    border-color: black !important;
    color: white !important;
    text-color: white !important;
  `,
};

const Explain = ({ json, classic }) => {
  return (
    <div>
      <Collapse bordered={false} defaultActiveKey={['1', '2']} className={Styling.collapse}>
        <Panel header="Classic" key="1" className={Styling.panel}>
          {classic}
        </Panel>
        <Panel header="JSON" key="2" className={Styling.panel}>
          <ReactJSON json={json} />
        </Panel>
      </Collapse>
    </div>
  );
};

export default Explain;
