import _ from 'lodash';

const styleDefaults = {
	fontSize: "1rem"
}

function diagramStyleFormatter(customStyleValues) {
	let values = _.extend({}, styleDefaults, customStyleValues);
	return `
	  .diagram g > foreignObject > div {
	  font-size: ${values.fontSize};
	}
	`;
}

export {
	diagramStyleFormatter
}