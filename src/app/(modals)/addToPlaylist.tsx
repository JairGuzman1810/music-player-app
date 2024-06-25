/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import { Platform, StyleSheet } from "react-native";
import TrackPlayer, { Track } from "react-native-track-player";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";

import PlaylistList from "@/components/PlaylistList";
import BackButton from "@/components/BackButton";
import CustomSearchBar from "@/components/SearchBar";
import { PlayList } from "@/helpers/types";
import { playlistNameFilter } from "@/helpers/filter";
import { usePlaylist, useTrack } from "@/store/library";
import { useQueue } from "@/store/queue";
import { defaultStyles } from "@/styles";
import useNavigationSearch from "@/hooks/useNavigationSearch";

const AddToPlaylist = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const router = useRouter();
  const { activeQueueId } = useQueue();
  const { trackUrl } = useLocalSearchParams<{ trackUrl: Track["url"] }>();
  const tracks = useTrack();
  const { playlists, addToPlayList } = usePlaylist();

  const placeholder = "Find in playlist";
  const iosSearch = useNavigationSearch({
    searchBarOptions: { placeholder },
  });

  useEffect(() => {
    if (Platform.OS === "ios" && iosSearch) {
      setSearchQuery(iosSearch);
    }
  }, [iosSearch]);

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  const track = tracks.find((currentTrack) => trackUrl === currentTrack.url);

  if (!track) {
    return null;
  }

  const availablePlaylists = playlists.filter(
    (playlist) =>
      !playlist.tracks.some((playlistTrack) => playlistTrack.url === track.url)
  );

  const handlePlaylistPress = async (playlist: PlayList) => {
    addToPlayList(track, playlist.name);

    router.dismiss();

    //if current queue is the playlist, we add the track at the end of the queue
    if (activeQueueId?.startsWith(playlist.name)) {
      await TrackPlayer.add(track);
    }
  };

  const filteredTracks = availablePlaylists.filter(
    playlistNameFilter(searchQuery)
  );

  return (
    <SafeAreaView style={[styles.modalContainer, { paddingTop: 10 }]}>
      {Platform.OS === "android" && <BackButton text="Add to playlist" />}
      {Platform.OS === "android" && (
        <CustomSearchBar
          placeholder={placeholder}
          onChangeSearch={handleSearchChange}
        />
      )}
      <PlaylistList
        playlist={filteredTracks}
        onPlaylistPress={handlePlaylistPress}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    ...defaultStyles.container,
  },
});

export default AddToPlaylist;
