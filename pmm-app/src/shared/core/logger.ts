/* eslint-disable no-console */
enum LOG_LEVELS {
  // this will log everything
  DEBUG = 0,
  LOG = 1,
  INFO = 2,
  WARN = 3,
  // this will only log errors
  ERROR = 4,
  // this will silence the logger (mainly used in tests)
  NONE = 5,
}

const truncate = (length = 30) => (str = '') => {
  if (typeof str !== 'string') {
    return str;
  }

  return `${str.substr(0, length - 3)}...`;
};

let CONFIG_LOG_LEVEL: LOG_LEVELS = LOG_LEVELS.DEBUG;

/**
 * Setting log level to >= 5 will completely silence the logger,
 * i.e. run `setLogLevel(5);`
 */
export const setLogLevel = (level: LOG_LEVELS) => {
  CONFIG_LOG_LEVEL = level;
};

const LOG_LEVEL_KEYS = Object.keys(LOG_LEVELS).slice(5);

const createLogMethod = (loggerFunc: (...attrs: any[]) => void, level: LOG_LEVELS) => (
  first: any,
  ...rest: any[]
) => {
  if (level >= CONFIG_LOG_LEVEL) {
    const key = LOG_LEVEL_KEYS[level];

    console.group(`[${key}]`, truncate(50)(first));
    loggerFunc(first);
    rest.forEach((paragraph) => {
      loggerFunc(paragraph);
    });
    console.groupEnd();
  }
};

export const logger = {
  debug: createLogMethod(console.debug, LOG_LEVELS.DEBUG),
  log: createLogMethod(console.log, LOG_LEVELS.LOG),
  info: createLogMethod(console.info, LOG_LEVELS.INFO),
  warn: createLogMethod(console.warn, LOG_LEVELS.WARN),
  error: createLogMethod(console.error, LOG_LEVELS.ERROR),
};
