const I = actor();

module.exports = {

    // insert your locators and methods here
    // setting locators
    url: "graph/d/prometheus/prometheus",
    urlWithRecent: "graph/d/SK8vJ2Hiz/prometheus?refresh=1m&orgId=1&from=now-1m&to=now",
    fields: {
        pageHeaderText: "Prometheus",
        notAvailableMetrics: "//span[contains(text(), 'N/A')]",
        notAvailableDataPoints: "//div[contains(text(),'No data')]"
    },
    metrics: ["Prometheus Process CPU Usage", "Prometheus Process  Memory Usage", "Disk Space Utilization", "Time before run out of space",
        "Avg Chunk Time", "Samples Per Chunk", "Avg Chunk Size", "Bytes/Sample", "Head Block Size", "Avg Compaction Time", "WAL Fsync Time", "Head GC Latency",
        "Active Data Blocks", "Head Block", "Chunk Activity", "Reload block data from disk", "Compactions", "Ingestion", "Prometheus Targets",
        "Scraped Target by Job", "Scrape Time by Job", "Scraped Target by Instance", "Scrape Time by Instance", "Scrapes by Target Frequency", "Scrape Frequency Versus Target",
        "Scraping Time Drift", "Prometheus Scrape Interval Variance", "Slowest Job", "Largest Samples Job", "Prometheus Queries", "Prometheus Query Execution",
        "Prometheus Query Execution Latency", "Prometheus Query Execution Load", "HTTP Requests duration by Handler", "HTTP Response Average Size by Handler",
        "Top 10 metrics by time series count", "Top 10 hosts by time series count", "CPU Busy", "Mem Avail", "Disk Reads", "Disk Writes", "Network IO", "Sys Uptime"
        ],

    panels: ["System Level Metrics", "Time Series Information", "Network", "Queries", "Scraping", "Storage (TSDB) Overview", "Resources"],

    graphsLocator (metricName){
        locator = "//span[contains(text(), '"+ metricName +"')]";
        return locator;
    },

    verifyMetricsExistence () {
        for (let i in this.metrics) {
            I.seeElement(this.graphsLocator(this.metrics[i]));
        }
        // TODO: This element may exist, so this part should be reconsidered or test is unstable
        // I.seeNumberOfVisibleElements(this.fields.notAvailableMetrics, 8);
    }
};
