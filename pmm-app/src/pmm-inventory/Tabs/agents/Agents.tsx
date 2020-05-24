import React, { FC, ReactElement, useEffect, useState } from 'react';
import { InventoryDataService } from '../../DataService';
import { InventoryService } from '../../Inventory.service';
import { agentsColumns } from '../../panel.constants';
import CustomTable from '../../../react-plugins-deps/components/Table/Table';
import { showSuccessNotification } from '../../../react-plugins-deps/components/helpers';
import Styling from '../services/Services.styles';
import { Button, HorizontalGroup, Modal } from '@grafana/ui';
import { Form as FormFinal } from 'react-final-form';
import { FormElement } from '../../../react-plugins-deps/components/FormComponents';
import { CheckboxField } from '../../../react-plugins-deps/components/FormComponents/Checkbox/Checkbox';

export const Agents = () => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [reload, setReload] = useState({});

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
  }, [reload]);

  const removeAgents = async (nodes, forceMode) => {
    try {
      setLoading(true);
      const requests = nodes
        .map(item => item.original)
        .map(service => InventoryService.removeAgent({ service_id: service.service_id, force: forceMode }));
      await Promise.all(requests);
      showSuccessNotification({ message: 'Agents successfully deleted' });
    } catch (e) {
      console.error(e);
    } finally {
      setReload({});
    }
  };

  const ActionPanel: FC<{ selected: any[] }> = ({ selected }): ReactElement => {
    return (
      <>
        <div className={Styling.actionPanel}>
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
          onDismiss={setModalVisible.bind(null, false)}
        >
          <FormFinal
            onSubmit={() => {}}
            render={({ form, handleSubmit }): ReactElement => {
              return (
                <form onSubmit={handleSubmit}>
                  <>
                    <h4>
                      Are you sure that you want to permanently delete {selected.length}{' '}
                      {selected.length === 1 ? 'agent' : 'agents'}?
                    </h4>
                    <FormElement
                      data-qa="form-field-force"
                      label="Force mode"
                      element={
                        <CheckboxField
                          name="force"
                          label="Force mode is going to delete all Agents associated with the services"
                        />
                      }
                    />
                    <HorizontalGroup justify="space-between" spacing="md">
                      <Button variant="secondary" size="md">
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
      </>
    );
  };

  return (
    <div style={{ padding: '10px' }}>
      <CustomTable
        columns={agentsColumns}
        data={data}
        ActionPanel={ActionPanel}
        noData={<h1>No Nodes Available</h1>}
        loading={loading}
      />
    </div>
  );
  // return <Table dataSource={data} columns={agentsColumns} pagination={false} bordered loading={loading} />;
};
