import sinon from 'sinon';
// @ts-ignore
import dateMath from 'app/core/utils/datemath';

export default class TimeSrvStub {
  init = sinon.spy();
  time = { from: 'now-1h', to: 'now'};

  timeRange(parse) {
    if (parse === false) {
      return this.time;
    }

    return {
      from : dateMath.parse(this.time.from, false),
      to : dateMath.parse(this.time.to, true)
    };
  }

  replace(target) {
    return target;
  }

  setTime(time) {
    this.time = time;
  }
}
