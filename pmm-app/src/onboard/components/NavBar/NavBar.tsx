import React, { FC } from 'react';

import { ToolbarButton, ToolbarButtonRow, useStyles2 } from '@grafana/ui';
import { NavBarTypes } from './NavBar.types';
import { getStyles } from './NavBar.styles';

export const NavBar: FC<NavBarTypes> = ({
  onSignInClick, onFeedbackClick, onNotificationClick,
  onHelpCenterClick, showHelpCenterNotificationMarker,
  showNotificationMarker,
}) => {
  const styles = useStyles2(getStyles);

  return (
    <nav className={styles.toolbar}>
      <div className={styles.leftWrapper}>
        <div className={styles.pageIcon}>
          <div className={styles.pmmIconHolder}>
            <img
              alt="percona-logo"
              className={styles.pmmIcon}
              src="/graph/public/plugins/pmm-app/img/percona-logo.svg"
            />
          </div>
        </div>
        <nav aria-label="Search links" className={styles.navElement}>
          <div className={styles.titleWrapper}>
            <h1 className={styles.h1Styles}>
              <div className={styles.titleText}>Percona monitoring and management</div>
            </h1>
          </div>
        </nav>
      </div>
      <ToolbarButtonRow alignment="right">
        {showHelpCenterNotificationMarker && (
          <div className={styles.qNotificationMaker} />
        )}
        {showNotificationMarker && (
          <div className={styles.notificationMaker} />
        )}
        <ToolbarButton icon="signin" onClick={onSignInClick}>Percona sign in</ToolbarButton>
        <ToolbarButton icon="bell" onClick={onFeedbackClick} />
        <ToolbarButton icon="message" onClick={onNotificationClick} />
        <ToolbarButton icon="question-circle" onClick={onHelpCenterClick} />
      </ToolbarButtonRow>
    </nav>
  );
};
