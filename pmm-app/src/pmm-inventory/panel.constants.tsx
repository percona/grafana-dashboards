/* eslint-disable */
// Will be refactored in PMM-544
import React from 'react';

const getCustomLabels = (customLabels) => customLabels.map((label) => <span key={label.key}>{`${label.key}: ${label.value}`}</span>);

const mainColumns = ['service_id', 'type', 'service_name', 'custom_labels', 'node_id', 'address', 'port'];

// TODO(lunaticusgreen): extract all `render`s to separate components
export const servicesColumns = [
  {
    title: 'ID',
    dataIndex: 'service_id',
    key: 'service_id',
  },
  {
    title: 'Service Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Service name',
    dataIndex: 'service_name',
    key: 'service_name',
  },
  {
    title: 'Node ID',
    dataIndex: 'node_id',
    key: 'node_id',
  },
  {
    title: 'Addresses',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Port',
    dataIndex: 'port',
    key: 'port',
  },
  {
    title: 'Other Details',
    dataIndex: 'age',
    key: 'age',
    render: (text, element) => {
      const labels = Object.keys(element).filter((label) => !mainColumns.includes(label));
      return (
        <div className="other-details-wrapper">
          {labels.map((label, key) => (element[label] ? <span key={key}>{`${label}: ${element[label]}`}</span> : null))}
          {element.custom_labels && getCustomLabels(element.custom_labels)}
        </div>
      );
    },
  },
];

export const agentsColumns = [
  {
    title: 'ID',
    dataIndex: 'agent_id',
    key: 'agent_id',
  },
  {
    title: 'Agent Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Other Details',
    dataIndex: 'age',
    key: 'age',
    render: (text, element) => {
      const mainColumns = ['agent_id', 'type', 'isDeleted', 'service_ids', 'custom_labels'];
      const labels = Object.keys(element).filter((label) => !mainColumns.includes(label));
      return (
        <div className="other-details-wrapper">
          {labels.map((label, key) => (element[label] ? <span key={key}>{`${label}: ${element[label]}`}</span> : null))}
          {element.username ? <span>password: ******</span> : null}
          {/* TODO: know more about isString */}
          {element.service_ids && element.service_ids.length ? (
            /* TODO(lunaticusgreen): all map renders need a key! */
            <>
              service_ids:
              {' '}
              <span>{element.service_ids.map((serviceId) => serviceId)}</span>
            </>
          ) : null}
          {element.custom_labels && getCustomLabels(element.custom_labels)}
        </div>
      );
    },
  },
];

export const nodesColumns = [
  {
    title: 'ID',
    dataIndex: 'node_id',
    key: 'node_id',
  },
  {
    title: 'Node Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Node Name',
    dataIndex: 'node_name',
    key: 'node_name',
  },
  {
    title: 'Addresses',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Other Details',
    dataIndex: 'age',
    key: 'age',
    render: (text, element) => {
      const mainColumns = ['node_id', 'node_name', 'address', 'custom_labels', 'type', 'isDeleted'];
      const labels = Object.keys(element).filter((label) => !mainColumns.includes(label));
      return (
        <div className="other-details-wrapper">
          {labels.map((label, key) => (element[label] ? <span key={key}>{`${label}: ${element[label]}`}</span> : null))}
          {element.custom_labels && getCustomLabels(element.custom_labels)}
        </div>
      );
    },
  },
];
