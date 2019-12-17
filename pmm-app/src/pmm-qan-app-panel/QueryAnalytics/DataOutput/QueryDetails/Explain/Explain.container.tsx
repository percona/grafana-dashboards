import {useContext, useEffect, useState} from 'react';
import Explain from './Explain';
import * as React from 'react';
import ExplainService from './Explain.service';

const ExplainContainer = props => {
  const { filterBy, groupBy, periodStartFrom, periodStartTo, labels, tables } = props;
  const [traditionalExplain, setTraditionalExplain] = useState(null);
  const [jsonExplain, setJsonExplain] = useState(null);

  useEffect(() => {
    (async () => {
      const result = await ExplainService.getTraditionalExplain({
        filterBy: filterBy,
        groupBy: groupBy,
        periodStartFrom: periodStartFrom,
        periodStartTo: periodStartTo,
        labels: labels,
        tables: tables,
      });
      setTraditionalExplain(result);
    })();
    (async () => {
      const result = await ExplainService.getTraditionalExplainJSON({
        filterBy: filterBy,
        groupBy: groupBy,
        periodStartFrom: periodStartFrom,
        periodStartTo: periodStartTo,
        labels: labels,
        tables: tables,
      });
      setJsonExplain(result);
    })();
  }, []);
  return <Explain json={jsonExplain} classic={traditionalExplain} />;
};

export default ExplainContainer;
