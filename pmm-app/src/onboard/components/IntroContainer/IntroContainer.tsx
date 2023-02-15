import React, { FC } from 'react';
import {
  HorizontalGroup, useStyles2,
} from '@grafana/ui';
import { GrafanaTheme2 } from '@grafana/data';
import { css } from '@emotion/css';
import { ActionCard, ActionCardVariant } from '../ActionCard/ActionCard';

interface IntroContainerProps {
  onHelpCenterLinkClick?: () => void,
  onGettingStartedGuideLinkClicked?: () => void,
}

export const IntroContainer: FC<IntroContainerProps> = ({
  onHelpCenterLinkClick,
  onGettingStartedGuideLinkClicked,
}) => {
  const styles = useStyles2(getStyles);

  return (
    <div className={styles.welcomePage}>
      <div className={styles.introContainer}>
        <div className={styles.introHeader}>
          <h1>Welcome</h1>
        </div>
        <div className={styles.introText}>
          <p>
            Your PMM instance is ready to roll. All you need now is to have your inventory setup.
            As next steps we recommend:
            <li className={styles.introTextList}>
              Follow the&nbsp;
              <a className={styles.introLink} onClick={onGettingStartedGuideLinkClicked}>
                Getting Started guide
              </a>
              ;
            </li>
            <li className={styles.introTextList}>
              Or get a Percona Expert for a bulletproof scaling of your project.
            </li>
          </p>
          <p>
            If you already know PMM like the back of your hand,
            and prefer to fine-tune it to your liking, we recommend to go to Configurations.
          </p>
          <p>
            If you ever feel lost, return to the&nbsp;
            <a className={styles.introLink} onClick={onHelpCenterLinkClick}>Help Center</a>
            &nbsp;on the top right corner of your screen.
          </p>
        </div>
      </div>
      <div className={styles.actionsContainer}>
        <HorizontalGroup spacing="lg" wrap>
          <ActionCard
            variant={ActionCardVariant.Primary}
            heading="Get a Percona Expert"
            description="Boost your project with top tier expertise"
            hasExternalLink
            imgSrc="/graph/public/plugins/pmm-app/img/3d-star.png"
            imgAlt="Get a Percona Expert"
            externalLinkTooltip="Open link in the new tab"
          />
          <ActionCard
            variant={ActionCardVariant.Secondary}
            heading="PMM configurations"
            imgSrc="/graph/public/plugins/pmm-app/img/3d-setting.png"
            imgAlt="PMM configurations"
          />
          <ActionCard
            variant={ActionCardVariant.Secondary}
            heading="Homepage settings"
            imgSrc="/graph/public/plugins/pmm-app/img/3d-home.png"
            imgAlt="Homepage settings"
          />
        </HorizontalGroup>
      </div>
    </div>
  );
};

const getStyles = (theme: GrafanaTheme2) => ({
  welcomePage: css`
    background: ${theme.colors.background.canvas};
  `,
  introContainer: css`
    background: ${theme.colors.background.canvas};
  `,
  introHeader: css`
    width: 680px;
    height: 33px;
    
    font-weight: 400;
    font-size: 28px;
    line-height: 33px;
    color: ${theme.colors.text.primary};
    letter-spacing: -0.00893em;
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
  `,
  introText: css`
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;


    letter-spacing: 0.01071em;

    color: ${theme.colors.text.primary};
    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
    margin-top: 10px;
  `,
  introLink: css`
    color: ${theme.colors.text.link};
  `,
  introTextList: css`
    margin-left: 10px;
  `,
  actionsContainer: css`
    background: ${theme.colors.background.canvas};
    margin-top: 25px;
  `,
});
