import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { InventoryDataService } from '../DataService';
import { InventoryService } from '../Inventory.service';
import { servicesColumns } from '../panel.constants';

export const ServicesTab = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const result = await InventoryService.getServices({});

        setData(InventoryDataService.generateStructure(result));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return <Table dataSource={data} columns={servicesColumns} pagination={false} bordered loading={loading} />;
};
