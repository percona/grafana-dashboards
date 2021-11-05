///<reference path="../../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import TimeSeries from "app/core/time_series2";
import _ from "lodash";
import { replaceTokens, getActualNameWithoutTokens, getMetricNameFromTaggedAlias, getLablesFromTaggedAlias } from "./index";
import { getThresholds, getBGColor, getTextColor, getLink, GetValuesReplaced } from "./BoomSeriesUtils";
import { getDisplayValueTemplate, getSeriesValue, getCurrentTimeStamp, replaceDelimitedColumns, getRowName, getColName, doesValueNeedsToHide } from "./BoomUtils";
import { get_formatted_value } from  "./../GrafanaUtils";
import { IBoomSeries } from "./Boom.interface";

class BoomSeries implements IBoomSeries {

    private debug_mode: Boolean;
    private pattern: any = undefined;
    private seriesName: string;
    private currentTimeStamp: Date;
    private template_value = "";
    private row_col_wrapper = "_";
    private decimals: Number;
    public col_name: string;
    public row_name: string;
    public row_name_raw: string;
    public color_bg: string;
    public color_text: string;
    public display_value = "-";
    public tooltip = "-";
    public value = NaN;
    public value_formatted = "-";
    public link = "-";
    public thresholds: Number[];
    public hidden: Boolean = false;
    public _metricname = "";
    public _tags: any[] = [];

