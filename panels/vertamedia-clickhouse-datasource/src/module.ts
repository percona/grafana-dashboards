import {ClickHouseDatasource} from './datasource';
import {SqlQueryCtrl} from './query_ctrl';

class SqlConfigCtrl {
    static templateUrl = 'partials/config.html';
}

const defaultQuery = `SELECT
  toUInt32(ts) * 1000 AS time,
  description AS text,
  tags
FROM
  event_table
WHERE
  ts >= toDateTime($from) AND ts < toDateTime($to)
`;

class ClickHouseAnnotationsQueryCtrl {
    static templateUrl = 'partials/annotations.editor.html';

    annotation: any;

    /** @ngInject **/
    constructor() {
        this.annotation.query = this.annotation.query || defaultQuery;
    }
}

export {
    ClickHouseDatasource as Datasource,
    SqlQueryCtrl as QueryCtrl,
    SqlConfigCtrl as ConfigCtrl,
    ClickHouseAnnotationsQueryCtrl as AnnotationsQueryCtrl,
};
