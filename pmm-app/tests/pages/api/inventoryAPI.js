const assert = require('assert');
const { I } = inject();
module.exports = {
  // methods for preparing state of application before test
  services: {
    mysql: {
      serviceType: 'MYSQL_SERVICE',
      service: 'mysql',
    },
    mongodb: {
      serviceType: 'MONGODB_SERVICE',
      service: 'mongodb',
    },
    postgresql: {
      serviceType: 'POSTGRESQL_SERVICE',
      service: 'postgresql',
    },
    proxysql: {
      serviceType: 'PROXYSQL_SERVICE',
      service: 'proxysql',
    },
  },

  async verifyServiceExistsAndHasRunningStatus(service, serviceName) {
    let responseService;
    // 30 sec ping for getting created service name
    for (let i = 0; i < 30; i++) {
      const services = await this.apiGetServices(service.serviceType);
      responseService = services.data[service.service].find(obj => {
        return obj.service_name === serviceName;
      });
      if (responseService !== undefined) break;
      await new Promise(r => setTimeout(r, 1000));
    }
    assert.ok(responseService !== undefined, `Service ${serviceName} was not found`);
    const agents = await this.waitForRunningState(responseService.service_id);
    assert.ok(agents, `One or more agents are not running for ${service.service}`);
  },

  async waitForRunningState(serviceId) {
    // 30 sec ping for getting Running status for Agents
    for (let i = 0; i < 30; i++) {
      let agents = await this.apiGetAgents(serviceId);
      let areRunning = Object.values(agents.data)
        .flat(Infinity)
        .every(({ status }) => status === 'RUNNING');
      if (areRunning) {
        return agents;
      }
      await new Promise(r => setTimeout(r, 1000));
    }
    return false;
  },

  async apiGetAgents(serviceId) {
    const body = {
      service_id: serviceId,
    };
    const headers = { Authorization: `Basic ${await I.getAuth()}` };
    return I.sendPostRequest('v1/inventory/Agents/List', body, headers);
  },

  async apiGetServices(serviceType) {
    const body = {
      service_type: serviceType,
    };
    const headers = { Authorization: `Basic ${await I.getAuth()}` };
    return I.sendPostRequest('v1/inventory/Services/List', body, headers);
  },
};
