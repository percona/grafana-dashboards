export const Messages = {
  advanced: {
    action: 'Apply changes',
    retentionLabel: 'Data retention',
    retentionTooltip: 'This is the value for how long data will be stored.',
    retentionUnits: 'days',
    telemetryLabel: 'Telemetry',
    telemetryTooltip: 'Option to send usage data back to Percona to let us make our product better.',
    updatesLabel: 'Check for updates',
    updatesTooltip: 'Option to check new versions and ability to update PMM from UI.',
    sttLabel: 'Security Threat Tool',
    sttTooltip: 'Enable Security Threat Tool and get updated checks from Percona.'
  },
  diagnostics: {
    action: 'Download PMM Server Logs',
    label: 'Diagnostics',
    tooltip: 'You can download server logs to make the problem detection simpler. Please include this file if you are submitting a bug report.',
  },
  metrics: {
    action: 'Apply changes',
    label: 'Metrics resolution, sec',
    options: {
      rare: 'Rare',
      standard: 'Standard',
      frequent: 'Frequent',
      custom: 'Custom',
    },
    tooltip: 'This setting defines how frequently the data will be collected.'
  },
  ssh: {
    action: 'Apply SSH key',
    label: 'SSH key',
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
  },
  tooltipLinkText: 'Read more'
};
