module.exports = {
  rules: [{
    template: 'PostgreSQL connections in use',
    templateType: 'BUILT_IN',
    ruleName: 'Rule with BUILT_IN template (activated, without channels)',
    threshold: '100',
    thresholdUnit: '%',
    duration: '1',
    severity: 'Warning',
    filters: 'service_name=pmm-server-postgresql',
    channels: [],
    activate: true,
  }, {
    template: 'PostgreSQL connections in use',
    templateType: 'BUILT_IN',
    ruleName: 'Rule with BUILT_IN template (not activated, without channels)',
    threshold: '100',
    thresholdUnit: '%',
    duration: '1',
    severity: 'Critical',
    filters: 'service_name=pmm-server-postgresql',
    channels: [],
    activate: false,
  }, {
    template: 'PostgreSQL connections in use',
    templateType: 'BUILT_IN',
    ruleName: 'Rule with BUILT_IN template (activated, with channels)',
    threshold: '100',
    thresholdUnit: '%',
    duration: '1',
    severity: 'High',
    filters: 'service_name=pmm-server-postgresql',
    channels: ['EmailChannelForRules'],
    activate: true,
  }, {
    template: 'PostgreSQL connections in use',
    templateType: 'BUILT_IN',
    ruleName: 'Rule with BUILT_IN template (not activated, with channels)',
    threshold: '100',
    thresholdUnit: '%',
    duration: '1',
    severity: 'Notice',
    filters: 'service_name=pmm-server-postgresql',
    channels: ['EmailChannelForRules'],
    activate: false,
  }, {
    template: 'E2E TemplateForRules YAML',
    templateType: 'User-defined (UI)',
    ruleName: 'Rule with User-defined (UI) template (activated, without channels)',
    threshold: '100',
    thresholdUnit: '%',
    duration: '1',
    severity: 'Warning',
    filters: 'service_name=pmm-server-postgresql',
    channels: [],
    activate: true,
  }, {
    template: 'E2E TemplateForRules YAML',
    templateType: 'User-defined (UI)',
    ruleName: 'Rule with User-defined (UI) template (not activated, without channels)',
    threshold: '100',
    thresholdUnit: '%',
    duration: '1',
    severity: 'Critical',
    filters: 'service_name=pmm-server-postgresql',
    channels: [],
    activate: false,
  }, {
    template: 'E2E TemplateForRules YAML',
    templateType: 'User-defined (UI)',
    ruleName: 'Rule with User-defined (UI) template (activated, with channels)',
    threshold: '100',
    thresholdUnit: '%',
    duration: '1',
    severity: 'High',
    filters: 'service_name=pmm-server-postgresql',
    channels: ['EmailChannelForRules'],
    activate: true,
  }, {
    template: 'E2E TemplateForRules YAML',
    templateType: 'User-defined (UI)',
    ruleName: 'Rule with User-defined (UI) template (not activated, with channels)',
    threshold: '100',
    thresholdUnit: '%',
    duration: '1',
    severity: 'Notice',
    filters: 'service_name=pmm-server-postgresql',
    channels: ['EmailChannelForRules'],
    activate: false,
  }, {
    template: 'E2E TemplateForRules YAML',
    templateType: 'User-defined (UI)',
    ruleName: 'Rule with User-defined (UI) template with default params',
    threshold: '',
    thresholdUnit: '%',
    duration: '50',
    severity: 'Notice',
    filters: 'service_name=pmm-server-postgresql',
    channels: ['EmailChannelForRules'],
    activate: true,
  }, {
    template: 'range-empty',
    templateType: 'User-defined (UI)',
    ruleName: 'Rule with User-defined (UI) template with default params (empty-range template)',
    threshold: '',
    thresholdUnit: '%',
    duration: '50',
    severity: 'Notice',
    filters: 'service_name=pmm-server-postgresql',
    channels: ['EmailChannelForRules'],
    activate: true,
  }, {
    template: 'range-empty',
    templateType: 'User-defined (UI)',
    ruleName: 'Rule with User-defined (UI) template (empty-range template)',
    threshold: '666',
    thresholdUnit: '%',
    duration: '50',
    severity: 'Notice',
    filters: 'service_name=pmm-server-postgresql',
    channels: ['EmailChannelForRules'],
    activate: true,
  }, {
    template: 'PostgreSQL connections in use',
    templateType: 'BUILT_IN',
    ruleName: 'Rule with BUILT_IN template (2 filters, PMM-T624)',
    threshold: '100',
    thresholdUnit: '%',
    duration: '1',
    severity: 'Warning',
    filters: 'service_name=pmm-server-postgresql, node_name=pmm-server',
    channels: [],
    activate: true,
  }],
  templates: [{
    template: 'Memory used by MongoDB connections',
    threshold: '25',
    duration: '300',
    severity: 'Warning',
    expression: 'sum by (node_name) (mongodb_ss_connections{conn_type="current"}) * 1024 * 1024\n'
      + '/ on (node_name) (node_memory_MemTotal_bytes)\n'
      + '* 100\n'
      + '> [[ .threshold ]]',
    alert: 'MongoDB high memory usage by connections ({{ $labels.service_name }})',
  }, {
    template: 'Memory used by MongoDB',
    threshold: '80',
    duration: '300',
    severity: 'Warning',
    expression: 'sum by (node_name) (mongodb_ss_mem_resident * 1024 * 1024)\n'
      + '/ on (node_name) (node_memory_MemTotal_bytes)\n'
      + '* 100\n'
      + '> [[ .threshold ]]',
    alert: 'MongoDB high memory usage ({{ $labels.service_name }})',
  }, {
    template: 'MongoDB restarted',
    threshold: '300',
    duration: '10',
    severity: 'Warning',
    expression: 'mongodb_instance_uptime_seconds\n'
      + '< [[ .threshold ]]',
    alert: 'MongoDB restarted ({{ $labels.service_name }})',
  }, {
    template: 'MySQL down',
    threshold: null,
    duration: '5',
    severity: 'Critical',
    expression: 'sum by (service_name, node_name) (mysql_up) == 0',
    alert: 'MySQL down ({{ $labels.service_name }})',
  }, {
    template: 'MySQL restarted',
    threshold: '300',
    duration: '10',
    severity: 'Warning',
    expression: 'mysql_global_status_uptime\n'
      + '< [[ .threshold ]]',
    alert: 'MySQL restarted ({{ $labels.service_name }})',
  }, {
    template: 'MySQL connections in use',
    threshold: '80',
    duration: '300',
    severity: 'Warning',
    expression: 'max_over_time(mysql_global_status_threads_connected[5m]) / ignoring (job)\n'
      + 'mysql_global_variables_max_connections\n'
      + '* 100\n'
      + '> [[ .threshold ]]',
    alert: 'MySQL too many connections ({{ $labels.service_name }})',
  }, {
    template: 'Node high CPU load',
    threshold: '80',
    duration: '300',
    severity: 'Warning',
    expression: '(1 - avg by(node_name) (rate(node_cpu_seconds_total{mode="idle"}[5m])))\n'
      + '* 100\n'
      + '> [[ .threshold ]]',
    alert: 'Node high CPU load ({{ $labels.node_name }})',
  }, {
    template: 'Node out of memory',
    threshold: '20',
    duration: '300',
    severity: 'Warning',
    expression: 'node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes\n'
      + '* 100\n'
      + '< [[ .threshold ]]',
    alert: 'Node out of memory ({{ $labels.node_name }})',
  }, {
    template: 'Node high swap filling up',
    threshold: '80',
    duration: '300',
    severity: 'Warning',
    expression: '(1 - (node_memory_SwapFree_bytes / node_memory_SwapTotal_bytes))\n'
      + '* 100\n'
      + '> [[ .threshold ]]',
    alert: 'Node swap is filling up ({{ $labels.node_name }})',
  }, {
    template: 'PostgreSQL down',
    threshold: null,
    duration: '5',
    severity: 'Critical',
    expression: 'sum by (service_name, node_name) (pg_up) == 0',
    alert: 'PostgreSQL down ({{ $labels.service_name }})',
  }, {
    template: 'PostgreSQL restarted',
    threshold: '300',
    duration: '10',
    severity: 'Warning',
    expression: 'pg_postmaster_uptime_seconds\n'
      + '< [[ .threshold ]]',
    alert: 'PostgreSQL restarted ({{ $labels.service_name }})',
  }, {
    template: 'PostgreSQL connections in use',
    threshold: '80',
    duration: '300',
    severity: 'Warning',
    expression: 'sum(pg_stat_activity_count{datname!~"template.*|postgres"})\n'
      + '> pg_settings_max_connections * [[ .threshold ]] / 100',
    alert: 'PostgreSQL too many connections ({{ $labels.service_name }})',
  }, {
    template: 'E2E TemplateForRules YAML',
    threshold: '80',
    duration: '300',
    severity: 'Warning',
    expression: 'max_over_time(mysql_global_status_threads_connected[5m]) / ignoring (job)\n'
      + 'mysql_global_variables_max_connections\n'
      + '* 100\n'
      + '> [[ .threshold ]]',
    alert: 'MySQL too many connections (instance {{ $labels.instance }})',
  }],
};
