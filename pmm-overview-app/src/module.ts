import { ConfigCtrl } from './config_ctrl';

export {
  ConfigCtrl as ConfigCtrl,
};

// Enable plugin
// curl -X POST 'http://admin:admin@localhost/graph/api/plugins/percona-pmm-mysql/settings' -d 'enabled=true'
// {"message":"Plugin settings updated"}
// Disable plugin
// curl -X POST 'http://admin:admin@localhost/graph/api/plugins/percona-pmm-mysql/settings' -d 'enabled=false'
// {"message":"Plugin settings updated"}