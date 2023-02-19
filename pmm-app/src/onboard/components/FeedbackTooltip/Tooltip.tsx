import React, { FC } from 'react';
import { usePopperTooltip } from 'react-popper-tooltip';
import { useStyles2, Portal, PopoverContent } from '@grafana/ui';
import { colorManipulator, GrafanaTheme2 } from '@grafana/data';
import { css } from '@emotion/css';

interface TooltipProps {
  content: PopoverContent;
  visible: boolean;
  children?: any;
}

/**
 * Tooltip from @grafana/ui library have hardcoded trigger actions: 'hover', 'focus' which shouldn't be
 * a proper behaviour of FeedbackTooltip.
 * File is just a simple copy of grafana's Tooltip.
 */
export const ToolTip: FC<TooltipProps> = ({ content, visible, children }) => {
  const {
    getArrowProps, getTooltipProps, setTooltipRef, setTriggerRef,
  } = usePopperTooltip({
    placement: 'bottom-end',
    interactive: true,
    delayHide: 100,
    delayShow: 150,
    offset: [0, 8],
  });

  const tooltipStyles = useStyles2(getGrafanaTooltipStyle);
  const containerStyle = tooltipStyles.info;

  return (
    <div>
      {React.cloneElement(children, {
        ref: setTriggerRef,
      })}
      { visible && (
        <Portal>
          <div ref={setTooltipRef} {...getTooltipProps({ className: containerStyle })}>
            <div {...getArrowProps({ className: 'tooltip-arrow' })} />
            {React.isValidElement(content) && React.cloneElement(content)}
          </div>
        </Portal>
      )}
    </div>
  );
};

function getGrafanaTooltipStyle(theme: GrafanaTheme2) {
  function buildTooltipTheme(tooltipBg: string, tooltipBorder: string, tooltipText: string) {
    return css`
      background-color: ${tooltipBg};
      border-radius: 3px;
      border: 1px solid ${tooltipBorder};
      box-shadow: ${theme.shadows.z2};
      color: ${tooltipText};
      font-size: ${theme.typography.bodySmall.fontSize};
      padding: ${theme.spacing(0.5, 1)};
      transition: opacity 0.3s;
      z-index: ${theme.zIndex.tooltip};
      max-width: 400px;
      overflow-wrap: break-word;

      &[data-popper-interactive='false'] {
        pointer-events: none;
      }

      .tooltip-arrow {
        height: 1rem;
        position: absolute;
        width: 1rem;
        pointer-events: none;
      }

      .tooltip-arrow::before {
        border-style: solid;
        content: '';
        display: block;
        height: 0;
        margin: auto;
        width: 0;
      }

      .tooltip-arrow::after {
        border-style: solid;
        content: '';
        display: block;
        height: 0;
        margin: auto;
        position: absolute;
        width: 0;
      }

      &[data-popper-placement*='bottom'] .tooltip-arrow {
        left: 0;
        margin-top: -10px;
        top: 0;
      }

      &[data-popper-placement*='bottom'] .tooltip-arrow::before {
        border-color: transparent transparent ${tooltipBorder} transparent;
        border-width: 0 8px 7px 8px;
        position: absolute;
        top: -1px;
      }

      &[data-popper-placement*='bottom'] .tooltip-arrow::after {
        border-color: transparent transparent ${tooltipBg} transparent;
        border-width: 0 8px 7px 8px;
      }

      &[data-popper-placement*='top'] .tooltip-arrow {
        bottom: 0;
        left: 0;
        margin-bottom: -11px;
      }

      &[data-popper-placement*='top'] .tooltip-arrow::before {
        border-color: ${tooltipBorder} transparent transparent transparent;
        border-width: 7px 8px 0 7px;
        position: absolute;
        top: 1px;
      }

      &[data-popper-placement*='top'] .tooltip-arrow::after {
        border-color: ${tooltipBg} transparent transparent transparent;
        border-width: 7px 8px 0 7px;
      }

      &[data-popper-placement*='right'] .tooltip-arrow {
        left: 0;
        margin-left: -11px;
      }

      &[data-popper-placement*='right'] .tooltip-arrow::before {
        border-color: transparent ${tooltipBorder} transparent transparent;
        border-width: 7px 6px 7px 0;
      }

      &[data-popper-placement*='right'] .tooltip-arrow::after {
        border-color: transparent ${tooltipBg} transparent transparent;
        border-width: 6px 7px 7px 0;
        left: 2px;
        top: 1px;
      }

      &[data-popper-placement*='left'] .tooltip-arrow {
        margin-right: -10px;
        right: 0;
      }

      &[data-popper-placement*='left'] .tooltip-arrow::before {
        border-color: transparent transparent transparent ${tooltipBorder};
        border-width: 7px 0px 6px 7px;
      }

      &[data-popper-placement*='left'] .tooltip-arrow::after {
        border-color: transparent transparent transparent ${tooltipBg};
        border-width: 6px 0 5px 5px;
        left: 1px;
        top: 1px;
      }

      code {
        border: none;
        display: inline;
        background: ${colorManipulator.darken(tooltipBg, 0.1)};
        color: ${tooltipText};
      }

      pre {
        background: ${colorManipulator.darken(tooltipBg, 0.1)};
        color: ${tooltipText};
      }

      a {
        color: ${tooltipText};
        text-decoration: underline;
      }

      a:hover {
        text-decoration: none;
      }
    `;
  }

  const info = buildTooltipTheme(
    theme.components.tooltip.background,
    theme.components.tooltip.background,
    theme.components.tooltip.text,
  );

  const error = buildTooltipTheme(
    theme.colors.error.main,
    theme.colors.error.main,
    theme.colors.error.contrastText,
  );

  return {
    info,
    error,
  };
}
