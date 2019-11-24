export declare const changeCwdToGrafanaUi: () => string;
export declare const changeCwdToGrafanaToolkit: () => string;
export declare const changeCwdToGrafanaUiDist: () => void;
export declare const restoreCwd: () => void;
declare type PackageId = 'ui' | 'data' | 'runtime' | 'toolkit';
export declare const changeCwdToPackage: (scope: PackageId) => string;
export {};
