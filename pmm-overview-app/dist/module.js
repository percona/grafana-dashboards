System.register(["./config_ctrl"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var config_ctrl_1;
    return {
        setters: [
            function (config_ctrl_1_1) {
                config_ctrl_1 = config_ctrl_1_1;
            }
        ],
        execute: function () {
            exports_1("ConfigCtrl", config_ctrl_1.ConfigCtrl);
            // Enable plugin
            // curl -X POST 'http://admin:admin@localhost/graph/api/plugins/percona-pmm-mysql/settings' -d 'enabled=true'
            // {"message":"Plugin settings updated"}
            // Disable plugin
            // curl -X POST 'http://admin:admin@localhost/graph/api/plugins/percona-pmm-mysql/settings' -d 'enabled=false'
            // {"message":"Plugin settings updated"} 
        }
    };
});
//# sourceMappingURL=module.js.map