## Grafana dashboards for efficient database monitoring

The list of featured dashboards:

- Disk Performance
- Disk Space
- MongoDB Cluster Summary
- MongoDB Overview
- MongoDB ReplSet
- MongoDB RocksDB
- MongoDB WiredTiger
- MongoDB MMAPv1
- MongoDB InMemory
- Node Overview
- MySQL InnoDB Metrics
- MySQL InnoDB Metrics Advanced
- MySQL InnoDB Compression
- MySQL MyISAM/Aria Metrics
- MySQL Overview
- MySQL Performance Schema
- MySQL Query Response Time
- MySQL Replication
- MySQL Table Statistics
- MySQL User Statistics
- MySQL Command Handler Counters Compare
- PXC/Galera Cluster Overview
- PXC/Galera Graphs
- VictoriaMetrics
- ProxySQL Overview
- Summary Dashboard
- System Overview
- Trends Dashboard

These dashboards are part of [Percona Monitoring and Management](https://www.percona.com/doc/percona-monitoring-and-management/2.x/index.html).

See a live demonstration at <https://pmmdemo.percona.com>.

We welcome contributions to this repository! Detailed information in [CONTRIBUTING.md](CONTRIBUTING.md)

## Submitting Bug Reports

If you find a bug in Percona Grafana Dashboards or one of the related projects, you can submit a bug report to that project's [JIRA](https://jira.percona.com) issue tracker.

Your first step should be [to search](https://jira.percona.com/issues/?jql=project%20%3D%20PMM%20AND%20component%20%3D%20%22Grafana%20Dashboards%22) the existing set of open tickets for a similar report. If you find that someone else has already reported your problem, then you can upvote that report to increase its visibility.

If there is no existing report, submit a report following these steps:

1. [Sign in to Percona JIRA.](https://jira.percona.com/login.jsp) You will need to create an account if you do not have one.
2. [Go to the Create Issue screen and select the relevant project.](https://jira.percona.com/secure/CreateIssueDetails!init.jspa?pid=11600&issuetype=1&priority=3&components=11307)
3. Fill in the fields of Summary, Description, Steps To Reproduce, and Affects Version to the best you can. If the bug corresponds to a crash, attach the stack trace from the logs.

An excellent resource is [Elika Etemad's article on filing good bug reports.](http://fantasai.inkedblade.net/style/talks/filing-good-bugs/).

As a general rule of thumb, please try to create bug reports that are:

- _Reproducible._ Include steps to reproduce the problem.
- _Specific._ Include as much detail as possible: which version, what environment, etc.
- _Unique._ Do not duplicate existing tickets.
- _Scoped to a Single Bug._ One bug per report.
