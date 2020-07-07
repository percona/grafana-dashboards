import { getDataSourceSrv } from '@grafana/runtime';

const dataSource = getDataSourceSrv();

export const useGrafanaTimerangeChange = ({ onTimeRangeChange, onRefresh, rawTime }) => {
  const templateVariables = (dataSource as any).templateSrv.variables;
  const { variableSrv } = templateVariables[0];
  // eslint-disable-next-line no-underscore-dangle
  const handler = variableSrv.dashboard.events.emitter._events['time-range-updated'][0];

  const updateHandler = (event) => {
    if (
      rawTime.from !== event.raw.from
      || rawTime.to !== event.raw.to
    ) {
      onTimeRangeChange(event);
    } else {
      onRefresh(event);
    }
  };

  handler.fn = updateHandler;
  // eslint-disable-next-line no-underscore-dangle
  variableSrv.dashboard.events.emitter._events['time-range-updated'] = [handler];
};
