import { Platform, View } from "react-native";
import React, { useState } from "react";
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

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  const query = Platform.OS === "ios" ? iosSearch : searchQuery;

  console.log(query);
  return (
    <View style={defaultStyles.container}>
      {Platform.OS === "android" && <Header text="Songs" />}
      {Platform.OS === "android" && (
        <CustomSearchBar
          placeholder="Find in songs"
          onChangeSearch={handleSearchChange}
        />
      )}

      <TrackList searchQuery={query} />
    </View>
  );
};

export default SongsScreen;
