const { I, overviewPage } = inject();
const assert = require('assert');

module.exports = {
    mySQLInstanceOverview: {
      url: 'graph/d/mysql-instance-overview/mysql-instances-overview?orgId=1&from=now-12h&to=now&refresh=1m',
      serviceName: "//label[contains(text(), 'Service Name')]/following-sibling::value-select-dropdown/descendant::a[@class='variable-value-link']"
    },

    async verifyExisitngServiceName(serviceName)
    {
        I.click(this.mySQLInstanceOverview.serviceName);
        let existingFilter = "//span[@class='variable-option-icon']/following-sibling::span[contains(text(), '" + serviceName + "')]"
        I.seeElement(existingFilter);
    }
};
