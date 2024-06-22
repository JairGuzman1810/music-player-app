import { View, Platform, FlatList, StyleSheet, Text } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { defaultStyles, utilsStyles } from "@/styles";
import Header from "@/components/header";
import CustomSearchBar from "@/components/SearchBar";
import useNavigationSearch from "@/hooks/useNavigationSearch";
import { useArtists } from "@/store/library";
import { artistsNameFilter } from "@/helpers/filter";
import NotFound from "@/components/NotFound";
import { unknownArtistImageUri } from "@/constants/images";
import { screenPadding } from "@/constants/theme";
import { Link } from "expo-router";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Image } from "expo-image";

// This component creates a divider between items in the list
const ItemDivider = () => (
  <View
    style={{
      ...utilsStyles.itemSeparator,
      marginVertical: 12,
      marginLeft: 50,
    }}
  />
);

const ArtistsScreen = () => {
  const artists = useArtists();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const placeholder = "Find in artists";
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
  const filteredTracks = useMemo(() => {
    return artists.filter(artistsNameFilter(searchQuery));
  }, [searchQuery, artists]);

  return (
    <View style={defaultStyles.container}>
      {Platform.OS === "android" && <Header text="Artists" />}
      {Platform.OS === "android" && (
        <CustomSearchBar
          placeholder={placeholder}
          onChangeSearch={handleSearchChange}
        />
      )}
      <FlatList
        data={filteredTracks} // The data to display in the list
        ListFooterComponent={filteredTracks.length > 0 ? ItemDivider : null} // Footer component if there are tracks
        ListEmptyComponent={
          <NotFound title="No Artist Found" image={unknownArtistImageUri} />
        } // Component to display if no tracks are found
        ItemSeparatorComponent={ItemDivider} // Separator component between items
        contentContainerStyle={{
          paddingTop: 10,
          gap: 5,
          paddingBottom: 128,
          paddingHorizontal: screenPadding.horizontal,
        }} // Styling for the content container
        renderItem={({ item: artists }) => {
          return (
            <Link href={`/artists/${artists.name}`} asChild>
              <TouchableHighlight activeOpacity={0.8}>
                <View style={styles.artistsItemContainer}>
                  <View>
                    <Image
                      source={{
                        uri: unknownArtistImageUri,
                      }}
                      style={styles.artistImage}
                      priority={"normal"}
                    />
                  </View>
                  <View style={{ width: "100%" }}>
                    <Text numberOfLines={1} style={styles.artistNameText}>
                      {artists.name}
                    </Text>
                  </View>
                </View>
              </TouchableHighlight>
            </Link>
          );
        }} // Render each track item
      />
    </View>
  );
};

const styles = StyleSheet.create({
  artistsItemContainer: {
    flexDirection: "row",
    columnGap: 14,
    alignItems: "center",
  },
  artistImage: {
    borderRadius: 32,
    width: 40,
    height: 40,
  },
  artistNameText: {
    ...defaultStyles.text,
    fontSize: 17,
    maxWidth: "80%",
    fontFamily: "Montserrat-Regular",
  },
});

export default ArtistsScreen;
