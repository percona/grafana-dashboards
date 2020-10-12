import React, {
  FC, useState, useEffect, useCallback
} from 'react';
import { Icon, useTheme } from '@grafana/ui';
import { cx } from 'emotion';
import { MultipleActionsProps } from './MultipleActions.types';
import { getStyles } from './MultipleActions.styles';

export const MultipleActions: FC<MultipleActionsProps> = ({ actions }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const theme = useTheme();
  const styles = getStyles(theme);
  const toggleMenu = useCallback(() => setMenuOpen((value) => !value), []);

  const Menu = () => {
    useEffect(() => {
      document.addEventListener('click', toggleMenu);

      return () => {
        document.removeEventListener('click', toggleMenu);
      };
    }, []);

    return (
      <div className={styles.menu}>
        {actions.map((action) => (
          <button type="button" className={styles.menuItem} onClick={action.action}>
            <span className={styles.action}>{action.title}</span>
          </button>
        ))}
      </div>
    );
  };

  return (
    <div>
      <button
        type="button"
        onClick={toggleMenu}
        className={cx(styles.showMenu, { [styles.showMenuOpen]: menuOpen })}
      >
        <Icon name="ellipsis-v" />
      </button>

      <div className={styles.menuWrapper}>{menuOpen ? <Menu /> : null}</div>
    </div>
  );
};
