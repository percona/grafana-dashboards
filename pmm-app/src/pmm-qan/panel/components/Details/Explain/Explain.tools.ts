import { logger } from '@percona/platform-core';
import { ActionResult } from 'shared/components/Actions';
import { ClassicExplainInterface } from './Explain.types';

export const processClassicExplain = (classic): ClassicExplainInterface => {
  if (!classic) {
    return { columns: [], rows: [] };
  }

  const [header, ...data] = classic.split('\n');
  const headerList = header
    .split('|')
    .map((e) => (String(e) ? e.trim() : ''))
    .filter(Boolean)
    .map((title) => ({ Header: title, key: title, accessor: title }));

  const rowsList = data.map((item) => item
    .split('|')
    .map((e) => (String(e) ? e.trim() : ''))
    .filter(Boolean)
    .reduce((acc, row, index) => {
      acc[headerList[index].accessor] = row;

      return acc;
    }, {}));

  return { columns: headerList, rows: rowsList };
};

export const base64Decode = (encoded: string) => {
  let decoded = encoded;

  try {
    decoded = atob(encoded);
  } catch (error) {
    logger.error(error);
  }

  return decoded;
};

export const parseExplain = (result: ActionResult) => {
  try {
    const value = JSON.parse(result.value);

    if (value && value.explain_result) {
      return { ...value, explain_result: base64Decode(value.explain_result) };
    }
  } catch (error) {
    logger.error(error);
  }

  return result.value;
};
