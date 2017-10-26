System.register(["./wrapper_ctrl"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var wrapper_ctrl_1;
    return {
        setters: [
            function (wrapper_ctrl_1_1) {
                wrapper_ctrl_1 = wrapper_ctrl_1_1;
            }
        ],
        execute: function () {
            exports_1("PanelCtrl", wrapper_ctrl_1.WrapperCtrl);
        }
    };
});
//# sourceMappingURL=module.js.map