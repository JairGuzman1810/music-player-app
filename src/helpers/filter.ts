import { TrackItem } from "./types";

export const trackTitleFilter = (title: string) => (track: TrackItem) =>
  track.title?.toLowerCase().includes(title.toLowerCase());
