declare module 'app/plugins/sdk' {
    export class MetricsPanelCtrl {
        scope: any;
        loading: boolean;
        datasource: any;
        datasourceName: any;
        $q: any;
        $timeout: any;
        datasourceSrv: any;
        timeSrv: any;
        templateSrv: any;
        timing: any;
        range: any;
        rangeRaw: any;
        interval: any;
        intervalMs: any;
        resolution: any;
        timeInfo: any;
        skipDataOnInit: boolean;
        dataStream: any;
        dataSubscription: any;
        dataList: any;
        events: any;
        editorTabs: Array<any>;
        addEditorTab(a: string, b: string, c: number);
        pluginId: any;
        editorTabIndex: number;
        updateTimeRange();
        display_fn: any;
        params_fn: any;
        panel: any;
        constructor($scope: any, $injector: any);
    }


    export class PanelCtrl {
        panel: any;
        error: any;
        row: any;
        dashboard: any;
        editorTabIndex: number;
        pluginName: string;
        pluginId: string;
        editorTabs: any;
        $scope: any;
        $injector: any;
        $timeout: any;
        fullscreen: boolean;
        inspector: any;
        editModeInitiated: boolean;
        editMode: any;
        height: any;
        containerHeight: any;
        events: any;
        timing: any;
        init();
        renderingCompleted();
        refresh();
        publishAppEvent(evtName, evt);
        changeView(fullscreen, edit);
        viewPanel();
        editPanel();
        exitFullscreen();
        initEditMode();
        changeTab(newIndex);
        addEditorTab(title, directiveFn, index?);
        getMenu();
        getExtendedMenu();
        otherPanelInFullscreenMode();
        calculatePanelHeight();
        render(payload?);
        duplicate();
        updateColumnSpan(span);
        removePanel();
        editPanelJson();
        replacePanel(newPanel, oldPanel);
        sharePanel();
        getInfoMode();
        getInfoContent(options);
        openInspector();
        constructor($scope: any, $injector: any);
    }
}

declare module 'app/core/config' {
    export class Settings {
        datasources: any;
        panels: any;
        appSubUrl: string;
        window_title_prefix: string;
        buildInfo: any;
        new_panel_title: string;
        bootData: any;
        externalUserMngLinkUrl: string;
        externalUserMngLinkName: string;
        externalUserMngInfo: string;
        allowOrgCreate: boolean;
        disableLoginForm: boolean;
        defaultDatasource: string;
        alertingEnabled: boolean;
        constructor(options);
    }
    const config: Settings
    export default config;
}

declare module 'app/core/app_events' {
    export default class AppEvents {
        static emit: any;

        constructor(options);
    }
}

declare module 'moment' {
    let moment: any;
    export default moment;
}