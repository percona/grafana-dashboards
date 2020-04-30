import { useEffect, useState } from 'react';
import TableService from './components/Table/Table.service';

export const useActionResult = (): [any, any] => {
  const [result, setResult] = useState<any>();
  const [action_id, setActionId] = useState<any>();
  let intervalId;
  useEffect(() => {
    if (!action_id) {
      return;
    }
    const getData = async () => {
      const result = await TableService.getActionResult({
        action_id,
      });
      if (result.done) {
        clearInterval(intervalId);
        setResult(result.output);
      }
    };
    intervalId = setInterval(getData, 200);
  }, [action_id]);

  return [result, setActionId];
};
