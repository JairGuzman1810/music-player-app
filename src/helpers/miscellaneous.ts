/* eslint-disable prettier/prettier */
export const formatSecondsToMinutes = (seconds: number) => {
  if (seconds < 0) seconds = 0;

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
};

export const generateTrackSongListId = (
  trackLitsName: string,
  search?: string
) => {
  return `${trackLitsName}:${`-${search} || ''`}`;
};
