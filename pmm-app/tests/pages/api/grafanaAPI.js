const { I } = inject();
const assert = require('assert');
const faker = require('faker');

module.exports = {
  async createCustomDashboard() {
    const headers = { Authorization: `Basic ${await I.getAuth()}` };
    const body = {
      dashboard: {
        annotations: {
          list: [
            {
              builtIn: 1,
              datasource: '-- Grafana --',
              enable: true,
              hide: true,
              iconColor: 'rgba(0, 211, 255, 1)',
              name: 'Annotations & Alerts',
              type: 'dashboard',
            },
          ],
        },
        editable: true,
        panels: [
          {
            dashLength: 10,
            datasource: 'Metrics',
            fill: 1,
            gridPos: {
              h: 9,
              w: 12,
              x: 0,
              y: 0,
            },
            id: 2,
            targets: [
              {
                expr: 'alertmanager_alerts',
                refId: 'A',
              },
            ],
            title: 'Custom Panel',
            type: 'graph',
            xaxis: {
              mode: 'time',
              show: true,
            },
            yaxes: [
              {
                format: 'short',
                logBase: 1,
                show: true,
              },
              {
                format: 'short',
                logBase: 1,
                show: true,
              },
            ],
            yaxis: {
              align: false,
            },
          },
        ],
        schemaVersion: 26,
        style: 'dark',
        time: {
          from: 'now-6h',
          to: 'now',
        },
        title: `${faker.lorem.word()}-dashboard`,
        version: 0,
      },
      folderId: 0,
    };
    const resp = await I.sendPostRequest('graph/api/dashboards/db/', body, headers);

    assert.ok(
      resp.status === 200,
      `Failed to create custom dashboard. Response message is ${resp.data.message}`,
    );

    return resp.data;
  },

  async deleteDashboard(uid) {
    const headers = { Authorization: `Basic ${await I.getAuth()}` };

    const resp = await I.sendDeleteRequest(`graph/api/dashboards/uid/${uid}`, headers);

    assert.ok(
      resp.status === 200,
      `Failed to delete dashboard with uid '${uid}' . Response message is ${resp.data.message}`,
    );
  },

  async starDashboard(id) {
    const headers = { Authorization: `Basic ${await I.getAuth()}` };

    const resp = await I.sendPostRequest(`graph/api/user/stars/dashboard/${id}`, {}, headers);

    assert.ok(
      resp.status === 200,
      `Failed to star dashboard with id '${id}' . Response message is ${resp.data.message}`,
    );
  },

  async setHomeDashboard(id) {
    const headers = { Authorization: `Basic ${await I.getAuth()}` };
    const body = {
      homeDashboardId: id,
    };

    const resp = await I.sendPutRequest('graph/api/org/preferences', body, headers);

    assert.ok(
      resp.status === 200,
      `Failed to set custom Home dashboard '${id}'. Response message is ${resp.data.message}`,
    );
  },
};
