System.register(["lodash", "app/core/utils/kbn", "app/plugins/sdk", "./app/boom/index", "./app/app", "./app/config"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var lodash_1, kbn_1, sdk_1, index_1, app_1, config_1, GrafanaBoomTableCtrl;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (kbn_1_1) {
                kbn_1 = kbn_1_1;
            },
            function (sdk_1_1) {
                sdk_1 = sdk_1_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (app_1_1) {
                app_1 = app_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            }
        ],
        execute: function () {
            sdk_1.loadPluginCss({
                dark: "plugins/" + config_1.plugin_id + "/css/default.dark.css",
                light: "plugins/" + config_1.plugin_id + "/css/default.light.css",
            });
            GrafanaBoomTableCtrl = (function (_super) {
                __extends(GrafanaBoomTableCtrl, _super);
                function GrafanaBoomTableCtrl($scope, $injector, $sce) {
                    var _this = _super.call(this, $scope, $injector) || this;
                    _this.unitFormats = kbn_1.default.getUnitFormats();
                    _this.valueNameOptions = config_1.value_name_options;
                    _this.textAlignmentOptions = config_1.textAlignmentOptions;
                    lodash_1.default.defaults(_this.panel, config_1.config.panelDefaults);
                    _this.panel.defaultPattern = _this.panel.defaultPattern || app_1.defaultPattern;
                    _this.$sce = $sce;
                    _this.templateSrv = $injector.get('templateSrv');
                    _this.timeSrv = $injector.get('timeSrv');
                    _this.updatePrototypes();
                    _this.events.on('data-received', _this.onDataReceived.bind(_this));
                    _this.events.on('data-snapshot-load', _this.onDataReceived.bind(_this));
                    _this.events.on('init-edit-mode', _this.onInitEditMode.bind(_this));
                    _this.panel.activePatternIndex = _this.panel.activePatternIndex === -1 ? _this.panel.patterns.length : _this.panel.activePatternIndex;
                    return _this;
                }
                GrafanaBoomTableCtrl.prototype.updatePrototypes = function () {
                    Object.setPrototypeOf(this.panel.defaultPattern, index_1.BoomPattern.prototype);
                    this.panel.patterns.map(function (pattern) {
                        Object.setPrototypeOf(pattern, index_1.BoomPattern.prototype);
                        return pattern;
                    });
                };
                GrafanaBoomTableCtrl.prototype.onDataReceived = function (data) {
                    this.dataReceived = data;
                    this.render();
                };
                GrafanaBoomTableCtrl.prototype.onInitEditMode = function () {
                    this.addEditorTab('Patterns', "public/plugins/" + config_1.plugin_id + "/partials/editor.html", 2);
                };
                GrafanaBoomTableCtrl.prototype.addPattern = function () {
                    var newPattern = new index_1.BoomPattern({
                        row_col_wrapper: this.panel.row_col_wrapper,
                    });
                    this.panel.patterns.push(newPattern);
                    this.panel.activePatternIndex = this.panel.activePatternIndex === -2 ? -2 : this.panel.patterns.length - 1;
                    this.render();
                };
                GrafanaBoomTableCtrl.prototype.removePattern = function (index) {
                    this.panel.patterns.splice(index, 1);
                    this.panel.activePatternIndex =
                        this.panel.activePatternIndex === -2 ? -2 : this.panel.patterns && this.panel.patterns.length > 0 ? this.panel.patterns.length - 1 : -1;
                    this.render();
                };
                GrafanaBoomTableCtrl.prototype.movePattern = function (direction, index) {
                    var tempElement = this.panel.patterns[Number(index)];
                    if (direction === 'UP') {
                        this.panel.patterns[Number(index)] = this.panel.patterns[Number(index) - 1];
                        this.panel.patterns[Number(index) - 1] = tempElement;
                        this.panel.activePatternIndex = this.panel.activePatternIndex === -2 ? -2 : Number(index) - 1;
                    }
                    if (direction === 'DOWN') {
                        this.panel.patterns[Number(index)] = this.panel.patterns[Number(index) + 1];
                        this.panel.patterns[Number(index) + 1] = tempElement;
                        this.panel.activePatternIndex = this.panel.activePatternIndex === -2 ? -2 : Number(index) + 1;
                    }
                    this.render();
                };
                GrafanaBoomTableCtrl.prototype.clonePattern = function (index) {
                    var copiedPattern = Object.assign({}, this.panel.patterns[Number(index)]);
                    Object.setPrototypeOf(copiedPattern, index_1.BoomPattern.prototype);
                    this.panel.patterns.push(copiedPattern);
                    this.render();
                };
                GrafanaBoomTableCtrl.prototype.sortByHeader = function (headerIndex) {
                    this.panel.sorting_props = this.panel.sorting_props || {
                        col_index: -1,
                        direction: 'desc',
                    };
                    this.panel.sorting_props.col_index = headerIndex;
                    this.panel.sorting_props.direction = this.panel.sorting_props.direction === 'asc' ? 'desc' : 'asc';
                    this.render();
                };
                GrafanaBoomTableCtrl.prototype.limitText = function (text, maxlength) {
                    if (text.split('').length > maxlength) {
                        text = text.substring(0, Number(maxlength) - 3) + '...';
                    }
                    return text;
                };
                GrafanaBoomTableCtrl.prototype.adjustScrollBar = function () {
                    var rootElem = this.elem.find('.table-panel-scroll');
                    var originalHeight = this.ctrl.height;
                    if (isNaN(originalHeight)) {
                        if (this.ctrl && this.ctrl.elem && this.ctrl.elem[0] && this.ctrl.elem[0].clientHeight) {
                            originalHeight = this.ctrl.elem[0].clientHeight;
                        }
                    }
                    var maxheightofpanel = this.panel.debug_mode ? originalHeight - 111 : originalHeight - 31;
                    rootElem.css({ 'max-height': maxheightofpanel + 'px' });
                };
                GrafanaBoomTableCtrl.prototype.link = function (scope, elem, attrs, ctrl) {
                    this.scope = scope;
                    this.elem = elem;
                    this.attrs = attrs;
                    this.ctrl = ctrl;
                    this.panel = ctrl.panel;
                    this.panel.sorting_props = this.panel.sorting_props || {
                        col_index: -1,
                        direction: 'desc',
                    };
                };
                GrafanaBoomTableCtrl.templateUrl = 'partials/module.html';
                return GrafanaBoomTableCtrl;
            }(sdk_1.MetricsPanelCtrl));
            exports_1("PanelCtrl", GrafanaBoomTableCtrl);
            GrafanaBoomTableCtrl.prototype.render = function () {
                var _this = this;
                if (this.dataReceived) {
                    var outputdata = this.dataReceived.map(function (seriesData) {
                        var seriesOptions = {
                            debug_mode: _this.panel.debug_mode,
                            row_col_wrapper: _this.panel.row_col_wrapper || '_',
                        };
                        return new index_1.BoomSeries(seriesData, _this.panel.defaultPattern, _this.panel.patterns, seriesOptions, _this.panel.scopedVars, _this.templateSrv, _this.timeSrv);
                    });
                    var boomTableTransformationOptions = {
                        non_matching_cells_color_bg: this.panel.non_matching_cells_color_bg,
                        non_matching_cells_color_text: this.panel.non_matching_cells_color_text,
                        non_matching_cells_text: this.panel.non_matching_cells_text,
                    };
                    var boomtabledata = app_1.seriesToTable(outputdata, boomTableTransformationOptions);
                    var renderingOptions = {
                        default_title_for_rows: this.panel.default_title_for_rows || config_1.config.default_title_for_rows,
                        first_column_link: this.panel.first_column_link || '#',
                        hide_first_column: this.panel.hide_first_column,
                        hide_headers: this.panel.hide_headers,
                        text_alignment_firstcolumn: this.panel.text_alignment_firstcolumn,
                        text_alignment_values: this.panel.text_alignment_values,
                    };
                    var boom_output = new index_1.BoomOutput(renderingOptions);
                    this.outdata = {
                        cols_found: boomtabledata.cols_found.map(function (col) {
                            return _this.$sce.trustAsHtml(col);
                        }),
                    };
                    var renderingdata = boom_output.getDataAsHTML(boomtabledata, this.panel.sorting_props);
                    this.elem.find('#boomtable_output_body').html("" + renderingdata.body);
                    this.elem.find('#boomtable_output_body_debug').html(this.panel.debug_mode ? boom_output.getDataAsDebugHTML(outputdata) : "");
                    this.elem.find("[data-toggle='tooltip']").tooltip({
                        boundary: 'scrollParent',
                    });
                    this.adjustScrollBar();
                    this.renderingCompleted();
                }
            };
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFrQkEsbUJBQWEsQ0FBQztnQkFDWixJQUFJLEVBQUUsYUFBVyxrQkFBUywwQkFBdUI7Z0JBQ2pELEtBQUssRUFBRSxhQUFXLGtCQUFTLDJCQUF3QjthQUNwRCxDQUFDLENBQUM7O2dCQUVnQyx3Q0FBZ0I7Z0JBV2pELDhCQUFZLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSTtvQkFBbkMsWUFDRSxrQkFBTSxNQUFNLEVBQUUsU0FBUyxDQUFDLFNBV3pCO29CQXJCTSxpQkFBVyxHQUFHLGFBQUcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFDbkMsc0JBQWdCLEdBQUcsMkJBQWtCLENBQUM7b0JBQ3RDLDBCQUFvQixHQUFHLDZCQUFvQixDQUFDO29CQVNqRCxnQkFBQyxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsS0FBSyxFQUFFLGVBQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFDN0MsS0FBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLEdBQUcsS0FBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLElBQUksb0JBQWMsQ0FBQztvQkFDeEUsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2pCLEtBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFDaEQsS0FBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUN4QyxLQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztvQkFDeEIsS0FBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsZUFBZSxFQUFFLEtBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ2hFLEtBQUks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Q0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQzdILElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLENBQUMsT0FBTyxDQUFDO3dCQUNoRCxRQUFRLEVBQUUsY0FBYztxQkFDekIsQ0FBQyxDQUFDO29CQUNILElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztvQkFDdkIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7aUJBQzNCO1lBQ0gsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8vPHJlZmVyZW5jZSBwYXRoPVwiLi4vbm9kZV9tb2R1bGVzL2dyYWZhbmEtc2RrLW1vY2tzL2FwcC9oZWFkZXJzL2NvbW1vbi5kLnRzXCIgLz5cclxuXHJcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCBrYm4gZnJvbSAnYXBwL2NvcmUvdXRpbHMva2JuJztcclxuaW1wb3J0IHsgbG9hZFBsdWdpbkNzcywgTWV0cmljc1BhbmVsQ3RybCB9IGZyb20gJ2FwcC9wbHVnaW5zL3Nkayc7XHJcbmltcG9ydCB7XHJcbiAgSUJvb21TZXJpZXMsXHJcbiAgSUJvb21SZW5kZXJpbmdPcHRpb25zLFxyXG4gIElCb29tVGFibGUsXHJcbiAgSUJvb21IVE1MLFxyXG4gIElCb29tVGFibGVUcmFuc2Zvcm1hdGlvbk9wdGlvbnMsXHJcbiAgQm9vbVBhdHRlcm4sXHJcbiAgQm9vbVNlcmllcyxcclxuICBCb29tT3V0cHV0LFxyXG59IGZyb20gJy4vYXBwL2Jvb20vaW5kZXgnO1xyXG5pbXBvcnQgeyBkZWZhdWx0UGF0dGVybiwgc2VyaWVzVG9UYWJsZSB9IGZyb20gXCIuL2FwcC9hcHBcIjtcclxuaW1wb3J0IHsgcGx1Z2luX2lkLCB2YWx1ZV9uYW1lX29wdGlvbnMsIHRleHRBbGlnbm1lbnRPcHRpb25zLCBjb25maWcgfSBmcm9tIFwiLi9hcHAvY29uZmlnXCI7XHJcblxyXG5sb2FkUGx1Z2luQ3NzKHtcclxuICBkYXJrOiBgcGx1Z2lucy8ke3BsdWdpbl9pZH0vY3NzL2RlZmF1bHQuZGFyay5jc3NgLFxyXG4gIGxpZ2h0OiBgcGx1Z2lucy8ke3BsdWdpbl9pZH0vY3NzL2RlZmF1bHQubGlnaHQuY3NzYCxcclxufSk7XHJcblxyXG5jbGFzcyBHcmFmYW5hQm9vbVRhYmxlQ3RybCBleHRlbmRzIE1ldHJpY3NQYW5lbEN0cmwge1xyXG4gIHB1YmxpYyBzdGF0aWMgdGVtcGxhdGVVcmwgPSAncGFydGlhbHMvbW9kdWxlLmh0bWwnO1xyXG4gIHB1YmxpYyB1bml0Rm9ybWF0cyA9IGtibi5nZXRVbml0Rm9ybWF0cygpO1xyXG4gIHB1YmxpYyB2YWx1ZU5hbWVPcHRpb25zID0gdmFsdWVfbmFtZV9vcHRpb25zO1xyXG4gIHB1YmxpYyB0ZXh0QWxpZ25tZW50T3B0aW9ucyA9IHRleHRBbGlnbm1lbnRPcHRpb25zO1xyXG4gIHB1YmxpYyBvdXRkYXRhO1xyXG4gIHB1YmxpYyBkYXRhUmVjZWl2ZWQ6IGFueTtcclxuICBwdWJsaWMgY3RybDogYW55O1xyXG4gIHB1YmxpYyBlbGVtOiBhbnk7XHJcbiAgcHVibGljIGF0dHJzOiBhbnk7XHJcbiAgcHVibGljICRzY2U6IGFueTtcclxuICBjb25zdHJ1Y3Rvcigkc2NvcGUsICRpbmplY3RvciwgJHNjZSkge1xyXG4gICAgc3VwZXIoJHNjb3BlLCAkaW5qZWN0b3IpO1xyXG4gICAgXy5kZWZhdWx0cyh0aGlzLnBhbmVsLCBjb25maWcucGFuZWxEZWZhdWx0cyk7XHJcbiAgICB0aGlzLnBhbmVsLmRlZmF1bHRQYXR0ZXJuID0gdGhpcy5wYW5lbC5kZWZhdWx0UGF0dGVybiB8fCBkZWZhdWx0UGF0dGVybjtcclxuICAgIHRoaXMuJHNjZSA9ICRzY2U7XHJcbiAgICB0aGlzLnRlbXBsYXRlU3J2ID0gJGluamVjdG9yLmdldCgndGVtcGxhdGVTcnYnKTtcclxuICAgIHRoaXMudGltZVNydiA9ICRpbmplY3Rvci5nZXQoJ3RpbWVTcnYnKTtcclxuICAgIHRoaXMudXBkYXRlUHJvdG90eXBlcygpO1xyXG4gICAgdGhpcy5ldmVudHMub24oJ2RhdGEtcmVjZWl2ZWQnLCB0aGlzLm9uRGF0YVJlY2VpdmVkLmJpbmQodGhpcykpO1xyXG4gICAgdGhpcy5ldmVudHMub24oJ2RhdGEtc25hcHNob3QtbG9hZCcsIHRoaXMub25EYXRhUmVjZWl2ZWQuYmluZCh0aGlzKSk7XHJcbiAgICB0aGlzLmV2ZW50cy5vbignaW5pdC1lZGl0LW1vZGUnLCB0aGlzLm9uSW5pdEVkaXRNb2RlLmJpbmQodGhpcykpO1xyXG4gICAgdGhpcy5wYW5lbC5hY3RpdmVQYXR0ZXJuSW5kZXggPSB0aGlzLnBhbmVsLmFjdGl2ZVBhdHRlcm5JbmRleCA9PT0gLTEgPyB0aGlzLnBhbmVsLnBhdHRlcm5zLmxlbmd0aCA6IHRoaXMucGFuZWwuYWN0aXZlUGF0dGVybkluZGV4O1xyXG4gIH1cclxuICBwcml2YXRlIHVwZGF0ZVByb3RvdHlwZXMoKTogdm9pZCB7XHJcbiAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YodGhpcy5wYW5lbC5kZWZhdWx0UGF0dGVybiwgQm9vbVBhdHRlcm4ucHJvdG90eXBlKTtcclxuICAgIHRoaXMucGFuZWwucGF0dGVybnMubWFwKHBhdHRlcm4gPT4ge1xyXG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YocGF0dGVybiwgQm9vbVBhdHRlcm4ucHJvdG90eXBlKTtcclxuICAgICAgcmV0dXJuIHBhdHRlcm47XHJcbiAgICB9KTtcclxuICB9XHJcbiAgcHVibGljIG9uRGF0YVJlY2VpdmVkKGRhdGE6IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5kYXRhUmVjZWl2ZWQgPSBkYXRhO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcbiAgcHVibGljIG9uSW5pdEVkaXRNb2RlKCk6IHZvaWQge1xyXG4gICAgdGhpcy5hZGRFZGl0b3JUYWIoJ1BhdHRlcm5zJywgYHB1YmxpYy9wbHVnaW5zLyR7cGx1Z2luX2lkfS9wYXJ0aWFscy9lZGl0b3IuaHRtbGAsIDIpO1xyXG4gIH1cclxuICBwdWJsaWMgYWRkUGF0dGVybigpOiB2b2lkIHtcclxuICAgIGxldCBuZXdQYXR0ZXJuID0gbmV3IEJvb21QYXR0ZXJuKHtcclxuICAgICAgcm93X2NvbF93cmFwcGVyOiB0aGlzLnBhbmVsLnJvd19jb2xfd3JhcHBlcixcclxuICAgIH0pO1xyXG4gICAgdGhpcy5wYW5lbC5wYXR0ZXJucy5wdXNoKG5ld1BhdHRlcm4pO1xyXG4gICAgdGhpcy5wYW5lbC5hY3RpdmVQYXR0ZXJuSW5kZXggPSB0aGlzLnBhbmVsLmFjdGl2ZVBhdHRlcm5JbmRleCA9PT0gLTIgPyAtMiA6IHRoaXMucGFuZWwucGF0dGVybnMubGVuZ3RoIC0gMTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIHB1YmxpYyByZW1vdmVQYXR0ZXJuKGluZGV4OiBOdW1iZXIpOiB2b2lkIHtcclxuICAgIHRoaXMucGFuZWwucGF0dGVybnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIHRoaXMucGFuZWwuYWN0aXZlUGF0dGVybkluZGV4ID1cclxuICAgICAgdGhpcy5wYW5lbC5hY3RpdmVQYXR0ZXJuSW5kZXggPT09IC0yID8gLTIgOiB0aGlzLnBhbmVsLnBhdHRlcm5zICYmIHRoaXMucGFuZWwucGF0dGVybnMubGVuZ3RoID4gMCA/IHRoaXMucGFuZWwucGF0dGVybnMubGVuZ3RoIC0gMSA6IC0xO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcbiAgcHVibGljIG1vdmVQYXR0ZXJuKGRpcmVjdGlvbjogc3RyaW5nLCBpbmRleDogTnVtYmVyKSB7XHJcbiAgICBsZXQgdGVtcEVsZW1lbnQgPSB0aGlzLnBhbmVsLnBhdHRlcm5zW051bWJlcihpbmRleCldO1xyXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gJ1VQJykge1xyXG4gICAgICB0aGlzLnBhbmVsLnBhdHRlcm5zW051bWJlcihpbmRleCldID0gdGhpcy5wYW5lbC5wYXR0ZXJuc1tOdW1iZXIoaW5kZXgpIC0gMV07XHJcbiAgICAgIHRoaXMucGFuZWwucGF0dGVybnNbTnVtYmVyKGluZGV4KSAtIDFdID0gdGVtcEVsZW1lbnQ7XHJcbiAgICAgIHRoaXMucGFuZWwuYWN0aXZlUGF0dGVybkluZGV4ID0gdGhpcy5wYW5lbC5hY3RpdmVQYXR0ZXJuSW5kZXggPT09IC0yID8gLTIgOiBOdW1iZXIoaW5kZXgpIC0gMTtcclxuICAgIH1cclxuICAgIGlmIChkaXJlY3Rpb24gPT09ICdET1dOJykge1xyXG4gICAgICB0aGlzLnBhbmVsLnBhdHRlcm5zW051bWJlcihpbmRleCldID0gdGhpcy5wYW5lbC5wYXR0ZXJuc1tOdW1iZXIoaW5kZXgpICsgMV07XHJcbiAgICAgIHRoaXMucGFuZWwucGF0dGVybnNbTnVtYmVyKGluZGV4KSArIDFdID0gdGVtcEVsZW1lbnQ7XHJcbiAgICAgIHRoaXMucGFuZWwuYWN0aXZlUGF0dGVybkluZGV4ID0gdGhpcy5wYW5lbC5hY3RpdmVQYXR0ZXJuSW5kZXggPT09IC0yID8gLTIgOiBOdW1iZXIoaW5kZXgpICsgMTtcclxuICAgIH1cclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIHB1YmxpYyBjbG9uZVBhdHRlcm4oaW5kZXg6IE51bWJlcik6IHZvaWQge1xyXG4gICAgbGV0IGNvcGllZFBhdHRlcm4gPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnBhbmVsLnBhdHRlcm5zW051bWJlcihpbmRleCldKTtcclxuICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihjb3BpZWRQYXR0ZXJuLCBCb29tUGF0dGVybi5wcm90b3R5cGUpO1xyXG4gICAgdGhpcy5wYW5lbC5wYXR0ZXJucy5wdXNoKGNvcGllZFBhdHRlcm4pO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcbiAgcHVibGljIHNvcnRCeUhlYWRlcihoZWFkZXJJbmRleDogbnVtYmVyKSB7XHJcbiAgICB0aGlzLnBhbmVsLnNvcnRpbmdfcHJvcHMgPSB0aGlzLnBhbmVsLnNvcnRpbmdfcHJvcHMgfHwge1xyXG4gICAgICBjb2xfaW5kZXg6IC0xLFxyXG4gICAgICBkaXJlY3Rpb246ICdkZXNjJyxcclxuICAgIH07XHJcbiAgICB0aGlzLnBhbmVsLnNvcnRpbmdfcHJvcHMuY29sX2luZGV4ID0gaGVhZGVySW5kZXg7XHJcbiAgICB0aGlzLnBhbmVsLnNvcnRpbmdfcHJvcHMuZGlyZWN0aW9uID0gdGhpcy5wYW5lbC5zb3J0aW5nX3Byb3BzLmRpcmVjdGlvbiA9PT0gJ2FzYycgPyAnZGVzYycgOiAnYXNjJztcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIHB1YmxpYyBsaW1pdFRleHQodGV4dDogc3RyaW5nLCBtYXhsZW5ndGg6IE51bWJlcik6IHN0cmluZyB7XHJcbiAgICBpZiAodGV4dC5zcGxpdCgnJykubGVuZ3RoID4gbWF4bGVuZ3RoKSB7XHJcbiAgICAgIHRleHQgPSB0ZXh0LnN1YnN0cmluZygwLCBOdW1iZXIobWF4bGVuZ3RoKSAtIDMpICsgJy4uLic7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGV4dDtcclxuICB9XHJcbiAgcHVibGljIGFkanVzdFNjcm9sbEJhcigpOiB2b2lkIHtcclxuICAgIGxldCByb290RWxlbSA9IHRoaXMuZWxlbS5maW5kKCcudGFibGUtcGFuZWwtc2Nyb2xsJyk7XHJcbiAgICBsZXQgb3JpZ2luYWxIZWlnaHQgPSB0aGlzLmN0cmwuaGVpZ2h0O1xyXG4gICAgaWYgKGlzTmFOKG9yaWdpbmFsSGVpZ2h0KSkge1xyXG4gICAgICBpZiAodGhpcy5jdHJsICYmIHRoaXMuY3RybC5lbGVtICYmIHRoaXMuY3RybC5lbGVtWzBdICYmIHRoaXMuY3RybC5lbGVtWzBdLmNsaWVudEhlaWdodCkge1xyXG4gICAgICAgIG9yaWdpbmFsSGVpZ2h0ID0gdGhpcy5jdHJsLmVsZW1bMF0uY2xpZW50SGVpZ2h0O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBsZXQgbWF4aGVpZ2h0b2ZwYW5lbCA9IHRoaXMucGFuZWwuZGVidWdfbW9kZSA/IG9yaWdpbmFsSGVpZ2h0IC0gMTExIDogb3JpZ2luYWxIZWlnaHQgLSAzMTtcclxuICAgIHJvb3RFbGVtLmNzcyh7ICdtYXgtaGVpZ2h0JzogbWF4aGVpZ2h0b2ZwYW5lbCArICdweCcgfSk7XHJcbiAgfVxyXG4gIHB1YmxpYyBsaW5rKHNjb3BlOiBhbnksIGVsZW06IGFueSwgYXR0cnM6IGFueSwgY3RybDogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLnNjb3BlID0gc2NvcGU7XHJcbiAgICB0aGlzLmVsZW0gPSBlbGVtO1xyXG4gICAgdGhpcy5hdHRycyA9IGF0dHJzO1xyXG4gICAgdGhpcy5jdHJsID0gY3RybDtcclxuICAgIHRoaXMucGFuZWwgPSBjdHJsLnBhbmVsO1xyXG4gICAgdGhpcy5wYW5lbC5zb3J0aW5nX3Byb3BzID0gdGhpcy5wYW5lbC5zb3J0aW5nX3Byb3BzIHx8IHtcclxuICAgICAgY29sX2luZGV4OiAtMSxcclxuICAgICAgZGlyZWN0aW9uOiAnZGVzYycsXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG5cclxuR3JhZmFuYUJvb21UYWJsZUN0cmwucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcclxuICBpZiAodGhpcy5kYXRhUmVjZWl2ZWQpIHtcclxuICAgIGxldCBvdXRwdXRkYXRhOiBJQm9vbVNlcmllc1tdID0gdGhpcy5kYXRhUmVjZWl2ZWQubWFwKHNlcmllc0RhdGEgPT4ge1xyXG4gICAgICBsZXQgc2VyaWVzT3B0aW9ucyA9IHtcclxuICAgICAgICBkZWJ1Z19tb2RlOiB0aGlzLnBhbmVsLmRlYnVnX21vZGUsXHJcbiAgICAgICAgcm93X2NvbF93cmFwcGVyOiB0aGlzLnBhbmVsLnJvd19jb2xfd3JhcHBlciB8fCAnXycsXHJcbiAgICAgIH07XHJcbiAgICAgIHJldHVybiBuZXcgQm9vbVNlcmllcyhcclxuICAgICAgICBzZXJpZXNEYXRhLFxyXG4gICAgICAgIHRoaXMucGFuZWwuZGVmYXVsdFBhdHRlcm4sXHJcbiAgICAgICAgdGhpcy5wYW5lbC5wYXR0ZXJucyxcclxuICAgICAgICBzZXJpZXNPcHRpb25zLFxyXG4gICAgICAgIHRoaXMucGFuZWwuc2NvcGVkVmFycyxcclxuICAgICAgICB0aGlzLnRlbXBsYXRlU3J2LFxyXG4gICAgICAgIHRoaXMudGltZVNydlxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcbiAgICBsZXQgYm9vbVRhYmxlVHJhbnNmb3JtYXRpb25PcHRpb25zOiBJQm9vbVRhYmxlVHJhbnNmb3JtYXRpb25PcHRpb25zID0ge1xyXG4gICAgICBub25fbWF0Y2hpbmdfY2VsbHNfY29sb3JfYmc6IHRoaXMucGFuZWwubm9uX21hdGNoaW5nX2NlbGxzX2NvbG9yX2JnLFxyXG4gICAgICBub25fbWF0Y2hpbmdfY2VsbHNfY29sb3JfdGV4dDogdGhpcy5wYW5lbC5ub25fbWF0Y2hpbmdfY2VsbHNfY29sb3JfdGV4dCxcclxuICAgICAgbm9uX21hdGNoaW5nX2NlbGxzX3RleHQ6IHRoaXMucGFuZWwubm9uX21hdGNoaW5nX2NlbGxzX3RleHQsXHJcbiAgICB9O1xyXG4gICAgbGV0IGJvb210YWJsZWRhdGE6IElCb29tVGFibGUgPSBzZXJpZXNUb1RhYmxlKG91dHB1dGRhdGEsIGJvb21UYWJsZVRyYW5zZm9ybWF0aW9uT3B0aW9ucyk7XHJcbiAgICBsZXQgcmVuZGVyaW5nT3B0aW9uczogSUJvb21SZW5kZXJpbmdPcHRpb25zID0ge1xyXG4gICAgICBkZWZhdWx0X3RpdGxlX2Zvcl9yb3dzOiB0aGlzLnBhbmVsLmRlZmF1bHRfdGl0bGVfZm9yX3Jvd3MgfHwgY29uZmlnLmRlZmF1bHRfdGl0bGVfZm9yX3Jvd3MsXHJcbiAgICAgIGZpcnN0X2NvbHVtbl9saW5rOiB0aGlzLnBhbmVsLmZpcnN0X2NvbHVtbl9saW5rIHx8ICcjJyxcclxuICAgICAgaGlkZV9maXJzdF9jb2x1bW46IHRoaXMucGFuZWwuaGlkZV9maXJzdF9jb2x1bW4sXHJcbiAgICAgIGhpZGVfaGVhZGVyczogdGhpcy5wYW5lbC5oaWRlX2hlYWRlcnMsXHJcbiAgICAgIHRleHRfYWxpZ25tZW50X2ZpcnN0Y29sdW1uOiB0aGlzLnBhbmVsLnRleHRfYWxpZ25tZW50X2ZpcnN0Y29sdW1uLFxyXG4gICAgICB0ZXh0X2FsaWdubWVudF92YWx1ZXM6IHRoaXMucGFuZWwudGV4dF9hbGlnbm1lbnRfdmFsdWVzLFxyXG4gICAgfTtcclxuICAgIGxldCBib29tX291dHB1dCA9IG5ldyBCb29tT3V0cHV0KHJlbmRlcmluZ09wdGlvbnMpO1xyXG4gICAgdGhpcy5vdXRkYXRhID0ge1xyXG4gICAgICBjb2xzX2ZvdW5kOiBib29tdGFibGVkYXRhLmNvbHNfZm91bmQubWFwKGNvbCA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJHNjZS50cnVzdEFzSHRtbChjb2wpO1xyXG4gICAgICB9KSxcclxuICAgIH07XHJcbiAgICBsZXQgcmVuZGVyaW5nZGF0YTogSUJvb21IVE1MID0gYm9vbV9vdXRwdXQuZ2V0RGF0YUFzSFRNTChib29tdGFibGVkYXRhLCB0aGlzLnBhbmVsLnNvcnRpbmdfcHJvcHMpO1xyXG4gICAgdGhpcy5lbGVtLmZpbmQoJyNib29tdGFibGVfb3V0cHV0X2JvZHknKS5odG1sKGBgICsgcmVuZGVyaW5nZGF0YS5ib2R5KTtcclxuICAgIHRoaXMuZWxlbS5maW5kKCcjYm9vbXRhYmxlX291dHB1dF9ib2R5X2RlYnVnJykuaHRtbCh0aGlzLnBhbmVsLmRlYnVnX21vZGUgPyBib29tX291dHB1dC5nZXREYXRhQXNEZWJ1Z0hUTUwob3V0cHV0ZGF0YSkgOiBgYCk7XHJcbiAgICB0aGlzLmVsZW0uZmluZChcIltkYXRhLXRvZ2dsZT0ndG9vbHRpcCddXCIpLnRvb2x0aXAoe1xyXG4gICAgICBib3VuZGFyeTogJ3Njcm9sbFBhcmVudCcsXHJcbiAgICB9KTtcclxuICAgIHRoaXMuYWRqdXN0U2Nyb2xsQmFyKCk7XHJcbiAgICB0aGlzLnJlbmRlcmluZ0NvbXBsZXRlZCgpO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCB7IEdyYWZhbmFCb29tVGFibGVDdHJsIGFzIFBhbmVsQ3RybCB9O1xyXG4iXX0=