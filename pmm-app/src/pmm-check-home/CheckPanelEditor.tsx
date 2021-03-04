import React, { PureComponent } from 'react';
import { LegacyForms } from '@grafana/ui';
import { PanelEditorProps } from '@grafana/data';
import { CheckPanelOptions } from 'pmm-check-home/types';

export class CheckPanelEditor extends PureComponent<PanelEditorProps<CheckPanelOptions>> {
  onTitleChanged = ({ target }: any) => {
    const { onOptionsChange, options } = this.props;

    onOptionsChange({ ...options, title: target.value });
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
