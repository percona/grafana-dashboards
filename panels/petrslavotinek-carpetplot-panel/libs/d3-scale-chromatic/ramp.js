'use strict';

System.register(['d3'], function (_export, _context) {
  "use strict";

  var d3;

  _export('default', function (scheme) {
    return d3.interpolateRgbBasis(scheme[scheme.length - 1]);
  });

  return {
    setters: [function (_d) {
      d3 = _d.default;
    }],
    execute: function () {}
  };
});
//# sourceMappingURL=ramp.js.map
