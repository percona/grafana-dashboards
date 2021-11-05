"use strict";

System.register(["lodash"], function (_export, _context) {
	"use strict";

	var _, styleDefaults;

	function diagramStyleFormatter(customStyleValues) {
		var values = _.extend({}, styleDefaults, customStyleValues);
		return "\n\t  .diagram g > foreignObject > div {\n\t  font-size: " + values.fontSize + ";\n\t}\n\t";
	}

	return {
		setters: [function (_lodash) {
			_ = _lodash.default;
		}],
		execute: function () {
			styleDefaults = {
				fontSize: "1rem"
			};

			_export("diagramStyleFormatter", diagramStyleFormatter);
		}
	};
});
//# sourceMappingURL=diagramStyle.js.map
