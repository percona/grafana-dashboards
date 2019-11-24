import { Page } from 'puppeteer-core';
export declare const login: (page: Page) => Promise<void>;
export declare const ensureLoggedIn: (page: Page) => Promise<void>;
