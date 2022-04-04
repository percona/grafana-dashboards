import React, { HTMLProps, useCallback } from 'react';
import { GrafanaTheme2 } from '@grafana/data';
import { useStyles2 } from '@grafana/ui';
import { css, cx } from '@emotion/css';

export interface CheckboxProps extends Omit<HTMLProps<HTMLInputElement>, 'value'> {
  label?: string;
  value?: boolean;
}

export const getFocusCss = ({ v1: { colors } }: GrafanaTheme2) => css`
  outline: 2px dotted transparent;
  outline-offset: 2px;
  box-shadow: 0 0 0 2px ${(colors as any).pageBg}, 0 0 0px 4px ${colors.formFocusOutline};
  transition: all 0.2s cubic-bezier(0.19, 1, 0.22, 1);
`;

export const getLabelStyles = ({ v1: { typography, spacing, colors } }: GrafanaTheme2) => ({
  label: css`
      font-size: ${typography.size.sm};
      font-weight: ${typography.weight.semibold};
      line-height: 1.25;
      margin: ${spacing.formLabelMargin};
      padding: ${spacing.formLabelPadding};
      color: ${colors.formLabel};
      max-width: 480px;
    `,
});

export const getCheckboxStyles = (theme: GrafanaTheme2) => {
  const labelStyles = getLabelStyles(theme);
  const checkboxSize = '16px';

  return {
    label: cx(
      labelStyles.label,
      css`
        padding-left: ${theme.v1.spacing.formSpacingBase}px;
      `,
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
        background: ${theme.colors.primary.main};
        border: none;
        &:hover {
          background: ${theme.colors.primary.shade};
        }
        &:after {
          content: '';
          position: absolute;
          left: 5px;
          top: 1px;
          width: 6px;
          height: 12px;
          border: solid ${theme.colors.primary.contrastText};
          border-width: 0 3px 3px 0;
          transform: rotate(45deg);
        }
      }
    `,
    checkmark: css`
      display: inline-block;
      width: ${checkboxSize};
      height: ${checkboxSize};
      border-radius: ${theme.v1.border.radius.sm};
      margin-right: ${theme.v1.spacing.formSpacingBase}px;
      background: ${(theme.v1.colors as any).formCheckboxBg};
      border: 1px solid ${theme.v1.colors.formInputBorder};
      position: absolute;
      top: 1px;
      left: 0;
      &:hover {
        cursor: pointer;
        border-color: ${theme.v1.colors.formInputBorderHover};
      }
    `,
  };
};

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({
    label, value, onChange, disabled, ...inputProps
  }, ref) => {
    const handleOnChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
          onChange(e);
        }
      },
      [onChange],
    );
    const styles = useStyles2(getCheckboxStyles);

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
  },
);

Checkbox.displayName = 'Checkbox';
