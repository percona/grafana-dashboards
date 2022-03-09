'use strict';

System.register(['moment'], function (_export, _context) {
  "use strict";

  var moment, _fragments, MINUTE, QUARTER, HOUR, fragments, fragmentsMap, getFragment;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  return {
    setters: [function (_moment) {
      moment = _moment.default;
    }],
    execute: function () {
      MINUTE = 'MINUTE';
      QUARTER = 'QUARTER';
      HOUR = 'HOUR';
      fragments = (_fragments = {}, _defineProperty(_fragments, MINUTE, {
        count: 1440,
        getBucketIndex: function getBucketIndex(time) {
          return time.hour() * 60 + time.minute();
        },
        getTime: function getTime(time, bucketIndex) {
          return moment(time).startOf('day').add(bucketIndex, 'minute');
        },
        getBucket: function getBucket(timestamp) {
          return moment(timestamp).startOf('minute').unix();
        },
        nextTime: function nextTime(time) {
          return moment.utc(time).add(1, 'minute');
        }
      }), _defineProperty(_fragments, QUARTER, {
        count: 96,
        getBucketIndex: function getBucketIndex(time) {
          return time.hour() * 4 + Math.floor(time.minute() / 15);
        },
        getTime: function getTime(time, bucketIndex) {
          return moment(time).startOf('day').add(15 * bucketIndex, 'minute');
        },
        getBucket: function getBucket(timestamp) {
          var timeUtc = moment(timestamp);
          var minutes = Math.floor(timeUtc.minute() / 15) * 15;
          return timeUtc.startOf('hour').add(minutes, 'minute').unix();
        },
        nextTime: function nextTime(time) {
          return moment.utc(time).add(15, 'minute');
        }
      }), _defineProperty(_fragments, HOUR, {
        count: 24,
        getBucketIndex: function getBucketIndex(time) {
          return time.hour();
        },
        getTime: function getTime(time, bucketIndex) {
          return moment(time).startOf('day').add(bucketIndex, 'hour');
        },
        getBucket: function getBucket(timestamp) {
          return moment(timestamp).startOf('hour').unix();
        },
        nextTime: function nextTime(time) {
          return moment.utc(time).add(1, 'hour');
        }
      }), _fragments);

      _export('fragmentsMap', fragmentsMap = [{ name: 'Minute', value: MINUTE }, { name: '15 minutes', value: QUARTER }, { name: 'Hour', value: HOUR }]);

      _export('fragmentsMap', fragmentsMap);

      _export('getFragment', getFragment = function getFragment(fragmentType) {
        return fragments[fragmentType];
      });

      _export('getFragment', getFragment);

      _export('default', {
        HOUR: HOUR,
        QUARTER: QUARTER,
        MINUTE: MINUTE
      });
    }
  };
});
//# sourceMappingURL=fragments.js.map
