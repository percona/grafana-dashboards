import React, { ReactElement, useContext } from 'react';
import Humanize from '../../../../react-plugins-deps/helpers/humanize';
import './QueryAnalyticsFilters.scss';
import { Divider } from 'antd';
import { StateContext } from '../../StateContext';
import FiltersService from '../../storage/filtersService';
import { CheckboxField } from '../../../../react-plugins-deps/components/FieldsComponents/Checkbox/Checkbox';
import { useForm } from 'react-final-form-hooks';
import { InputField } from '../../../../react-plugins-deps/components/FieldsComponents/Input/Input';
import { PasswordField } from '../../../../react-plugins-deps/components/FieldsComponents/Password/Password';
import { TextAreaField } from '../../../../react-plugins-deps/components/FieldsComponents/TextArea/TextArea';
import { Form as FormFinal } from 'react-final-form';

const checkboxGroup = (form, name, items, showPercentage) => {
  return (
    <div>
      <Divider>{name}</Divider>
      {items
        .filter(item => item.value)
        .map(item => {
          return (
            <div className={'filter-label'}>
              <span className={'filter-name'}>
                <CheckboxField form={form} name={'testerok'} label={item.value} checked={item.checked} />
              </span>
              {showPercentage && <span className={'percentage'}>{Humanize.formatPercent(item.main_metric_percent)}</span>}
            </div>
          );
        })}
    </div>
  );
};

const checkboxGroups = [
  {
    name: 'Environment',
    dataKey: 'environment',
  },
  {
    name: 'Cluster',
    dataKey: 'cluster',
  },
  {
    name: 'Replication Set',
    dataKey: 'replication_set',
  },
  {
    name: 'Database',
    dataKey: 'database',
  },
  {
    name: 'Schema',
    dataKey: 'schema',
  },
  {
    name: 'Node Name',
    dataKey: 'node_name',
  },
  {
    name: 'Service Name',
    dataKey: 'service_name',
  },
  {
    name: 'Client Host',
    dataKey: 'client_host',
  },
  {
    name: 'User Name',
    dataKey: 'username',
  },
  {
    name: 'Service Type',
    dataKey: 'service_type',
  },
  {
    name: 'Node Type',
    dataKey: 'node_type',
  },
  {
    name: 'City',
    dataKey: 'city',
  },
  {
    name: 'Availability Zone',
    dataKey: 'az',
  },
];

const QueryAnalyticsFilters = props => {
  const context = useContext(StateContext);
  const filters = FiltersService.getQueryOverviewFiltersList(context.selectedVariables);
  return (
    <FormFinal
      onSubmit={() => {}}
      render={(): ReactElement => {
        const { form, handleSubmit } = useForm({
          onSubmit: () => {},
          validate: () => {},
          initialValues: {},
        });
        // @ts-ignore
        return (
          <form onSubmit={handleSubmit} className="add-instance-form app-theme-dark">
            <div className={'query-analytics-filters-wrapper'}>
              {checkboxGroups.map(group => {
                return checkboxGroup(form, group.name, filters[group.dataKey].name, props.showPercentage);
              })}
            </div>
          </form>
        );
      }}
    />
  );
};

export default QueryAnalyticsFilters;
