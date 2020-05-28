import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { InventoryDataService } from '../DataService';
import { InventoryService } from '../Inventory.service';
import { agentsColumns } from '../panel.constants';

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
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return <Table dataSource={data} columns={agentsColumns} pagination={false} bordered loading={loading} />;
};
