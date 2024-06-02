import { Platform, View } from "react-native";
import React, { useState, useEffect } from "react";
import { defaultStyles } from "@/styles";
import Header from "@/components/header";
import TrackList from "@/components/TrackList";
import useNavigationSearch from "@/hooks/useNavigationSearch";
import CustomSearchBar from "@/components/SearchBar";

const SongsScreen = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
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

  return (
    <View style={defaultStyles.container}>
      {Platform.OS === "android" && <Header text="Songs" />}
      {Platform.OS === "android" && (
        <CustomSearchBar
          placeholder="Find in songs"
          onChangeSearch={handleSearchChange}
        />
      )}

      <TrackList searchQuery={searchQuery} />
    </View>
  );
};

export default SongsScreen;
