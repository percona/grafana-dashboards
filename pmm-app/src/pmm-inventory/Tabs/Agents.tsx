import React, { useCallback, useEffect, useState } from 'react';
import { Button, HorizontalGroup, Modal } from '@grafana/ui';
import { Form } from 'react-final-form';
import { Table, SelectedTableRows } from 'react-plugins-deps/components/Table';
import { showSuccessNotification } from 'react-plugins-deps/components/helpers';
import { filterFulfilled, processPromiseResults } from 'pmm-inventory/Inventory.tools';
import { CheckboxField, FormElement } from 'react-plugins-deps/components/FormComponents';
import { InventoryDataService } from '../DataService';
import { InventoryService } from '../Inventory.service';
import { AGENTS_COLUMNS } from '../panel.constants';
import { styles } from './Tabs.styles';
import { AgentsList } from 'pmm-inventory/Inventory.types';

interface Agent {
  agent_id: string;
  [key: string]: string;
}

export const Agents = () => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [selected, setSelectedRows] = useState([]);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const result: AgentsList = await InventoryService.getAgents();
      setData(InventoryDataService.generateStructure(result));
    } catch (e) {
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  const removeAgents = useCallback(async (agents: Array<SelectedTableRows<Agent>>, forceMode) => {
    try {
      setLoading(true);
      const requests = agents
        .map(item => item.original)
        .map(agent => InventoryService.removeAgent({ agent_id: agent.agent_id, force: forceMode }));
      const results = await processPromiseResults(requests);

      const successfullyDeleted = results.filter(filterFulfilled).length;
      showSuccessNotification({
        message: `${successfullyDeleted} of ${agents.length} agents successfully deleted`,
      });
    } catch (e) {
      console.error(e);
    } finally {
      loadData();
    }
  }, []);

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.actionPanel}>
        <Button
          size="md"
          disabled={selected.length === 0}
          onClick={() => {
            setModalVisible(!modalVisible);
          }}
          icon="trash-alt"
          variant="primary"
        >
          Delete
        </Button>
      </div>
      <Modal
        title={
          <div className="modal-header-title">
            <span className="p-l-1">Confirm action</span>
          </div>
        }
        isOpen={modalVisible}
        onDismiss={() => setModalVisible(false)}
      >
        <Form
          onSubmit={() => {}}
          render={({ form, handleSubmit }) => {
            return (
              <form onSubmit={handleSubmit}>
                <>
                  <h4>
                    Are you sure that you want to permanently delete {selected.length}{' '}
                    {selected.length === 1 ? 'agent' : 'agents'}?
                  </h4>
                  <FormElement
                    dataQa="form-field-force"
                    label="Force mode"
                    element={
                      <CheckboxField
                        name="force"
                        label="Force mode is going to delete all associated agents and services"
                      />
                    }
                  />
                  <HorizontalGroup justify="space-between" spacing="md">
                    <Button variant="secondary" size="md" onClick={() => setModalVisible(false)}>
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      size="md"
                      onClick={() => {
                        removeAgents(selected, form.getState().values.force);
                        setModalVisible(false);
                      }}
                    >
                      Proceed
                    </Button>
                  </HorizontalGroup>
                </>
              </form>
            );
          }}
        />
      </Modal>
      <Table
        columns={AGENTS_COLUMNS}
        data={data}
        rowSelection={{
          onChange: selected => {
            setSelectedRows(selected);
          },
        }}
        noData={<h1>No agents Available</h1>}
        loading={loading}
      />
    </div>
  );
};
