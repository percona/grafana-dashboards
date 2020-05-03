import * as React from 'react';
import { useContext } from 'react';
import Explain from './Explain';
import { Spin } from 'antd';
import { DetailsProvider } from '../Details.provider';

const ExplainContainer = () => {
  const {
    detailsState: { classicExplain, jsonExplain },
  } = useContext(DetailsProvider);

  return (
    <Spin spinning={false}>
      {!classicExplain && jsonExplain ? (
        <pre>Cannot display query explain without query example at this time.</pre>
      ) : (
        <Explain json={jsonExplain} classic={classicExplain} />
      )}
    </Spin>
  );
};

export default ExplainContainer;
