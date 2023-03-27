// Part of names from https://github.com/percona/pmm/blob/main/docs/managed/data-model.md
export const metadataNames: {[key: string]: {name: string}} = {
  service_name: {
    name: 'Service name',
  },
  database: {
    name: 'Database',
  },
  schema: {
    name: 'Schema',
  },
  username: {
    name: 'Username',
  },
  replication_set: {
    name: 'Replication set',
  },
  cluster: {
    name: 'Cluster',
  },
  service_type: {
    name: 'Service type',
  },
  service_id: {
    name: 'Service ID',
  },
  environment: {
    name: 'Environment',
  },
  node_id: {
    name: 'Node ID',
  },
  node_name: {
    name: 'Node name',
  },
  node_type: {
    name: 'Node type',
  },
};

export const metadataTableHead = {
  main: 'Metadata',
  first: 'Name',
  second: 'Value',
};
