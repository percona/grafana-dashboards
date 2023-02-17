import React, { FC } from 'react';
import {
  Button, Icon, IconName, useStyles2,
} from '@grafana/ui';
import { GrafanaTheme2 } from '@grafana/data';
import { css } from '@emotion/css';

interface ResourceProps {
  icon: IconName;
  title: string;
  text?: string;
  buttonText?: string;
  url: string;
}

export const Resource: FC<ResourceProps> = (props) => {
  const {
    title, text, buttonText, url, icon,
  } = props;
  const styles = useStyles2(getStyles);

  return (
    <div className={styles.resourceContainer}>
      <div className={styles.header}>
        <Icon name={icon} size="xl" />
        <div className={styles.title}>{title}</div>
      </div>
      <div className={styles.body}>
        <div className={styles.text}>{text}</div>
        <Button icon="external-link-alt" variant="secondary" size="md" type="button" onClick={onClickUrl(url)}>
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

const openInNewTab = (url: string): void => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer');

  if (newWindow) {
    newWindow.opener = null;
  }
};

const onClickUrl = (url: string): (() => void) => () => openInNewTab(url);

const getStyles = (theme: GrafanaTheme2) => ({
  resourceContainer: css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 16px;

    width: 384px;
    margin-top: 24px;
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
  header: css`
    padding: 16px 0 8px 16px;
    display: flex;
    gap: 8px;
  `,
  title: css`
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    color: ${theme.colors.text.primary};

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  body: css`
    padding: 16px 16px 0;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: 0.01071em;
    width: 100%;
    max-height: 15em;
  `,
  text: css`
    opacity: 0.65;
    margin-bottom: 16px;
  `,
});
