exports.config = {
  output: 'tests/output',
  helpers: {
    Playwright: {
      url: process.env.PMM_UI_URL || 'http://localhost/',
      restart: true,
      browser: 'chromium',
      windowSize: "1920x1080",
      waitForNavigation: 'networkidle0',
      waitForTimeout: 30000,
      getPageTimeout: 30000,
      waitForAction: 500,
      chromium: {
        ignoreHTTPSErrors: true,
        args: ['--no-sandbox', '--window-size=1920,1080', '--disable-gpu', '--disable-dev-shm-usage', '--disable-setuid-sandbox'],
      },
    },
    Grafana: {
      require: './tests/helper/grafana_helper.js',
      username: process.env.GRAFANA_USERNAME,
      password: process.env.GRAFANA_PASSWORD,
    },
    REST: {
      endpoint: process.env.PMM_UI_URL || 'http://localhost/'
    },
    InfluxDBHelper: {
      require: 'codeceptjs-influxdbhelper',
      username: process.env.INFLUXDB_ADMIN_USER,
      password: process.env.INFLUXDB_ADMIN_PASSWORD,
      host: process.env.MONITORING_HOST,
      port: process.env.INFLUXDB_PORT || '8086',
      dbname: process.env.INFLUXDB_DBNAME || 'codeceptjs',
      measurement: process.env.INFLUXDB_MEASUREMENT || 'testmethod',
    },
  },
  include: {
    pmmDemoPage: './tests/pages/pmmDemoPage.js',
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
