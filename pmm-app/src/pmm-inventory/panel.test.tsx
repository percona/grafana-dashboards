import React from 'react';
import CustomTable from '../react-plugins-deps/components/Table/Table';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { InventoryDataService } from './DataService';
import { agentsColumns, nodesColumns, servicesColumns } from './panel.constants';

jest.mock('../react-plugins-deps/components/helpers/notification-manager');

xdescribe('Inventory tables', () => {
  let container: Element;
  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
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
        <CustomTable
          data={InventoryDataService.generateStructure(response)}
          rowKey={rec => rec.agent_id}
          columns={agentsColumns}
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
        <CustomTable
          data={InventoryDataService.generateStructure(response)}
          rowKey={rec => rec.service_id}
          columns={servicesColumns}
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
        <CustomTable
          data={InventoryDataService.generateStructure(response)}
          rowKey={rec => rec.node_id}
          columns={nodesColumns}
          loading={false}
        />,
        container
      );
    });
    // length is 3 because header is also tr
    expect(container.querySelectorAll('tr').length).toEqual(3);
  });
});
