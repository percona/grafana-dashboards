import React, { FC } from 'react';
import {
  Button, useStyles2,
} from '@grafana/ui';
import { GrafanaTheme2 } from '@grafana/data';
import { css } from '@emotion/css';

interface PerconaUpgradeLevelProps {
}

export const PerconaUpgradeLevel: FC<PerconaUpgradeLevelProps> = () => {
  const styles = useStyles2(getStyles);

  return (
    <div className={styles.resourceContainer}>
      <div>
        <img
          alt="percona-logo"
          className={styles.headerImage}
          src="/graph/public/plugins/pmm-app/img/percona-header.png"
        />
      </div>
      <div className={styles.body}>
        <div className={styles.text}>Scale your projects with Percona’s open source database solutions.</div>
        <Button icon="external-link-alt" variant="secondary" size="md" type="button">
          Upgrade subscription
        </Button>
      </div>
    </div>
  );
};

const getStyles = (theme: GrafanaTheme2) => ({
  resourceContainer: css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 16px;

    width: 384px;
    margin-top: 24px;
    padding-bottom: 16px;

    background: linear-gradient(0deg, #0E1A53, #0E1A53), #181B1F;
    background-blend-mode: color, normal, normal;
    border-radius: 8px;
  `,
  tipPointer: css`
    cursor: pointer;
  `,
  tipContainerNoPadding: css`
    padding-bottom: 0;
  `,
  headerImage: css`
    height: 48px;
    width: 100%;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
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
    linear-gradient(0deg, #0E1A53, #0E1A53),
    width: 100%;
    max-height: 15em;
  `,
  text: css`
    margin-bottom: 16px;
  `,
});
