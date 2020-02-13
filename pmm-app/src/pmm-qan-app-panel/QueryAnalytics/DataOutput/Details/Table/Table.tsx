import React, { Component } from 'react';

class TableCreate extends Component {
  render() {
    return (
      <div>
        <pre>
          {'Table: t1\n' +
            '    Create Table: CREATE TABLE `t1` (\n' +
            '        `i1` int(11) DEFAULT NULL,\n' +
            '        `i2` int(11) DEFAULT NULL,\n' +
            '        CONSTRAINT `t1_chk_1` CHECK ((`i1` <> 0)),\n' +
            '        CONSTRAINT `t1_chk_2` CHECK ((`i2` > `i1`)),\n' +
            '        CONSTRAINT `t1_chk_3` CHECK ((`i2` <> 0)) /*!80016 NOT ENFORCED */\n' +
            '    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci'}
        </pre>
      </div>
    );
  }
}

export default TableCreate;
