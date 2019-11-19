import React, { ReactElement, useEffect, useState } from 'react';
import { Form as FormFinal } from 'react-final-form';
import { useForm } from 'react-final-form-hooks';
import { InputField } from '../../react-plugins-deps/components/FieldsComponents/Input';
import { Button, Table } from 'antd';
import './DiscoverySearchPanel.scss';
import DiscoveryService from './Discovery.service';

interface DiscoverySearchPanelInterface {
  selectInstance: (instanceData: any) => void;
}

const DiscoverySearchPanel = (props: DiscoverySearchPanelInterface) => {
  const [instances, setInstances] = useState([] as any);
  const [credentials, setCredentials] = useState({ aws_secret_key: '', aws_access_key: '' });

  const getColumnType = type => {
    switch (type) {
      case 'DISCOVER_RDS_MYSQL':
        return 'MySQL';
      case 'DISCOVER_RDS_POSTGRES':
        return 'Postgres';
      case 'DISCOVER_RDS_INVALID':
        return 'Unknown type';
    }
  };
  const columns = [
    {
      title: 'Type',
      dataIndex: 'type',
      className: 'discovery-column',
      render: element => {
        element ? getColumnType(element.credentials.engine) : 'nothing';
      },
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      className: 'discovery-column',
    },
    {
      title: 'Action',
      className: 'discovery-column',
      render: element => {
        return (
          <Button type="link" onClick={() => props.selectInstance({ type: 'mysql', credentials: element })}>
            Start monitoring
          </Button>
        );
      },
    },
  ];

  useEffect(() => {
    console.log(credentials, 'updated');
    const updateInstances = async () => {
      const result = await DiscoveryService.discoveryRDS({
        aws_secret_key: credentials.aws_secret_key,
        aws_access_key: credentials.aws_access_key,
      });
      setInstances(result['rds_instances']);
    };
    if (credentials.aws_secret_key.length && credentials.aws_access_key.length) {
      updateInstances();
    }
  }, [credentials]);

  return (
    <>
      <div style={{ width: '100%' }}>
        <FormFinal
          onSubmit={values => {
            // debugger;
            // setCredentials()
          }}
          validate={() => {
            return undefined;
          }}
          render={(): ReactElement => {
            const { form, handleSubmit } = useForm({
              onSubmit: values => {
                setCredentials(values);
                console.log(values);
              },
              validate: () => {},
            });

            return (
              <form onSubmit={handleSubmit} className="add-instance-form app-theme-dark">
                <div className="discovery-search-panel">
                  <InputField
                    form={form}
                    name="aws_access_key"
                    data-cy="add-account-username"
                    placeholder="AMAZON_RDS_ACCESS_KEY_ID"
                    required={true}
                  />
                  <InputField
                    form={form}
                    name="aws_secret_key"
                    data-cy="add-account-username"
                    placeholder="AMAZON_RDS_SECRET_ACCESS_KEY"
                    required={true}
                  />
                  <button className="button button--dark" id="addInstance">
                    Discover
                  </button>
                </div>
                <div>
                  <a href="#">Where do i get the security credentials for my amazon RDS DB instance</a>
                </div>
              </form>
            );
          }}
        />
        {instances.length ? (
          <Table
            dataSource={instances}
            pagination={false}
            bordered={false}
            columns={columns}
            rowClassName={() => 'discovery-table-row'}
            style={{ color: 'white' }}
            size={'small'}
          />
        ) : null}
      </div>
    </>
  );
};

export default DiscoverySearchPanel;
