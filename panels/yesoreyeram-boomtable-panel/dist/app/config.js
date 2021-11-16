System.register([], function (exports_1, context_1) {
    "use strict";
    var plugin_id, value_name_options, textAlignmentOptions, config, default_pattern_options;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            plugin_id = 'yesoreyeram-boomtable-panel';
            exports_1("plugin_id", plugin_id);
            value_name_options = [
                { text: 'Min', value: 'min' },
                { text: 'Max', value: 'max' },
                { text: 'Average', value: 'avg' },
                { text: 'Current', value: 'current' },
                { text: 'Time of last data point', value: 'last_time' },
                { text: 'Time of last non null data point', value: 'last_time_nonnull' },
                { text: 'Total', value: 'total' },
            ];
            exports_1("value_name_options", value_name_options);
            textAlignmentOptions = ['left', 'right', 'center'];
            exports_1("textAlignmentOptions", textAlignmentOptions);
            config = {
                debug_mode: false,
                error: undefined,
                groupedData: undefined,
                hide_first_column: false,
                hide_headers: false,
                panelDefaults: {
                    activePatternIndex: -1,
                    default_title_for_rows: 'Metric',
                    patterns: [],
                    row_col_wrapper: '_',
                },
            };
            exports_1("config", config);
            default_pattern_options = {
                bgColors: 'green|orange|red',
                bgColors_overrides: '0->green|2->red|1->yellow',
                clickable_cells_link: '',
                col_name: 'Value',
                decimals: 2,
                defaultBGColor: 'transparent',
                defaultTextColor: '',
                delimiter: '.',
                displayTemplate: '_value_',
                enable_bgColor: false,
                enable_bgColor_overrides: false,
                enable_clickable_cells: false,
                enable_textColor: false,
                enable_textColor_overrides: false,
                enable_time_based_thresholds: false,
                enable_transform: false,
                enable_transform_overrides: false,
                filter: {
                    value_above: '',
                    value_below: '',
                },
                format: 'none',
                name: 'Default Pattern',
                null_color: 'darkred',
                null_textcolor: 'white',
                null_value: 'No data',
                pattern: '*',
                row_name: '_series_',
                textColors: 'red|orange|green',
                textColors_overrides: '0->red|2->green|1->yellow',
                thresholds: '70,90',
                time_based_thresholds: [],
                tooltipTemplate: '',
                transform_values: '_value_|_value_|_value_',
                transform_values_overrides: '0->down|1->up',
                valueName: 'avg',
            };
            exports_1("default_pattern_options", default_pattern_options);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcC9jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztZQUFNLFNBQVMsR0FBRyw2QkFBNkIsQ0FBQzs7WUFDMUMsa0JBQWtCLEdBQUc7Z0JBQ3pCLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO2dCQUM3QixFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtnQkFDN0IsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7Z0JBQ2pDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFO2dCQUNyQyxFQUFFLElBQUksRUFBRSx5QkFBeUIsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFO2dCQUN2RCxFQUFFLElBQUksRUFBRSxrQ0FBa0MsRUFBRSxLQUFLLEVBQUUsbUJBQW1CLEVBQUU7Z0JBQ3hFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFO2FBQ2xDLENBQUM7O1lBQ0ksb0JBQW9CLEdBQUcsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDOztZQUNuRCxNQUFNLEdBQVE7Z0JBQ2xCLFVBQVUsRUFBRSxLQUFLO2dCQUNqQixLQUFLLEVBQUUsU0FBUztnQkFDaEIsV0FBVyxFQUFFLFNBQVM7Z0JBQ3RCLGlCQUFpQixFQUFFLEtBQUs7Z0JBQ3hCLFlBQVksRUFBRSxLQUFLO2dCQUNuQixhQUFhLEVBQUU7b0JBQ2Isa0JBQWtCLEVBQUUsQ0FBQyxDQUFDO29CQUN0QixzQkFBc0IsRUFBRSxRQUFRO29CQUNoQyxRQUFRLEVBQUUsRUFBRTtvQkFDWixlQUFlLEVBQUUsR0FBRztpQkFDckI7YUFDRixDQUFDOztZQUNJLHVCQUF1QixHQUFRO2dCQUNuQyxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixrQkFBa0IsRUFBRSwyQkFBMkI7Z0JBQy9DLG9CQUFvQixFQUFFLEVBQUU7Z0JBQ3hCLFFBQVEsRUFBRSxPQUFPO2dCQUNqQixRQUFRLEVBQUUsQ0FBQztnQkFDWCxjQUFjLEVBQUUsYUFBYTtnQkFDN0IsZ0JBQWdCLEVBQUUsRUFBRTtnQkFDcEIsU0FBUyxFQUFFLEdBQUc7Z0JBQ2QsZUFBZSxFQUFFLFNBQVM7Z0JBQzFCLGNBQWMsRUFBRSxLQUFLO2dCQUNyQix3QkFBd0IsRUFBRSxLQUFLO2dCQUMvQixzQkFBc0IsRUFBRSxLQUFLO2dCQUM3QixnQkFBZ0IsRUFBRSxLQUFLO2dCQUN2QiwwQkFBMEIsRUFBRSxLQUFLO2dCQUNqQyw0QkFBNEIsRUFBRSxLQUFLO2dCQUNuQyxnQkFBZ0IsRUFBRSxLQUFLO2dCQUN2QiwwQkFBMEIsRUFBRSxLQUFLO2dCQUNqQyxNQUFNLEVBQUU7b0JBQ04sV0FBVyxFQUFFLEVBQUU7b0JBQ2YsV0FBVyxFQUFFLEVBQUU7aUJBQ2hCO2dCQUNELE1BQU0sRUFBRSxNQUFNO2dCQUNkLElBQUksRUFBRSxpQkFBaUI7Z0JBQ3ZCLFVBQVUsRUFBRSxTQUFTO2dCQUNyQixjQUFjLEVBQUUsT0FBTztnQkFDdkIsVUFBVSxFQUFFLFNBQVM7Z0JBQ3JCLE9BQU8sRUFBRSxHQUFHO2dCQUNaLFFBQVEsRUFBRSxVQUFVO2dCQUNwQixVQUFVLEVBQUUsa0JBQWtCO2dCQUM5QixvQkFBb0IsRUFBRSwyQkFBMkI7Z0JBQ2pELFVBQVUsRUFBRSxPQUFPO2dCQUNuQixxQkFBcUIsRUFBRSxFQUFFO2dCQUN6QixlQUFlLEVBQUUsRUFBRTtnQkFDbkIsZ0JBQWdCLEVBQUUseUJBQXlCO2dCQUMzQywwQkFBMEIsRUFBRSxlQUFlO2dCQUMzQyxTQUFTLEVBQUUsS0FBSzthQUNqQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgcGx1Z2luX2lkID0gJ3llc29yZXllcmFtLWJvb210YWJsZS1wYW5lbCc7XHJcbmNvbnN0IHZhbHVlX25hbWVfb3B0aW9ucyA9IFtcclxuICB7IHRleHQ6ICdNaW4nLCB2YWx1ZTogJ21pbicgfSxcclxuICB7IHRleHQ6ICdNYXgnLCB2YWx1ZTogJ21heCcgfSxcclxuICB7IHRleHQ6ICdBdmVyYWdlJywgdmFsdWU6ICdhdmcnIH0sXHJcbiAgeyB0ZXh0OiAnQ3VycmVudCcsIHZhbHVlOiAnY3VycmVudCcgfSxcclxuICB7IHRleHQ6ICdUaW1lIG9mIGxhc3QgZGF0YSBwb2ludCcsIHZhbHVlOiAnbGFzdF90aW1lJyB9LFxyXG4gIHsgdGV4dDogJ1RpbWUgb2YgbGFzdCBub24gbnVsbCBkYXRhIHBvaW50JywgdmFsdWU6ICdsYXN0X3RpbWVfbm9ubnVsbCcgfSxcclxuICB7IHRleHQ6ICdUb3RhbCcsIHZhbHVlOiAndG90YWwnIH0sXHJcbl07XHJcbmNvbnN0IHRleHRBbGlnbm1lbnRPcHRpb25zID0gWydsZWZ0JywgJ3JpZ2h0JywgJ2NlbnRlciddO1xyXG5jb25zdCBjb25maWc6IGFueSA9IHtcclxuICBkZWJ1Z19tb2RlOiBmYWxzZSxcclxuICBlcnJvcjogdW5kZWZpbmVkLFxyXG4gIGdyb3VwZWREYXRhOiB1bmRlZmluZWQsXHJcbiAgaGlkZV9maXJzdF9jb2x1bW46IGZhbHNlLFxyXG4gIGhpZGVfaGVhZGVyczogZmFsc2UsXHJcbiAgcGFuZWxEZWZhdWx0czoge1xyXG4gICAgYWN0aXZlUGF0dGVybkluZGV4OiAtMSxcclxuICAgIGRlZmF1bHRfdGl0bGVfZm9yX3Jvd3M6ICdNZXRyaWMnLFxyXG4gICAgcGF0dGVybnM6IFtdLFxyXG4gICAgcm93X2NvbF93cmFwcGVyOiAnXycsXHJcbiAgfSxcclxufTtcclxuY29uc3QgZGVmYXVsdF9wYXR0ZXJuX29wdGlvbnM6IGFueSA9IHtcclxuICBiZ0NvbG9yczogJ2dyZWVufG9yYW5nZXxyZWQnLFxyXG4gIGJnQ29sb3JzX292ZXJyaWRlczogJzAtPmdyZWVufDItPnJlZHwxLT55ZWxsb3cnLFxyXG4gIGNsaWNrYWJsZV9jZWxsc19saW5rOiAnJyxcclxuICBjb2xfbmFtZTogJ1ZhbHVlJyxcclxuICBkZWNpbWFsczogMixcclxuICBkZWZhdWx0QkdDb2xvcjogJ3RyYW5zcGFyZW50JyxcclxuICBkZWZhdWx0VGV4dENvbG9yOiAnJyxcclxuICBkZWxpbWl0ZXI6ICcuJyxcclxuICBkaXNwbGF5VGVtcGxhdGU6ICdfdmFsdWVfJyxcclxuICBlbmFibGVfYmdDb2xvcjogZmFsc2UsXHJcbiAgZW5hYmxlX2JnQ29sb3Jfb3ZlcnJpZGVzOiBmYWxzZSxcclxuICBlbmFibGVfY2xpY2thYmxlX2NlbGxzOiBmYWxzZSxcclxuICBlbmFibGVfdGV4dENvbG9yOiBmYWxzZSxcclxuICBlbmFibGVfdGV4dENvbG9yX292ZXJyaWRlczogZmFsc2UsXHJcbiAgZW5hYmxlX3RpbWVfYmFzZWRfdGhyZXNob2xkczogZmFsc2UsXHJcbiAgZW5hYmxlX3RyYW5zZm9ybTogZmFsc2UsXHJcbiAgZW5hYmxlX3RyYW5zZm9ybV9vdmVycmlkZXM6IGZhbHNlLFxyXG4gIGZpbHRlcjoge1xyXG4gICAgdmFsdWVfYWJvdmU6ICcnLFxyXG4gICAgdmFsdWVfYmVsb3c6ICcnLFxyXG4gIH0sXHJcbiAgZm9ybWF0OiAnbm9uZScsXHJcbiAgbmFtZTogJ0RlZmF1bHQgUGF0dGVybicsXHJcbiAgbnVsbF9jb2xvcjogJ2RhcmtyZWQnLFxyXG4gIG51bGxfdGV4dGNvbG9yOiAnd2hpdGUnLFxyXG4gIG51bGxfdmFsdWU6ICdObyBkYXRhJyxcclxuICBwYXR0ZXJuOiAnKicsXHJcbiAgcm93X25hbWU6ICdfc2VyaWVzXycsXHJcbiAgdGV4dENvbG9yczogJ3JlZHxvcmFuZ2V8Z3JlZW4nLFxyXG4gIHRleHRDb2xvcnNfb3ZlcnJpZGVzOiAnMC0+cmVkfDItPmdyZWVufDEtPnllbGxvdycsXHJcbiAgdGhyZXNob2xkczogJzcwLDkwJyxcclxuICB0aW1lX2Jhc2VkX3RocmVzaG9sZHM6IFtdLFxyXG4gIHRvb2x0aXBUZW1wbGF0ZTogJycsXHJcbiAgdHJhbnNmb3JtX3ZhbHVlczogJ192YWx1ZV98X3ZhbHVlX3xfdmFsdWVfJyxcclxuICB0cmFuc2Zvcm1fdmFsdWVzX292ZXJyaWRlczogJzAtPmRvd258MS0+dXAnLFxyXG4gIHZhbHVlTmFtZTogJ2F2ZycsXHJcbn07XHJcbmV4cG9ydCB7IHBsdWdpbl9pZCwgZGVmYXVsdF9wYXR0ZXJuX29wdGlvbnMsIHZhbHVlX25hbWVfb3B0aW9ucywgdGV4dEFsaWdubWVudE9wdGlvbnMsIGNvbmZpZyB9O1xyXG4iXX0=