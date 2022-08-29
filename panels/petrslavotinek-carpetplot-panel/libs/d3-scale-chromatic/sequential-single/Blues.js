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
      _export("scheme", scheme = new Array(3).concat("deebf79ecae13182bd", "eff3ffbdd7e76baed62171b5", "eff3ffbdd7e76baed63182bd08519c", "eff3ffc6dbef9ecae16baed63182bd08519c", "eff3ffc6dbef9ecae16baed64292c62171b5084594", "f7fbffdeebf7c6dbef9ecae16baed64292c62171b5084594", "f7fbffdeebf7c6dbef9ecae16baed64292c62171b508519c08306b").map(colors));

      _export("scheme", scheme);

      _export("default", ramp(scheme));
    }
  };
});
//# sourceMappingURL=Blues.js.map
