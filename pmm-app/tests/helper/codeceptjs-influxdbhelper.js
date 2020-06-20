const Helper = codecept_helper;
const Influx = require('influx');

class InfluxDBHelper extends Helper {
  constructor(config) {
    super(config);
    this.host = config.host;
    this.username = config.username;
    this.password = config.password;
    this.port = config.port;
    this.dbname = config.dbname;
    // eslint-disable-next-line max-len
    this.influx = new Influx.InfluxDB(
      `http://${this.username}:${this.password}@${this.host}:${this.port}/database`
    );
    this.influx
      .getDatabaseNames()
      .then(names => {
        if (!names.includes(`${this.dbname}`)) {
          return this.influx.createDatabase(`${this.dbname}`);
        }
      })
      .catch(error => console.log({ error }));

    this.begin;
    this.end;
    this.timeSpent;
  }

  /**
   * Start Timer
   */
  _before() {
    this.begin = Date.now();
  }

  /**
   * Helper function gets called if the test is passing
   * @param test
   * @private
   */
  async _passed(test) {
    console.log(`${test.duration}ms`);
    let tags;
    if (test.tags && test.tags.length) {
      tags = test.tags.join();
    } else {
      tags = '@not-tagged';
    }
    this.end = Date.now();
    this.timeSpent = this.end - this.begin;
    await this.influx
      .writePoints(
        [
          {
            measurement: 'testmethod',
            tags: {
              testTags: tags,
              title: test.title,
              result: 'pass',
            },
            fields: { duration: test.duration },
            timestamp: Date.now(),
          },
        ],
        {
          database: `${this.dbname}`,
          precision: 'ms',
        }
      )
      .catch(err => {
        console.error(`Error saving data to InfluxDB! ${err.stack}`);
      });
  }

  /**
   * Helper function gets called if the test is failing
   * @param test
   * @private
   */
  async _failed(test) {
    let tags;
    if (test.tags && test.tags.length) {
      tags = test.tags.join();
    } else {
      tags = '@not-tagged';
    }
    this.end = Date.now();
    this.timeSpent = this.end - this.begin;
    await this.influx
      .writePoints(
        [
          {
            measurement: 'testmethod',
            tags: {
              testTags: tags,
              title: test.title,
              result: 'fail',
            },
            fields: { duration: this.timeSpent },
            timestamp: Date.now(),
          },
        ],
        {
          database: `${this.dbname}`,
          precision: 'ms',
        }
      )
      .catch(err => {
        console.error(`Error saving data to InfluxDB! ${err.stack}`);
      });
  }
}

module.exports = InfluxDBHelper;
