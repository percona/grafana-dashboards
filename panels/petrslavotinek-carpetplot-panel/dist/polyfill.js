'use strict';

System.register([], function (_export, _context) {
	"use strict";

	var reduce, isEnumerable, concat, keys;
	return {
		setters: [],
		execute: function () {
			reduce = Function.bind.call(Function.call, Array.prototype.reduce);
			isEnumerable = Function.bind.call(Function.call, Object.prototype.propertyIsEnumerable);
			concat = Function.bind.call(Function.call, Array.prototype.concat);
			keys = Reflect.ownKeys;


			if (!Object.values) {
				Object.values = function values(O) {
					return reduce(keys(O), function (v, k) {
						return concat(v, typeof k === 'string' && isEnumerable(O, k) ? [O[k]] : []);
					}, []);
				};
			}

			if (!Object.entries) {
				Object.entries = function entries(O) {
					return reduce(keys(O), function (e, k) {
						return concat(e, typeof k === 'string' && isEnumerable(O, k) ? [[k, O[k]]] : []);
					}, []);
				};
			}
		}
	};
});
//# sourceMappingURL=polyfill.js.map
