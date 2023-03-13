// Part of tooltips from https://github.com/percona/pmm/blob/main/docs/managed/data-model.md
export const metadataNamesTooltips: {[key: string]: {name: string, tooltip: string}} = {
  service_name: {
    name: 'Service name',
    tooltip: 'Unique across all Services user-defined name, can be changed.',
  },
  database: {
    name: 'Database',
    tooltip: 'Database.',
  },
  schema: {
    name: 'Schema',
    tooltip: 'Schema.',
  },
  username: {
    name: 'Username',
    tooltip: 'Username for scraping metrics / Authentication user.',
  },
  replication_set: {
    name: 'Replication set',
    tooltip: 'Replication set (group) name.',
  },
  cluster: {
    name: 'Cluster',
    tooltip: 'Cluster name.',
  },
  service_type: {
    name: 'Service type',
    tooltip: 'Service type.',
  },
  service_id: {
    name: 'Service ID',
    tooltip: 'Unique randomly generated instance identifier, can\'t be changed. Value format: "/service_id/".',
  },
  environment: {
    name: 'Environment',
    tooltip: 'Environment name.',
  },
  node_id: {
    name: 'Node ID',
    tooltip: 'Unique randomly generated instance identifier, can\'t be changed. Value format: "/node_id/".',
  },
  node_name: {
    name: 'Node name',
    tooltip: 'User-defined name, unique across all Nodes, can be changed.',
  },
  node_type: {
    name: 'Node type',
    tooltip: 'Node type.',
  },
};

export const metadataTableHead = {
  main: 'Metadata',
  first: 'Name',
  second: 'Value',
};
