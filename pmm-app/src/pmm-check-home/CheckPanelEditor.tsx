import React, { PureComponent } from 'react';
import { LegacyForms } from '@grafana/ui';
import { PanelEditorProps } from '@grafana/data';
import { CheckPanelOptions } from 'pmm-check/types';

export class CheckPanelEditor extends PureComponent<PanelEditorProps<CheckPanelOptions>> {
  onTitleChanged = ({ target }: any) => {
    this.props.onOptionsChange({ ...this.props.options, title: target.value });
  };

  render() {
    const { options } = this.props;

    return (
      <div className="section gf-form-group">
        <h5 className="section-heading">Panel Options</h5>
        <LegacyForms.FormField
          label="Title"
          labelWidth={5}
          inputWidth={20}
          type="text"
          onChange={this.onTitleChanged}
          value={options.title || ''}
        />
      </div>
    );
  }
}
