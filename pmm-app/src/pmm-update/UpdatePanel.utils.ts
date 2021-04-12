import moment from 'moment';

import { ISOTimestamp } from 'pmm-update/types';

const timestampToEnLocale = (timestamp: ISOTimestamp) => moment(timestamp).locale('en');

export const formatDateWithTime = (timestamp: ISOTimestamp) => timestampToEnLocale(timestamp).format('MMMM DD, H:mm');

export const formatDateWithYear = (timestamp: ISOTimestamp) => timestampToEnLocale(timestamp).format('MMMM DD, YYYY');
