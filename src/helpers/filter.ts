import { Track } from "react-native-track-player";
import { Artist } from "./types";

export const trackTitleFilter = (title: string) => (track: Track) =>
  track.title?.toLowerCase().includes(title.toLowerCase());

export const artistsNameFilter = (name: string) => (artist: Artist) =>
  artist.name?.toLowerCase().includes(name.toLowerCase());
