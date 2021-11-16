'use strict';

System.register(['d3'], function (_export, _context) {
  "use strict";

  var d3, _interpolationMap, RGB, HSL, HCL, LAB, CUBEHELIX, colorSpacesMap, interpolationMap;

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
    setters: [function (_d) {
      d3 = _d.default;
    }],
    execute: function () {
      RGB = 'RGB';
      HSL = 'HSL';
      HCL = 'HCL';
      LAB = 'LAB';
      CUBEHELIX = 'CUBEHELIX';

      _export('colorSpacesMap', colorSpacesMap = [{ name: 'RGB', value: RGB }, { name: 'HSL', value: HSL }, { name: 'HCL', value: HCL }, { name: 'Lab', value: LAB }, { name: 'Cubehelix', value: CUBEHELIX }]);

      _export('colorSpacesMap', colorSpacesMap);

      _export('interpolationMap', interpolationMap = (_interpolationMap = {}, _defineProperty(_interpolationMap, RGB, d3.interpolateRgb), _defineProperty(_interpolationMap, HSL, d3.interpolateHsl), _defineProperty(_interpolationMap, HCL, d3.interpolateHcl), _defineProperty(_interpolationMap, LAB, d3.interpolateLab), _defineProperty(_interpolationMap, CUBEHELIX, d3.interpolateCubehelix), _interpolationMap));

      _export('interpolationMap', interpolationMap);

      _export('default', {
        RGB: RGB,
        HSL: HSL,
        HCL: HCL,
        LAB: LAB,
        CUBEHELIX: CUBEHELIX
      });
    }
  };
});
//# sourceMappingURL=color-spaces.js.map
