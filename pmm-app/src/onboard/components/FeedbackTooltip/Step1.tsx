import React, { FC } from 'react';
import { GrafanaTheme2 } from '@grafana/data';
import { css } from '@emotion/css';
import { Button, useStyles2 } from '@grafana/ui';

interface Step1Props {
  onSubmit: () => void;
}

export const Step1: FC<Step1Props> = ({ onSubmit }) => {
  const styles = useStyles2(getStyles);

  return (
    <>
      <div className={styles.contentTitle}>
        How&apos;s your experience with PMM so far?
      </div>
      <div className={styles.rating}>
        <Button variant="secondary" icon="sad" onClick={onSubmit}>Bad</Button>
        <Button variant="secondary" icon="meh" onClick={onSubmit}>Fair</Button>
        <Button variant="secondary" icon="smile" onClick={onSubmit}>Good</Button>
      </div>
      <div className={styles.ratingDestription}>
        With only one click you&apos;ll help us improve PMM.
      </div>
    </>
  );
};

const getStyles = (theme: GrafanaTheme2) => ({
  modalHeaderClose: css`
      display: flex;
      align-items: center;
      justify-content: flex-end;
  `,
  feedbackContentForm: css`
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 0px 24px 24px 24px;
      gap: 12px;

      flex: none;
      order: 0;
      flex-grow: 0;
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
  ratingDestription: css`
      color: ${theme.colors.text.secondary}
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 15px;

      display: flex;
      align-items: center;
      letter-spacing: 0.01071em;
      color: rgba(204, 204, 220, 0.65);
      flex: none;
      order: 2;
      align-self: stretch;
      flex-grow: 0;
  `,
});
