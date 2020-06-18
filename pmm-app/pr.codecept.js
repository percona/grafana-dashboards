exports.config = {
  output: 'tests/output',
  helpers: {
    Playwright: {
      url: process.env.PMM_UI_URL || 'http://localhost/',
      restart: true,
      browser: 'chromium',
      windowSize: "2560x1600",
      waitForNavigation: 'networkidle0',
      waitForTimeout: 30000,
      getPageTimeout: 30000,
      waitForAction: 500,
      chromium: {
        ignoreHTTPSErrors: true,
        args: ['--no-sandbox', '--window-size=2560,1600', '--disable-gpu', '--disable-dev-shm-usage', '--disable-setuid-sandbox'],
      },
    },
    Grafana: {
      require: './tests/helper/grafana_helper.js',
      username: process.env.GRAFANA_USERNAME,
      password: process.env.GRAFANA_PASSWORD,
    },
    REST: {
      endpoint: process.env.PMM_UI_URL || 'http://localhost/'
    }
  },
  include: {
    homePage: './tests/pages/homePage.js',
    remoteInstancesPage: './tests/pages/remoteInstancesPage.js',
    adminPage: './tests/pages/adminPage.js',
    qanPage: './tests/pages/qanPage.js',
    pmmInventoryPage: './tests/pages/pmmInventoryPage.js',
    amiInstanceSetupPage: './tests/pages/amiInstanceSetupPage.js',
    pmmSettingsPage: './tests/pages/pmmSettingsPage.js',
    mysqlTableDetailsPage: './tests/pages/mysqlTableDetailsPage.js',
    dashboardPage: './tests/pages/dashboardPage.js',
    databaseChecksPage: './tests/pages/databaseChecksPage.js',
    settingsAPI: './tests/pages/api/settingsAPI.js',
    addInstanceAPI: './tests/pages/api/addInstanceAPI.js',
    inventoryAPI: './tests/pages/api/inventoryAPI.js',
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
    customLocator: {
      enabled: true,
      strategy: 'css',
      attribute: 'data-qa',
      showActual: false
    },
    allure: {
      enabled: true,
      outputDir: "tests/output/allure",
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
  tests: 'tests/*_test.js',
  timeout: 10000,
  name: 'pmm-qa',
};
