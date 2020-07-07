import { getDataSourceSrv } from '@grafana/runtime';
import { useEffect } from 'react';

const dataSource = getDataSourceSrv();

export const useGrafanaTimerangeChange = ({ onTimeRangeChange, onRefresh, rawTime }) => {
  const templateVariables = (dataSource as any).templateSrv.variables;
  const { variableSrv } = templateVariables[0];
  // eslint-disable-next-line no-underscore-dangle

  useEffect(() => {
    // eslint-disable-next-line no-underscore-dangle
    const handler = variableSrv.dashboard.events.emitter._events['time-range-updated'][0];

    let { from } = rawTime;
    let { to } = rawTime;

    const updateHandler = (event) => {
      if (from !== event.raw.from || to !== event.raw.to) {
        onTimeRangeChange(event);
      } else {
        onRefresh(event);
      }

      from = event.raw.from;
      to = event.raw.to;
    };

    handler.fn = updateHandler;
    console.log(handler);
    // eslint-disable-next-line  no-underscore-dangle
    variableSrv.dashboard.events.emitter._events['time-range-updated'].unshift(handler);
  }, []);
};
