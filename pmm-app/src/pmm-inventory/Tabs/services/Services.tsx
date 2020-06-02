import React, { FC, ReactElement, useEffect, useState } from 'react';
import { Button, HorizontalGroup, Modal } from '@grafana/ui';
import { Form } from 'react-final-form';
import { Table } from 'react-plugins-deps/components/Table/Table';
import { showSuccessNotification } from 'react-plugins-deps/components/helpers';
import { CheckboxField, FormElement } from 'react-plugins-deps/components/FormComponents';
import { processPromiseResults, filterFulfilled } from 'pmm-inventory/Inventory.tools';
import { InventoryDataService } from '../../DataService';
import { InventoryService } from '../../Inventory.service';
import { InventoryType } from '../../Inventory.types';
import { SERVICES_COLUMNS } from '../../panel.constants';
import { styles } from '../Tabs.styles';
import { SelectedTableRows } from '../../../react-plugins-deps/components/Table/Table.types';

interface Service {
  service_id: string;
  service_name: string;
  node_id: string;
  address: string;
  port: string;
  [key: string]: string;
}

interface ServicesList {
  [key: InventoryType]: Node[];
}

export const Services = () => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);

  const loadData = async () => {
    setLoading(true);
    try {
      const result: ServicesList = await InventoryService.getServices({});
      setData(InventoryDataService.generateStructure(result));
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const removeServices = async (services: Array<SelectedTableRows<Service>>, forceMode) => {
    try {
      setLoading(true);
      const requests = services
        .map(item => item.original)
        .map(service => InventoryService.removeService({ service_id: service.service_id, force: forceMode }));
      const results = await processPromiseResults(requests);
      const successfullyDeleted = results.filter(filterFulfilled).length;
      showSuccessNotification({
        message: `${successfullyDeleted} of ${services.length} services successfully deleted`,
      });
    } catch (e) {
    } finally {
      loadData();
    }
  };

  const ActionPanel: FC<{ selected: any[] }> = ({ selected }): ReactElement => {
    return (
      <>
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
                      {selected.length === 1 ? 'service' : 'services'}?
                    </h4>
                    <FormElement
                      dataQa="form-field-force"
                      label="Force mode"
                      element={
                        <CheckboxField
                          name="force"
                          label="Force mode is going to delete all agents
                           and nodes associated with the services"
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
                          removeServices(selected, form.getState().values.force);
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
    <div className={styles.tableWrapper}>
      <Table
        columns={SERVICES_COLUMNS}
        data={data}
        actionPanel={selected => <ActionPanel selected={selected} />}
        noData={<h1>No services Available</h1>}
        loading={loading}
      />
    </div>
  );
};
