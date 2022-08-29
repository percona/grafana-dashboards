"use strict";

System.register(["../colors", "../ramp"], function (_export, _context) {
  "use strict";

  var colors, ramp, scheme;
  return {
    setters: [function (_colors) {
      colors = _colors.default;
    }, function (_ramp) {
      ramp = _ramp.default;
    }],
    execute: function () {
      _export("scheme", scheme = new Array(3).concat("edf8b17fcdbb2c7fb8", "ffffcca1dab441b6c4225ea8", "ffffcca1dab441b6c42c7fb8253494", "ffffccc7e9b47fcdbb41b6c42c7fb8253494", "ffffccc7e9b47fcdbb41b6c41d91c0225ea80c2c84", "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea80c2c84", "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea8253494081d58").map(colors));

      _export("scheme", scheme);

      _export("default", ramp(scheme));
    }
  };
});
//# sourceMappingURL=YlGnBu.js.map
