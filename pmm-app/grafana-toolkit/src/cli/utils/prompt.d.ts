import { Question, InputQuestion, CheckboxQuestion, NumberQuestion, PasswordQuestion, EditorQuestion, ConfirmQuestion } from 'inquirer';
declare type QuestionWithValidation<A = any> = InputQuestion<A> | CheckboxQuestion<A> | NumberQuestion<A> | PasswordQuestion<A> | EditorQuestion<A>;
export declare const answerRequired: (question: QuestionWithValidation<any>) => Question<any>;
export declare const promptInput: <A>(name: string, message: string | ((answers: A) => string), required?: boolean, def?: any, when?: boolean | ((answers: A) => boolean | Promise<boolean>)) => Question<any> | InputQuestion<A>;
export declare const promptConfirm: <A>(name: string, message: string | ((answers: A) => string), def?: any, when?: boolean | ((answers: A) => boolean | Promise<boolean>)) => ConfirmQuestion<A>;
export {};
