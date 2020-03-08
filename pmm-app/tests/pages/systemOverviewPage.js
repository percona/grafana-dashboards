const I = actor();

module.exports = {

    // insert your locators and methods here
    // setting locators
    url: "graph/d/node-instance-summary/node-summary",
    fields: {
        pageHeaderText: "System Overview",
        notAvailableMetrics: "//span[contains(text(), 'N/A')]"
    },
    metrics: ["System Uptime", "Virtual CPUs", "Load Average", "RAM", "Memory Available", "CPU Usage", "CPU Saturation and Max Core Usage",
    "Interrupts and Context Switches", "Processes", "Memory Utilization", "Virtual Memory Utilization", "Swap Space", "Swap Activity", "I/O Activity",
    "Global File Descriptors Usage", "Disk IO Latency", "Disk IO Load", "Network Traffic", "Local Network Errors", "TCP Retransmission"],

    graphsLocator (metricName){
        locator = "//span[contains(text(), '"+ metricName +"')]";
        return locator;
    },

    verifyMetricsExistence () {
        for (var i in this.metrics) {
            I.seeElement(this.graphsLocator(this.metrics[i]));
        }
        I.dontSeeElement(this.fields.notAvailableMetrics);
    }
}