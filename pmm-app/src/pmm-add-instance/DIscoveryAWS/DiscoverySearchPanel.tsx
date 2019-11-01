import React, { Component, ReactElement, useEffect, useState } from 'react';
import { Form as FormFinal } from 'react-final-form';
import { InputField } from '../../react-plugins-deps/components/fields-components/Input';
import { Button, Table } from 'antd';
import './DiscoverySearchPanel.scss';

interface DiscoverySearchPanelInterface {
  selectInstance: (instanceData: any) => void;
}

const dataSource = [
  {
    key: '1',
    type: 'mongodb',
    address: 'mongo.example.com',
  },
  {
    key: '2',
    type: 'mysql',
    address: 'mysql.example.com',
  },
  {
    key: '3',
    type: 'postgresql',
    address: 'psql.example.com',
  },
];

const DiscoverySearchPanel = (props: DiscoverySearchPanelInterface) => {
  const [instances, setInstances] = useState([]);
  const [credentials, setCredentials] = useState([]);

  const columns = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Action',
      render: element => {
        return <Button onClick={() => props.selectInstance(element)}>Start monitoring</Button>;
      },
    },
  ];

  useEffect(() => {
    console.log('search starterd');
    setInstances(dataSource);
  }, [credentials]);

  return (
    <>
      <div style={{ width: '600px' }}>
        <FormFinal
          onSubmit={setCredentials}
          validate={() => {
            return undefined;
          }}
          render={({ handleSubmit }): ReactElement => (
            <form className="add-instance-form app-theme-dark">
              {/*<div className="discovery-search-panel">*/}
              {/*  <InputField name="amazonAccessKey" data-cy="add-account-username" placeholder="AMAZON_RDS_ACCESS_KEY_ID" required={true} />*/}
              {/*  <InputField name="amazonSecretKey" data-cy="add-account-username" placeholder="AMAZON_RDS_SECRET_ACCESS_KEY" required={true} />*/}
              {/*  <button onClick={handleSubmit} className="button button--dark" id="addInstance">*/}
              {/*    Discover*/}
              {/*  </button>*/}
              {/*</div>*/}
              {/*<div>*/}
              {/*  <a href="#">Where do i get the security credentials for my amazon RDS DB instance</a>*/}
              {/*</div>*/}
            </form>
          )}
        />
        {instances.length && <Table dataSource={instances} columns={columns} size={'small'} />}
      </div>
    </>
  );
};

export default DiscoverySearchPanel;
