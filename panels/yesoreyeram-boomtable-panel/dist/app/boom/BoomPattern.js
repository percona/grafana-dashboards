System.register(["./index"], function (exports_1, context_1) {
    "use strict";
    var index_1, BoomPattern;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            }
        ],
        execute: function () {
            BoomPattern = (function () {
                function BoomPattern(options) {
                    this.row_col_wrapper = '_';
                    if (options && options.row_col_wrapper) {
                        this.row_col_wrapper = options.row_col_wrapper;
                    }
                    this.bgColors = options && options.bgColors ? options.bgColors : 'green|orange|red';
                    this.bgColors_overrides = options && options.bgColors_overrides ? options.bgColors_overrides : '0->green|2->red|1->yellow';
                    this.textColors = options && options.textColors ? options.textColors : 'red|orange|green';
                    this.textColors_overrides = options && options.textColors_overrides ? options.textColors_overrides : '0->red|2->green|1->yellow';
                    this.clickable_cells_link = options && options.clickable_cells_link ? options.clickable_cells_link : '';
                    this.col_name = options && options.col_name ? options.col_name : this.row_col_wrapper + '1' + this.row_col_wrapper;
                    this.decimals = options && options.decimals ? options.decimals : 2;
                    this.delimiter = options && options.delimiter ? options.delimiter : '.';
                    this.displayTemplate = options && options.displayTemplate ? options.displayTemplate : '_value_';
                    this.defaultBGColor = options && options.defaultBGColor ? options.defaultBGColor : '';
                    this.defaultTextColor = options && options.defaultTextColor ? options.defaultTextColor : '';
                    this.enable_bgColor = false;
                    this.enable_bgColor_overrides = false;
                    this.enable_textColor = false;
                    this.enable_textColor_overrides = false;
                    this.enable_clickable_cells = false;
                    this.enable_time_based_thresholds = false;
                    this.enable_transform = false;
                    this.enable_transform_overrides = false;
                    this.filter = {
                        value_above: '',
                        value_below: '',
                    };
                    this.format = options && options.format ? options.format : 'none';
                    this.name = options && options.name ? options.name : 'New Pattern';
                    this.null_color = options && options.null_color ? options.null_color : 'darkred';
                    this.null_textcolor = options && options.null_Textcolor ? options.null_Textcolor : 'black';
                    this.null_value = options && options.null_value ? options.null_value : 'No data';
                    this.pattern = options && options.pattern ? options.pattern : '^server.*cpu$';
                    this.row_name = options && options.row_name ? options.row_name : this.row_col_wrapper + '0' + this.row_col_wrapper;
                    this.thresholds = options && options.thresholds ? options.thresholds : '70,90';
                    this.time_based_thresholds = [];
                    this.transform_values = options && options.transform_values ? options.transform_values : '_value_|_value_|_value_';
                    this.transform_values_overrides = options && options.transform_values_overrides ? options.transform_values_overrides : '0->down|1->up';
                    this.tooltipTemplate =
                        options && options.tooltipTemplate
                            ? options.tooltipTemplate
                            : 'Series : _series_ <br/>Row Name : _row_name_ <br/>Col Name : _col_name_ <br/>Value : _value_';
                    this.valueName = options && options.valueName ? options.valueName : 'avg';
                }
                return BoomPattern;
            }());
            exports_1("BoomPattern", BoomPattern);
            BoomPattern.prototype.inverseBGColors = function () {
                this.bgColors = this.bgColors
                    ? this.bgColors
                        .split('|')
                        .reverse()
                        .join('|')
                    : '';
            };
            BoomPattern.prototype.inverseTextColors = function () {
                this.textColors = this.textColors
                    ? this.textColors
                        .split('|')
                        .reverse()
                        .join('|')
                    : '';
            };
            BoomPattern.prototype.inverseTransformValues = function () {
                this.transform_values = this.transform_values
                    ? this.transform_values
                        .split('|')
                        .reverse()
                        .join('|')
                    : '';
            };
            BoomPattern.prototype.add_time_based_thresholds = function () {
                var new_time_based_threshold = new index_1.BoomTimeBasedThreshold();
                this.time_based_thresholds = this.time_based_thresholds || [];
                this.time_based_thresholds.push(new_time_based_threshold);
            };
            BoomPattern.prototype.remove_time_based_thresholds = function (index) {
                if (this.time_based_thresholds.length > 0) {
                    this.time_based_thresholds.splice(Number(index), 1);
                }
            };
            BoomPattern.prototype.setUnitFormat = function (format) {
                this.format = format && format.value ? format.value : 'none';
            };
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm9vbVBhdHRlcm4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2Jvb20vQm9vbVBhdHRlcm4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7WUFFQTtnQkE0Q0UscUJBQVksT0FBWTtvQkEzQ2hCLG9CQUFlLEdBQUcsR0FBRyxDQUFDO29CQTRDNUIsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLGVBQWUsRUFBRTt3QkFDdEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDO3FCQUNoRDtvQkFDRCxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQztvQkFDcEYsSUFBSSxDQUFDLGtCQUFrQixHQUFHLE9BQU8sSUFBSSxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsMkJBQTJCLENBQUM7b0JBQzNILElBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDO29CQUMxRixJQUFJLENBQUMsb0JBQW9CLEdBQUcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQywyQkFBMkIsQ0FBQztvQkFDakksSUFBSSxDQUFDLG9CQUFvQixHQUFHLE9BQU8sSUFBSSxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO29CQUN4RyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sSUFBSSxPQUFPLENBQUMsUUFBUSxD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QUMsTUFBTSxHQUFHLE1BQU0sSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDL0QsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUJvb21QYXR0ZXJuLCBJQm9vbVRpbWVCYXNlZFRocmVzaG9sZCwgQm9vbVRpbWVCYXNlZFRocmVzaG9sZCB9IGZyb20gJy4vaW5kZXgnO1xuXG5jbGFzcyBCb29tUGF0dGVybiBpbXBsZW1lbnRzIElCb29tUGF0dGVybiB7XG4gIHByaXZhdGUgcm93X2NvbF93cmFwcGVyID0gJ18nO1xuICBwdWJsaWMgYmdDb2xvcnM6IHN0cmluZztcbiAgcHVibGljIGJnQ29sb3JzX292ZXJyaWRlczogc3RyaW5nO1xuICBwdWJsaWMgY2xpY2thYmxlX2NlbGxzX2xpbms6IHN0cmluZztcbiAgcHVibGljIGNvbF9uYW1lOiBzdHJpbmc7XG4gIHB1YmxpYyBkaXNwbGF5VGVtcGxhdGU6IHN0cmluZztcbiAgcHVibGljIGRlZmF1bHRCR0NvbG9yOiBzdHJpbmc7XG4gIHB1YmxpYyBkZWZhdWx0VGV4dENvbG9yOiBzdHJpbmc7XG4gIHB1YmxpYyBkZWNpbWFsczogTnVtYmVyO1xuICBwdWJsaWMgZGVsaW1pdGVyOiBzdHJpbmc7XG4gIHB1YmxpYyBlbmFibGVfYmdDb2xvcjogQm9vbGVhbjtcbiAgcHVibGljIGVuYWJsZV9iZ0NvbG9yX292ZXJyaWRlczogQm9vbGVhbjtcbiAgcHVibGljIGVuYWJsZV9jbGlja2FibGVfY2VsbHM6IEJvb2xlYW47XG4gIHB1YmxpYyBlbmFibGVfdGV4dENvbG9yOiBCb29sZWFuO1xuICBwdWJsaWMgZW5hYmxlX3RleHRDb2xvcl9vdmVycmlkZXM6IEJvb2xlYW47XG4gIHB1YmxpYyBlbmFibGVfdGltZV9iYXNlZF90aHJlc2hvbGRzOiBCb29sZWFuO1xuICBwdWJsaWMgZW5hYmxlX3RyYW5zZm9ybTogQm9vbGVhbjtcbiAgcHVibGljIGVuYWJsZV90cmFuc2Zvcm1fb3ZlcnJpZGVzOiBCb29sZWFuO1xuICBwdWJsaWMgZmlsdGVyOiB7XG4gICAgdmFsdWVfYWJvdmU6IHN0cmluZztcbiAgICB2YWx1ZV9iZWxvdzogc3RyaW5nO1xuICB9O1xuICBwdWJsaWMgZm9ybWF0OiBzdHJpbmc7XG4gIHB1YmxpYyBuYW1lOiBzdHJpbmc7XG4gIHB1YmxpYyBudWxsX2NvbG9yOiBzdHJpbmc7XG4gIHB1YmxpYyBudWxsX3ZhbHVlOiBzdHJpbmc7XG4gIHB1YmxpYyBudWxsX3RleHRjb2xvcjogc3RyaW5nO1xuICBwdWJsaWMgcGF0dGVybjogc3RyaW5nO1xuICBwdWJsaWMgcm93X25hbWU6IHN0cmluZztcbiAgcHVibGljIHRleHRDb2xvcnM6IHN0cmluZztcbiAgcHVibGljIHRleHRDb2xvcnNfb3ZlcnJpZGVzOiBzdHJpbmc7XG4gIHB1YmxpYyB0aHJlc2hvbGRzOiBzdHJpbmc7XG4gIHB1YmxpYyB0aW1lX2Jhc2VkX3RocmVzaG9sZHM6IElCb29tVGltZUJhc2VkVGhyZXNob2xkW107XG4gIHB1YmxpYyB0cmFuc2Zvcm1fdmFsdWVzOiBzdHJpbmc7XG4gIHB1YmxpYyB0cmFuc2Zvcm1fdmFsdWVzX292ZXJyaWRlczogc3RyaW5nO1xuICBwdWJsaWMgdG9vbHRpcFRlbXBsYXRlOiBzdHJpbmc7XG4gIHB1YmxpYyB2YWx1ZU5hbWU6IHN0cmluZztcbiAgcHVibGljIGludmVyc2VCR0NvbG9ycztcbiAgcHVibGljIGludmVyc2VUZXh0Q29sb3JzO1xuICBwdWJsaWMgaW52ZXJzZVRyYW5zZm9ybVZhbHVlcztcbiAgcHVibGljIGFkZF90aW1lX2Jhc2VkX3RocmVzaG9sZHM7XG4gIHB1YmxpYyByZW1vdmVfdGltZV9iYXNlZF90aHJlc2hvbGRzO1xuICBwdWJsaWMgc2V0VW5pdEZvcm1hdDtcbiAgY29uc3RydWN0b3Iob3B0aW9uczogYW55KSB7XG4gICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5yb3dfY29sX3dyYXBwZXIpIHtcbiAgICAgIHRoaXMucm93X2NvbF93cmFwcGVyID0gb3B0aW9ucy5yb3dfY29sX3dyYXBwZXI7XG4gICAgfVxuICAgIHRoaXMuYmdDb2xvcnMgPSBvcHRpb25zICYmIG9wdGlvbnMuYmdDb2xvcnMgPyBvcHRpb25zLmJnQ29sb3JzIDogJ2dyZWVufG9yYW5nZXxyZWQnO1xuICAgIHRoaXMuYmdDb2xvcnNfb3ZlcnJpZGVzID0gb3B0aW9ucyAmJiBvcHRpb25zLmJnQ29sb3JzX292ZXJyaWRlcyA/IG9wdGlvbnMuYmdDb2xvcnNfb3ZlcnJpZGVzIDogJzAtPmdyZWVufDItPnJlZHwxLT55ZWxsb3cnO1xuICAgIHRoaXMudGV4dENvbG9ycyA9IG9wdGlvbnMgJiYgb3B0aW9ucy50ZXh0Q29sb3JzID8gb3B0aW9ucy50ZXh0Q29sb3JzIDogJ3JlZHxvcmFuZ2V8Z3JlZW4nO1xuICAgIHRoaXMudGV4dENvbG9yc19vdmVycmlkZXMgPSBvcHRpb25zICYmIG9wdGlvbnMudGV4dENvbG9yc19vdmVycmlkZXMgPyBvcHRpb25zLnRleHRDb2xvcnNfb3ZlcnJpZGVzIDogJzAtPnJlZHwyLT5ncmVlbnwxLT55ZWxsb3cnO1xuICAgIHRoaXMuY2xpY2thYmxlX2NlbGxzX2xpbmsgPSBvcHRpb25zICYmIG9wdGlvbnMuY2xpY2thYmxlX2NlbGxzX2xpbmsgPyBvcHRpb25zLmNsaWNrYWJsZV9jZWxsc19saW5rIDogJyc7XG4gICAgdGhpcy5jb2xfbmFtZSA9IG9wdGlvbnMgJiYgb3B0aW9ucy5jb2xfbmFtZSA/IG9wdGlvbnMuY29sX25hbWUgOiB0aGlzLnJvd19jb2xfd3JhcHBlciArICcxJyArIHRoaXMucm93X2NvbF93cmFwcGVyO1xuICAgIHRoaXMuZGVjaW1hbHMgPSBvcHRpb25zICYmIG9wdGlvbnMuZGVjaW1hbHMgPyBvcHRpb25zLmRlY2ltYWxzIDogMjtcbiAgICB0aGlzLmRlbGltaXRlciA9IG9wdGlvbnMgJiYgb3B0aW9ucy5kZWxpbWl0ZXIgPyBvcHRpb25zLmRlbGltaXRlciA6ICcuJztcbiAgICB0aGlzLmRpc3BsYXlUZW1wbGF0ZSA9IG9wdGlvbnMgJiYgb3B0aW9ucy5kaXNwbGF5VGVtcGxhdGUgPyBvcHRpb25zLmRpc3BsYXlUZW1wbGF0ZSA6ICdfdmFsdWVfJztcbiAgICB0aGlzLmRlZmF1bHRCR0NvbG9yID0gb3B0aW9ucyAmJiBvcHRpb25zLmRlZmF1bHRCR0NvbG9yID8gb3B0aW9ucy5kZWZhdWx0QkdDb2xvciA6ICcnO1xuICAgIHRoaXMuZGVmYXVsdFRleHRDb2xvciA9IG9wdGlvbnMgJiYgb3B0aW9ucy5kZWZhdWx0VGV4dENvbG9yID8gb3B0aW9ucy5kZWZhdWx0VGV4dENvbG9yIDogJyc7XG4gICAgdGhpcy5lbmFibGVfYmdDb2xvciA9IGZhbHNlO1xuICAgIHRoaXMuZW5hYmxlX2JnQ29sb3Jfb3ZlcnJpZGVzID0gZmFsc2U7XG4gICAgdGhpcy5lbmFibGVfdGV4dENvbG9yID0gZmFsc2U7XG4gICAgdGhpcy5lbmFibGVfdGV4dENvbG9yX292ZXJyaWRlcyA9IGZhbHNlO1xuICAgIHRoaXMuZW5hYmxlX2NsaWNrYWJsZV9jZWxscyA9IGZhbHNlO1xuICAgIHRoaXMuZW5hYmxlX3RpbWVfYmFzZWRfdGhyZXNob2xkcyA9IGZhbHNlO1xuICAgIHRoaXMuZW5hYmxlX3RyYW5zZm9ybSA9IGZhbHNlO1xuICAgIHRoaXMuZW5hYmxlX3RyYW5zZm9ybV9vdmVycmlkZXMgPSBmYWxzZTtcbiAgICB0aGlzLmZpbHRlciA9IHtcbiAgICAgIHZhbHVlX2Fib3ZlOiAnJyxcbiAgICAgIHZhbHVlX2JlbG93OiAnJyxcbiAgICB9O1xuICAgIHRoaXMuZm9ybWF0ID0gb3B0aW9ucyAmJiBvcHRpb25zLmZvcm1hdCA/IG9wdGlvbnMuZm9ybWF0IDogJ25vbmUnO1xuICAgIHRoaXMubmFtZSA9IG9wdGlvbnMgJiYgb3B0aW9ucy5uYW1lID8gb3B0aW9ucy5uYW1lIDogJ05ldyBQYXR0ZXJuJztcbiAgICB0aGlzLm51bGxfY29sb3IgPSBvcHRpb25zICYmIG9wdGlvbnMubnVsbF9jb2xvciA/IG9wdGlvbnMubnVsbF9jb2xvciA6ICdkYXJrcmVkJztcbiAgICB0aGlzLm51bGxfdGV4dGNvbG9yID0gb3B0aW9ucyAmJiBvcHRpb25zLm51bGxfVGV4dGNvbG9yID8gb3B0aW9ucy5udWxsX1RleHRjb2xvciA6ICdibGFjayc7XG4gICAgdGhpcy5udWxsX3ZhbHVlID0gb3B0aW9ucyAmJiBvcHRpb25zLm51bGxfdmFsdWUgPyBvcHRpb25zLm51bGxfdmFsdWUgOiAnTm8gZGF0YSc7XG4gICAgdGhpcy5wYXR0ZXJuID0gb3B0aW9ucyAmJiBvcHRpb25zLnBhdHRlcm4gPyBvcHRpb25zLnBhdHRlcm4gOiAnXnNlcnZlci4qY3B1JCc7XG4gICAgdGhpcy5yb3dfbmFtZSA9IG9wdGlvbnMgJiYgb3B0aW9ucy5yb3dfbmFtZSA/IG9wdGlvbnMucm93X25hbWUgOiB0aGlzLnJvd19jb2xfd3JhcHBlciArICcwJyArIHRoaXMucm93X2NvbF93cmFwcGVyO1xuICAgIHRoaXMudGhyZXNob2xkcyA9IG9wdGlvbnMgJiYgb3B0aW9ucy50aHJlc2hvbGRzID8gb3B0aW9ucy50aHJlc2hvbGRzIDogJzcwLDkwJztcbiAgICB0aGlzLnRpbWVfYmFzZWRfdGhyZXNob2xkcyA9IFtdO1xuICAgIHRoaXMudHJhbnNmb3JtX3ZhbHVlcyA9IG9wdGlvbnMgJiYgb3B0aW9ucy50cmFuc2Zvcm1fdmFsdWVzID8gb3B0aW9ucy50cmFuc2Zvcm1fdmFsdWVzIDogJ192YWx1ZV98X3ZhbHVlX3xfdmFsdWVfJztcbiAgICB0aGlzLnRyYW5zZm9ybV92YWx1ZXNfb3ZlcnJpZGVzID0gb3B0aW9ucyAmJiBvcHRpb25zLnRyYW5zZm9ybV92YWx1ZXNfb3ZlcnJpZGVzID8gb3B0aW9ucy50cmFuc2Zvcm1fdmFsdWVzX292ZXJyaWRlcyA6ICcwLT5kb3dufDEtPnVwJztcbiAgICB0aGlzLnRvb2x0aXBUZW1wbGF0ZSA9XG4gICAgICBvcHRpb25zICYmIG9wdGlvbnMudG9vbHRpcFRlbXBsYXRlXG4gICAgICAgID8gb3B0aW9ucy50b29sdGlwVGVtcGxhdGVcbiAgICAgICAgOiAnU2VyaWVzIDogX3Nlcmllc18gPGJyLz5Sb3cgTmFtZSA6IF9yb3dfbmFtZV8gPGJyLz5Db2wgTmFtZSA6IF9jb2xfbmFtZV8gPGJyLz5WYWx1ZSA6IF92YWx1ZV8nO1xuICAgIHRoaXMudmFsdWVOYW1lID0gb3B0aW9ucyAmJiBvcHRpb25zLnZhbHVlTmFtZSA/IG9wdGlvbnMudmFsdWVOYW1lIDogJ2F2Zyc7XG4gIH1cbn1cblxuQm9vbVBhdHRlcm4ucHJvdG90eXBlLmludmVyc2VCR0NvbG9ycyA9IGZ1bmN0aW9uKCk6IHZvaWQge1xuICB0aGlzLmJnQ29sb3JzID0gdGhpcy5iZ0NvbG9yc1xuICAgID8gdGhpcy5iZ0NvbG9yc1xuICAgICAgICAuc3BsaXQoJ3wnKVxuICAgICAgICAucmV2ZXJzZSgpXG4gICAgICAgIC5qb2luKCd8JylcbiAgICA6ICcnO1xufTtcblxuQm9vbVBhdHRlcm4ucHJvdG90eXBlLmludmVyc2VUZXh0Q29sb3JzID0gZnVuY3Rpb24oKTogdm9pZCB7XG4gIHRoaXMudGV4dENvbG9ycyA9IHRoaXMudGV4dENvbG9yc1xuICAgID8gdGhpcy50ZXh0Q29sb3JzXG4gICAgICAgIC5zcGxpdCgnfCcpXG4gICAgICAgIC5yZXZlcnNlKClcbiAgICAgICAgLmpvaW4oJ3wnKVxuICAgIDogJyc7XG59O1xuXG5Cb29tUGF0dGVybi5wcm90b3R5cGUuaW52ZXJzZVRyYW5zZm9ybVZhbHVlcyA9IGZ1bmN0aW9uKCk6IHZvaWQge1xuICB0aGlzLnRyYW5zZm9ybV92YWx1ZXMgPSB0aGlzLnRyYW5zZm9ybV92YWx1ZXNcbiAgICA/IHRoaXMudHJhbnNmb3JtX3ZhbHVlc1xuICAgICAgICAuc3BsaXQoJ3wnKVxuICAgICAgICAucmV2ZXJzZSgpXG4gICAgICAgIC5qb2luKCd8JylcbiAgICA6ICcnO1xufTtcblxuQm9vbVBhdHRlcm4ucHJvdG90eXBlLmFkZF90aW1lX2Jhc2VkX3RocmVzaG9sZHMgPSBmdW5jdGlvbigpOiB2b2lkIHtcbiAgbGV0IG5ld190aW1lX2Jhc2VkX3RocmVzaG9sZDogSUJvb21UaW1lQmFzZWRUaHJlc2hvbGQgPSBuZXcgQm9vbVRpbWVCYXNlZFRocmVzaG9sZCgpO1xuICB0aGlzLnRpbWVfYmFzZWRfdGhyZXNob2xkcyA9IHRoaXMudGltZV9iYXNlZF90aHJlc2hvbGRzIHx8IFtdO1xuICB0aGlzLnRpbWVfYmFzZWRfdGhyZXNob2xkcy5wdXNoKG5ld190aW1lX2Jhc2VkX3RocmVzaG9sZCk7XG59O1xuXG5Cb29tUGF0dGVybi5wcm90b3R5cGUucmVtb3ZlX3RpbWVfYmFzZWRfdGhyZXNob2xkcyA9IGZ1bmN0aW9uKGluZGV4OiBOdW1iZXIpOiB2b2lkIHtcbiAgaWYgKHRoaXMudGltZV9iYXNlZF90aHJlc2hvbGRzLmxlbmd0aCA+IDApIHtcbiAgICB0aGlzLnRpbWVfYmFzZWRfdGhyZXNob2xkcy5zcGxpY2UoTnVtYmVyKGluZGV4KSwgMSk7XG4gIH1cbn07XG5cbkJvb21QYXR0ZXJuLnByb3RvdHlwZS5zZXRVbml0Rm9ybWF0ID0gZnVuY3Rpb24oZm9ybWF0OiBhbnkpOiB2b2lkIHtcbiAgdGhpcy5mb3JtYXQgPSBmb3JtYXQgJiYgZm9ybWF0LnZhbHVlID8gZm9ybWF0LnZhbHVlIDogJ25vbmUnO1xufTtcblxuZXhwb3J0IHsgQm9vbVBhdHRlcm4gfTtcbiJdfQ==