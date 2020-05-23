// @ts-nocheck
import { ConfirmButton, Modal, Icon, Button, HorizontalGroup } from '@grafana/ui';

import React, { ReactElement, useEffect, useState } from 'react';
import { InventoryDataService } from '../DataService';
import { InventoryService } from '../Inventory.service';
import { getCustomLabels, mainColumns } from '../panel.constants';
import TableBodyReact from '../../react-plugins-deps/components/Table/TableBodyReact';
import '../../react-plugins-deps/components/FormComponents/Checkbox/Checkbox.scss';
import { FormElement, InputField } from '../../react-plugins-deps/components/FormComponents';
import { PluginTooltip } from '../../react-plugins-deps/components/helpers';
import { GUI_DOC_URL } from '../../pmm-settings/panel.constants';
import { CheckboxField } from '../../react-plugins-deps/components/FormComponents/Checkbox/Checkbox';
import { TextAreaField } from '../../react-plugins-deps/components/FormComponents/TextArea/TextArea';
import ButtonElement from '../../react-plugins-deps/components/FormComponents/Button/Button';
import { Form as FormFinal } from 'react-final-form';
export const ServicesTab = () => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [reload, setReload] = useState({});
  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        dataIndex: 'service_id',
        accessor: 'service_id',
      },
      {
        Header: 'Service Type',
        dataIndex: 'type',
        accessor: 'type',
      },
      {
        Header: 'Service name',
        dataIndex: 'service_name',
        accessor: 'service_name',
      },
      {
        Header: 'Node ID',
        dataIndex: 'node_id',
        accessor: 'node_id',
      },
      {
        Header: 'Addresses',
        dataIndex: 'address',
        accessor: 'address',
      },
      {
        Header: 'Port',
        dataIndex: 'port',
        accessor: 'port',
      },
      {
        Header: 'Other Details',
        dataIndex: 'age',
        accessor: element => {
          const labels = Object.keys(element).filter(label => !mainColumns.includes(label));
          return (
            <div className="other-details-wrapper">
              {labels.map((label, accessor) =>
                element[label] ? <span accessor={accessor}>{`${label}: ${element[label]}`}</span> : null
              )}
              {element.custom_labels && getCustomLabels(element.custom_labels)}
            </div>
          );
        },
      },
    ],
    []
  );
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
      const requests = services.map(service =>
        InventoryService.removeService({ service_id: service.service_id, force: forceMode })
      );
      const result = await Promise.all(requests);
      setReload({});
    } catch (e) {}
  };

  const ActionPanel = ({ selected }) => {
    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '5px' }}>
          <Button
            size="md"
            disabled={selected.length === 0}
            onClick={() => {
              setModalVisible(!modalVisible);
            }}
            icon="trash-alt"
            variant="destructive"
          >
            Delete
          </Button>
        </div>
        <Modal
          title={
            <div className="modal-header-title">
              <Icon name="exclamation-triangle" size="lg" />
              <span className="p-l-1">Are you sure that you want to permanently delete 2 services?</span>
            </div>
          }
          isOpen={modalVisible}
          onDismiss={setModalVisible.bind(null, false)}
        >
          <FormFinal
            onSubmit={() => {}}
            render={({ form, handleSubmit }): ReactElement => {
              return (
                <form onSubmit={handleSubmit} id="antd">
                  <>
                    <FormElement
                      data-qa="form-field-"
                      label="Force mode"
                      element={
                        <CheckboxField
                          name="force"
                          label="Force mode is going to delete all agents and nodes associated with the services"
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
                          console.log(form.getState().values.force);
                          console.log(selected);
                          removeServices(selected.map(item => item.original), form.getState().values.force);
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
      <TableBodyReact columns={columns} data={data} ActionPanel={ActionPanel} />
    </div>
  );
};
