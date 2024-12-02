
export const convertMillisecondsToSeconds = (ms: number): string => {
  return Math.floor(ms / 1000).toString().padStart(2, '0');
};
