import React, { FC, ReactElement, useEffect, useState } from 'react';
import { Button, HorizontalGroup, Modal } from '@grafana/ui';
import { Form } from 'react-final-form';
import CustomTable from '../../../react-plugins-deps/components/Table/Table';
import { showSuccessNotification } from '../../../react-plugins-deps/components/helpers';
import { FormElement } from '../../../react-plugins-deps/components/FormComponents';
import { CheckboxField } from '../../../react-plugins-deps/components/FormComponents/Checkbox/Checkbox';
import { InventoryDataService } from '../../DataService';
import { InventoryService } from '../../Inventory.service';
import { NODES_COLUMNS } from '../../panel.constants';
import styles from '../Tabs.styles';

export const NodesTab = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [reload, setReload] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

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
  }, [reload]);

  const removeNodes = async (nodes, forceMode) => {
    try {
      setLoading(true);
      const requests = nodes
        .map(item => item.original)
        .map(node => InventoryService.removeNode({ node_id: node.node_id, force: forceMode }));
      // TODO: add es2020 declarations
      // @ts-ignore
      const results = await Promise.allSettled(requests);
      const successfullyDeleted = results.filter(promise => promise.status === 'fulfilled').length;
      showSuccessNotification({
        message: `${successfullyDeleted} of ${nodes.length} nodes successfully deleted`,
      });
    } catch (e) {
      console.error(e);
    } finally {
      setReload({});
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
            render={({ form, handleSubmit }): ReactElement => {
              return (
                <form onSubmit={handleSubmit}>
                  <>
                    <h4>
                      Are you sure that you want to permanently delete {selected.length}{' '}
                      {selected.length === 1 ? 'node' : 'nodes'}?
                    </h4>
                    <FormElement
                      data-qa="form-field-force"
                      label="Force mode"
                      element={
                        <CheckboxField
                          name="force"
                          label={
                            'Force mode is going to delete all ' +
                            'agents and services associated with the nodes'
                          }
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
                          removeNodes(selected, form.getState().values.force);
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
      <CustomTable
        columns={NODES_COLUMNS}
        data={data}
        actionPanel={selected => <ActionPanel selected={selected} />}
        noData={<h1>No nodes Available</h1>}
        loading={loading}
      />
    </div>
  );
};
