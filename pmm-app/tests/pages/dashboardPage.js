const { I, adminPage } = inject();
const assert = require('assert');

module.exports = {
  // insert your locators and methods here
  // setting locators
  nodesCompareDashboard: {
    url: 'graph/d/node-instance-compare/nodes-compare?orgId=1&refresh=1m&from=now-5m&to=now',
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
    url:
      'graph/d/prometheus-advanced/advanced-data-exploration?orgId=1&refresh=1m&var-metric=go_gc_duration_seconds',
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
    url: 'graph/d/prometheus-status/prometheus-exporter-status?orgId=1&refresh=1m&from=now-5m&to=now',
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
  processDetailsDashboard: {
    url: 'graph/d/node-cpu-process/processes-details?from=now-30m&to=now',
  },
  nodeSummaryDashboard: {
    url: 'graph/d/node-instance-summary/node-summary?orgId=1&refresh=5m',
    metrics: [
      'System Uptime',
      'System Summary',
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
    ptSummaryDetail: {
      reportContainer: '//pre',
      ptHeaderText: '# Percona Toolkit System Summary Report ######################',
      remoteNodeText: 'No pmm-agent running on this node',
    },
  },
  prometheusExporterOverviewDashboard: {
    url: 'graph/d/prometheus-overview/prometheus-exporters-overview?orgId=1&refresh=1m&from=now-5m&to=now',
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
  postgresqlInstanceOverviewDashboard: {
    // had to be changed after the PMM-6386 bug will be fixed
    url: 'graph/d/postgresql-instance-overview/postgresql-instances-overview',
    metrics: [
      'Services',
      'Max Active Connections',
      'Total Disk-Page Buffers',
      'Total Memory Size for each Sort',
      'Total Shared Buffers',
      'Services Autovacuum',
      'Top 5 PostgreSQL Connections',
      'Top 5 Active Connections',
      'Idle Connections',
      'Active Connections',
      'Autovacuum',
      'Total Tuples',
      'Max Fetched Tuples',
      'Max Returned Tuples',
      'Max Inserted Tuples',
      'Max Updated Tuples',
      'Max Deleted Tuples',
      'Top 5 Fetched Tuples Rate',
      'Fetched Tuples Rate',
      'Top 5 Returned Tuples Rate',
      'Returned Tuples Rate',
      'Top 5 Inserted Tuples Rate',
      'Inserted Tuples Rate',
      'Top 5 Updated Tuples Rate',
      'Updated Tuples Rate',
      'Top 5 Deleted Tuples Rate',
      'Deleted Tuples Rate',
      'Total Transactions',
      'Max Commits Transactions',
      'Max Rollback Transactions',
      'Max Transaction Duration',
      'Max Number of Temp Files',
      'Max Size of Temp Files',
      'Top 5 Commit Transactions',
      'Commit Transactions',
      'Top 5 Rollbacks Transactions',
      'Rollback Transactions',
      'Top 5 Duration of Active Transactions',
      'Duration of Active Transactions',
      'Top 5 Duration of Other Transactions',
      'Duration of Other Transactions',
      'Top 5 Number of Temp Files',
      'Number of Temp Files',
      'Top 5 Size of Temp Files',
      'Size of Temp Files',
      'Total Locks',
      'Total Deadlocks',
      'Total Conflicts',
      'Min Cache Hit Ratio',
      'Max Cache Hit Ratio',
      'Total Canceled Queries',
      'Top 5 Locks',
      'Locks',
      'Top 5 Deadlocks',
      'Deadlocks',
      'Top 5 Conflicts',
      'Conflicts',
      'Top 5 Lowest Cache Hit Ratio',
      'Cache Hit Ratio',
      'Top 5 Canceled Queries',
      'Canceled Queries',
      'Total Blocks Operations',
      'Max Blocks Writes',
      'Max Blocks Reads',
      'Max Allocated Buffers',
      'Total Written Files to disk',
      'Total Files Synchronization to Disk',
      'Top 5 Read Operations with Blocks',
      'Read Operations with Blocks',
      'Top 5 Write Operations with Blocks',
      'Write Operations with Blocks',
      'Top 5 Allocated Buffers',
      'Allocated Buffers',
      'Top 5 Fsync calls by a backend',
      'Fsync calls by a backend',
      'Top 5 Written directly by a backend',
      'Written directly by a backend',
      'Top 5 Written by the background writer',
      'Written by the background writer',
      'Top 5 Written during checkpoints',
      'Written during checkpoints',
      'Top 5 Files Synchronization to disk',
      'Files Synchronization to disk',
      'Top 5 Written Files to Disk',
      'Written Files to Disk',
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
      'Amount of Collections in Shards',
      'Size of Collections in Shards',
      'QPS of Mongos Service',
      'QPS of Services in Shard - All',
      'QPS of Config Services',
      'Amount of Indexes in Shards',
      'Dynamic of Indexes',
      'Total Connections',
      'Current Connections Per Shard',
      'Total Mongos Operations',
    ],
  },
  mysqlInstanceSummaryDashboard: {
    url: 'graph/d/mysql-instance-summary/mysql-instance-summary?orgId=1&refresh=1m&from=now-5m&to=now',
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
      'MySQL File Openings',
      'MySQL Open Files',
      'MySQL Table Open Cache Status',
      'MySQL Open Tables',
      'MySQL Table Definition Cache',
    ],
  },
  mysqlUserDetailsDashboard: {
    url: 'graph/d/mysql-user/mysql-user-details?orgId=1&refresh=1m&from=now-5m&to=now',
    metrics: [
      'Active Users',
      'Lost Connections',
      'Denied Connections',
      'Access Denied',
      'Total Sessions',
      'Users Activity',
      'Users by Connections Created',
      'Users by Concurrent Connections',
      'Users by Lost Connections',
      'Top Users by Denied Connections',
      'Users by Busy Load',
      'Users by CPU Time',
      'Users by Traffic',
      'Users by Bytes Written to The Binary Log',
      'Rows Fetched/Read',
      'Rows Updated',
      'Users by Rows Fetched/Read',
      'Users by Rows Updated',
      'Users by Rollback Transactions',
      'Users by Commit Transactions',
      'Users by Update Commands',
      'Users by Select Commands',
      'Users by Other Commands',
      'Users by Access Denied',
      'Users by Empty Queries',
      'MySQL Uptime',
      'Version',
      'Current QPS',
      'File Handlers Used',
      'Table Open Cache Miss Ratio',
      'Table Open Cache Size',
      'Table Definition Cache Size',
      'Service',
      'MySQL Connections',
      'MySQL Client Thread Activity',
      'MySQL Handlers',
      'Top Command Counters',
      'Process States',
      'MySQL Network Traffic',
      'System Uptime',
      'Load Average',
      'RAM',
      'Memory Available',
      'Virtual Memory',
      'Disk Space',
      'Min Space Available',
      'Node',
      'CPU Usage',
      'CPU Saturation and Max Core Usage',
      'Disk I/O and Swap Activity',
      'Network Traffic',
    ],
  },
  mongoDbInstanceOverview: {
    url: 'graph/d/mongodb-instance-overview/mongodb-instances-overview?orgId=1&refresh=1m',
  },
  homeDashboard: {
    metrics: [
      'CPU Busy',
      'Mem Avail',
      'Disk Reads',
      'Disk Writes',
      'Network IO',
      'DB Conns',
      'DB QPS',
      'Virtual CPUs',
      'RAM',
      'Host uptime',
      'DB uptime',
    ],
  },
  mySQLInstanceOverview: {
    url: 'graph/d/mysql-instance-overview/mysql-instances-overview?orgId=1&from=now-2m&to=now&refresh=1m',
    metrics: [
      'Services',
      'Min MySQL Uptime',
      'Max MySQL Uptime',
      'Total Current QPS',
      'Total InnoDB Buffer Pool Size',
      'Top MySQL Used Connections',
      'Top MySQL Client Threads Connected',
      'Top MySQL Active Client Threads',
      'Top MySQL Threads Cached',
      'Top 5 MySQL Client Threads Connected',
      'MySQL Client Threads Connected',
      'Top 5 MySQL Active Client Threads',
      'MySQL Idle Client Threads',
      'Top 5 MySQL Thread Cached',
      'Percentage of Cached MySQL Threads',
      'Top MySQL Queries',
      'Top MySQL Questions',
      'Top InnoDB I/O Data Reads',
      'Top InnoDB I/O Data Writes',
      'Top Data Fsyncs',
      'Top 5 MySQL Queries',
      'MySQL QPS',
      'Top 5 MySQL Questions',
      'MySQL Questions in Queries',
      'Top 5 Data Reads',
      'Percentage of Data Read',
      'Top 5 Data Writes',
      'Percentage of Data Writes',
      'Top 5 Data Fsyncs',
      'Percentage of Data Fsyncs',
      'Top MySQL Questions',
      'Top MySQL Selects',
      'Top MySQL Sorts',
      'Top MySQL Aborted Connections',
      'Top MySQL Table Locks',
      'MySQL Temporary Objects',
      'Top 5 MySQL Selects',
      'MySQL Selects',
      'Top 5 MySQL Sorts',
      'MySQL Sorts',
      'MySQL Query Cache Size',
      'MySQL Used Query Cache',
      'Top 5 MySQL File Openings',
      'Top Open Cache Miss Ratio',
      'MySQL Table Definition Cache',
      'Top 5 MySQL Opened Table Definitions',
      'Top 5 MySQL Open Table Definitions',
      'Percentage of Open Table Definitions to Table Definition Cache',
    ],
    serviceName:
      '//label[contains(text(), "Service Name")]/following-sibling::value-select-dropdown/descendant::a[@class="variable-value-link"]',
    urlWithRDSFilter:
      'graph/d/mysql-instance-overview/mysql-instances-overview?orgId=1&'
      + 'from=now-5m&to=now&refresh=1m&var-interval=$__auto_interval_interval&var-region=All&'
      + 'var-environment=All&var-cluster=rds56-cluster&var-replication_set=All&var-az=&'
      + 'var-node_type=All&var-node_model=&var-database=All&var-service_type=All&var-schema=All',
  },
  groupReplicationDashboard: {
    url: 'graph/d/mysql-group-replicaset-summary/mysql-group-replication-summary?orgId=1&refresh=1m',
    metrics: [
      'Group Replication Service States',
      'PRIMARY Service',
      'Replication Group Members',
      'Replication Lag',
      'Transport Time',
      'Replication Delay',
      'Transaction Apply Time',
      'Transaction Time Inside the Local Queue',
      'Transactions Details',
      'Checked Transactions',
      'Transactions Row Validating',
      'Applied Transactions',
      'Rolled Back Transactions',
      'Transactions in the Queue for Checking',
      'Detected Conflicts',
    ],
  },
  mysqlPXCGaleraNodeSummaryDashboard: {
    url: 'graph/d/pxc-node-summary/pxc-galera-node-summary?orgId=1&refresh=1m',
    metrics: [
      'Ready to Accept Queries',
      'Local State',
      'Desync Mode',
      'Cluster Status',
      'gcache Size',
      'FC (normal traffic)',
      'Galera Replication Latency',
      'Galera Replication Queues',
      'Galera Cluster Size',
      'Galera Flow Control',
      'Galera Parallelization Efficiency',
      'Galera Writing Conflicts',
      'Available Downtime before SST Required',
      'Galera Writeset Count',
      'Galera Writeset Size',
      'Galera Writeset Traffic',
      'Galera Network Usage Hourly',
    ],
  },
  mysqlPXCGaleraNodesSummaryDashboard: {
    url: 'graph/d/pxc-nodes-compare/pxc-galera-nodes-compare?orgId=1&refresh=1m',
    metrics: [
      'Ready to Accept Queries',
      'Local State',
      'Desync Mode',
      'Cluster Status',
      'gcache Size',
      'FC (normal traffic)',
    ],
    tabs: [
      'Galera Replication Latency',
      'Galera Replication Queues',
      'Galera Flow Control',
      'Galera Writing Conflicts',
      'Galera Writeset Count',
      'Galera Writeset Traffic',
      'Galera Parallelization Efficiency',
      'Available Downtime before SST Required',
      'Galera Writeset Size',
      'Galera Network Usage Hourly',
    ],
  },

  fields: {
    notAvailableMetrics: '//span[contains(text(), "N/A")]',
    notAvailableDataPoints: '//div[contains(text(),"No data")]',
    metricTitle: '//div[@class="panel-title"]',
    reportTitleWithNA:
      '//span[contains(text(), "N/A")]//ancestor::div[contains(@class,"panel-container")]//span[contains(@class,"panel-title-text")]',
    reportTitleWithNoData:
      '//div[contains(text(),"No data")]//ancestor::div[contains(@class,"panel-container")]//span[contains(@class,"panel-title-text")]',
    otherReportTitleWithNoData:
      '//span[contains(text(),"No Data")]//ancestor::div[contains(@class,"panel-container")]//span[contains(@class,"panel-title-text")]',
    collapsedDashboardRow: '//div[@class="dashboard-row dashboard-row--collapsed"]/a',
    annotationMarker: '(//div[contains(@class,"events_marker")])',
    clearSelection: '//a[@ng-click="vm.clearSelections()"]',
    Last2Days: '//span[contains(text(), "Last 2 days")]',
    timeRangePickerButton: '.btn.navbar-button.navbar-button--tight',
    rootUser: '//div[contains(text(), "root")]',
    dataLinkForRoot: '//div[contains(text(), "Data links")]/..//a',
    navbarLocator: '.navbar-page-btn',
  },

  async checkNavigationBar(text) {
    I.waitForVisible(this.fields.navbarLocator, 30);
    const navbarText = await I.grabTextFrom(this.fields.navbarLocator);

    assert.ok(navbarText.includes(text));
  },

  async getExactFilterValue(filterName) {
    return await I.grabAttributeFrom(`//label[contains(@aria-label, '${filterName}')]/..//a`, 'title');
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
    for (const i in metrics) {
      I.seeElement(this.graphsLocator(metrics[i]));
    }
  },

  verifyTabExistence(tabs) {
    for (const i in tabs) {
      I.seeElement(this.tabLocator(tabs[i]));
    }
  },

  graphsLocator(metricName) {
    return `//span[contains(text(), '${metricName}')]`;
  },

  tabLocator(tabName) {
    return `//a[contains(text(), '${tabName}')]`;
  },

  async verifyThereAreNoGraphsWithNA(acceptableNACount = 0) {
    const numberOfNAElements = await I.grabNumberOfVisibleElements(this.fields.notAvailableMetrics);

    console.log(`number of N/A elements is = ${numberOfNAElements}`);
    if (numberOfNAElements > acceptableNACount) {
      const titles = await this.grabFailedReportTitles(this.fields.reportTitleWithNA);

      await this.printFailedReportNames(acceptableNACount, numberOfNAElements, titles);
    }
  },

  async verifyThereAreNoGraphsWithoutData(acceptableNoDataCount = 0) {
    const numberOfNoDataElements = await I.grabNumberOfVisibleElements(this.fields.notAvailableDataPoints);

    console.log(`number of No Data elements is = ${numberOfNoDataElements}`);
    if (numberOfNoDataElements > acceptableNoDataCount) {
      const titles = await this.grabFailedReportTitles(this.fields.reportTitleWithNoData);

      await this.printFailedReportNames(acceptableNoDataCount, numberOfNoDataElements, titles);
    }
  },

  async printFailedReportNames(expectedNumber, actualNumber, titles) {
    assert.equal(
      actualNumber <= expectedNumber,
      true,
      `Expected ${expectedNumber} Elements with but found ${actualNumber}. Report Names are ${titles}`,
    );
  },

  async grabFailedReportTitles(selector) {
    const reportNames = await I.grabTextFrom(selector);

    return reportNames;
  },

  async expandEachDashboardRow(halfToExpand) {
    let sectionsToExpand;
    const sections = await I.grabTextFrom(this.fields.collapsedDashboardRow);

    if (halfToExpand === 1) {
      sectionsToExpand = sections.slice(0, sections.length / 2);
    } else if (halfToExpand === 2) {
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
      adminPage.peformPageDown(1);
    }
  },

  waitForDashboardOpened() {
    I.waitForElement(this.fields.metricTitle, 60);
  },

  expandFilters(filterType) {
    const filterGroupLocator = `//label[contains(text(), '${filterType}')]/parent::div`;

    I.waitForElement(`${filterGroupLocator}//a`, 30);
    I.click(`${filterGroupLocator}//a`);

    return filterGroupLocator;
  },

  async applyFilter(filterName, filterValue) {
    // eslint-disable-next-line max-len
    const filterSelector = `(//a[@class='variable-value-link']//ancestor::div//label[contains(text(),'${filterName}')])[1]//parent::div//a`;
    const filterValueSelector = `//span[contains(text(), '${filterValue}')]`;
    // eslint-disable-next-line max-len
    const filterNameSelector = `(//a[@class='variable-value-link']//ancestor::div//label[contains(text(),'${filterName}')])[1]`;

    I.waitForElement(filterSelector, 30);
    I.click(filterSelector);
    I.waitForElement(filterValueSelector, 30);
    const numOfElements = await I.grabNumberOfVisibleElements(this.fields.clearSelection);

    if (numOfElements === 1) {
      I.click(this.fields.clearSelection);
    }

    I.waitForElement(filterValueSelector, 30);
    I.click(filterValueSelector);
    I.waitForElement(filterNameSelector, 30);
    I.click(filterNameSelector);
  },

  async getTimeRange() {
    return await I.grabTextFrom(this.fields.timeRangePickerButton);
  },

  async waitPTSummaryInformation() {
    const response = await I.waitForResponse(
      (response) => response.url().endsWith('v1/management/Actions/StartPTSummary') && response.status() === 200,
      { timeout: 60 },
    );

    await I.waitForResponse(
      (response) => response.url().endsWith('v1/management/Actions/Get') && response.status() === 200,
      { timeout: 60 },
    );

    return await response.json();
  },

  async waitAndSwitchTabs(ammountOfTabs) {
    for (let i = 0; i <= 10; i++) {
      const numberOfTabs = await I.grabNumberOfTabs();

      if (numberOfTabs === ammountOfTabs) {
        I.switchToNextTab(1);
        break;
      }
    }
  },
};
