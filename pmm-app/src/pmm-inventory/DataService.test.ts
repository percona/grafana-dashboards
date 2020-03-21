import { InventoryDataService } from './DataService';

describe('Inventory data service', () => {
  it('Transforms response correct', () => {
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
    const testTransformedData = [
      {
        custom_labels: [],
        type: 'PMM Agent',
        isDeleted: false,
        agent_id: 'pmm-server',
        runs_on_node_id: 'pmm-server',
        connected: true,
      },
      {
        custom_labels: [],
        type: 'Node exporter',
        isDeleted: false,
        agent_id: '/agent_id/262189d8-e10f-41c2-b0ae-73cc76be6968',
        pmm_agent_id: 'pmm-server',
        status: 'RUNNING',
        listen_port: 42000,
      },
      {
        custom_labels: [],
        type: 'Postgres exporter',
        isDeleted: false,
        agent_id: '/agent_id/8b74c54e-4307-4a10-9a6f-1646215cbe07',
        pmm_agent_id: 'pmm-server',
        service_id: '/service_id/ab477624-4ee9-49cd-8bd4-9bf3b91628b2',
        username: 'pmm-managed',
        status: 'RUNNING',
        listen_port: 42001,
      },
      {
        custom_labels: [],
        type: 'QAN PostgreSQL PgStatements Agent',
        isDeleted: false,
        agent_id: '/agent_id/ac55153c-5211-4072-a5de-59eb2a136a5c',
        pmm_agent_id: 'pmm-server',
        service_id: '/service_id/ab477624-4ee9-49cd-8bd4-9bf3b91628b2',
        username: 'pmm-managed',
        status: 'RUNNING',
      },
    ];
    expect(InventoryDataService.generateStructure(response)).toEqual(testTransformedData);
  });
});
