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
  async login(username, password) {
    I.Authorize();
    I.wait(1);
  },
};
