import React, { HTMLProps, useCallback } from 'react';
import { GrafanaTheme } from '@grafana/data';
import { stylesFactory, useTheme } from '@grafana/ui';
import { css, cx } from 'emotion';

export interface CheckboxProps extends Omit<HTMLProps<HTMLInputElement>, 'value'> {
  label?: string;
  value?: boolean;
}

export const getFocusCss = (theme: GrafanaTheme) => css`
  outline: 2px dotted transparent;
  outline-offset: 2px;
  box-shadow: 0 0 0 2px ${(theme.colors as any).pageBg}, 0 0 0px 4px ${theme.colors.formFocusOutline};
  transition: all 0.2s cubic-bezier(0.19, 1, 0.22, 1);
`;

export const getLabelStyles = stylesFactory((theme: GrafanaTheme) => ({
  label: css`
      font-size: ${theme.typography.size.sm};
      font-weight: ${theme.typography.weight.semibold};
      line-height: 1.25;
      margin: ${theme.spacing.formLabelMargin};
      padding: ${theme.spacing.formLabelPadding};
      color: ${theme.colors.formLabel};
      max-width: 480px;
    `,
}));

export const getCheckboxStyles = stylesFactory((theme: GrafanaTheme) => {
  const labelStyles = getLabelStyles(theme);
  const checkboxSize = '16px';

  return {
    label: cx(
      labelStyles.label,
      css`
        padding-left: ${theme.spacing.formSpacingBase}px;
      `
    ),
    wrapper: css`
      position: relative;
      padding-left: ${checkboxSize};
      vertical-align: middle;
    `,
    input: css`
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      &:focus + span {
        ${getFocusCss(theme)}
      }
      &:checked + span {
        background: blue;
        background: ${theme.colors.formCheckboxBgChecked};
        border: none;
        &:hover {
          background: ${theme.colors.formCheckboxBgCheckedHover};
        }
        &:after {
          content: '';
          position: absolute;
          left: 5px;
          top: 1px;
          width: 6px;
          height: 12px;
          border: solid ${theme.colors.formCheckboxCheckmark};
          border-width: 0 3px 3px 0;
          transform: rotate(45deg);
        }
      }
    `,
    checkmark: css`
      display: inline-block;
      width: ${checkboxSize};
      height: ${checkboxSize};
      border-radius: ${theme.border.radius.sm};
      margin-right: ${theme.spacing.formSpacingBase}px;
      background: ${(theme.colors as any).formCheckboxBg};
      border: 1px solid ${theme.colors.formInputBorder};
      position: absolute;
      top: 1px;
      left: 0;
      &:hover {
        cursor: pointer;
        border-color: ${theme.colors.formInputBorderHover};
      }
    `,
  };
});

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({
    label, value, onChange, disabled, ...inputProps
  }, ref) => {
    const theme = useTheme();
    const handleOnChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
          onChange(e);
        }
      },
      [onChange]
    );
    const styles = getCheckboxStyles(theme);

    return (
      <label className={styles.wrapper}>
        <input
          type="checkbox"
          className={styles.input}
          checked={value}
          disabled={disabled}
          onChange={handleOnChange}
          {...inputProps}
          ref={ref}
        />
        <span className={styles.checkmark} />
        {label && <span className={styles.label}>{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
