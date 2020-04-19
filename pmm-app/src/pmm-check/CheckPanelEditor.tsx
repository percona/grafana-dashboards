import React, { PureComponent } from 'react';
import { FormField } from '@grafana/ui';
import { PanelEditorProps } from '@grafana/data';
import { SimpleOptions } from './types';

export class CheckPanelEditor extends PureComponent<PanelEditorProps<SimpleOptions>> {
  onTitleChanged = ({ target }: any) => {
    this.props.onOptionsChange({ ...this.props.options, title: target.value });
  };

  render() {
    const { options } = this.props;

    return (
      <div className="section gf-form-group">
        <h5 className="section-heading">Display</h5>
        <FormField
          label="Text"
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
