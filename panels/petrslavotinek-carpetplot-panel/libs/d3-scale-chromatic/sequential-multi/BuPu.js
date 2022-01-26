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
      _export("scheme", scheme = new Array(3).concat("e0ecf49ebcda8856a7", "edf8fbb3cde38c96c688419d", "edf8fbb3cde38c96c68856a7810f7c", "edf8fbbfd3e69ebcda8c96c68856a7810f7c", "edf8fbbfd3e69ebcda8c96c68c6bb188419d6e016b", "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d6e016b", "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d810f7c4d004b").map(colors));

      _export("scheme", scheme);

      _export("default", ramp(scheme));
    }
  };
});
//# sourceMappingURL=BuPu.js.map
