import * as React from 'react';
import Explain from './Explain';
import { Spin } from 'antd';

const ExplainContainer = ({ classicExplain, jsonExplain }) => {
  return (
    <Spin spinning={false}>
      {!classicExplain && jsonExplain ? (
        <pre>Cannot display query explain without query explain at this time.</pre>
      ) : (
        <Explain json={jsonExplain} classic={classicExplain} />
      )}
    </Spin>
  );
};

export default ExplainContainer;
