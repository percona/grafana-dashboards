import kbn from 'app/core/utils/kbn';
import _ from 'lodash';

export const valueFormatter = (format, decimals) => (value) => kbn.valueFormats[format](value, _.isInteger(value) ? 0 : (decimals === null || decimals === undefined ? 5 : decimals));