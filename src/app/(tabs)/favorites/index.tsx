import { View, Platform } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { defaultStyles } from "@/styles";
import Header from "@/components/header";
import useNavigationSearch from "@/hooks/useNavigationSearch";
import CustomSearchBar from "@/components/SearchBar";
import library from "@/assets/data/library.json";
import TrackList from "@/components/TrackList";

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

  const favoritesTracks = useMemo(() => {
    return library.filter((track) => track.rating === 1);
  }, []);
  return (
    <View style={defaultStyles.container}>
      {Platform.OS === "android" && <Header text="Favorites" />}
      {Platform.OS === "android" && (
        <CustomSearchBar
          placeholder={placeholder}
          onChangeSearch={handleSearchChange}
        />
      )}
      <TrackList searchQuery={searchQuery} tracks={favoritesTracks} />
    </View>
  );
};

export default FavoritesScreen;
