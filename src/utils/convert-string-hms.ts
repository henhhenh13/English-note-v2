export const convertSecondsToHMS = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600).toString().padStart(2,'0');
    const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2,'0');
    const seconds = (totalSeconds % 60).toFixed().toString().padStart(2,'0');
  
    if (hours === '00') {
    return `${minutes}:${seconds}`;
  }
  return `${hours}:${minutes}:${seconds}`;
}

