import { Platform, View } from "react-native";
import React, { useEffect, useState } from "react";
import { defaultStyles } from "@/styles";
import BackButton from "@/components/BackButton";
import CustomSearchBar from "@/components/SearchBar";
import { Redirect, useLocalSearchParams } from "expo-router";
import { usePlaylist } from "@/store/library";
import useNavigationSearch from "@/hooks/useNavigationSearch";
import PlaylistTrackList from "@/components/PlaylistTrackList";

// This component creates a divider between items in the list

const PlaylistDetailScreen = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { name: playlistName } = useLocalSearchParams<{ name: string }>();
  const { playlists } = usePlaylist();

  const playlist = playlists.find((playlist) => playlist.name === playlistName);

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

  if (!playlist) {
    console.warn(`Playlist ${playlistName} not found!`);
    return <Redirect href={"/(tabs)/artists"} />;
  }

  return (
    <View
      style={[
        defaultStyles.container,
        Platform.OS === "android" && { paddingTop: 40 },
      ]}
    >
      {/* Custom header for Android */}
      {Platform.OS === "android" && <BackButton text="Playlist" />}
      {Platform.OS === "android" && (
        <CustomSearchBar
          placeholder={placeholder}
          onChangeSearch={handleSearchChange}
        />
      )}
      <PlaylistTrackList playlist={playlist} searchQueryTrack={searchQuery} />
    </View>
  );
};

export default PlaylistDetailScreen;
