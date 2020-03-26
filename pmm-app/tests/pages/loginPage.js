const { I, homePage } = inject();

module.exports = {
  // insert your locators and methods here
  // setting locators
  url: 'graph/login',
  fields: {
    username: "//input[@placeholder='email or username']",
    password: "//input[@placeholder='password']",
  },
  loginButton: 'Log In',
  skipLink: "//a[contains(text(), 'Skip')]",

  // introducing methods
  login(username, password) {
    I.waitForVisible(this.fields.username, 30);
    I.fillField(this.fields.username, username);
    I.fillField(this.fields.password, password);
    I.click(this.loginButton);
    I.waitForElement(this.skipLink, 30);
    I.waitForClickable(this.skipLink, 30);
    I.click(this.skipLink);
    I.waitForVisible(homePage.fields.dashboardHeaderLocator, 30);
    I.see(homePage.fields.dashboardHeaderText, homePage.fields.dashboardHeaderLocator);
    I.waitForVisible("//p[@id='current_version']", 30);
  },
};
