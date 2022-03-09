'use strict';

System.register([], function (_export, _context) {
  "use strict";

  var _aggregates, AVG, SUM, CNT, MIN, MAX, FIRST, LAST, sum, min, max, aggregates, aggregate, aggregatesMap;

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

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return Array.from(arr);
    }
  }

  return {
    setters: [],
    execute: function () {
      AVG = 'AVG';
      SUM = 'SUM';
      CNT = 'CNT';
      MIN = 'MIN';
      MAX = 'MAX';
      FIRST = 'FIRST';
      LAST = 'LAST';

      sum = function sum(values) {
        return values.reduce(function (s, n) {
          return s + n;
        }, 0);
      };

      min = function min(values) {
        return Math.min.apply(Math, _toConsumableArray(values));
      };

      max = function max(values) {
        return Math.max.apply(Math, _toConsumableArray(values));
      };

      aggregates = (_aggregates = {}, _defineProperty(_aggregates, AVG, function (values) {
        return sum(values) / values.length;
      }), _defineProperty(_aggregates, SUM, function (values) {
        return sum(values);
      }), _defineProperty(_aggregates, CNT, function (values) {
        return values.length;
      }), _defineProperty(_aggregates, MIN, function (values) {
        return min(values);
      }), _defineProperty(_aggregates, MAX, function (values) {
        return max(values);
      }), _defineProperty(_aggregates, FIRST, function (values) {
        return values.length == 0 ? null : values[0];
      }), _defineProperty(_aggregates, LAST, function (values) {
        return values.length == 0 ? null : values[values.length - 1];
      }), _aggregates);

      _export('aggregate', aggregate = function aggregate(type) {
        var func = aggregates[type];
        return function (values) {
          return func(values);
        };
      });

      _export('aggregate', aggregate);

      _export('aggregatesMap', aggregatesMap = [{ name: 'Average', value: AVG }, { name: 'Sum', value: SUM }, { name: 'Count', value: CNT }, { name: 'Min', value: MIN }, { name: 'Max', value: MAX }, { name: 'First', value: FIRST }, { name: 'Last', value: LAST }]);

      _export('aggregatesMap', aggregatesMap);

      _export('default', {
        AVG: AVG,
        SUM: SUM,
        CNT: CNT,
        MIN: MIN,
        MAX: MAX,
        FIRST: FIRST,
        LAST: LAST
      });
    }
  };
});
//# sourceMappingURL=aggregates.js.map
