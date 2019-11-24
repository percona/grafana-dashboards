import { Page } from 'puppeteer-core';
export interface ExpectSelectorConfig {
    selector: string;
    containsText?: string;
    isVisible?: boolean;
}
export interface TestPageType<T> {
    init: (page: Page) => Promise<void>;
    getUrl: () => Promise<string>;
    getUrlWithoutBaseUrl: () => Promise<string>;
    navigateTo: () => Promise<void>;
    expectSelector: (config: ExpectSelectorConfig) => Promise<void>;
    waitForResponse: () => Promise<void>;
    waitForNavigation: () => Promise<void>;
    waitFor: (milliseconds: number) => Promise<void>;
    pageObjects?: PageObjects<T>;
}
declare type PageObjects<T> = {
    [P in keyof T]: T[P];
};
export interface TestPageConfig<T> {
    url?: string;
    pageObjects: PageObjects<T>;
}
export declare class TestPage<T> implements TestPageType<T> {
    pageObjects: PageObjects<T>;
    private page?;
    private pageUrl?;
    constructor(config: TestPageConfig<T>);
    init: (page: Page) => Promise<void>;
    navigateTo: () => Promise<void>;
    expectSelector: (config: ExpectSelectorConfig) => Promise<void>;
    waitForResponse: () => Promise<void>;
    waitForNavigation: () => Promise<void>;
    getUrl: () => Promise<string>;
    getUrlWithoutBaseUrl: () => Promise<string>;
    waitFor: (milliseconds: number) => Promise<void>;
    private throwIfNotInitialized;
}
export {};
