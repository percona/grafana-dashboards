import React, { FC, useState, SyntheticEvent } from 'react';
import { Icon, useTheme } from '@grafana/ui';
import { cx } from 'emotion';
import { MultipleActionsProps } from './MultipleActions.types';
import { getStyles } from './MultipleActions.styles';

export const MultipleActions: FC<MultipleActionsProps> = ({ actions }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const theme = useTheme();
  const styles = getStyles(theme);

  const showMenu = (event: SyntheticEvent) => {
    event.preventDefault();

    if (menuOpen) {
      closeMenu();

      return;
    }

    setMenuOpen(true);
    document.addEventListener('click', closeMenu);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.removeEventListener('click', closeMenu);
  };

  return (
    <div>
      <button
        type="button"
        onClick={showMenu}
        className={cx(styles.showMenu, { [styles.showMenuOpen]: menuOpen })}
      >
        <Icon name="ellipsis-v" />
      </button>

      <div className={styles.menuWrapper}>
        {menuOpen ? (
          <div className={styles.menu}>
            {actions.map((action) => (
              <button
                type="button"
                className={styles.menuItem}
                onClick={(event) => {
                  action.action();
                  closeMenu(event);
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
