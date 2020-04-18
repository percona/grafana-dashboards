exports.config = {
  output: 'tests/output',
  helpers: {
    Playwright: {
      url: 'http://localhost/',
      restart: true,
      browser: 'chromium',
      waitForNavigation: 'networkidle0',
      chromium: {
        args: ['--no-sandbox', '--window-size=1680,1240', '--disable-gpu'],
      },
    },
    Grafana: {
      require: './tests/helper/grafana_helper.js',
      username: process.env.GRAFANA_USERNAME,
      password: process.env.GRAFANA_PASSWORD,
    },
  },
  include: {
    qanPage: './tests/QAN/qanPage.js',

    homePage: './tests/pages/homePage.js',
    remoteInstancesPage: './tests/pages/remoteInstancesPage.js',
    adminPage: './tests/pages/adminPage.js',
    pmmInventoryPage: './tests/pages/pmmInventoryPage.js',
    amiInstanceSetupPage: './tests/pages/amiInstanceSetupPage.js',
    pmmSettingsPage: './tests/pages/pmmSettingsPage.js',
    mysqlTableDetailsPage: './tests/pages/mysqlTableDetailsPage.js',
    dashboardPage: './tests/pages/dashboardPage.js',
  },
  multiple: {
    parallel: {
      chunks: 4,
      browsers: ['chromium'],
    },
  },
  plugins: {
    autoDelay: {
      enabled: true,
    },
  },
  mocha: {
    reporterOptions: {
      'codeceptjs-cli-reporter': {
        stdout: '-',
        options: {
          verbose: false,
          steps: true,
        },
      },
      'mocha-junit-reporter': {
        stdout: './tests/output/console.log',
        options: {
          mochaFile: './tests/output/result.xml',
        },
      },
      mochawesome: {
        stdout: './tests/output/mocharesult.log',
        options: {
          reportDir: 'tests/output',
          reportFilename: 'result.html',
        },
      },
    },
  },
  bootstrap: false,
  teardown: null,
  hooks: [],
  gherkin: {},
  tests: 'tests/**/*_test.js',
  timeout: 10000,
  name: 'pmm-qa',
};
