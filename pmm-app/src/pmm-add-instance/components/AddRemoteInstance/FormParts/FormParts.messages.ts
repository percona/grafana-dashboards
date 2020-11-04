export const Messages = {
  form: {
    trackingOptions: {
      none: 'Don\'t track',
      pgStatements: 'PG Stat Statements',
      pgMonitor: 'PG Stat Monitor',
    },
    labels: {
      trackingOptions: 'Stat tracking options',
      mainDetails: {
        address: 'Hostname',
        serviceName: 'Service name',
        port: 'Port',
        username: 'Username',
        password: 'Password',
      },
      labels: {
        environment: 'Environment',
        region: 'Region',
        az: 'Availability Zone',
        replicationSet: 'Replication set',
        cluster: 'Cluster',
        customLabels: 'Custom labels',
      },
      additionalOptions: {
        skipConnectionCheck: 'Skip connection check',
        tls: 'Use TLS for database connections',
        tlsSkipVerify: 'Skip TLS certificate and hostname validation',
        qanMysqlPerfschema: 'Use performance schema',
        qanMongodbProfiler: 'Use QAN MongoDB Profiler',
        disableBasicMetrics: 'Disable Basic Metrics',
        disableEnchancedMetrics: 'Disable Enhanced Metrics',
      },
    },
    placeholders: {
      mainDetails: {
        address: 'Hostname',
        serviceName: 'Service name (default: Hostname)',
        username: 'Username',
        password: 'Password',
      },
      labels: {
        environment: 'Environment',
        region: 'Region',
        az: 'Availability Zone',
        replicationSet: 'Replication set',
        cluster: 'Cluster',
        customLabels: '"Custom labels\n Format:\n      key1:value1\n      key2:value2"',
      },
      additionalOptions: {},
    },
    tooltips: {
      mainDetails: {
        address: 'Public DNS hostname of your instance',
        serviceName: 'Service name to use',
        port: 'Port your service is listening on',
        username: 'Your database user name',
        password: 'Your database password',
      },
      labels: {
        region: 'Region',
        az: 'Availability Zone',
      },
    },
    titles: {
      mainDetails: 'Main details',
      labels: 'Labels',
      additionalOptions: 'Additional options',
    },
  },
};
