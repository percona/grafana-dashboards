import d3 from 'd3';
import $ from 'jquery';
import moment from 'moment';

import { valueFormatter } from '../formatting';

let TOOLTIP_PADDING_X = 30;
let TOOLTIP_PADDING_Y = 5;

class CarpetplotTooltip {

  constructor(elem, scope) {
    this.tooltip = null;
    this.scope = scope;
    this.dashboard = scope.ctrl.dashboard;
    this.panel = scope.ctrl.panel;
    this.carpetPanel = elem;

    elem.on('mouseover', this.onMouseOver.bind(this));
    elem.on('mouseleave', this.onMouseLeave.bind(this));
  }

  onMouseOver(e) {
    if (!this.panel.tooltip.show || !this.scope.hasData()) { return; }

    if (!this.tooltip) {
      this.add();
      this.move(e);
    }
  }

  onMouseLeave() {
    this.destroy();
  }

  onMouseMove(e) {
    if (!this.panel.tooltip.show) { return; }

    this.move(e);
  }

  add() {
    this.tooltip = d3.select('body')
      .append('div')
      .attr('class', 'carpet-tooltip graph-tooltip grafana-tooltip');
  }

  destroy() {
    if (this.tooltip) {
      this.tooltip.remove();
    }

    this.tooltip = null;
  }

  show(pos, bucket) {
    if (!this.panel.tooltip.show || !this.scope.isInChart(pos) || !bucket.hasValue()) {
      this.destroy();
      return;
    }

    if (!this.tooltip) {
      this.add();
    }

    const tooltipTimeFormat = 'ddd YYYY-MM-DD HH:mm:ss';
    const time = this.dashboard.formatDate(bucket.time, tooltipTimeFormat);
    const decimals = this.panel.data.decimals;
    const format = this.panel.data.unitFormat;
    const formatter = valueFormatter(format, decimals);
    const value = formatter(bucket.value);

    let tooltipHtml = `
      <div class='graph-tooltip-time'>${time}</div>
      <div>
      value: <b>${value}</b><br/>
      </div>
    `;

    this.tooltip.html(tooltipHtml);

    this.move(pos);
  }

  move(pos) {
    if (!this.tooltip) { return; }

    const elem = $(this.tooltip.node())[0];
    const { pageX, pageY } = pos;
    const tooltipWidth = elem.clientWidth;
    const tooltipHeight = elem.clientHeight;

    let left = pageX + TOOLTIP_PADDING_X;
    let top = pageY + TOOLTIP_PADDING_Y;

    if (pageX + tooltipWidth + 40 > window.innerWidth) {
      left = pageX - tooltipWidth - TOOLTIP_PADDING_X;
    }

    if (pageY - window.pageYOffset + tooltipHeight + 20 > window.innerHeight) {
      top = pageY - tooltipHeight - TOOLTIP_PADDING_Y;
    }

    return this.tooltip
      .style('left', left + 'px')
      .style('top', top + 'px');
  }
}

export default CarpetplotTooltip;