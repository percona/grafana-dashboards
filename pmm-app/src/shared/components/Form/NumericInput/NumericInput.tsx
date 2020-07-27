import React, { FC, useCallback, useRef } from 'react';
import { cx } from 'emotion';
import { Input as BaseInput, useTheme } from '@grafana/ui';
import { Props as InputProps } from '@grafana/ui/components/Input/Input';
import { InputLabel } from 'shared/components/Form';
import { getStyles } from './NumericInput.style';

interface NumericInputProps extends InputProps {
  label?: string;
  labelWidth?: number;
}

export const NumericInput: FC<NumericInputProps> = ({
  className,
  disabled = false,
  label = '',
  labelWidth,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const theme = useTheme();
  const styles = getStyles(theme);

  const dispatchChangeEvent = useCallback(() => {
    const event = new Event('change', { bubbles: true });

    inputRef.current!.dispatchEvent(event);
  }, [inputRef]);

  const stepUp = () => {
    inputRef.current!.stepUp();
    dispatchChangeEvent();
  };

  const stepDown = () => {
    inputRef.current!.stepDown();
    dispatchChangeEvent();
  };

  return (
    <span className={cx(styles.wrapper, className)}>
      {label && (
        <div>
          <InputLabel style={labelWidth ? { width: labelWidth * 8, minWidth: 0 } : undefined}>
            {label}
          </InputLabel>
        </div>
      )}
      <span className={styles.inputWrapper}>
        <BaseInput
          {...props}
          ref={inputRef}
          type="number"
          disabled={disabled}
          className={label ? styles.baseInputWithLabel : styles.baseInput}
        />
        {!disabled && (
          <>
            <button
              type="button"
              className={styles.buttonUp}
              onClick={stepUp}
              disabled={disabled}
            >
              <span className={styles.arrowUp} />
            </button>
            <button
              type="button"
              className={styles.buttonDown}
              onClick={stepDown}
              disabled={disabled}
            >
              <span className={styles.arrowDown} />
            </button>
          </>
        )}
      </span>
    </span>
  );
};
