import ArtistTrackList from "@/components/ArtistTrackList";
import CustomSearchBar from "@/components/SearchBar";
import useNavigationSearch from "@/hooks/useNavigationSearch";
import { useArtists } from "@/store/library";
import { defaultStyles } from "@/styles";
import { Redirect, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

import { Platform, View } from "react-native";
import BackButton from "@/components/BackButton";

const ArtistDetailScreen = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { name: artistName } = useLocalSearchParams<{ name: string }>();
  const artists = useArtists();

  const artist = artists.find((artist) => artist.name === artistName);

  const placeholder = "Find in songs";
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

  if (!artist) {
    console.warn(`Artist ${artistName} not found!`);
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
      {Platform.OS === "android" && <BackButton text="Artist" />}
      {Platform.OS === "android" && (
        <CustomSearchBar
          placeholder={placeholder}
          onChangeSearch={handleSearchChange}
        />
      )}
      <ArtistTrackList artist={artist} searchQueryTrack={searchQuery} />
    </View>
  );
};

export default ArtistDetailScreen;
