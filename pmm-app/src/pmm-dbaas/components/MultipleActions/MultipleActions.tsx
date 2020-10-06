import React, { FC, useState } from 'react';
import { Icon } from '@grafana/ui';
import { styles } from './MultipleActions.styles';
import { MultipleActionsProps } from './MultipleActions.types';

export const MultipleActions: FC<MultipleActionsProps> = ({ actions }) => {
  const [menuOpened, openMenu] = useState(false);

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
    <div className={styles.wrapper}>
      <button onClick={showMenu} className={menuOpened ? 'show-menu menu-open' : 'show-menu'}>
        <Icon name="ellipsis-v" />
      </button>

      {menuOpened ? (
        <div className="menu">
          {actions.map((action) => (
            <button
              className="menu-item"
              onClick={() => {
                action.action();
                openMenu(false);
                document.removeEventListener('click', closeMenu);
              }}
            >
              <nobr>{action.title}</nobr>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};
