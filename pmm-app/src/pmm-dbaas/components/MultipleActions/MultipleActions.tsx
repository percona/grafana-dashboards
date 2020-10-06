import React, { FC, useState } from 'react';
import { Icon, useTheme } from '@grafana/ui';
import { cx } from 'emotion';
import { MultipleActionsProps } from './MultipleActions.types';
import { getStyles } from './MultipleActions.styles';

export const MultipleActions: FC<MultipleActionsProps> = ({ actions }) => {
  const [menuOpened, openMenu] = useState(false);
  const theme = useTheme();
  const styles = getStyles(theme);

  const showMenu = (event) => {
    if (menuOpened) {
      closeMenu(event);

      return;
    }

    event.preventDefault();
    openMenu(true);
    document.addEventListener('click', closeMenu);
  };

  const closeMenu = (event) => {
    event.preventDefault();
    openMenu(false);
    document.removeEventListener('click', closeMenu);
  };

  return (
    <div>
      <button type="button" onClick={showMenu} className={cx(styles.showMenu, { [styles.showMenuOpen]: menuOpened })}>
        <Icon name="ellipsis-v" />
      </button>

      <div className={styles.menuWrapper}>
        {menuOpened ? (
          <div className={styles.menu}>
            {actions.map((action) => (
              <button
                type="button"
                className={styles.menuItem}
                onClick={() => {
                  action.action();
                  openMenu(false);
                  document.removeEventListener('click', closeMenu);
                }}
              >
                <span className={styles.action}>{action.title}</span>
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};
