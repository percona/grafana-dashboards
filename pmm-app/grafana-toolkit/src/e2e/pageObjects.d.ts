import { Page } from 'puppeteer-core';
export declare class Selector {
    static fromAriaLabel: (selector: string) => string;
    static fromSelector: (selector: string) => string;
}
export interface PageObjectType {
    init: (page: Page) => Promise<void>;
    exists: () => Promise<void>;
    containsText: (text: string) => Promise<void>;
}
export interface ClickablePageObjectType extends PageObjectType {
    click: () => Promise<void>;
}
export interface InputPageObjectType extends PageObjectType {
    enter: (text: string) => Promise<void>;
}
export interface SelectPageObjectType extends PageObjectType {
    select: (text: string) => Promise<void>;
}
export declare class PageObject implements PageObjectType {
    protected selector: string;
    protected page?: Page;
    constructor(selector: string);
    init: (page: Page) => Promise<void>;
    exists: () => Promise<void>;
    containsText: (text: string) => Promise<void>;
}
export declare class ClickablePageObject extends PageObject implements ClickablePageObjectType {
    constructor(selector: string);
    click: () => Promise<void>;
}
export declare class InputPageObject extends PageObject implements InputPageObjectType {
    constructor(selector: string);
    enter: (text: string) => Promise<void>;
}
export declare class SelectPageObject extends PageObject implements SelectPageObjectType {
    constructor(selector: string);
    select: (text: string) => Promise<void>;
}
