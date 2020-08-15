import { GUI_DOC_URL } from './Settings.constants';

export const Messages = {
  advanced: {
    action: 'Apply changes',
    retentionLabel: 'Data retention',
    retentionTooltip: 'This is the value for how long data will be stored.',
    retentionUnits: 'days',
    telemetryLabel: 'Telemetry',
    telemetryLink: `${GUI_DOC_URL}#server-admin-gui-telemetry`,
    telemetryTooltip: 'Option to send usage data back to Percona to let us make our product better.',
    updatesLabel: 'Check for updates',
    updatesLink: `${GUI_DOC_URL}#check-for-updates`,
    updatesTooltip: 'Option to check new versions and ability to update PMM from UI.',
    sttLabel: 'Security Threat Tool',
    sttLink: `${GUI_DOC_URL}#security-threat-tool`,
    sttTooltip: 'Enable Security Threat Tool and get updated checks from Percona.'
  },
  alertmanager: {
    action: 'Apply Alertmanager settings',
    rulesLabel: 'Prometheus Alerting rules',
    rulesLink: `${GUI_DOC_URL}#prometheus-alertmanager-integration`,
    rulesTooltip: 'Alerting rules in the YAML configuration format.',
    urlLabel: 'Alertmanager URL',
    urlLink: `${GUI_DOC_URL}#prometheus-alertmanager-integration`,
    urlTooltip: 'The URL of the external Alertmanager to use.'
  },
  diagnostics: {
    action: 'Download server diagnostics data',
    label: 'Diagnostics',
    tooltip: 'You can download server logs to make the problem detection simpler. Please include this file if you are submitting a bug report.',
  },
  metrics: {
    action: 'Apply changes',
    label: 'Metrics resolution, sec',
    link: `${GUI_DOC_URL}#server-admin-gui-metrics-resolution`,
    options: {
      rare: 'Rare',
      standard: 'Standard',
      frequent: 'Frequent',
      custom: 'Custom',
    },
    intervals: {
      low: 'Low',
      medium: 'Medium',
      high: 'High'
    },
    tooltip: 'This setting defines how frequently the data will be collected.'
  },
  ssh: {
    action: 'Apply SSH key',
    label: 'SSH key',
    link: `${GUI_DOC_URL}#ssh-key-details`,
    tooltip: 'Public SSH key to let you login into the server using SSH.'
  },
  service: {
    success: 'Settings updated'
  },
  tabs: {
    metrics: 'Metrics resolution',
    advanced: 'Advanced settings',
    ssh: 'SSH key',
    alertManager: 'Alertmanager integration',
    signUp: 'Sign up',
  },
  tooltipLinkText: 'Read more'
};
