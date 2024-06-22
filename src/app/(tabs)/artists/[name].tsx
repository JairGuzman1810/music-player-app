import ArtistTrackList from "@/components/ArtistTrackList";
import CustomSearchBar from "@/components/SearchBar";
import useNavigationSearch from "@/hooks/useNavigationSearch";
import { useArtists } from "@/store/library";
import { defaultStyles } from "@/styles";
import { Redirect, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";

import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "@/constants/theme";

const ArtistDetailScreen = () => {
  const router = useRouter();

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

  const handleGoBack = () => {
    // Implement your navigation logic to go back
    router.back();
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
      {Platform.OS === "android" && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={handleGoBack} style={styles.backIcon}>
            <AntDesign name="arrowleft" size={24} color={colors.primary} />
            <Text style={styles.back}>Artist</Text>
          </TouchableOpacity>
        </View>
      )}
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

const styles = StyleSheet.create({
  backIcon: {
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  back: {
    ...defaultStyles.text,
    color: colors.primary,
    fontFamily: "Montserrat-Medium",
  },
});

export default ArtistDetailScreen;
