import { MovingText } from "@/components/MovingText";
import { unknownTrackImageUri } from "@/constants/images";
import { colors, fontSize, screenPadding } from "@/constants/theme";
import { defaultStyles, utilsStyles } from "@/styles";
import { Image } from "expo-image";
import { ActivityIndicator, Text } from "react-native";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useActiveTrack } from "react-native-track-player";
import { FontAwesome } from "@expo/vector-icons";
import { PlayerControls } from "@/components/PlayerControls";
import PlayerProgressBar from "@/components/PlayerProgressBar";

const PlayerScreen = () => {
  const activeTrack = useActiveTrack();
  const { top, bottom } = useSafeAreaInsets();
  const isFavorite = false;

  const toggleFavorite = () => {};
  if (!activeTrack) {
    return (
      <View style={[defaultStyles.container, { justifyContent: "center" }]}>
        <ActivityIndicator color={colors.icon} />
      </View>
    );
  }
  return (
    <View style={styles.overlayContainer}>
      <DismissPlayerSymbol />
      <View style={{ flex: 1, marginTop: top + 70, marginBottom: bottom + 20 }}>
        {/* Artwork image */}
        <View style={styles.artworkImageContainer}>
          <Image
            source={{ uri: activeTrack.artwork || unknownTrackImageUri }}
            style={styles.artworkImage}
            placeholder={{ uri: unknownTrackImageUri }}
            contentFit="cover"
            transition={1000}
            priority={"high"}
          />
        </View>
        {/* Track container data */}

        <View style={{ flex: 1 }}>
          <View style={{ marginTop: "auto" }}>
            <View style={{ height: 60 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {/* Artwork title */}
                <View style={styles.trackTitleContainer}>
                  <MovingText
                    text={activeTrack.title || ""}
                    animationThreshold={25}
                    style={styles.trackTitleText}
                  />
                </View>
                {/* Favorite button */}
                <FontAwesome
                  name={isFavorite ? "heart" : "heart-o"}
                  size={24}
                  color={isFavorite ? colors.primary : colors.icon}
                  style={{ marginHorizontal: 14 }}
                  onPress={toggleFavorite}
                />
              </View>
              {/* Track  artists */}
              {activeTrack.artist && (
                <Text
                  numberOfLines={1}
                  style={[styles.trackArtistText, { marginTop: 6 }]}
                >
                  {activeTrack.artist}
                </Text>
              )}
            </View>

            <PlayerProgressBar style={{ marginTop: 32 }} />

            <PlayerControls style={{ marginTop: 40 }} />
          </View>
          {/* <PlayerVolumenBar style={{ marginTop: "auto", marginBottom: 30 }} /> */}

          <View style={utilsStyles.centeredRow}>
            {/* <PlayerRepeatToggle size={30} style={{maringBottom: 6}} /> */}
          </View>
        </View>
      </View>
    </View>
  );
};

const DismissPlayerSymbol = () => {
  const { top } = useSafeAreaInsets();

  return (
    <View
      style={{
        position: "absolute",
        top: top + 8,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <View
        accessible={false}
        style={{
          width: 50,
          height: 8,
          borderRadius: 8,
          backgroundColor: "#fff",
          opacity: 0.9,
        }}
      />
    </View>
  );
};

export default PlayerScreen;

const styles = StyleSheet.create({
  overlayContainer: {
    ...defaultStyles.container,
    paddingHorizontal: screenPadding.horizontal,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  artworkImageContainer: {
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 11.0,
    elevation: 40,
    flexDirection: "row",
    justifyContent: "center",
    height: "45%",
    borderRadius: 10,
  },
  artworkImage: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  trackTitleContainer: {
    flex: 1,
    overflow: "hidden",
  },
  trackTitleText: {
    ...defaultStyles.text,
    fontSize: 22,
    fontFamily: "Montserrat-Bold",
  },
  trackArtistText: {
    ...defaultStyles.text,
    fontSize: fontSize.base,
    fontFamily: "Montserrat-Medium",
    opacity: 0.8,
    maxWidth: "90%",
  },
});
