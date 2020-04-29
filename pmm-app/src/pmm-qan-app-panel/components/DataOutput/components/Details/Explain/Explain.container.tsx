import * as React from 'react';
import Explain from './Explain';
import { Spin } from 'antd';
import { useExplain } from './Explain.hooks';

const ExplainContainer = () => {
  const [jsonExplain, traditionalExplain, loading, errorText] = useExplain();

  return (
    <Spin spinning={loading}>
      {errorText ? <pre>{errorText}</pre> : <Explain json={jsonExplain} classic={traditionalExplain} />}
    </Spin>
  );
};

export default ExplainContainer;
