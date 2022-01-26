System.register(["lodash", "./boom/index", "./config"], function (exports_1, context_1) {
    "use strict";
    var lodash_1, index_1, config_1, defaultPattern, seriesToTable;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            }
        ],
        execute: function () {
            defaultPattern = new index_1.BoomPattern(config_1.default_pattern_options);
            exports_1("defaultPattern", defaultPattern);
            seriesToTable = function (inputdata, options) {
                var rows_found = lodash_1.default.uniq(lodash_1.default.map(inputdata, function (d) { return d.row_name; }));
                var rows_without_token = lodash_1.default.uniq(lodash_1.default.map(inputdata, function (d) { return d.row_name_raw; }));
                var cols_found = lodash_1.default.uniq(lodash_1.default.map(inputdata, function (d) { return d.col_name; }));
                var output = [];
                lodash_1.default.each(rows_found.sort(), function (row_name) {
                    var cols = [];
                    lodash_1.default.each(cols_found.sort(), function (col_name) {
                        var matched_items = lodash_1.default.filter(inputdata, function (o) {
                            return o.row_name === row_name && o.col_name === col_name;
                        });
                        if (!matched_items || matched_items.length === 0) {
                            cols.push({
                                col_name: col_name,
                                color_bg: options.non_matching_cells_color_bg,
                                color_text: options.non_matching_cells_color_text,
                                display_value: index_1.replaceTokens(options.non_matching_cells_text),
                                hidden: false,
                                link: '-',
                                row_name: row_name,
                                tooltip: '-',
                                value: NaN,
                            });
                        }
                        else if (matched_items && matched_items.length === 1) {
                            cols.push(matched_items[0]);
                        }
                        else if (matched_items && matched_items.length > 1) {
                            cols.push({
                                col_name: col_name,
                                color_bg: 'darkred',
                                color_text: 'white',
                                display_value: 'Duplicate matches',
                                hidden: false,
                                link: '-',
                                row_name: row_name,
                                tooltip: '-',
                                value: NaN,
                            });
                        }
                    });
                    output.push(cols);
                });
                return {
                    cols_found: cols_found,
                    output: output,
                    rows_found: rows_found,
                    rows_without_token: rows_without_token,
                };
            };
            exports_1("seriesToTable", seriesToTable);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcC9hcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFLTSxjQUFjLEdBQUcsSUFBSSxtQkFBVyxDQUFDLGdDQUF1QixDQUFDLENBQUM7O1lBRTFELGFBQWEsR0FBRyxVQUFTLFNBQXdCLEVBQUUsT0FBd0M7Z0JBQy9GLElBQUksVUFBVSxHQUFHLGdCQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxRQUFRLEVBQVYsQ0FBVSxDQUFDLENBQUMsQ0FBQztnQkFDM0QsSUFBSSxrQkFBa0IsR0FBRyxnQkFBQyxDQUFDLElBQUksQ0FBQyxnQkFBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsWUFBWSxFQUFkLENBQWMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZFLElBQUksVUFBVSxHQUFHLGdCQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxRQUFRLEVBQVYsQ0FBVSxDQUFDLENBQUMsQ0FBQztnQkFDM0QsSUFBSSxNQUFNLEdBQXlCLEVBQUUsQ0FBQztnQkFDdEMsZ0JBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxFQUFFLFVBQUEsUUFBUTtvQkFDaEMsSUFBSSxJQUFJLEdBQXVCLEVBQUUsQ0FBQztvQkFDbEMsZ0JBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxFQUFFLFVBQUEsUUFBUTt3QkFDaEMsSUFBSSxhQUFhLEdBQUcsZ0JBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLFVBQUEsQ0FBQzs0QkFDdkMsT0FBTyxDQUFDLENBQUMsUUFBUSxLQUFLLFFBQVEsSUFBSSxDQUFDLENBQUMsUUFBUSxLQUFLLFFBQVEsQ0FBQzt3QkFDNUQsQ0FBQyxDQUFDLENBQUM7d0JBQ0gsSUFBSSxDQUFDLGFBQWEsSUFBSSxhQUFhLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTs0QkFDaEQsSUFBSSxDQUFDLElBQUksQ0FBQztnQ0FDUixRQUFRLEVBQUUsUUFBUTtnQ0FDbEIsUUFBUSxFQUFFLE9BQU8sQ0FBQywyQkFBMkI7Z0NBQzdDLFVBQVUsRUFBRSxPQUFPLENBQUMsNkJBQTZCO2dDQUNqRCxhQUFhLEVBQUUscUJBQWEsQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUM7Z0NBQzdELE1BQU0sRUFBRSxLQUFLO2dDQUNiLElBQUksRUFBRSxHQUFHO2dDQUNULFFBQVEsRUFBRSxRQUFRO2dDQUNsQixPQUFPLEVBQUUsR0FBRztnQ0FDWixLQUFLLEVBQUUsR0FBRzs2QkFDWCxDQUFDLENBQUM7eUJBQ0o7NkJBQU0sSUFBSSxhQUFhLElBQUksYUFBYSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7NEJBQ3RELElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7eUJBQzdCOzZCQUFNLElBQUksYUFBYSxJQUFJLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFOzRCQUNwRCxJQUFJLENBQUMsSUFBSSxDQUFDO2dDQUNSLFFBQVEsRUFBRSxRQUFRO2dDQUNsQixRQUFRLEVBQUUsU0FBUztnQ0FDbkIsVUFBVSxFQUFFLE9BQU87Z0NBQ25CLGFBQWEsRUFBRSxtQkFBbUI7Z0NBQ2xDLE1BQU0sRUFBRSxLQUFLO2dDQUNiLElBQUksRUFBRSxHQUFHO2dDQUNULFFBQVEsRUFBRSxRQUFRO2dDQUNsQixPQUFPLEVBQUUsR0FBRztnQ0FDWixLQUFLLEVBQUUsR0FBRzs2QkFDWCxDQUFDLENBQUM7eUJBQ0o7b0JBQ0gsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDcEIsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsT0FBTztvQkFDTCxVQUFVLFlBQUE7b0JBQ1YsTUFBTSxRQUFBO29CQUNOLFVBQVUsWUFBQTtvQkFDVixrQkFBa0Isb0JBQUE7aUJBQ25CLENBQUM7WUFDSixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgSUJvb21TZXJpZXMsIElCb29tQ2VsbERldGFpbHMsIElCb29tVGFibGUsIElCb29tVGFibGVUcmFuc2Zvcm1hdGlvbk9wdGlvbnMgfSBmcm9tICcuL2Jvb20vaW5kZXgnO1xuaW1wb3J0IHsgQm9vbVBhdHRlcm4sIHJlcGxhY2VUb2tlbnMgfSBmcm9tICcuL2Jvb20vaW5kZXgnO1xuaW1wb3J0IHsgZGVmYXVsdF9wYXR0ZXJuX29wdGlvbnMgfSBmcm9tICcuL2NvbmZpZyc7XG5cbmNvbnN0IGRlZmF1bHRQYXR0ZXJuID0gbmV3IEJvb21QYXR0ZXJuKGRlZmF1bHRfcGF0dGVybl9vcHRpb25zKTtcblxuY29uc3Qgc2VyaWVzVG9UYWJsZSA9IGZ1bmN0aW9uKGlucHV0ZGF0YTogSUJvb21TZXJpZXNbXSwgb3B0aW9uczogSUJvb21UYWJsZVRyYW5zZm9ybWF0aW9uT3B0aW9ucyk6IElCb29tVGFibGUge1xuICBsZXQgcm93c19mb3VuZCA9IF8udW5pcShfLm1hcChpbnB1dGRhdGEsIGQgPT4gZC5yb3dfbmFtZSkpO1xuICBsZXQgcm93c193aXRob3V0X3Rva2VuID0gXy51bmlxKF8ubWFwKGlucHV0ZGF0YSwgZCA9PiBkLnJvd19uYW1lX3JhdykpO1xuICBsZXQgY29sc19mb3VuZCA9IF8udW5pcShfLm1hcChpbnB1dGRhdGEsIGQgPT4gZC5jb2xfbmFtZSkpO1xuICBsZXQgb3V0cHV0OiBJQm9vbUNlbGxEZXRhaWxzW11bXSA9IFtdO1xuICBfLmVhY2gocm93c19mb3VuZC5zb3J0KCksIHJvd19uYW1lID0+IHtcbiAgICBsZXQgY29sczogSUJvb21DZWxsRGV0YWlsc1tdID0gW107XG4gICAgXy5lYWNoKGNvbHNfZm91bmQuc29ydCgpLCBjb2xfbmFtZSA9PiB7XG4gICAgICBsZXQgbWF0Y2hlZF9pdGVtcyA9IF8uZmlsdGVyKGlucHV0ZGF0YSwgbyA9PiB7XG4gICAgICAgIHJldHVybiBvLnJvd19uYW1lID09PSByb3dfbmFtZSAmJiBvLmNvbF9uYW1lID09PSBjb2xfbmFtZTtcbiAgICAgIH0pO1xuICAgICAgaWYgKCFtYXRjaGVkX2l0ZW1zIHx8IG1hdGNoZWRfaXRlbXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGNvbHMucHVzaCh7XG4gICAgICAgICAgY29sX25hbWU6IGNvbF9uYW1lLFxuICAgICAgICAgIGNvbG9yX2JnOiBvcHRpb25zLm5vbl9tYXRjaGluZ19jZWxsc19jb2xvcl9iZyxcbiAgICAgICAgICBjb2xvcl90ZXh0OiBvcHRpb25zLm5vbl9tYXRjaGluZ19jZWxsc19jb2xvcl90ZXh0LFxuICAgICAgICAgIGRpc3BsYXlfdmFsdWU6IHJlcGxhY2VUb2tlbnMob3B0aW9ucy5ub25fbWF0Y2hpbmdfY2VsbHNfdGV4dCksXG4gICAgICAgICAgaGlkZGVuOiBmYWxzZSxcbiAgICAgICAgICBsaW5rOiAnLScsXG4gICAgICAgICAgcm93X25hbWU6IHJvd19uYW1lLFxuICAgICAgICAgIHRvb2x0aXA6ICctJyxcbiAgICAgICAgICB2YWx1ZTogTmFOLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAobWF0Y2hlZF9pdGVtcyAmJiBtYXRjaGVkX2l0ZW1zLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBjb2xzLnB1c2gobWF0Y2hlZF9pdGVtc1swXSk7XG4gICAgICB9IGVsc2UgaWYgKG1hdGNoZWRfaXRlbXMgJiYgbWF0Y2hlZF9pdGVtcy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGNvbHMucHVzaCh7XG4gICAgICAgICAgY29sX25hbWU6IGNvbF9uYW1lLFxuICAgICAgICAgIGNvbG9yX2JnOiAnZGFya3JlZCcsXG4gICAgICAgICAgY29sb3JfdGV4dDogJ3doaXRlJyxcbiAgICAgICAgICBkaXNwbGF5X3ZhbHVlOiAnRHVwbGljYXRlIG1hdGNoZXMnLFxuICAgICAgICAgIGhpZGRlbjogZmFsc2UsXG4gICAgICAgICAgbGluazogJy0nLFxuICAgICAgICAgIHJvd19uYW1lOiByb3dfbmFtZSxcbiAgICAgICAgICB0b29sdGlwOiAnLScsXG4gICAgICAgICAgdmFsdWU6IE5hTixcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgb3V0cHV0LnB1c2goY29scyk7XG4gIH0pO1xuICByZXR1cm4ge1xuICAgIGNvbHNfZm91bmQsXG4gICAgb3V0cHV0LFxuICAgIHJvd3NfZm91bmQsXG4gICAgcm93c193aXRob3V0X3Rva2VuLFxuICB9O1xufTtcblxuZXhwb3J0IHsgZGVmYXVsdFBhdHRlcm4sIHNlcmllc1RvVGFibGUgfTtcbiJdfQ==