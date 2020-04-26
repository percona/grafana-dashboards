import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { InventoryDataService } from '../DataService';
import { InventoryService } from '../Inventory.service';
import { nodesColumns } from '../panel.constants';

export const NodesTab = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const result = await InventoryService.getNodes({});
        setData(InventoryDataService.generateStructure(result));
      } catch (e) {
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return <Table dataSource={data} columns={nodesColumns} pagination={false} bordered loading={loading} />;
};
