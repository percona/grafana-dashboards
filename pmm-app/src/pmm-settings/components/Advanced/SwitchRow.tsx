import React, { FC } from 'react';
import { Switch, useTheme } from '@grafana/ui';
import { getSettingsStyles } from 'pmm-settings/Settings.styles';
import { LinkTooltip } from 'shared/components/Elements/LinkTooltip/LinkTooltip';
import { getStyles } from './Advanced.styles';


export interface SwitchRowProps {
  label: string;
  tooltip: string;
  tooltipLinkText: string;
  link: string;
  checked: boolean;
  className?: string;
  dataQa?: string;
  onChange?: () => void;
}

export const SwitchRow: FC<SwitchRowProps> = ({
  label,
  tooltip,
  tooltipLinkText,
  link,
  checked,
  className,
  dataQa,
  onChange
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const settingsStyles = getSettingsStyles(theme);

  return (
    <tr>
      <td>
        <div className={settingsStyles.labelWrapper}>
          <span className={styles.label}>{label}</span>
          <LinkTooltip
            tooltipText={tooltip}
            link={link}
            linkText={tooltipLinkText}
            icon="info-circle"
          />
        </div>
      </td>
      <td>
        <Switch
          checked={checked}
          className={className}
          onChange={onChange}
          data-qa={dataQa}
        />
      </td>
    </tr>
  );
};
