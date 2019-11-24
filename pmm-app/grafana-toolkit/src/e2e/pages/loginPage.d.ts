import { TestPage } from '../pageInfo';
import { InputPageObjectType, ClickablePageObjectType } from '../pageObjects';
export interface LoginPage {
    username: InputPageObjectType;
    password: InputPageObjectType;
    submit: ClickablePageObjectType;
}
export declare const loginPage: TestPage<LoginPage>;
