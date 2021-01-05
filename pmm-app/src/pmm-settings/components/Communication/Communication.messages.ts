import { HOW_TO_DOC_URL } from 'pmm-settings/Settings.constants';

const COMMUNICATION_LINK = `${HOW_TO_DOC_URL}/configure.html#communication`;

export const Messages = {
  fields: {
    from: {
      label: 'From',
      tooltipText: 'The sender address',
      tooltipLinkText: 'Read more',
      tooltipLink: COMMUNICATION_LINK,
    },
    smarthost: {
      label: 'Server Address',
      tooltipText: 'The SMTP host server address through which emails are sent',
      tooltipLinkText: 'Read more',
      tooltipLink: COMMUNICATION_LINK,
    },
    hello: {
      label: 'Hello',
      tooltipText: 'The hostname to identify the SMTP server',
      tooltipLinkText: 'Read more',
      tooltipLink: COMMUNICATION_LINK,
    },
    username: {
      label: 'Username',
      tooltipText: 'SMTP authentication information. Username',
      tooltipLinkText: 'Read more',
      tooltipLink: COMMUNICATION_LINK,
    },
    password: {
      label: 'Password',
      tooltipText: 'SMTP authentication information. Password',
      tooltipLinkText: 'Read more',
      tooltipLink: COMMUNICATION_LINK,
    },

    secret: {
      label: 'Secret',
      tooltipText: 'SMTP authentication information.  Secret',
      tooltipLinkText: 'Read more',
      tooltipLink: COMMUNICATION_LINK,
    },
    identity: {
      label: 'Identity',
      tooltipText: 'SMTP authentication information. Identity',
      tooltipLinkText: 'Read more',
      tooltipLink: COMMUNICATION_LINK,
    },
    slackURL: {
      label: 'URL',
      tooltipText: 'Slack incoming webhook URL',
      tooltipLinkText: 'Read more',
      tooltipLink: COMMUNICATION_LINK,
    },
  },
  actionButton: 'Apply changes',
  tabs: {
    slack: {
      key: 'slack',
      label: 'Slack',
    },
    email: {
      key: 'email',
      label: 'Email',
    },
  },
};
