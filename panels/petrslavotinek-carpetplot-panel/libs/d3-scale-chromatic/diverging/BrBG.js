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
      _export("scheme", scheme = new Array(3).concat("d8b365f5f5f55ab4ac", "a6611adfc27d80cdc1018571", "a6611adfc27df5f5f580cdc1018571", "8c510ad8b365f6e8c3c7eae55ab4ac01665e", "8c510ad8b365f6e8c3f5f5f5c7eae55ab4ac01665e", "8c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e", "8c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e", "5430058c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e003c30", "5430058c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e003c30").map(colors));

      _export("scheme", scheme);

      _export("default", ramp(scheme));
    }
  };
});
//# sourceMappingURL=BrBG.js.map
