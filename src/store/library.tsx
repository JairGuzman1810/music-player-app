/* eslint-disable prettier/prettier */
import { Artist, PlayList, TrackWithPlayList } from "@/helpers/types";
import { Track } from "react-native-track-player";
import { create } from "zustand";
import library from "@/assets/data/library.json";
import { unknownTrackImageUri } from "@/constants/images";

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

export const useArtists = () =>
  useLibraryStore((state) => {
    return state.tracks.reduce((acc, track) => {
      const existingArtist = acc.find((artist) => artist.name === track.artist);

      if (existingArtist) {
        existingArtist.tracks.push(track);
      } else {
        acc.push({
          name: track.artist || "Unknown",
          tracks: [track],
        });
      }
      return acc; // ensure to return the accumulator
    }, [] as Artist[]);
  });

// Custom hook that retrieves playlists and addToPlayList function from a library store
export const usePlaylist = () => {
  // Retrieve playlist data from the library store using a reducer function
  const playlist = useLibraryStore((state) => {
    // Reduce tracks in the state to generate playlists
    return state.tracks.reduce((acc, track) => {
      // Iterate through each playlist name associated with the current track
      track.playlist?.forEach((playlistName) => {
        // Check if a playlist with the same name already exists in the accumulator
        const existingPlaylist = acc.find(
          (playlist) => playlist.name === playlistName
        );

        // If playlist exists, add current track to its tracks array; otherwise, create new playlist
        if (existingPlaylist) {
          existingPlaylist.tracks.push(track);
        } else {
          acc.push({
            name: playlistName,
            tracks: [track],
            artworkPreview: track.artwork ?? unknownTrackImageUri, // Use track artwork if available, otherwise fallback to default URI
          });
        }
      });

      return acc; // Return the updated accumulator
    }, [] as PlayList[]); // Initialize accumulator as an empty array of playlists
  });

  // Retrieve addToPlayList function from the library store
  const addToPlayList = useLibraryStore((state) => state.addToPlayList);

  // Return playlist data and addToPlayList function for external use
  return { playlist, addToPlayList };
};
