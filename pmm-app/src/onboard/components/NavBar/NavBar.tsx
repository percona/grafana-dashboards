import React, { FC } from 'react';
import {
  Icon, ToolbarButtonRow, useStyles2,
} from '@grafana/ui';
import { NavBarTypes } from './NavBar.types';
import { getStyles } from './NavBar.styles';
import { NavBarButton } from '../NavBarButton/NavBarButton';

export const NavBar: FC<NavBarTypes> = ({
  title,
  showSignInButton, showFeedbackButton, showHelpCenterButton,
  onSignInClick, onFeedbackClick, onHelpCenterClick,
  showHelpCenterNotificationMarker,
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
              src="/graph/public/plugins/pmm-app/img/pmm-app-icon.svg"
            />
          </div>
        </div>
        <nav className={styles.navElement}>
          <div className={styles.titleWrapper}>
            <h1 className={styles.h1Styles}>
              <div className={styles.titleText}>
                {title}
              </div>
            </h1>
          </div>
        </nav>
      </div>
      <ToolbarButtonRow alignment="right">
        {showHelpCenterNotificationMarker && (
          <div className={styles.notificationMaker} />
        )}
        {showSignInButton && (
          <>
            <div className={styles.tooltip}>
              Get free features with a quick sign in
              <Icon name="arrow-right" />
            </div>
            <NavBarButton
              title="Percona sign in"
              imgSrc="/graph/public/plugins/pmm-app/img/pmm-percona-icon.svg"
              imgAlt="PMM"
              onClick={onSignInClick}
            />
          </>
        )}
        {showFeedbackButton && (
          <NavBarButton icon="bell" onClick={onFeedbackClick} />
        )}
        {showHelpCenterButton && (
          <NavBarButton icon="question-circle" onClick={onHelpCenterClick} />
        )}
      </ToolbarButtonRow>
    </nav>
  );
};
