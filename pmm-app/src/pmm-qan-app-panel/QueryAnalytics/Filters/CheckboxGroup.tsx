import React, { useState } from 'react';
import { CheckboxField } from '../../../react-plugins-deps/components/FormComponents/Checkbox/Checkbox';
import { Humanize } from '../../../react-plugins-deps/components/helpers/Humanization';
import { Divider } from 'antd';
import './CheckboxGroup.scss';

const TOP_LIMIT = 5;

export const CheckboxGroup = ({ form, name, items, group, showAll, filter, labels }) => {
  const [showTop, setShowTop] = useState(false);
  const data = showTop ? items.slice(0, TOP_LIMIT) : items;
  const itemsList = data
    .filter(item => item.value)
    .filter(item => {
      if (!showAll) {
        return item.checked;
      }
      return true;
    })
    .filter(item => item.value.toLowerCase().includes(filter.toLowerCase()))
    .map(item => {
      console.log('checked----', item.value, labels[group], labels && labels[group] && labels[group].includes(item.value));
      return (
        <div className={'filter-label'}>
          <span className={'filter-name'}>
            <CheckboxField
              form={form}
              name={`${group}:${item.value}`}
              label={item.value}
              checked={labels && labels[group] && labels[group].includes(item.value)}
            />
          </span>
          <span className={'percentage'}>
            <span>{Humanize.transform(item.main_metric_percent, 'percent')}</span>
          </span>
        </div>
      );
    });
  return itemsList.length ? (
    <div>
      <p style={{ display: 'flex', justifyItems: 'space-between', marginBottom: '0', marginTop: '20px' }}>
        <span style={{ marginRight: 'auto' }}>{name}</span>
        {items.length > TOP_LIMIT ? (
          <span
            onClick={() => {
              setShowTop(!showTop);
            }}
            style={{ cursor: 'pointer' }}
          >
            {showTop ? `Show all (${items.length})` : `Show top ${TOP_LIMIT}`}
          </span>
        ) : (
          <span></span>
        )}
      </p>
      <Divider style={{ marginTop: '0', marginBottom: '5px' }}></Divider>
      {itemsList}
    </div>
  ) : null;
};
