import { logger } from 'shared/core/logger';
import { ActionResult, getActionResult } from 'shared/components/Actions';
import { Databases } from 'shared/core';
import { mongodbMethods, mysqlMethods } from '../database-models';
import { DatabasesType, QueryExampleResponseItem } from '../Details.types';
import { ClassicExplainInterface, FetchExplainsResult } from './Explain.types';

const actionResult: ActionResult = {
  error: '',
  loading: false,
  value: undefined,
};

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

export const fetchExplains = async (
  queryId: string,
  example: QueryExampleResponseItem,
  databaseType: DatabasesType,
  placeholders?: string[],
): Promise<FetchExplainsResult> => {
  const hasPlaceholders = placeholders?.length || !example.placeholders_count;
  const hasExample = !!example?.example;

  try {
    if (databaseType === Databases.mysql && (hasPlaceholders || hasExample)) {
      const payload = {
        example,
        queryId,
        placeholders,
      };

      const [classicResult, jsonResult] = await Promise.all([
        mysqlMethods.getExplainTraditional(payload).then(getActionResult),
        mysqlMethods.getExplainJSON(payload).then(getActionResult),
      ]);

      const jsonValue = parseExplain(jsonResult);
      const classicValue = parseExplain(classicResult);

      return {
        jsonExplain: { ...jsonResult, value: jsonValue ? jsonValue.explain_result : jsonValue },
        classicExplain: { ...classicResult, value: classicValue },
        visualExplain: actionResult,
      };
    }

    if (databaseType === Databases.mongodb) {
      const jsonResult = await mongodbMethods.getExplainJSON({ example }).then(getActionResult);

      return {
        jsonExplain: jsonResult,
        classicExplain: actionResult,
        visualExplain: actionResult,
      };
    }

    return {
      jsonExplain: actionResult,
      classicExplain: actionResult,
      visualExplain: actionResult,
    };
  } catch (e) {
    console.error(e);

    return {
      jsonExplain: actionResult,
      classicExplain: actionResult,
      visualExplain: actionResult,
    };
  }
};
