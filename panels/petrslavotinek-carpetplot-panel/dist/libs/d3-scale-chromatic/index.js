"use strict";

System.register(["./categorical/Accent", "./categorical/Dark2", "./categorical/Paired", "./categorical/Pastel1", "./categorical/Pastel2", "./categorical/Set1", "./categorical/Set2", "./categorical/Set3", "./diverging/BrBG", "./diverging/PRGn", "./diverging/PiYG", "./diverging/PuOr", "./diverging/RdBu", "./diverging/RdGy", "./diverging/RdYlBu", "./diverging/RdYlGn", "./diverging/Spectral", "./sequential-multi/BuGn", "./sequential-multi/BuPu", "./sequential-multi/GnBu", "./sequential-multi/OrRd", "./sequential-multi/PuBuGn", "./sequential-multi/PuBu", "./sequential-multi/PuRd", "./sequential-multi/RdPu", "./sequential-multi/YlGnBu", "./sequential-multi/YlGn", "./sequential-multi/YlOrBr", "./sequential-multi/YlOrRd", "./sequential-single/Blues", "./sequential-single/Greens", "./sequential-single/Greys", "./sequential-single/Purples", "./sequential-single/Reds", "./sequential-single/Oranges"], function (_export, _context) {
  "use strict";

  return {
    setters: [function (_categoricalAccent) {
      var _exportObj = {};
      _exportObj.schemeAccent = _categoricalAccent.default;

      _export(_exportObj);
    }, function (_categoricalDark) {
      var _exportObj2 = {};
      _exportObj2.schemeDark2 = _categoricalDark.default;

      _export(_exportObj2);
    }, function (_categoricalPaired) {
      var _exportObj3 = {};
      _exportObj3.schemePaired = _categoricalPaired.default;

      _export(_exportObj3);
    }, function (_categoricalPastel) {
      var _exportObj4 = {};
      _exportObj4.schemePastel1 = _categoricalPastel.default;

      _export(_exportObj4);
    }, function (_categoricalPastel2) {
      var _exportObj5 = {};
      _exportObj5.schemePastel2 = _categoricalPastel2.default;

      _export(_exportObj5);
    }, function (_categoricalSet) {
      var _exportObj6 = {};
      _exportObj6.schemeSet1 = _categoricalSet.default;

      _export(_exportObj6);
    }, function (_categoricalSet2) {
      var _exportObj7 = {};
      _exportObj7.schemeSet2 = _categoricalSet2.default;

      _export(_exportObj7);
    }, function (_categoricalSet3) {
      var _exportObj8 = {};
      _exportObj8.schemeSet3 = _categoricalSet3.default;

      _export(_exportObj8);
    }, function (_divergingBrBG) {
      var _exportObj9 = {};
      _exportObj9.interpolateBrBG = _divergingBrBG.default;
      _exportObj9.schemeBrBG = _divergingBrBG.scheme;

      _export(_exportObj9);
    }, function (_divergingPRGn) {
      var _exportObj10 = {};
      _exportObj10.interpolatePRGn = _divergingPRGn.default;
      _exportObj10.schemePRGn = _divergingPRGn.scheme;

      _export(_exportObj10);
    }, function (_divergingPiYG) {
      var _exportObj11 = {};
      _exportObj11.interpolatePiYG = _divergingPiYG.default;
      _exportObj11.schemePiYG = _divergingPiYG.scheme;

      _export(_exportObj11);
    }, function (_divergingPuOr) {
      var _exportObj12 = {};
      _exportObj12.interpolatePuOr = _divergingPuOr.default;
      _exportObj12.schemePuOr = _divergingPuOr.scheme;

      _export(_exportObj12);
    }, function (_divergingRdBu) {
      var _exportObj13 = {};
      _exportObj13.interpolateRdBu = _divergingRdBu.default;
      _exportObj13.schemeRdBu = _divergingRdBu.scheme;

      _export(_exportObj13);
    }, function (_divergingRdGy) {
      var _exportObj14 = {};
      _exportObj14.interpolateRdGy = _divergingRdGy.default;
      _exportObj14.schemeRdGy = _divergingRdGy.scheme;

      _export(_exportObj14);
    }, function (_divergingRdYlBu) {
      var _exportObj15 = {};
      _exportObj15.interpolateRdYlBu = _divergingRdYlBu.default;
      _exportObj15.schemeRdYlBu = _divergingRdYlBu.scheme;

      _export(_exportObj15);
    }, function (_divergingRdYlGn) {
      var _exportObj16 = {};
      _exportObj16.interpolateRdYlGn = _divergingRdYlGn.default;
      _exportObj16.schemeRdYlGn = _divergingRdYlGn.scheme;

      _export(_exportObj16);
    }, function (_divergingSpectral) {
      var _exportObj17 = {};
      _exportObj17.interpolateSpectral = _divergingSpectral.default;
      _exportObj17.schemeSpectral = _divergingSpectral.scheme;

      _export(_exportObj17);
    }, function (_sequentialMultiBuGn) {
      var _exportObj18 = {};
      _exportObj18.interpolateBuGn = _sequentialMultiBuGn.default;
      _exportObj18.schemeBuGn = _sequentialMultiBuGn.scheme;

      _export(_exportObj18);
    }, function (_sequentialMultiBuPu) {
      var _exportObj19 = {};
      _exportObj19.interpolateBuPu = _sequentialMultiBuPu.default;
      _exportObj19.schemeBuPu = _sequentialMultiBuPu.scheme;

      _export(_exportObj19);
    }, function (_sequentialMultiGnBu) {
      var _exportObj20 = {};
      _exportObj20.interpolateGnBu = _sequentialMultiGnBu.default;
      _exportObj20.schemeGnBu = _sequentialMultiGnBu.scheme;

      _export(_exportObj20);
    }, function (_sequentialMultiOrRd) {
      var _exportObj21 = {};
      _exportObj21.interpolateOrRd = _sequentialMultiOrRd.default;
      _exportObj21.schemeOrRd = _sequentialMultiOrRd.scheme;

      _export(_exportObj21);
    }, function (_sequentialMultiPuBuGn) {
      var _exportObj22 = {};
      _exportObj22.interpolatePuBuGn = _sequentialMultiPuBuGn.default;
      _exportObj22.schemePuBuGn = _sequentialMultiPuBuGn.scheme;

      _export(_exportObj22);
    }, function (_sequentialMultiPuBu) {
      var _exportObj23 = {};
      _exportObj23.interpolatePuBu = _sequentialMultiPuBu.default;
      _exportObj23.schemePuBu = _sequentialMultiPuBu.scheme;

      _export(_exportObj23);
    }, function (_sequentialMultiPuRd) {
      var _exportObj24 = {};
      _exportObj24.interpolatePuRd = _sequentialMultiPuRd.default;
      _exportObj24.schemePuRd = _sequentialMultiPuRd.scheme;

      _export(_exportObj24);
    }, function (_sequentialMultiRdPu) {
      var _exportObj25 = {};
      _exportObj25.interpolateRdPu = _sequentialMultiRdPu.default;
      _exportObj25.schemeRdPu = _sequentialMultiRdPu.scheme;

      _export(_exportObj25);
    }, function (_sequentialMultiYlGnBu) {
      var _exportObj26 = {};
      _exportObj26.interpolateYlGnBu = _sequentialMultiYlGnBu.default;
      _exportObj26.schemeYlGnBu = _sequentialMultiYlGnBu.scheme;

      _export(_exportObj26);
    }, function (_sequentialMultiYlGn) {
      var _exportObj27 = {};
      _exportObj27.interpolateYlGn = _sequentialMultiYlGn.default;
      _exportObj27.schemeYlGn = _sequentialMultiYlGn.scheme;

      _export(_exportObj27);
    }, function (_sequentialMultiYlOrBr) {
      var _exportObj28 = {};
      _exportObj28.interpolateYlOrBr = _sequentialMultiYlOrBr.default;
      _exportObj28.schemeYlOrBr = _sequentialMultiYlOrBr.scheme;

      _export(_exportObj28);
    }, function (_sequentialMultiYlOrRd) {
      var _exportObj29 = {};
      _exportObj29.interpolateYlOrRd = _sequentialMultiYlOrRd.default;
      _exportObj29.schemeYlOrRd = _sequentialMultiYlOrRd.scheme;

      _export(_exportObj29);
    }, function (_sequentialSingleBlues) {
      var _exportObj30 = {};
      _exportObj30.interpolateBlues = _sequentialSingleBlues.default;
      _exportObj30.schemeBlues = _sequentialSingleBlues.scheme;

      _export(_exportObj30);
    }, function (_sequentialSingleGreens) {
      var _exportObj31 = {};
      _exportObj31.interpolateGreens = _sequentialSingleGreens.default;
      _exportObj31.schemeGreens = _sequentialSingleGreens.scheme;

      _export(_exportObj31);
    }, function (_sequentialSingleGreys) {
      var _exportObj32 = {};
      _exportObj32.interpolateGreys = _sequentialSingleGreys.default;
      _exportObj32.schemeGreys = _sequentialSingleGreys.scheme;

      _export(_exportObj32);
    }, function (_sequentialSinglePurples) {
      var _exportObj33 = {};
      _exportObj33.interpolatePurples = _sequentialSinglePurples.default;
      _exportObj33.schemePurples = _sequentialSinglePurples.scheme;

      _export(_exportObj33);
    }, function (_sequentialSingleReds) {
      var _exportObj34 = {};
      _exportObj34.interpolateReds = _sequentialSingleReds.default;
      _exportObj34.schemeReds = _sequentialSingleReds.scheme;

      _export(_exportObj34);
    }, function (_sequentialSingleOranges) {
      var _exportObj35 = {};
      _exportObj35.interpolateOranges = _sequentialSingleOranges.default;
      _exportObj35.schemeOranges = _sequentialSingleOranges.scheme;

      _export(_exportObj35);
    }],
    execute: function () {}
  };
});
//# sourceMappingURL=index.js.map
