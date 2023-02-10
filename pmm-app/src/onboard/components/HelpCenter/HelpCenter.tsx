import React, { FC, useState } from 'react';
import {
  IconButton, Tab, TabsBar, useStyles2,
} from '@grafana/ui';
import { GrafanaTheme2 } from '@grafana/data';
import { css } from '@emotion/css';

// Declaring type of props - see "Typing Component Props" for more examples
interface HelpCenterProps {
  open?: boolean;
  onClose: () => void;
  // width: string;
}

export const HelpCenter: FC<HelpCenterProps> = (props) => {
  const [activeTab, setActiveTab] = useState('tips');

  const { open, onClose } = props;
  const styles = useStyles2(getStyles);

  return (
    <div className={styles.drawer} style={{ visibility: open ? 'visible' : 'hidden' }}>
      <div className={styles.indentContainer} />
      <div className={styles.container} style={{ height: '100%' }}>
        <div className={styles.headerRow}>
          <h3 className={styles.helpCenterHeader}>Help center</h3>
          <div className="flex-grow-1" />
          <IconButton aria-label="Close 'Add Panel' widget" name="times" size="xl" onClick={onClose} />
        </div>
        <TabsBar hideBorder>
          <TabsBar>
            <Tab
              label="Tips"
              active={activeTab === 'tips'}
              onChangeTab={() => setActiveTab('tips')}
            />
            <Tab
              label="Resources"
              active={activeTab === 'resources'}
              onChangeTab={() => setActiveTab('resources')}
            />
            <Tab
              label={'What\'s new'}
              active={activeTab === 'wnatsnew'}
              onChangeTab={() => setActiveTab('wnatsnew')}
            />
          </TabsBar>
        </TabsBar>
      </div>
      <div className={styles.indentContainer} />
    </div>
  );
};

const getStyles = (theme: GrafanaTheme2) => ({
  drawer: css`
    left: auto;
    right: 0;
    flex: 1 0 auto;
    width: 510px;
    height: calc(100% - 80px);
    top: 80px;
    display: flex;
    outline: 0;
    z-index: 1200;
    position: fixed;
    box-sizing: border-box;
    overflow-y: auto;
    border-left: none;
    flex-direction: column;
    background-color: ${theme.colors.background.primary};
    -webkit-overflow-scrolling: touch;
  `,
  container: css`
    padding-left: 16px;
    padding-right: 16px;
    border-left: solid;
    height: 100%;
    border-left-color: ${theme.colors.background.secondary};
  `,
  indentContainer: css`
    height: 16px;
  `,
  headerRow: css`
    display: flex;
    align-items: center;
    height: 25px;
    flex-shrink: 0;
    width: 100%;
    font-size: ${theme.typography.fontSize};
    font-weight: ${theme.typography.fontWeightMedium};
    padding-bottom: ${theme.spacing(1)};
    transition: background-color 0.1s ease-in-out;
  `,
  helpCenterHeader: css`
    margin: 0;
    font-size: 21px;
    line-height: 25px;
    color: ${theme.colors.text.primary};
  `,
});
