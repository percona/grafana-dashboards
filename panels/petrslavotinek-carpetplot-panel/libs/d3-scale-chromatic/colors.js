"use strict";

System.register([], function (_export, _context) {
  "use strict";

  _export("default", function (specifier) {
    var n = specifier.length / 6 | 0,
        colors = new Array(n),
        i = 0;
    while (i < n) {
      colors[i] = "#" + specifier.slice(i * 6, ++i * 6);
    }return colors;
  });

  return {
    setters: [],
    execute: function () {}
  };
});
//# sourceMappingURL=colors.js.map
