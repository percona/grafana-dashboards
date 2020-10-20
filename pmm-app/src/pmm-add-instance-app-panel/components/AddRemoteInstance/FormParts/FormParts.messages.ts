export const Messages = {
  form: {
    trackingOptions: {
      none: "Don't track",
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
        tls: 'Skip connection check',
        tlsSkipVerify: 'Skip connection check',
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
        customLabels: '"Custom labels\n' + '      Format:\n' + '      key1:value1\n' + '      key2:value2"',
      },
      additionalOptions: {},
    },
  },
};
