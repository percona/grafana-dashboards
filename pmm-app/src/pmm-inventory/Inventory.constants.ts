import { servicesDetailsRender, agentsDetailsRender, nodesDetailsRender } from './ColumnRenderers';

export const MAIN_COLUMN = [
  'service_id',
  'type',
  'service_name',
  'custom_labels',
  'node_id',
  'address',
  'port',
];

export const SERVICES_COLUMNS = [
  {
    Header: 'ID',
    accessor: 'service_id',
  },
  {
    Header: 'Service Type',
    accessor: 'type',
  },
  {
    Header: 'Service name',
    accessor: 'service_name',
  },
  {
    Header: 'Node ID',
    accessor: 'node_id',
  },
  {
    Header: 'Addresses',
    accessor: 'address',
  },
  {
    Header: 'Port',
    accessor: 'port',
  },
  {
    Header: 'Other Details',
    accessor: servicesDetailsRender,
  },
];

export const AGENTS_COLUMNS = [
  {
    Header: 'ID',
    accessor: 'agent_id',
  },
  {
    Header: 'Agent Type',
    accessor: 'type',
  },
  {
    Header: 'Other Details',
    accessor: agentsDetailsRender,
  },
];

export const NODES_COLUMNS = [
  {
    Header: 'ID',
    accessor: 'node_id',
  },
  {
    Header: 'Node Type',
    accessor: 'type',
  },
  {
    Header: 'Node Name',
    accessor: 'node_name',
  },
  {
    Header: 'Addresses',
    accessor: 'address',
  },
  {
    Header: 'Other Details',
    accessor: nodesDetailsRender,
  },
];
