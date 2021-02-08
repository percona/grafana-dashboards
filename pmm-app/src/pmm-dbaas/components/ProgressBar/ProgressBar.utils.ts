export const getProgressBarPercentage = (finishedSteps: number, totalSteps: number) => {
  if (totalSteps <= 0) {
    return 0;
  }

  if (finishedSteps > totalSteps) {
    return 100;
  }

  return Math.round((finishedSteps * 100) / totalSteps);
};