    constructor(seriesData: any, panelDefaultPattern: any, panelPatterns: any[], options: any, scopedVars: any, templateSrv: any, timeSrv: any) {

        let series = new TimeSeries({
            alias: seriesData.target,
            datapoints: seriesData.datapoints || []
        });
        series.flotpairs = series.getFlotPairs("connected");

        this.debug_mode = options && options.debug_mode === true ? true : false;
        this.row_col_wrapper = options && options.row_col_wrapper ? options.row_col_wrapper : this.row_col_wrapper;
        this.currentTimeStamp = getCurrentTimeStamp(series.dataPoints);
        this.seriesName = series.alias || series.aliasEscaped || series.label || series.id || "";

        let getMatchingAndEnabledPattern = (patterns, seriesName) => patterns.find(p => seriesName.match(p.pattern) && p.disabled !== true);
        this.pattern = getMatchingAndEnabledPattern(panelPatterns, this.seriesName) || panelDefaultPattern;

        this.decimals = this.pattern.decimals || panelDefaultPattern.decimals || 2;
        this.value = getSeriesValue(series, this.pattern.valueName);
        this.value_formatted = get_formatted_value(this.value, this.decimals, this.pattern.format);
        this.display_value = ((_.isNaN(this.value) || this.value === null) ? this.pattern.null_value : String(this.value)).toString();
        this.hidden = doesValueNeedsToHide(this.value, this.pattern.filter);
        this._metricname = this.pattern.delimiter.toLowerCase() === "tag" ? getMetricNameFromTaggedAlias(seriesData.target) : "";
        this._tags = this.pattern.delimiter.toLowerCase() === "tag" ? getLablesFromTaggedAlias(seriesData.target, this._metricname) : [];

        this.row_name = getRowName(this.pattern.row_name, this.pattern.delimiter, this.row_col_wrapper, this.seriesName, this._metricname, this._tags);
        this.row_name_raw = getRowName(this.pattern.row_name, this.pattern.delimiter, this.row_col_wrapper, this.seriesName, this._metricname, this._tags);
        this.col_name = getColName(this.pattern.col_name, this.pattern.delimiter, this.row_col_wrapper, this.seriesName, this.row_name, this._metricname, this._tags);

        this.thresholds = getThresholds(templateSrv.replace(this.pattern.thresholds, scopedVars).split(",").map(d => +d), this.pattern.enable_time_based_thresholds, this.pattern.time_based_thresholds, this.currentTimeStamp);
        this.color_bg = getBGColor(this.value, this.pattern, this.thresholds, templateSrv.replace(this.pattern.bgColors, scopedVars).split("|"), templateSrv.replace(this.pattern.bgColors_overrides, scopedVars).split("|"));
        this.color_text = getTextColor(this.value, this.pattern, this.thresholds, templateSrv.replace(this.pattern.textColors, scopedVars).split("|"), templateSrv.replace(this.pattern.textColors_overrides, scopedVars).split("|"));
        this.template_value = getDisplayValueTemplate(this.value, this.pattern, this.seriesName, this.row_col_wrapper, this.thresholds);

        this.link = getLink(this.pattern.enable_clickable_cells, this.pattern.clickable_cells_link, timeSrv.timeRangeForUrl());
        this.link = replaceDelimitedColumns(this.link, this.seriesName, this.pattern.delimiter, this.row_col_wrapper);

        this.tooltip = this.pattern.tooltipTemplate || "Series : _series_ <br/>Row Name : _row_name_ <br/>Col Name : _col_name_ <br/>Value : _value_";

        this.replaceSeriesRowColTokens();

        this.link = GetValuesReplaced(this.link, this.value, this.value_formatted, series.stats, this.decimals, this.pattern.format, this._metricname, this._tags, this.pattern.delimiter || "");
        this.tooltip = GetValuesReplaced(this.tooltip, this.value, this.value_formatted, series.stats, this.decimals, this.pattern.format, this._metricname, this._tags, this.pattern.delimiter || "");
        this.display_value = GetValuesReplaced(this.display_value, this.value, this.value_formatted, series.stats, this.decimals, this.pattern.format, this._metricname, this._tags, this.pattern.delimiter || "");

        this.row_name = replaceTokens(this.row_name);
        this.col_name = replaceTokens(this.col_name);
        this.display_value = replaceTokens(this.display_value);

        this.row_name = templateSrv.replace(this.row_name, scopedVars);
        this.col_name = templateSrv.replace(this.col_name, scopedVars);
        this.display_value = templateSrv.replace(this.display_value, scopedVars);

        this.tooltip = templateSrv.replace(this.tooltip, scopedVars);
        this.link = templateSrv.replace(this.link, scopedVars);

        if (this.debug_mode !== true) {
            delete this.seriesName;
            delete this.pattern;
            delete this.thresholds;
            delete this.decimals;
            delete this.template_value;
            delete this.value_formatted;
            delete this.currentTimeStamp;
        }

    }
    private replaceSeriesRowColTokens() {

        this.link = this.link.replace(new RegExp("_series_", "g"), this.seriesName.toString().trim());
        this.tooltip = this.tooltip.replace(new RegExp("_series_", "g"), this.seriesName.toString().trim());
        this.display_value = this.template_value.replace(new RegExp("_series_", "g"), this.seriesName.toString());

        this.col_name = this.col_name.replace(new RegExp("_row_name_", "g"), this.row_name.toString());
        this.link = this.link.replace(new RegExp("_row_name_", "g"), getActualNameWithoutTokens(this.row_name.toString()).trim());
        this.tooltip = this.tooltip.replace(new RegExp("_row_name_", "g"), getActualNameWithoutTokens(this.row_name.toString()).trim());
        this.display_value = this.display_value.replace(new RegExp("_row_name_", "g"), this.row_name.toString());

        this.row_name = this.row_name.replace(new RegExp("_col_name_", "g"), this.col_name.toString());
        this.link = this.link.replace(new RegExp("_col_name_", "g"), getActualNameWithoutTokens(this.col_name.toString()).trim());
        this.tooltip = this.tooltip.replace(new RegExp("_col_name_", "g"), getActualNameWithoutTokens(this.col_name.toString()).trim());
        this.display_value = this.display_value.replace(new RegExp("_col_name_", "g"), this.col_name.toString());

    }

}

export {
    BoomSeries
};
