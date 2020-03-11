Feature('My First Test');

Scenario('test something', (I) => {
    I.amOnPage('/graph/login');
    I.see('Log In');
});
