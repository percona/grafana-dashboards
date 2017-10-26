/// <reference path="../../headers/common.d.ts" />
System.register(["app/plugins/sdk"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __moduleName = context_1 && context_1.id;
    var sdk_1, WrapperCtrl;
    return {
        setters: [
            function (sdk_1_1) {
                sdk_1 = sdk_1_1;
            }
        ],
        execute: function () {/// <reference path="../../headers/common.d.ts" />
            WrapperCtrl = (function (_super) {
                __extends(WrapperCtrl, _super);
                function WrapperCtrl($scope, $injector, templateSrv, $sce) {
                    return _super.call(this, $scope, $injector) || this;
                }
                WrapperCtrl.templateUrl = './panel/panel.html';
                return WrapperCtrl;
            }(sdk_1.PanelCtrl));
            exports_1("WrapperCtrl", WrapperCtrl);
        }
    };
});
//# sourceMappingURL=wrapper_ctrl.js.map