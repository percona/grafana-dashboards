import _ from 'lodash';

import { getItemBasedOnThreshold, normalizeColor, replace_tags_from_field } from './index';
import { get_formatted_value } from '../GrafanaUtils';
import { IBoomPattern } from './Boom.interface';

export let getBGColor = function(
  value: number,
  pattern: IBoomPattern,
  thresholds: any[],
  list_of_bgColors_based_on_thresholds: string[],
  bgColorOverRides: string[]
): string {
  let bgColor = 'transparent';
  if (_.isNaN(value) || value === null) {
    bgColor = pattern.null_color || 'darkred';
    if (pattern.null_color === '') {
      bgColor = 'transparent';
    }
  } else {
    bgColor = pattern.defaultBGColor || bgColor;
    if (pattern.enable_bgColor && pattern.bgColors) {
      bgColor = getItemBasedOnThreshold(thresholds, list_of_bgColors_based_on_thresholds, value, bgColor);
    }
    if (pattern.enable_bgColor_overrides && pattern.bgColors_overrides !== '') {
      let _bgColors_overrides = bgColorOverRides
        .filter(con => con.indexOf('->'))
        .map(con => con.split('->'))
        .filter(con => +con[0] === value)
        .map(con => con[1]);
      if (_bgColors_overrides.length > 0 && _bgColors_overrides[0] !== '') {
        bgColor = ('' + _bgColors_overrides[0]).trim();
      }
    }
  }
  return normalizeColor(bgColor);
};
export let getTextColor = function(
  value: number,
  pattern: IBoomPattern,
  thresholds,
  list_of_textColors_based_on_thresholds: string,
  txtColorOverrides: string[]
): string {
  let textColor = document.body.classList.contains('theme-light') ? 'black' : 'white';
  if (_.isNaN(value) || value === null) {
    textColor = pattern.null_textcolor || textColor;
  } else {
    textColor = pattern.defaultTextColor || textColor;
    if (pattern.enable_textColor && pattern.textColors) {
      textColor = getItemBasedOnThreshold(thresholds, list_of_textColors_based_on_thresholds, value, textColor);
    }
    if (pattern.enable_textColor_overrides && pattern.textColors_overrides !== '') {
      let _textColors_overrides = txtColorOverrides
        .filter(con => con.indexOf('->'))
        .map(con => con.split('->'))
        .filter(con => +con[0] === value)
        .map(con => con[1]);
      if (_textColors_overrides.length > 0 && _textColors_overrides[0] !== '') {
        textColor = ('' + _textColors_overrides[0]).trim();
      }
    }
  }
  return normalizeColor(textColor);
};
export let getThresholds = function(
  thresholdsArray: any[],
  enable_time_based_thresholds: boolean,
  time_based_thresholds: any[],
  currentTimeStamp: Date
) {
  if (enable_time_based_thresholds) {
    let metricrecivedTimeStamp = currentTimeStamp || new Date();
    let metricrecivedTimeStamp_innumber = metricrecivedTimeStamp.getHours() * 100 + metricrecivedTimeStamp.getMinutes();
    let weekdays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    _.each(time_based_thresholds, tbtx => {
      if (
        tbtx &&
        tbtx.from &&
        tbtx.to &&
        tbtx.enabledDays &&
        metricrecivedTimeStamp_innumber >= +tbtx.from &&
        metricrecivedTimeStamp_innumber <= +tbtx.to &&
        tbtx.enabledDays.toLowerCase().indexOf(weekdays[metricrecivedTimeStamp.getDay()]) > -1 &&
        tbtx.threshold
      ) {
        thresholdsArray = (tbtx.threshold + '').split(',').map(d => +d);
      }
    });
  }
  return thresholdsArray || [];
};
export let getLink = function(enable_clickable_cells: boolean, clickable_cells_link: string, range: any): string {
  let link = enable_clickable_cells ? clickable_cells_link || '#' : '#';
  if (link && link !== '#') {
    link += link.indexOf('?') > -1 ? `&from=${range.from}` : `?from=${range.from}`;
    link += `&to=${range.to}`;
  }
  return link;
};
export let GetValuesReplaced = function(
  strToReplace: string,
  value,
  valueformatted,
  stats: any,
  decimals: Number,
  format: string,
  _metricname: string,
  _tags: any[],
  delimiter: string
): string {
  let value_raw = _.isNaN(value) || value === null ? 'null' : value.toString().trim();
  let value_formatted = _.isNaN(value) || value === null ? 'null' : valueformatted.toString().trim();

  strToReplace = strToReplace.replace(new RegExp('_value_min_raw_', 'g'), stats.min);
  strToReplace = strToReplace.replace(new RegExp('_value_max_raw_', 'g'), stats.max);
  strToReplace = strToReplace.replace(new RegExp('_value_avg_raw_', 'g'), stats.avg);
  strToReplace = strToReplace.replace(new RegExp('_value_current_raw_', 'g'), stats.current);
  strToReplace = strToReplace.replace(new RegExp('_value_total_raw_', 'g'), stats.total);
  strToReplace = strToReplace.replace(new RegExp('_value_raw_', 'g'), value_raw);

  strToReplace = strToReplace.replace(new RegExp('_value_min_', 'g'), get_formatted_value(stats.min, decimals, format));
  strToReplace = strToReplace.replace(new RegExp('_value_max_', 'g'), get_formatted_value(stats.max, decimals, format));
  strToReplace = strToReplace.replace(new RegExp('_value_avg_', 'g'), get_formatted_value(stats.avg, decimals, format));
  strToReplace = strToReplace.replace(new RegExp('_value_current_', 'g'), get_formatted_value(stats.current, decimals, format));
  strToReplace = strToReplace.replace(new RegExp('_value_total_', 'g'), get_formatted_value(stats.total, decimals, format));
  strToReplace = strToReplace.replace(new RegExp('_value_', 'g'), value_formatted);

  if (delimiter.toLowerCase() === 'tag') {
    strToReplace = strToReplace.replace(new RegExp('{{metric_name}}', 'g'), _metricname);
    strToReplace = replace_tags_from_field(strToReplace, _tags);
  }

  return strToReplace;
};
