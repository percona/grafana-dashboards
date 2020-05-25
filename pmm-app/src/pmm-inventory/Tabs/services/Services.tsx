import { Button, HorizontalGroup, Modal } from '@grafana/ui';

import React, { FC, ReactElement, useEffect, useState } from 'react';
import { InventoryDataService } from '../../DataService';
import { InventoryService } from '../../Inventory.service';
import { servicesColumns } from '../../panel.constants';
import CustomTable from '../../../react-plugins-deps/components/Table/Table';
import { FormElement } from '../../../react-plugins-deps/components/FormComponents';
import { CheckboxField } from '../../../react-plugins-deps/components/FormComponents/Checkbox/Checkbox';
import { Form as FormFinal } from 'react-final-form';
import { showSuccessNotification } from '../../../react-plugins-deps/components/helpers';
import Styling from './Services.styles';

export const Services = () => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [reload, setReload] = useState({});

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const result = await InventoryService.getServices({});
        setData(InventoryDataService.generateStructure(result));
      } catch (e) {
      } finally {
        setLoading(false);
      }
    })();
  }, [reload]);

  const removeServices = async (services, forceMode) => {
    try {
      setLoading(true);
      const requests = services
        .map(item => item.original)
        .map(service => InventoryService.removeService({ service_id: service.service_id, force: forceMode }));
      await Promise.all(requests);
      showSuccessNotification({ message: 'Services successfully deleted' });
      setReload({});
    } catch (e) {}
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
                      {selected.length === 1 ? 'service' : 'services'}?
                    </h4>
                    <FormElement
                      data-qa="form-field-force"
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
                      <Button variant="secondary" size="md" onClick={setModalVisible.bind(null, false)}>
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
    <div className={Styling.tableWrapper}>
      <CustomTable
        columns={servicesColumns}
        data={data}
        ActionPanel={ActionPanel}
        noData={<h1>No services Available</h1>}
        loading={loading}
      />
    </div>
  );
};
