import React, { FC } from 'react';
import { GrafanaTheme2 } from '@grafana/data';
import { css } from '@emotion/css';
import { HorizontalGroup, useStyles2 } from '@grafana/ui';

interface Step3Props {
}

export const Step3: FC<Step3Props> = () => {
  const styles = useStyles2(getStyles);

  return (
    <>
      <HorizontalGroup>
        <img
          className={styles.imageChecked}
          alt="feedback-sent"
          src="/graph/public/plugins/pmm-app/img/pmm-feedback-sent.svg"
        />
        <div>
          <div className={styles.contentTitle}>
            <img
              className={styles.imageChecked}
              alt="feedback-sent"
              src="/graph/public/plugins/pmm-app/img/pmm-circle-check-green.svg"
            />
            Feedback sent!
          </div>
          <div className={styles.description}>
            Your input is playing a crucial role in shaping the future of PMM and making it even better.
            Thank you!
          </div>
        </div>
      </HorizontalGroup>
    </>
  );
};

const getStyles = (theme: GrafanaTheme2) => ({
  imageChecked: css`
      padding: ${theme.spacing(0.5)};
  `,
  contentTitle: css`
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      line-height: 22px;

      display: flex;
      align-items: center;

      color: ${theme.colors.text.primary}

      flex: none;
      order: 0;
      align-self: stretch;
      flex-grow: 0;
  `,
  rating: css`
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 0px;
      gap: 12px;
      flex: none;
      order: 1;
      align-self: stretch;
      flex-grow: 0;
      justify-content: space-between;
  `,
  description: css`
    padding-top: ${theme.spacing(1)};
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    display: flex;
    align-items: center;
    letter-spacing: 0.01071em;
    color: rgba(204, 204, 220, 0.65);
    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
    text-align: justify;

  `,
});
