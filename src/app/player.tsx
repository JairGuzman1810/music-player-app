import { MovingText } from "@/components/MovingText";
import { unknownTrackImageUri } from "@/constants/images";
import { colors, screenPadding } from "@/constants/theme";
import { defaultStyles } from "@/styles";
import { Image } from "expo-image";
import { ActivityIndicator } from "react-native";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useActiveTrack } from "react-native-track-player";

const PlayerScreen = () => {
  const activeTrack = useActiveTrack();
  const { top, bottom } = useSafeAreaInsets();

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
      <View style={{ flex: 1, marginTop: top + 70, marginBottom: bottom }}>
        {/* Artwork image */}
        <View style={styles.artworkImageContainer}>
          <Image
            source={{ uri: activeTrack.artwork || unknownTrackImageUri }}
            style={styles.artworkImage}
            contentFit="cover"
            transition={1000}
            priority={"high"}
          />
        </View>
        {/* Artwork image */}
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
                <View style={styles.trackTitleContainer}>
                  <MovingText
                    text={activeTrack.title || ""}
                    animationThreshold={25}
                    style={styles.trackTitleText}
                  />
                </View>
              </View>
            </View>
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
    fontFamily: "Montserrat-Medium",
  },
});
