// dummy modules
declare module 'app/plugins/sdk' {
  var sdk: any;
  
  export class Emitter {
    emitter: any;
    constructor();
    emit(name: any, data?: any): void;
    on(name: any, handler: any, scope?: any): void;
    removeAllListeners(evt?: any): void;
    off(name: any, handler: any): void;
  }

  export class PanelCtrl {
    constructor($scope: any, $injector: any);
    addEditorTab(title: any, directiveFn: any, index?: any): void;
    panel: any;
    events: Emitter;
  }
  export default sdk;
}

declare module 'lodash' {
  var lodash: any;
  export default lodash;
}

declare module 'app/features/dashboard/impression_store' {
  var impression_store: any;
  export var impressions: any;
  export default impression_store;
}

declare module 'app/core/config' {
  var config: any;
  export default config;
}
