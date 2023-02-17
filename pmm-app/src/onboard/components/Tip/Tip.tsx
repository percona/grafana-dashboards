import React, { FC } from 'react';
import { Button, useStyles2 } from '@grafana/ui';
import { css } from '@emotion/css';
import { GrafanaTheme2 } from '@grafana/data';

interface TipProps {
  title: string;
  number?: number;
  tipText?: string;
  buttonText?: string;
  active: boolean;
  onClick?: () => void;
}

export const Tip: FC<TipProps> = (props) => {
  const {
    title, number, tipText, buttonText, active, onClick,
  } = props;
  const styles = useStyles2(getStyles);

  return (
    <div className={`${styles.tipContainer} ${!active ? styles.tipContainerNoPadding : ''}`}>
      <div className={`${styles.tipHeader} ${!active ? styles.tipPointer : ''}`} onClick={onClick}>
        <div className={active ? styles.tipNumberActive : styles.tipNumberNotActive}>{number}</div>
        <div className={styles.tipTitle}>{title}</div>
      </div>
      <div className={`${styles.tipBody} ${!active ? styles.tipBodyHidden : ''}`}>
        <div className={styles.tipText}>{tipText}</div>
        <Button variant="secondary" size="md" type="button">
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

const getStyles = (theme: GrafanaTheme2) => ({
  tipContainer: css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 16px;

    width: 384px;
    padding-bottom: 16px;

    background: ${theme.colors.background.secondary};
    border-radius: 8px;
  `,
  tipPointer: css`
    cursor: pointer;
  `,
  tipContainerNoPadding: css`
    padding-bottom: 0;
  `,
  tipHeader: css`
    padding-top: 8px;
    padding-left: 8px;
    padding-bottom: 8px;
    display: flex;
    gap: 8px;
  `,
  tipNumberActive: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 2px;

    width: 28px;
    height: 28px;

    background-color: #F8D06B;
    font-weight: 700;
    font-size: 18px;
    color: #111217;

    transition: background-color 225ms linear;
  `,
  tipNumberNotActive: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;

    width: 28px;
    height: 28px;

    border: 2px solid ${theme.colors.border.weak};
    border-radius: 2px;
    font-weight: 700;
    font-size: 18px;
    color: ${theme.colors.text.primary};
  `,
  tipTitle: css`
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;
    color: ${theme.colors.text.primary};

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  tipBody: css`
    padding: 16px 16px 0;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: 0.01071em;
    width: 100%;
    max-height: 15em;

    border-top: 1px solid ${theme.colors.border.weak};
  `,
  tipBodyHidden: css`
    padding: 0;
    max-height: 0;
    opacity: 0;
    overflow: hidden;

    transition: max-height 225ms ease-out;
  `,
  tipText: css`
    margin-bottom: 16px;
  `,
});
