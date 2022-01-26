'use strict';

System.register(['moment', './aggregates', './fragments'], function (_export, _context) {
  "use strict";

  var moment, aggregate, getFragment, _extends, _slicedToArray, createConverter;

  return {
    setters: [function (_moment) {
      moment = _moment.default;
    }, function (_aggregates) {
      aggregate = _aggregates.aggregate;
    }, function (_fragments) {
      getFragment = _fragments.getFragment;
    }],
    execute: function () {
      _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];

          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }

        return target;
      };

      _slicedToArray = function () {
        function sliceIterator(arr, i) {
          var _arr = [];
          var _n = true;
          var _d = false;
          var _e = undefined;

          try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
              _arr.push(_s.value);

              if (i && _arr.length === i) break;
            }
          } catch (err) {
            _d = true;
            _e = err;
          } finally {
            try {
              if (!_n && _i["return"]) _i["return"]();
            } finally {
              if (_d) throw _e;
            }
          }

          return _arr;
        }

        return function (arr, i) {
          if (Array.isArray(arr)) {
            return arr;
          } else if (Symbol.iterator in Object(arr)) {
            return sliceIterator(arr, i);
          } else {
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
          }
        };
      }();

      createConverter = function createConverter(aggregateType, fragmentType) {

        var createArray = function createArray(length) {
          var initiator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
            return null;
          };
          return Array.apply(null, { length: length }).map(initiator);
        };

        var prepareData = function prepareData(from, to, fragment) {
          var data = {};
          var fromUtc = moment.utc(from).startOf('day');
          var toUtc = moment.utc(to).startOf('day').add(1, 'day');
          for (var timeUtc = moment.utc(fromUtc); timeUtc.isBefore(toUtc); timeUtc = fragment.nextTime(timeUtc)) {
            data[timeUtc.unix()] = {
              time: timeUtc,
              values: []
            };
          }
          return {
            data: data,
            from: fromUtc,
            to: toUtc
          };
        };

        var groupData = function groupData(from, to, fragment, dataList) {
          var container = prepareData(from, to, fragment);
          dataList.forEach(function (_ref) {
            var datapoints = _ref.datapoints;

            datapoints.filter(function (_ref2) {
              var _ref3 = _slicedToArray(_ref2, 1),
                  value = _ref3[0];

              return value !== null;
            }).forEach(function (_ref4) {
              var _ref5 = _slicedToArray(_ref4, 2),
                  value = _ref5[0],
                  timestamp = _ref5[1];

              var bucket = fragment.getBucket(timestamp);
              if (!(bucket in container.data)) {
                return;
              }
              container.data[bucket].values.push(value);
            });
          });
          return container;
        };

        var aggregateData = function aggregateData(from, to, fragment, data) {
          var min = Number.MAX_VALUE;
          var max = Number.MIN_VALUE;

          var aggregateFunc = aggregate(aggregateType);
          var result = [];

          var createBucket = function createBucket(time) {
            return {
              time: time,
              buckets: createArray(fragment.count)
            };
          };

          var bucket = createBucket(moment(from).local().startOf('day'));
          Object.values(data).forEach(function (_ref6) {
            var time = _ref6.time,
                values = _ref6.values;

            var timeLocal = time.local();
            if (timeLocal.isBefore(bucket.time)) {
              return;
            }

            var value = values.length > 0 ? aggregateFunc(values) : null;
            if (value !== null && value < min) {
              min = value;
            }
            if (value !== null && value > max) {
              max = value;
            }

            var day = moment(timeLocal).startOf('day');
            if (!day.isSame(bucket.time)) {
              result.push(_extends({}, bucket));
              bucket = createBucket(moment(day));
            }

            var bucketIndex = fragment.getBucketIndex(timeLocal);
            bucket.buckets[bucketIndex] = value;
          });

          return {
            data: result,
            stats: {
              min: min,
              max: max
            }
          };
        };

        var convertData = function convertData(from, to, dataList) {
          var fragment = getFragment(fragmentType);
          var container = groupData(from, to, fragment, dataList);
          var data = aggregateData(from, to, fragment, container.data);
          return _extends({}, container, data);
        };

        return {
          convertData: convertData
        };
      };

      _export('default', createConverter);
    }
  };
});
//# sourceMappingURL=data-converter.js.map
