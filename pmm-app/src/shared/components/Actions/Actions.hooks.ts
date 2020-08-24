import { ActionResult } from './Actions.types';
import { ActionsService } from './Actions.service';

export const useActionResult = async (actionId): Promise<ActionResult> => {
  let intervalId;
  // 5 seconds
  let counter = 10;

  return new Promise((resolve) => {
    if (!actionId) {
      return;
    }

    const getData = async () => {
      if (!counter) {
        clearInterval(intervalId);
        resolve({
          loading: false,
          value: null,
          error: '',
        });

        return;
      }

      counter -= 1;

      try {
        const requestResult = await ActionsService.getActionResult({
          action_id: actionId,
        });

        if (requestResult.done) {
          clearInterval(intervalId);
          if (requestResult.error) {
            resolve({
              loading: false,
              value: null,
              error: requestResult.error,
            });
          } else {
            resolve({
              loading: false,
              value: requestResult.output,
              error: '',
            });
          }
        }
      } catch (e) {
        clearInterval(intervalId);
        resolve({
          loading: false,
          value: null,
          error: '',
        });
      }
    };

    intervalId = setInterval(getData, 500);
  });
};
