import React, { FC } from 'react';
import { Switch, useTheme } from '@grafana/ui';
import { getSettingsStyles } from 'pmm-settings/Settings.styles';
import { LinkTooltip } from 'shared/components/Elements/LinkTooltip/LinkTooltip';
import { SwitchRowProps } from './SwitchRow.types';


export const SwitchRow: FC<SwitchRowProps> = ({
  label,
  tooltip = '',
  tooltipLinkText = '',
  link = '',
  disabled,
  className,
  dataQa,
  input
}) => {
  const theme = useTheme();
  const settingsStyles = getSettingsStyles(theme);

  return (
    <tr>
      <td>
        <div className={settingsStyles.labelWrapper}>
          <span>{label}</span>
          <LinkTooltip
            tooltipText={tooltip}
            link={link}
            linkText={tooltipLinkText}
            icon="info-circle"
          />
        </div>
      </td>
      <td className={className}>
        <Switch
          {...input}
          value={input.checked}
          disabled={disabled}
          data-qa={dataQa}
        />
      </td>
    </tr>
  );
};
