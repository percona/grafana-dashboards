import React, { useEffect, useState } from 'react';
import { InventoryDataService } from '../../DataService';
import { InventoryService } from '../../Inventory.service';
import { agentsColumns } from '../../panel.constants';
import CustomTable from '../../../react-plugins-deps/components/Table/Table';

export const AgentsTab = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const result = await InventoryService.getAgents({});
        setData(InventoryDataService.generateStructure(result));
      } catch (e) {
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div style={{ padding: '10px' }}>
      <CustomTable
        columns={agentsColumns}
        data={data}
        // ActionPanel={ActionPanel}
        noData={<h1>No Nodes Available</h1>}
        loading={loading}
      />
    </div>
  );
  // return <Table dataSource={data} columns={agentsColumns} pagination={false} bordered loading={loading} />;
};
