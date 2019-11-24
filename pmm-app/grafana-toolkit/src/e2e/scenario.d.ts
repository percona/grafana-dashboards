import { Browser, Page } from 'puppeteer-core';
export declare const e2eScenario: (title: string, testDescription: string, callback: (browser: Browser, page: Page) => void) => void;
