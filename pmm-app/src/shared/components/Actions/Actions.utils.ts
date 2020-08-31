import { ActionResult } from './Actions.types';
import { ActionsService } from './Actions.service';

const INTERVAL = 500;
const NO_RESULT = {
  loading: false,
  value: null,
  error: '',
};

export const getActionResult = async (actionId: string): Promise<ActionResult> => {
  let intervalId: NodeJS.Timeout;
  // Total duration: 5 seconds = INTERVAL * counter
  let counter = 10;

  return new Promise((resolve) => {
    if (!actionId) {
      return;
    }

    const getData = async () => {
      if (!counter) {
        clearInterval(intervalId);
        resolve(NO_RESULT);

        return;
      }

      counter -= 1;

      try {
        const requestResult = await ActionsService.getActionResult({
          action_id: actionId,
        });

        /**
         * TODO: this needs investigation. Potentially, another request would be fired
         * in case if it takes the BE longer than 500ms to respond
         */
        //
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
        resolve(NO_RESULT);
      }
    };

    intervalId = setInterval(getData, INTERVAL);
  });
};
