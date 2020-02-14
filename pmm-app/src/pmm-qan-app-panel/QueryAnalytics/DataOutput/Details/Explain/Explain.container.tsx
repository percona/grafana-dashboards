import * as React from 'react';
import { useEffect, useState } from 'react';
import Explain from './Explain';
import ExplainService from './Explain.service';

const ExplainContainer = props => {
  const { filterBy, groupBy, from, to, labels, tables } = props;
  const [traditionalExplain, setTraditionalExplain] = useState(null);
  const [jsonExplain, setJsonExplain] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const result = await ExplainService.getTraditionalExplain({
          filterBy: filterBy,
          groupBy: groupBy,
          from: from,
          to: to,
          labels: labels,
          tables: tables,
        });
        setTraditionalExplain(result);
      } catch (e) {
        //TODO: add error handling
      }
    })();
    (async () => {
      try {
        const result = await ExplainService.getTraditionalExplainJSON({
          filterBy: filterBy,
          groupBy: groupBy,
          from: from,
          to: to,
          labels: labels,
          tables: tables,
        });
        setJsonExplain(result);
      } catch (e) {
        //TODO: add error handling
      }
    })();
  }, []);
  return <Explain json={jsonExplain} classic={traditionalExplain} />;
};

export default ExplainContainer;
