const {I, pmmInventoryPage} = inject();
let assert = require('assert');
module.exports = {

    // insert your locators and methods here
    // setting locators
    url: "graph/d/pmm-inventory/pmm-inventory?orgId=1",
    fields: {
        iframe: "//div[@class='panel-content']//iframe",
        inventoryTable: "//table",
        inventoryTableRows: "//table//tr",
        inventoryTableColumn: "//table//td",
        agentsLink: "//div[@role='tab'][contains(text(),'Agents')]",
        nodesLink: "//div[@role='tab'][contains(text(),'Nodes')]",
        agentsLinkOld: "//a[contains(text(), 'Agents')]",
        nodesLinkOld: "//a[contains(text(), 'Nodes')]",
        pmmAgentLocator: "//table//td[contains(text(), 'PMM Agent')]",
        serviceIdLocatorPrefix: "//table//tr/td[3][contains(text(),'"
    },

    verifyOldMySQLRemoteServiceIsDisplayed(serviceName) {
        I.waitForElement(pmmInventoryPage.fields.iframe, 60);
        I.switchTo(pmmInventoryPage.fields.iframe);
        I.waitForVisible(pmmInventoryPage.fields.inventoryTableColumn, 30);
        I.scrollPageToBottom();
        I.see(serviceName, pmmInventoryPage.fields.inventoryTableColumn);
    },

    verifyMySQLRemoteServiceIsDisplayed(serviceName) {
        I.waitForVisible(pmmInventoryPage.fields.inventoryTableColumn, 30);
        I.scrollPageToBottom();
        I.see(serviceName, pmmInventoryPage.fields.inventoryTableColumn);
    },

    async verifyAgentHasStatusRunning(service_name, version) {
        let agentLinkLocator;
        let serviceId = await this.getServiceId(service_name);
        if (version == "old") {
            agentLinkLocator = this.fields.agentsLinkOld;
        } else {
            agentLinkLocator = this.fields.agentsLink;
        }
        I.click(agentLinkLocator);
        I.waitForElement(this.fields.pmmAgentLocator, 60);
        I.waitForElement(this.fields.inventoryTable, 60);
        let numberOfServices = await I.grabNumberOfVisibleElements("//span[contains(text(), '" + serviceId + "')]/following-sibling::span[contains(text(),'status: RUNNING')]");
        assert.equal(numberOfServices, 2, " Service ID must have only 2 Agents running for different services" + serviceId);

    },

    async getServiceId(serviceName) {
        let serviceIdLocator = this.fields.serviceIdLocatorPrefix + serviceName + "')]/preceding-sibling::td[2]";
        let matchedServices = await I.grabNumberOfVisibleElements(serviceIdLocator);
        await assert.equal(matchedServices, 1, "There must be only one entry for the newly added service with name " + serviceName);
        let serviceId = await I.grabTextFrom(serviceIdLocator);
        return serviceId;
    }
}