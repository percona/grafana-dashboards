import { Page } from 'puppeteer-core';
export declare const takeScreenShot: (page: Page, fileName: string) => Promise<void>;
export declare const compareScreenShots: (fileName: string) => Promise<unknown>;
