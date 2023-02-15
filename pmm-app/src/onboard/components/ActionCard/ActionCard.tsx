import React, { FC } from 'react';
import {
  Card, HorizontalGroup, IconButton, useStyles2,
} from '@grafana/ui';
import { GrafanaTheme2 } from '@grafana/data';
import { css } from '@emotion/css';

interface ActionCardProps {
  onClick?: () => void;
  hasExternalLink?: boolean;
  onExternalLinkClick?: () => void;
  externalLinkTooltip?: string,
  variant: ActionCardVariant,
  imgSrc?: string,
  imgAlt?: string,
  heading: string,
  description?: string,
}

export enum ActionCardVariant {
  Primary,
  Secondary,
}

export const ActionCard: FC<ActionCardProps> = ({
  hasExternalLink,
  imgSrc,
  variant,
  onClick,
  onExternalLinkClick,
  heading,
  description,
  externalLinkTooltip,
  imgAlt,
}) => {
  const styles = useStyles2(getStyles);

  const containerClass = variant === ActionCardVariant.Primary
    ? styles.actionCardLogoContainerPrimary
    : styles.actionCardLogoContainerSecondary;

  return (
    <div className={styles.actionCard} onClick={onClick}>
      <div className={containerClass}>
        <img className={styles.actionCardImg} src={imgSrc} alt={imgAlt} />
      </div>
      <Card>
        <Card.Heading>
          <HorizontalGroup justify="space-between">
            <Card.Heading className={styles.cardHeading}>{heading}</Card.Heading>
            <Card.SecondaryActions>
              {hasExternalLink && (
                <IconButton
                  name="external-link-alt"
                  tooltip={externalLinkTooltip}
                  className={styles.externalLinkIcon}
                  size="lg"
                  onClick={(e) => {
                    if (onExternalLinkClick) {
                      e.stopPropagation();
                      onExternalLinkClick();
                    }
                  }}
                />
              )}
            </Card.SecondaryActions>
          </HorizontalGroup>
        </Card.Heading>
        <Card.Description className={styles.cardDescription}>{description}</Card.Description>
      </Card>
    </div>
  );
};

const getStyles = (theme: GrafanaTheme2) => ({
  cardHeading: css`
    font-weight: 500;
    font-size: 16px;
    line-height: 21px;
    color: ${theme.colors.text.primary};
  `,
  cardDescription: css`
    min-height: ${theme.typography.body.lineHeight}em
  `,
  externalLinkIcon: css`
    height: 16.67px;
    width: 16.67px;
    margin-right: 0 !important;
  `,

  actionCard: css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0;

    width: 332px;
    height: 218.29px;

    background: ${theme.colors.background.canvas};
    box-shadow: 0 4px 12px #010409;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
  `,
  actionCardLogoContainerPrimary: css`
    width: 332px;
    height: 142.29px;
    background: #F5B73D;
  `,
  actionCardLogoContainerSecondary: css`
    width: 332px;
    height: 142.29px;
    background: #414349;
  `,
  actionCardImg: css`
    width: 153px;
    height: 143px;
  `,
});
