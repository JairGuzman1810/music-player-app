import { View, Platform } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { defaultStyles } from "@/styles";
import Header from "@/components/header";
import useNavigationSearch from "@/hooks/useNavigationSearch";
import CustomSearchBar from "@/components/SearchBar";
import { usePlaylist } from "@/store/library";
import PlaylistList from "@/components/PlaylistList";
import { PlayList } from "@/helpers/types";
import { useRouter } from "expo-router";
import { playlistNameFilter } from "@/helpers/filter";

const PlaylistsScreen = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const router = useRouter();
  const placeholder = "Find in playlist";
  const iosSearch = useNavigationSearch({
    searchBarOptions: { placeholder },
  });

  const { playlist } = usePlaylist();

  useEffect(() => {
    if (Platform.OS === "ios" && iosSearch) {
      setSearchQuery(iosSearch);
    }
  }, [iosSearch]);

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  const filteredTracks = useMemo(() => {
    return playlist.filter(playlistNameFilter(searchQuery));
  }, [playlist, searchQuery]);

  const handlePlaylistPress = (playlist: PlayList) => {
    router.push(`/(tabs)/playlists/${playlist.name}`);
  };
  return (
    <View style={defaultStyles.container}>
      {Platform.OS === "android" && <Header text="Playlists" />}
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
    </View>
  );
};

export default PlaylistsScreen;
