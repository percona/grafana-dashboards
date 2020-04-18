import React from 'react';
import { Table } from 'antd';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-test-renderer';
import { InventoryDataService } from './DataService';
import { agentsColumns, nodesColumns, servicesColumns } from './panel';

jest.mock('../react-plugins-deps/components/helpers/notification-manager', () => () => ({
  showErrorNotification: () => {},
}));

describe('Inventory tables', () => {
  let container = null;
  beforeEach(() => {
    // setup a DOM element as a render target
    // @ts-ignore
    container = document.createElement('div');
    // @ts-ignore
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    // @ts-ignore
    unmountComponentAtNode(container);
    // @ts-ignore
    container.remove();
    container = null;
  });

  it('Agents table renders correct with right data', () => {
    const response = {
      pmm_agent: [{ agent_id: 'pmm-server', runs_on_node_id: 'pmm-server', connected: true }],
      node_exporter: [
        {
          agent_id: '/agent_id/262189d8-e10f-41c2-b0ae-73cc76be6968',
          pmm_agent_id: 'pmm-server',
          status: 'RUNNING',
          listen_port: 42000,
        },
      ],
      postgres_exporter: [
        {
          agent_id: '/agent_id/8b74c54e-4307-4a10-9a6f-1646215cbe07',
          pmm_agent_id: 'pmm-server',
          service_id: '/service_id/ab477624-4ee9-49cd-8bd4-9bf3b91628b2',
          username: 'pmm-managed',
          status: 'RUNNING',
          listen_port: 42001,
        },
      ],
      qan_postgresql_pgstatements_agent: [
        {
          agent_id: '/agent_id/ac55153c-5211-4072-a5de-59eb2a136a5c',
          pmm_agent_id: 'pmm-server',
          service_id: '/service_id/ab477624-4ee9-49cd-8bd4-9bf3b91628b2',
          username: 'pmm-managed',
          status: 'RUNNING',
        },
      ],
    };

    act(() => {
      render(
        <Table
          dataSource={InventoryDataService.generateStructure(response)}
          rowKey={rec => rec[rec.key]}
          columns={agentsColumns}
          pagination={false}
          bordered={true}
          loading={false}
        />,
        container
      );
    });
    // length is 5 because header is also tr
    expect(container.querySelectorAll('tr').length).toEqual(5);
  });

  it('Services table renders correct with right data', () => {
    const response = {
      postgresql: [
        {
          service_id: '/service_id/ab477624-4ee9-49cd-8bd4-9bf3b91628b2',
          service_name: 'pmm-server-postgresql',
          node_id: 'pmm-server',
          address: '127.0.0.1',
          port: 5432,
        },
      ],
    };
    act(() => {
      render(
        <Table
          dataSource={InventoryDataService.generateStructure(response)}
          columns={servicesColumns}
          pagination={false}
          bordered={true}
          loading={false}
        />,
        container
      );
    });
    // length is 2 because header is also tr
    expect(container.querySelectorAll('tr').length).toEqual(2);
  });

  it('Nodes table renders correct with right data', () => {
    const response = {
      generic: [
        { node_id: 'pmm-server', node_name: 'pmm-server', address: '127.0.0.1' },
        { node_id: 'pmm-server2', node_name: 'pmm-server2', address: '127.0.0.1' },
      ],
    };
    act(() => {
      render(
        <Table
          dataSource={InventoryDataService.generateStructure(response)}
          columns={nodesColumns}
          pagination={false}
          bordered={true}
          loading={false}
        />,
        container
      );
    });
    // length is 3 because header is also tr
    expect(container.querySelectorAll('tr').length).toEqual(3);
  });
});
