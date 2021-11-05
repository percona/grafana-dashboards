import { contextSrv } from 'app/core/core';

const getTheme = () =>
  contextSrv.user.lightTheme ? 'light' : 'dark';

export default {
  getTheme
};