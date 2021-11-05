'use strict';

System.register([], function (_export, _context) {
	"use strict";

	var pluginName, diagramEditor, displayEditor, compositeEditor, mappingEditor;
	return {
		setters: [],
		execute: function () {
			_export('pluginName', pluginName = 'jdbranham-diagram-panel');

			_export('diagramEditor', diagramEditor = 'public/plugins/' + pluginName + '/diagramEditor.html');

			_export('displayEditor', displayEditor = 'public/plugins/' + pluginName + '/displayEditor.html');

			_export('compositeEditor', compositeEditor = 'public/plugins/' + pluginName + '/compositeEditor.html');

			_export('mappingEditor', mappingEditor = 'public/plugins/' + pluginName + '/mappingEditor.html');

			_export('pluginName', pluginName);

			_export('diagramEditor', diagramEditor);

			_export('displayEditor', displayEditor);

			_export('compositeEditor', compositeEditor);

			_export('mappingEditor', mappingEditor);
		}
	};
});
//# sourceMappingURL=properties.js.map
