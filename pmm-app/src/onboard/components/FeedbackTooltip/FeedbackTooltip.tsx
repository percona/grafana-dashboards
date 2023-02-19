import React, { FC, useState } from 'react';
import { IconButton, useStyles2 } from '@grafana/ui';
import { GrafanaTheme2 } from '@grafana/data';
import { css } from '@emotion/css';
import { Step1 } from './Step1';
import { Step2 } from './Step2';
import { Step3 } from './Step3';
import { ToolTip } from './Tooltip';

interface FeedbackTooltipProps {
  visible: boolean;
  children?: any;
  onClose?: () => void;
}

export const FeedbackTooltip: FC<FeedbackTooltipProps> = ({ visible, children, onClose }) => {
  const styles = useStyles2(getStyles);
  const [currentStep, setCurrentStep] = useState('Step1');

  const feedbackClose = () => {
    if (onClose) {
      onClose();
    }

    if (currentStep === 'Step3') {
      setCurrentStep('Step1');
    }
  };

  const tooltipContent = (
    <>
      {/* close button */}
      <div className={styles.modalHeaderClose}>
        <IconButton
          data-testid="modal-close-button"
          name="times"
          size="lg"
          onClick={feedbackClose}
        />
      </div>

      <div className={styles.feedbackContentForm}>
        { currentStep === 'Step1' && (
          <Step1
            onSubmit={() => { setCurrentStep('Step2'); }}
          />
        )}
        { currentStep === 'Step2' && (
          <Step2 onSubmit={() => { setCurrentStep('Step3'); }} />
        )}
        { currentStep === 'Step3' && (
          <Step3 />
        )}
      </div>
    </>
  );

  return (
    <ToolTip content={tooltipContent} visible={visible}>
      {children}
    </ToolTip>
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
      /* identical to box height, or 125% */

      display: flex;
      align-items: center;
      letter-spacing: 0.01071em;

      flex: none;
      order: 2;
      align-self: stretch;
      flex-grow: 0;
  `,
});
