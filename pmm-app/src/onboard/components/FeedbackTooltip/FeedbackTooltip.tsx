import React, { FC } from 'react';
import {Button, HorizontalGroup, IconButton, Tooltip, useStyles2} from '@grafana/ui'
import {GrafanaTheme2} from "@grafana/data";
import { css } from '@emotion/css';

interface FeedbackTooltipProps {
  children?: any;
}

export const FeedbackTooltip: FC<FeedbackTooltipProps> = ({ children }) => {
  const styles = useStyles2(getStyles);
  const tooltipContent = (
    <>
      <div className={styles.modalHeader}>
        &nbsp;
        <div className={styles.modalHeaderClose}>
          <IconButton
            data-testid="modal-close-button"
            name="times"
            size="lg"
            onClick={() => { console.log('click')}}
          />
        </div>
      </div>

      <div className={styles.feedbackContentForm}>
        <div className={styles.contentTitle}>
          How's your experience with PMM so far?
        </div>
        <div className={styles.rating}>
          <Button variant="secondary" icon="sad">Bad</Button>
          <Button variant="secondary" icon="meh">Fair</Button>
          <Button variant="secondary" icon="smile">Good</Button>
        </div>
      </div>
    </>
  );

  return (
    <>
      <Tooltip content={tooltipContent} show={true} interactive={true} placement="bottom-end">
        {children}
      </Tooltip>
    </>

  );
};

const getStyles = (theme: GrafanaTheme2) => ({
  modalHeader: css`
      font-size: ${theme.typography.h4.fontSize};
      background: ${theme.colors.background};
      display: flex;
      height: 3em;
      align-items: center;
      justify-content: space-between;
  `,
  modalHeaderClose: css`
      height: 100%;
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

      width: 384px;
      height: 94px;

      flex: none;
      order: 0;
      flex-grow: 0;
  `,
  contentTitle: css`
      width: 384px;
      height: 23px;

      /* Heading 4 */

      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      line-height: 22px;
      /* identical to box height, or 124% */

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

      width: 384px;
      height: 32px;


      flex: none;
      order: 1;
      align-self: stretch;
      flex-grow: 0;
      justify-content: space-evenly;
  `,
})
