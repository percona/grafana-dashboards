import React, { FC, useState } from 'react';
import { GrafanaTheme2 } from '@grafana/data';
import { css } from '@emotion/css';
import { Button, TextArea, useStyles2 } from '@grafana/ui';

interface Step2Props {
  onSubmit?: (feedbackDescription: string) => void;
}

export const Step2: FC<Step2Props> = ({ onSubmit }) => {
  const styles = useStyles2(getStyles);
  const [feedbackValue, setFeedbackValue] = useState('');

  const submitFeedback = () => {
    if (onSubmit) {
      onSubmit(feedbackValue);
    }
  };

  return (
    <>
      <div className={styles.contentTitle}>
        We&apos;re sorry to hear it... Can you tell us more about your experience and what went wrong?
      </div>
      <div className={styles.rating}>
        <TextArea
          placeholder="Write your feedback here"
          onChange={(e) => {
            setFeedbackValue(e.currentTarget.value);
          }}
        />
      </div>
      <div className={styles.ratingDestription}>
        We will use your feedback to improve our products and services.
      </div>
      <div>
        <Button icon="navigator" onClick={submitFeedback}>Send feedback</Button>
      </div>
    </>
  );
};

const getStyles = (theme: GrafanaTheme2) => ({
  contentTitle: css`
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      line-height: 22px;
      display: flex;

      color: ${theme.colors.text.primary}

      flex: none;
      order: 0;
      align-self: stretch;
      flex-grow: 0;
  `,
  rating: css`
      flex: none;
      align-self: stretch;
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
