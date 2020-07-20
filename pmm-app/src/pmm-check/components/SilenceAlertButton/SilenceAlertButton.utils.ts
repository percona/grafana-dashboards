import moment from 'moment';
import { Labels } from 'pmm-check/types';

const formatMatchers = (labels: Labels) => Object.keys(labels).map((key) => ({
  name: key,
  value: labels[key],
  isRegex: false,
}));

export const makeSilencePayload = (labels: Labels) => {
  const nowUTCISO = moment.utc().format();
  const tomorrowUTCISO = moment.utc().add(24, 'hours').format();

  return ({
    matchers: formatMatchers(labels),
    startsAt: nowUTCISO,
    endsAt: tomorrowUTCISO,
    createdBy: window.grafanaBootData.user.name,
    comment: '',
    id: ''
  });
};
