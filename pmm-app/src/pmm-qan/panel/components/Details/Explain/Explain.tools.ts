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

export const preparePlaceholders = (placeholders?: string[]) => placeholders;

export const fetchExplains = async (
  queryId: string,
  example: QueryExampleResponseItem,
  databaseType: DatabasesType,
  placeholders?: string[],
): Promise<FetchExplainsResult> => {
  try {
    if (databaseType === Databases.mysql && (placeholders || !example.placeholders_count)) {
      const payload = {
        example,
        queryId,
        placeholders: preparePlaceholders(placeholders),
      };

      const traditionalExplainActionId = await mysqlMethods.getExplainTraditional(payload);
      const jsonExplainActionId = await mysqlMethods.getExplainJSON(payload);

      const jsonResult = await getActionResult(jsonExplainActionId);
      const classicResult = await getActionResult(traditionalExplainActionId);
      const jsonValue = parseExplain(jsonResult);
      const classicValue = parseExplain(classicResult);

      return {
        jsonExplain: { ...jsonResult, value: jsonValue ? jsonValue.explain_result : jsonValue },
        classicExplain: { ...classicResult, value: classicValue },
      };
    }

    if (databaseType === Databases.mongodb) {
      const jsonExplainActionId = await mongodbMethods.getExplainJSON({ example });

      const jsonResult = await getActionResult(jsonExplainActionId);

      return {
        jsonExplain: jsonResult,
        classicExplain: actionResult,
      };
    }

    return {
      jsonExplain: actionResult,
      classicExplain: actionResult,
    };
  } catch (e) {
    console.error(e);

    return {
      jsonExplain: actionResult,
      classicExplain: actionResult,
    };
  }
};
