import { Task } from './task';
interface SearchTestDataSetupOptions {
    count: number;
}
export declare function getUser(user: any): Promise<any>;
export declare function getTeam(team: any): Promise<any>;
export declare function addToTeam(team: any, user: any): Promise<any>;
export declare function setDashboardAcl(dashboardId: any, aclList: any): Promise<void>;
export declare const searchTestDataSetupTask: Task<SearchTestDataSetupOptions>;
export {};
