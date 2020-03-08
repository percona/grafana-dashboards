const I = actor();

module.exports = {

    // insert your locators and methods here
    // setting locators
    url: "graph/d/node-instance-compare/nodes-compare",
    fields: {
        pageHeaderText: "Compare System Parameters",
        notAvailableMetrics: "//span[contains(text(), 'N/A')]"
    },
    metrics: ["System Info", "System Uptime", "CPU Cores", "RAM", "Saturation Metrics", "Load Average", "CPU Usage", "Interrupts", "Context Switches", "Memory  Usage", "Swap Usage", "Swap Activity", "Mountpoint Usage", "Free Space", "Disk Operations", "Disk Bandwidth", "Disk IO Utilization", "Disk Latency", "Disk Load", "Network Traffic", "Network Utilization Hourly", "Load Average", "I/O Activity"],

    panels: ["CPU", "Memory", "Disk partitions", "Disk performance", "Network"],

    graphsLocator (metricName){
        locator = "//span[contains(text(), '"+ metricName +"')]";
        return locator;
    },

    verifyMetricsExistence () {
        for (let i in this.metrics) {
            I.seeElement(this.graphsLocator(this.metrics[i]));
        }
        I.dontSeeElement(this.fields.notAvailableMetrics);
    }
};