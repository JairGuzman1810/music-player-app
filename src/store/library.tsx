/* eslint-disable prettier/prettier */
import { TrackWithPlayList } from "@/helpers/types";
import { Track } from "react-native-track-player";
import { create } from "zustand";
import library from "@/assets/data/library.json";

interface LibraryState {
  tracks: TrackWithPlayList[];
  toggleTrackFavorite: (track: Track) => void;
  addToPlayList: (track: Track, playlistName: string) => void;
}

export const useLibraryStore = create<LibraryState>()((set) => ({
  tracks: library,
  toggleTrackFavorite: () => {},
  addToPlayList: () => {},
}));

export const useTrack = () => useLibraryStore((state) => state.tracks);

export const useFavorites = () => {
  const favorites = useLibraryStore((state) =>
    state.tracks.filter((track) => track.rating === 1)
  );

  const toggleTrackFavorite = useLibraryStore(
    (state) => state.toggleTrackFavorite
  );

  return { favorites, toggleTrackFavorite };
};
