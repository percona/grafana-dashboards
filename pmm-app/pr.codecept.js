exports.config = {
  output: 'tests/output',
  helpers: {
    Playwright: {
      url: process.env.PMM_UI_URL || 'http://localhost/',
      restart: true,
      browser: 'chromium',
      windowSize: '1920x1080',
      waitForNavigation: 'networkidle0',
      waitForTimeout: 30000,
      getPageTimeout: 30000,
      waitForAction: 500,
      chromium: {
        ignoreHTTPSErrors: true,
        args: [
          '--no-sandbox',
          '--window-size=1920,1080',
          '--disable-gpu',
          '--disable-dev-shm-usage',
          '--disable-setuid-sandbox',
        ],
      },
    },
    Grafana: {
      require: './tests/helper/grafana_helper.js',
      username: process.env.GRAFANA_USERNAME,
      password: process.env.GRAFANA_PASSWORD,
    },
    REST: {
      endpoint: process.env.PMM_UI_URL || 'http://localhost/',
      timeout: 20000,
    },
  },
  include: {
    addInstanceAPI: './tests/pages/api/addInstanceAPI.js',
    adminPage: './tests/pages/adminPage.js',
    amiInstanceSetupPage: './tests/pages/amiInstanceSetupPage.js',
    dashboardPage: './tests/pages/dashboardPage.js',
    databaseChecksPage: './tests/pages/databaseChecksPage.js',
    dbaasPage: './tests/pages/dbaasPage.js',
    homePage: './tests/pages/homePage.js',
    inventoryAPI: './tests/pages/api/inventoryAPI.js',
    mysqlTableDetailsPage: './tests/pages/mysqlTableDetailsPage.js',
    ncPage: './tests/ia/pages/notificationChannelsPage.js',
    pmmDemoPage: './tests/pages/pmmDemoPage.js',
    pmmInventoryPage: './tests/pages/pmmInventoryPage.js',
    pmmSettingsPage: './tests/pages/pmmSettingsPage.js',
    qanDetails: './tests/QAN/pages/qanDetailsFragment.js',
    qanFilters: './tests/QAN/pages/qanFiltersFragment.js',
    qanOverview: './tests/QAN/pages/qanOverviewFragment.js',
    qanPage: './tests/QAN/pages/qanPage.js',
    qanPagination: './tests/QAN/pages/qanPaginationFragment.js',
    remoteInstancesPage: './tests/pages/remoteInstancesPage.js',
    settingsAPI: './tests/pages/api/settingsAPI.js',
  },
  multiple: {
    parallel: {
      chunks: 3,
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
      showActual: false,
    },
    allure: {
      enabled: true,
      outputDir: 'tests/output/allure',
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
