import React from 'react';

export const getCustomLabels = customLabels =>
  customLabels.map(label => <span key={label.key}>{`${label.key}: ${label.value}`}</span>);

export const MAIN_COLUMN = [
  'service_id',
  'type',
  'service_name',
  'custom_labels',
  'node_id',
  'address',
  'port',
];

export const SERVICES_COLUMNS = [
  {
    Header: 'ID',
    accessor: 'service_id',
  },
  {
    Header: 'Service Type',
    accessor: 'type',
  },
  {
    Header: 'Service name',
    accessor: 'service_name',
  },
  {
    Header: 'Node ID',
    accessor: 'node_id',
  },
  {
    Header: 'Addresses',
    accessor: 'address',
  },
  {
    Header: 'Port',
    accessor: 'port',
  },
  {
    Header: 'Other Details',
    accessor: element => {
      const labels = Object.keys(element).filter(label => !MAIN_COLUMN.includes(label));
      return (
        <div className="other-details-wrapper">
          {labels.map((label, accessor) =>
            element[label] ? <span key={accessor}>{`${label}: ${element[label]}`}</span> : null
          )}
          {element.custom_labels && getCustomLabels(element.custom_labels)}
        </div>
      );
    },
  },
];

export const AGENTS_COLUMNS = [
  {
    Header: 'ID',
    accessor: 'agent_id',
  },
  {
    Header: 'Agent Type',
    accessor: 'type',
  },
  {
    Header: 'Other Details',
    accessor: element => {
      const mainColumns = ['agent_id', 'type', 'isDeleted', 'service_ids', 'custom_labels'];
      const labels = Object.keys(element).filter(label => !mainColumns.includes(label));
      return (
        <div className="other-details-wrapper">
          {labels.map((label, key) =>
            element[label] ? <span key={key}>{`${label}: ${element[label]}`}</span> : null
          )}
          {element.username ? <span>password: ******</span> : null}
          {element.service_ids && element.service_ids.length ? (
            /* TODO(lunaticusgreen): all map renders need a key! */
            <>
              service_ids: <span>{element.service_ids.map(serviceId => serviceId)}</span>
            </>
          ) : null}
          {element.custom_labels && getCustomLabels(element.custom_labels)}
        </div>
      );
    },
  },
];

export const NODES_COLUMNS = [
  {
    Header: 'ID',
    accessor: 'node_id',
  },
  {
    Header: 'Node Type',
    accessor: 'type',
  },
  {
    Header: 'Node Name',
    accessor: 'node_name',
  },
  {
    Header: 'Addresses',
    accessor: 'address',
  },
  {
    Header: 'Other Details',
    accessor: element => {
      const mainColumns = ['node_id', 'node_name', 'address', 'custom_labels', 'type', 'isDeleted'];
      const labels = Object.keys(element).filter(label => !mainColumns.includes(label));
      return (
        <div className="other-details-wrapper">
          {labels.map((label, key) =>
            element[label] ? <span key={key}>{`${label}: ${element[label]}`}</span> : null
          )}
          {element.custom_labels && getCustomLabels(element.custom_labels)}
        </div>
      );
    },
  },
];
