# Grafana dashboards for measuring MySQL performance with Prometheus and InfluxDB

This is a set of Grafana dashboards to be used with Prometheus and InfluxDB datasources for MySQL and system monitoring.
The dashboards rely on `alias` label in the Prometheus config.

 * Cross Server Graphs
 * Disk Performance
 * Galera Graphs
 * MySQL InnoDB Metrics
 * MySQL MyISAM Metrics
 * MySQL Overview
 * MySQL Query Response Time Histograms
 * MySQL Replication
 * MySQL Table Statistics
 * MySQL User Statistics
 * System Overview
 * TokuDB Graphs
 * Trending: 1h downsample [InfluxDB]
 * Trending: 5m downsample [InfluxDB]

For trending dashboards to work you need to create the continuous queries in InfluxDB, see [the instructions](InfluxDB.md).

### Setup instructions

#### Add datasource in Grafana

![image](assets/datasource.png)

#### Edit Prometheus config

The dashboards use `alias` label to work with individual hosts.
Ensure you have `alias` defined for each of your targets.
For example, if you want to monitor `192.168.1.7` the excerpt of the config will be look like this:

    scrape_configs:
      - job_name: monitor
        target_groups:
          - targets: ['192.168.1.7:9100', '192.168.1.7:9104']
            labels:
              alias: db1

Note, adding a new label to the existing Prometheus instance will introduce a mess with the time-series.
So it is recommended to start using `alias` from scratch.

Also it is assumed that the exporters are run with this minimal set of options:

 * node_exporter: `-collectors.enabled="diskstats,filesystem,loadavg,meminfo,netdev,stat,time,uname"`
 * mysqld_exporter: `-collect.binlog_size=true -collect.info_schema.processlist=true`

#### Edit Grafana config

Enable JSON dashboards by uncommenting those lines in `grafana.ini`:

    [dashboards.json]
    enabled = true
    path = /var/lib/grafana/dashboards

If you wish you may import the individual dashboards via UI and ignore this and the next steps.

#### Install dashboards

    git clone https://github.com/percona/grafana-dashboards.git
    cp -r grafana-dashboards/dashboards /var/lib/grafana/

#### Restart Grafana

    service grafana-server restart
 
### Update instructions

Simply copy the new dashboards to `/var/lib/grafana/dashboards` and restart Grafana.

### Graph samples
 
Here is some sample graphs.

![image](assets/sample1.png)

![image](assets/sample2.png)

![image](assets/sample3.png)

![image](assets/sample4.png)

![image](assets/sample5.png)

![image](assets/sample6.png)

![image](assets/sample7.png)

![image](assets/sample8.png)
