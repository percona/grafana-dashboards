import * as React from 'react';
import { useEffect, useState } from 'react';
import Explain from './Explain';
import ExplainService from './Explain.service';
import ExampleService from '../Example/Example.service';

const ExplainContainer = props => {
  const { queryId, groupBy, from, to, labels, tables } = props;
  const [traditionalExplain, setTraditionalExplain] = useState(null);
  const [jsonExplain, setJsonExplain] = useState({});
  const [queryExample, setExample] = useState({});

  // TODO: implement explain
  useEffect(() => {
    (async () => {
      try {
        const result = await ExampleService.getExample({
          filterBy: queryId,
          groupBy,
          from,
          to,
          labels,
          tables,
        });
        setExample(result['query_examples'][0]);

        (async () => {
          try {
            const { action_id } = await ExplainService.getTraditionalExplain({
              database: queryExample.schema,
              query: queryExample.example,
              service_id: queryExample.service_id,
            });
            const explain = await ExplainService.getActionResult({
              action_id,
            });
            setTraditionalExplain(explain.output);
          } catch (e) {
            //TODO: add error handling
          }
        })();

        (async () => {
          try {
            const { action_id } = await ExplainService.getTraditionalExplainJSON({
              database: queryExample.schema,
              query: queryExample.example,
              service_id: queryExample.service_id,
            });
            const explain = await ExplainService.getActionResult({
              action_id,
            });
            setJsonExplain(JSON.parse(explain.output));
          } catch (e) {
            //TODO: add error handling
          }
        })();
      } catch (e) {
        //TODO: add error handling
      }
    })();
  }, []);

  return <Explain json={jsonExplain} classic={traditionalExplain} />;
};

export default ExplainContainer;
