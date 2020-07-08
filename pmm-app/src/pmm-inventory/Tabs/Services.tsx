import React, { useCallback, useEffect, useState } from 'react';
import { Button, HorizontalGroup, Modal } from '@grafana/ui';
import { Form } from 'react-final-form';
import { Table } from 'shared/components/Elements/Table/Table';
import { showSuccessNotification } from 'shared/components/helpers';
import { CheckboxField, FormElement } from 'shared/components/Form';
import { filterFulfilled, InventoryDataService, processPromiseResults } from 'pmm-inventory/Inventory.tools';
import { SelectedTableRows } from 'shared/components/Elements/Table/Table.types';
import { InventoryService } from '../Inventory.service';
import { ServicesList } from '../Inventory.types';
import { SERVICES_COLUMNS } from '../Inventory.constants';
import { styles } from './Tabs.styles';

interface Service {
  service_id: string;
  service_name: string;
  node_id: string;
  address: string;
  port: string;
  [key: string]: string;
}

export const Services = () => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [selected, setSelectedRows] = useState([]);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const result: ServicesList = await InventoryService.getServices();

      setData(InventoryDataService.getServiceModel(result));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  const removeServices = useCallback(async (services: Array<SelectedTableRows<Service>>, forceMode) => {
    try {
      setLoading(true);
      // eslint-disable-next-line max-len
      const requests = services.map((service) => InventoryService.removeService({ service_id: service.original.service_id, force: forceMode }));
      const results = await processPromiseResults(requests);
      const successfullyDeleted = results.filter(filterFulfilled).length;

      showSuccessNotification({
        message: `${successfullyDeleted} of ${services.length} services successfully deleted`,
      });
    } catch (e) {
      console.error(e);
    } finally {
      setSelectedRows([]);
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
          variant="destructive"
          className={styles.destructiveButton}
        >
          Delete
        </Button>
      </div>
      <Modal
        title={(
          <div className="modal-header-title">
            <span className="p-l-1">Confirm action</span>
          </div>
        )}
        isOpen={modalVisible}
        onDismiss={() => setModalVisible(false)}
      >
        <Form
          onSubmit={() => {}}
          render={({ form, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <>
                <h4 className={styles.confirmationText}>
                  Are you sure that you want to permanently delete
                  {' '}
                  {selected.length}
                  {' '}
                  {selected.length === 1 ? 'service' : 'services'}
                  ?
                </h4>
                <FormElement
                  dataQa="form-field-force"
                  label="Force mode"
                  element={(
                    <CheckboxField
                      name="force"
                      label="Force mode is going to delete all associated agents"
                    />
                    )}
                />
                <HorizontalGroup justify="space-between" spacing="md">
                  <Button variant="secondary" size="md" onClick={() => setModalVisible(false)}>
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    size="md"
                    onClick={() => {
                      removeServices(selected, form.getState().values.force);
                      setModalVisible(false);
                    }}
                    className={styles.destructiveButton}
                  >
                    Proceed
                  </Button>
                </HorizontalGroup>
              </>
            </form>
          )}
        />
      </Modal>
      <Table
        columns={SERVICES_COLUMNS}
        data={data}
        rowSelection
        onRowSelection={(selected) => setSelectedRows(selected)}
        noData={<h1>No services Available</h1>}
        loading={loading}
      />
    </div>
  );
};
