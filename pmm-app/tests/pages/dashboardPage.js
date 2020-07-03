const { I } = inject();
const assert = require('assert');

module.exports = {
  // insert your locators and methods here
  // setting locators
  nodesCompareDashboard: {
    url: 'graph/d/node-instance-compare/nodes-compare',
    metrics: [
      'System Info',
      'System Uptime',
      'CPU Cores',
      'RAM',
      'Saturation Metrics',
      'Load Average',
      'CPU Usage',
      'Interrupts',
      'Context Switches',
      'Memory Usage',
      'Swap Usage',
      'Swap Activity',
      'Mountpoint Usage',
      'Free Space',
      'Disk Operations',
      'Disk Bandwidth',
      'Disk IO Utilization',
      'Disk Latency',
      'Disk Load',
      'Network Traffic',
      'Network Utilization Hourly',
      'Load Average',
      'I/O Activity',
    ],
  },
  advancedDataExplorationDashboard: {
    url: 'graph/d/prometheus-advanced/advanced-data-exploration?orgId=1&refresh=1m&var-metric=go_gc_duration_seconds',
    metrics: [
      'View Actual Metric Values (Gauge)',
      'View Metric Rate of Change (Counter)',
      'Metric Rates',
      'Metric Data Table',
    ],
  },
  prometheusDashboard: {
    url: 'graph/d/prometheus/prometheus',
    metrics: [
      'Prometheus Process CPU Usage',
      'Prometheus Process Memory Usage',
      'Disk Space Utilization',
      'Time before run out of space',
      'Avg Chunk Time',
      'Samples Per Chunk',
      'Avg Chunk Size',
      'Bytes/Sample',
      'Head Block Size',
      'Avg Compaction Time',
      'WAL Fsync Time',
      'Head GC Latency',
      'Active Data Blocks',
      'Head Block',
      'Chunk Activity',
      'Reload block data from disk',
      'Compactions',
      'Ingestion',
      'Prometheus Targets',
      'Scraped Target by Job',
      'Scrape Time by Job',
      'Scraped Target by Instance',
      'Scrape Time by Instance',
      'Scrapes by Target Frequency',
      'Scrape Frequency Versus Target',
      'Scraping Time Drift',
      'Prometheus Scrape Interval Variance',
      'Slowest Job',
      'Largest Samples Job',
      'Prometheus Queries',
      'Prometheus Query Execution',
      'Prometheus Query Execution Latency',
      'Prometheus Query Execution Load',
      'HTTP Requests duration by Handler',
      'HTTP Response Average Size by Handler',
      'Top 10 metrics by time series count',
      'Top 10 hosts by time series count',
      'CPU Busy',
      'Mem Avail',
      'Disk Reads',
      'Disk Writes',
      'Network IO',
      'Sys Uptime',
    ],
  },
  prometheusExporterStatusDashboard: {
    url: 'graph/d/prometheus-status/prometheus-exporter-status',
    metrics: [
      'CPU Usage',
      'Memory Usage',
      'File Descriptors Used',
      'Exporter Uptime',
      'Collector Scrape Successful',
      'Collector Execution Time (Log Scale)',
      'Collector Execution Time',
      'MySQL Exporter Errors',
      'Rate of Scrapes',
      'MySQL up',
      'MongoDB Scrape Performance',
      'MongoDB Exporter Errors',
      'MongoDB up',
      'ProxySQL Scrape Performance',
      'ProxySQL Exporter Errors',
      'ProxySQL up',
      'Scrape Durations',
    ],
  },
  nodeSummaryDashboard: {
    url: 'graph/d/node-instance-summary/node-summary',
    metrics: [
      'System Uptime',
      'Virtual CPUs',
      'Load Average',
      'RAM',
      'Memory Available',
      'CPU Usage',
      'CPU Saturation and Max Core Usage',
      'Interrupts and Context Switches',
      'Processes',
      'Memory Utilization',
      'Virtual Memory Utilization',
      'Swap Space',
      'Swap Activity',
      'I/O Activity',
      'Global File Descriptors Usage',
      'Disk IO Latency',
      'Disk IO Load',
      'Network Traffic',
      'Local Network Errors',
      'TCP Retransmission',
    ],
  },
  prometheusExporterOverviewDashboard: {
    url: 'graph/d/prometheus-overview/prometheus-exporters-overview',
    metrics: [
      'Avg CPU Usage per Node',
      'Avg Memory Usage per Node',
      'Monitored Nodes',
      'Exporters Running',
      'CPU Usage',
      'Memory Usage',
      'CPU Cores Used',
      'CPU Used',
      'Mem Used',
      'Virtual CPUs',
      'RAM',
      'File Descriptors Used',
    ],
  },
  proxysqlInstanceSummaryDashboard: {
    url: 'graph/d/proxysql-instance-summary/proxysql-instance-summary',
    metrics: [
      'Client Connections',
      'Client Questions',
      'Active Backend Connections',
      'Failed Backend Connections',
      'Queries Routed',
      'Query processor time efficecy',
      'Connection Free',
      'Latency',
      'Query Cache memory',
      'Query Cache efficiency',
      'Network Traffic',
      'Mirroring efficiency',
      'Memory Utilization',
    ],
  },
  pxcGaleraClusterSummaryDashboard: {
    url: 'graph/d/pxc-cluster-summary/pxc-galera-cluster-summary',
    metrics: [
      'Percona XtraDB / Galera Cluster Size',
      'Flow Control Paused Time',
      'Flow Control Messages Sent',
      'Writeset Inbound Traffic',
      'Writeset Outbound Traffic',
      'Receive Queue',
      'Send Queue',
      'Transactions Received',
      'Transactions Replicated',
      'Average Incoming Transaction Size',
      'Average Replicated Transaction Size',
      'FC Trigger Low Limit',
      'FC Trigger High Limit',
      'IST Progress',
      'Average Galera Replication Latency',
      'Maximum Galera Replication Latency',
    ],
  },
  postgresqlInstanceSummaryDashboard: {
    url: 'graph/d/postgresql-instance-summary/postgresql-instance-summary',
    metrics: [
      'Version',
      'Max Connections',
      'Shared Buffers',
      'Disk-Page Buffers',
      'Memory Size for each Sort',
      'Disk Cache Size',
      'Autovacuum',
      'PostgreSQL Connections',
      'Active Connections',
      'Tuples',
      'Read Tuple Activity',
      'Transactions',
      'Duration of Transactions',
      'Number of Temp Files',
      'Size of Temp Files',
      'Conflicts/Deadlocks',
      'Number of Locks',
      'Operations with Blocks',
      'Buffers',
      'Canceled Queries',
      'Cache Hit Ratio',
      'Checkpoint stats',
      'Number of Locks',
    ],
  },
  mongodbOverviewDashboard: {
    url: 'graph/d/mongodb-instance-summary/mongodb-instance-summary',
    metrics: [
      'Command Operations',
      'Connections',
      'Cursors',
      'Document Operations',
      'Queued Operations',
      'Query Efficiency',
      'Scanned and Moved Objects',
      'getLastError Write Time',
      'getLastError Write Operations',
      'Assert Events',
      'Page Faults',
    ],
  },
  mongoDbClusterSummaryDashboard: {
    url: 'graph/d/mongodb-cluster-summary/mongodb-cluster-summary',
    metrics: [
      'Unsharded DBs',
      'Sharded DBs',
      'Sharded Collections',
      'Shards',
      'Chunks',
      'Balancer Enabled',
      'Chunks Balanced',
      'Mongos Cursors',
      'Change Log Events',
      'Operations Per Shard',
      'Current Connections Per Shard',
      'Cursors Per Shard',
      'Replication Lag by Set',
      'Oplog Range by Set',
      'Collection Lock Time',
      'Amount of Collections in Shards',
      'Size of Collections in Shards',
      'QPS of Mongos Service',
      'QPS of Services in Shard - All',
      'QPS of Config Services',
      'Amount of Indexes in Shards',
      'Dynamic of Indexes',
      'Total Connections',
      'Current Connections Per Shard',
      'Total Mongos Operations'
    ],
  },
  mysqlInstanceSummaryDashboard: {
    url: 'graph/d/mysql-instance-summary/mysql-instance-summary',
    metrics: [
      'MySQL Uptime',
      'Current QPS',
      'InnoDB Buffer Pool Size',
      'Buffer Pool Size of Total RAM',
      'MySQL Connections',
      'MySQL Client Thread Activity',
      'MySQL Questions',
      'MySQL Thread Cache',
      'MySQL Temporary Objects',
      'MySQL Select Types',
      'MySQL Sorts',
      'MySQL Slow Queries',
      'MySQL Aborted Connections',
      'MySQL Table Locks',
      'Network Traffic',
      'MySQL Network Usage Hourly',
      'MySQL Internal Memory Overview',
      'Top Command Counters',
      'Top Command Counters Hourly',
      'MySQL Handlers',
      'MySQL Transaction Handlers',
      'Process States',
      'Top Process States Hourly',
      'MySQL Query Cache Memory',
      'MySQL Query Cache Activity',
      'MySQL File Openings',
      'MySQL Open Files',
      'MySQL Table Open Cache Status',
      'MySQL Open Tables',
      'MySQL Table Definition Cache',
    ],
  },

  mySQLInstanceOverview: {
    url: 'graph/d/mysql-instance-overview/mysql-instances-overview?orgId=1&from=now-2m&to=now&refresh=1m',
    serviceName:
      "//label[contains(text(), 'Service Name')]/following-sibling::value-select-dropdown/descendant::a[@class='variable-value-link']",
  },

  fields: {
    notAvailableMetrics: "//span[contains(text(), 'N/A')]",
    notAvailableDataPoints: "//div[contains(text(),'No data')]",
    metricTitle: "//div[@class='panel-title']",
    reportTitleWithNA:
      "//span[contains(text(), 'N/A')]//ancestor::div[contains(@class,'panel-container')]//span[contains(@class,'panel-title-text')]",
    reportTitleWithNoData:
      "//div[contains(text(),'No data')]//ancestor::div[contains(@class,'panel-container')]//span[contains(@class,'panel-title-text')]",
    otherReportTitleWithNoData:
      "//span[contains(text(),'No Data')]//ancestor::div[contains(@class,'panel-container')]//span[contains(@class,'panel-title-text')]",
    collapsedDashboardRow: "//div[@class='dashboard-row dashboard-row--collapsed']/a",
    annotationMarker: "(//div[contains(@class,'events_marker')])",
  },

  annotationLocator(annotationNumber) {
    return `(//div[contains(@class,'events_marker')])[${annotationNumber}]`;
  },

  annotationTagText(tagValue) {
    return `//span[contains(text(),  '${tagValue}')]`;
  },

  annotationText(annotationTitle) {
    return `//div[contains(text(), '${annotationTitle}')]`;
  },

  verifyAnnotationsLoaded(title, annotationNumber) {
    I.waitForElement(this.fields.annotationMarker, 30);
    I.moveCursorTo(this.annotationLocator(annotationNumber));
    I.waitForVisible(this.annotationText(title), 30);
  },

  // introducing methods
  verifyMetricsExistence(metrics) {
    for (let i in metrics) {
      I.seeElement(this.graphsLocator(metrics[i]));
    }
  },

  graphsLocator(metricName) {
    return "//span[contains(text(), '" + metricName + "')]";
  },

  async verifyThereAreNoGraphsWithNA(acceptableNACount = 0) {
    const numberOfNAElements = await I.grabNumberOfVisibleElements(this.fields.notAvailableMetrics);
    console.log('number of N/A elements is = ' + numberOfNAElements);
    if (numberOfNAElements > acceptableNACount) {
      const titles = await this.grabFailedReportTitles(this.fields.reportTitleWithNA);
      await this.printFailedReportNames(acceptableNACount, numberOfNAElements, titles);
    }
  },

  async verifyThereAreNoGraphsWithoutData(acceptableNoDataCount = 0) {
    const numberOfNoDataElements = await I.grabNumberOfVisibleElements(this.fields.notAvailableDataPoints);
    console.log('number of No Data elements is = ' + numberOfNoDataElements);
    if (numberOfNoDataElements > acceptableNoDataCount) {
      const titles = await this.grabFailedReportTitles(this.fields.reportTitleWithNoData);
      await this.printFailedReportNames(acceptableNoDataCount, numberOfNoDataElements, titles);
    }
  },

  async printFailedReportNames(expectedNumber, actualNumber, titles) {
    assert.equal(
      actualNumber <= expectedNumber,
      true,
      'Expected ' +
        expectedNumber +
        ' Elements with but found ' +
        actualNumber +
        '. Report Names are ' +
        titles
    );
  },

  async grabFailedReportTitles(selector) {
    const reportNames = await I.grabTextFrom(selector);
    return reportNames;
  },

  async expandEachDashboardRow(halfToExpand) {
    let sectionsToExpand;
    const sections = await I.grabTextFrom(this.fields.collapsedDashboardRow);
    if (halfToExpand == 1) {
      sectionsToExpand = sections.slice(0, sections.length / 2);
    } else if (halfToExpand == 2) {
      sectionsToExpand = sections.slice(sections.length / 2, sections.length);
    } else {
      sectionsToExpand = sections;
    }
    await this.expandRows(sectionsToExpand);
  },

  async expandRows(sectionsToExpand) {
    let sections;
    if (typeof sectionsToExpand === 'string') {
      sections = [sectionsToExpand];
    } else {
      sections = sectionsToExpand;
    }
    for (let i = 0; i < sections.length; i++) {
      const sectionName = sections[i].toString().split('(');
      const rowToExpand = `${this.fields.collapsedDashboardRow}[contains(text(), '${sectionName[0]}')]`;
      I.click(rowToExpand);
      I.wait(0.5);
    }
  },

  waitForDashboardOpened() {
    I.waitForElement(this.fields.metricTitle, 30);
  },

  async verifyExisitngServiceName(serviceName) {
    I.waitForElement(this.mySQLInstanceOverview.serviceName, 30);
    I.click(this.mySQLInstanceOverview.serviceName);
    const existingFilter =
      "//span[@class='variable-option-icon']/following-sibling::span[contains(text(), '" +
      serviceName +
      "')]";
    I.seeElement(existingFilter);
  },
};
