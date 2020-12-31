import { Form } from 'react-final-form';
import { Button, Spinner, useTheme } from '@grafana/ui';
import React, { FC, useState } from 'react';
import { TextInputField } from '@percona/platform-core';
import { LinkTooltip } from '../../../../shared/components/Elements/LinkTooltip/LinkTooltip';
import { getSettingsStyles } from '../../../Settings.styles';
import { LoadingCallback } from '../../../Settings.service';
import { Messages } from '../Communication.messages';
import { SlackSettings } from '../../../Settings.types';

export interface SlackProps {
  settings: SlackSettings;
  updateSettings: (body: any, callback: LoadingCallback) => void;
}

export const Slack: FC<SlackProps> = ({ updateSettings, settings }) => {
  const theme = useTheme();
  const settingsStyles = getSettingsStyles(theme);
  const [loading, setLoading] = useState(false);

  const applyChanges = (values) => {
    updateSettings(
      {
        slack_alerting_settings: values,
      },
      setLoading,
    );
  };

  return (
    <>
      <Form
        onSubmit={applyChanges}
        initialValues={settings}
        render={({ handleSubmit, valid, pristine }) => (
          <form onSubmit={handleSubmit}>
            <div className={settingsStyles.labelWrapper}>
              <span>{Messages.fields.slackURL.label}</span>
              <LinkTooltip
                tooltipText={Messages.fields.slackURL.tooltipText}
                link={Messages.fields.slackURL.tooltipLink}
                linkText={Messages.fields.slackURL.tooltipLinkText}
                icon="info-circle"
              />
            </div>
            <TextInputField name="url" />

            <Button
              className={settingsStyles.actionButton}
              type="submit"
              disabled={!valid || pristine || loading}
              data-qa="slack-settings--submit-button"
            >
              {loading && <Spinner />}
              {Messages.actionButton}
            </Button>
          </form>
        )}
      />
    </>
  );
};
