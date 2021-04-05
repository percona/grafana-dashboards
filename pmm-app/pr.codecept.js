const { pageObjects, getChunks } = require('./codeceptConfigHelper');

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
      pressKeyDelay: 5,
      chromium: {
        executablePath: process.env.CHROMIUM_PATH,
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
    Mailosaur: {
      require: 'codeceptjs-mailosaurhelper',
      apiKey: process.env.MAILOSAUR_API_KEY || 'key',
      serverId: process.env.MAILOSAUR_SERVER_ID || 'id',
      timeout: 15000,
    },
  },
  include: pageObjects,
  multiple: {
    parallel: {
      chunks: (files) => getChunks(files),
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
