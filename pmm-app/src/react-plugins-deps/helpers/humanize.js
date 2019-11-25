import * as numeral from 'numeral';

class Humanize {
  static formatPercent(input) {
    let res;
    if (input !== 0 && input < 0.0001) {
      res = '<0.01 ';
    } else if (input === 1) {
      res = '100%';
    } else {
      res = numeral(input).format('0.00%');
    }

    return res;
  }

  formatMetricValue(metric, type) {}
}

export default Humanize;
