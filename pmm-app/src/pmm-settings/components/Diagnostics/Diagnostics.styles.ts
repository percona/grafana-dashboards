import { stylesFactory, selectThemeVariant } from '@grafana/ui';
import { GrafanaTheme } from '@grafana/data';
import { css } from 'emotion';

export const getStyles = stylesFactory((theme: GrafanaTheme) => {
  const { colors }: any = theme;
  const background = selectThemeVariant(
    {
      light: `linear-gradient(180deg, ${colors.gray98} 0%, #e7eaf0 100%)`,
      dark: `linear-gradient(180deg, ${colors.gray15} 0%, #292c31 100%)`
    },
    theme.type,
  );
  const hoverBackground = selectThemeVariant(
    { light: colors.gray98, dark: colors.gray15 },
    theme.type,
  );
  const border = selectThemeVariant(
    { light: colors.gray85, dark: colors.gray25 },
    theme.type,
  );
  const textColor = selectThemeVariant(
    { light: colors.text, dark: colors.white },
    theme.type,
  );

  return {
    diagnosticsWrapper: css`
      align-items: flex-end;
      display: flex;
      flex: 1;
      flex-direction: column;
    `,
    diagnosticsLabel: css`
      display: flex;
      i {
        margin-left: ${theme.spacing.xs};
      }
    `,
    diagnosticsButton: css`
      background: ${background};
      border: ${theme.border.width.sm} solid ${border};
      color: ${textColor};
      font-size: ${theme.typography.size.sm};
      margin-top: ${theme.spacing.md};
      &:hover {
        background: ${hoverBackground};
        color: ${textColor};
      }
      &:focus {
        background: ${hoverBackground};
      }
      span {
        align-items: flex-end;
        display: flex;
      }
      svg {
        margin-right: ${theme.spacing.sm};
        fill: ${textColor};
      }
    `
  };
});
