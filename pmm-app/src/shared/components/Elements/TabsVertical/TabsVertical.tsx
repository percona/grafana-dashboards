import React, { ReactNode, FC } from 'react';
import { cx } from 'emotion';
import { useTheme } from '@grafana/ui';
import { getStyles } from './TabsVertical.styles';

export interface TabsVerticalProps {
  children: ReactNode;
  className?: string;
}

export const TabsVertical: FC<TabsVerticalProps> = ({ children, className }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <div className={cx(styles.tabsWrapper, className)}>
      <ul data-qa="tabs-vertical-list" className={styles.tabs}>{children}</ul>
    </div>
  );
};
