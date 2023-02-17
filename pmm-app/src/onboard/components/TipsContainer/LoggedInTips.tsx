import React, { FC, useState } from 'react';
import { GrafanaTheme2 } from '@grafana/data';
import { css } from '@emotion/css';
import { useStyles2 } from '@grafana/ui';
import { Tip } from '../Tip/Tip';
import tipsData from './data/tips.json';

export const LoggedInTips: FC = () => {
  const styles = useStyles2(getStyles);
  const [tip, setTip] = useState(1);

  return (
    <>
      <h3 className={styles.tipsLabel}>Explore your new power-ups</h3>
      <div>
        {tipsData.map((t) => (
          <Tip
            title={t.title}
            number={t.id}
            buttonText={t.buttonText}
            tipText={t.text}
            onClick={() => setTip(t.id)}
            active={tip === t.id}
          />
        ))}
      </div>
    </>
  );
};

const getStyles = (theme: GrafanaTheme2) => ({
  tipsLabel: css`
    padding-top: 24px;
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    color: ${theme.colors.text.primary};
  `,
});
