import { View, Platform } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { defaultStyles } from "@/styles";
import Header from "@/components/header";
import useNavigationSearch from "@/hooks/useNavigationSearch";
import CustomSearchBar from "@/components/SearchBar";
import TrackList from "@/components/TrackList";
import { useFavorites } from "@/store/library";
import { trackTitleFilter } from "@/helpers/filter";
import { generateTrackSongListId } from "@/helpers/miscellaneous";

const FavoritesScreen = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const placeholder = "Find in favorites";
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

  const favoritesTracks = useFavorites().favorites;

  const filteredFavoritesTracks = useMemo(() => {
    if (!searchQuery) return favoritesTracks;
    return favoritesTracks.filter(trackTitleFilter(searchQuery));
  }, [favoritesTracks, searchQuery]);
  return (
    <View style={defaultStyles.container}>
      {Platform.OS === "android" && <Header text="Favorites" />}
      {Platform.OS === "android" && (
        <CustomSearchBar
          placeholder={placeholder}
          onChangeSearch={handleSearchChange}
        />
      )}
      <TrackList
        id={generateTrackSongListId("favorites", searchQuery)}
        searchQuery={searchQuery}
        tracks={filteredFavoritesTracks}
      />
    </View>
  );
};

export default FavoritesScreen;
