import { unknownTrackImageUri } from "@/constants/images";
import { defaultStyles } from "@/styles";
import { Image } from "expo-image";
import { StyleSheet, TouchableOpacity, View, ViewProps } from "react-native";
import { useActiveTrack } from "react-native-track-player";
import { PlayPauseButton, SkipToNextButton } from "@/components/PlayerControls";
import { useLastActiveTrack } from "@/hooks/useLastActiveTrack";
import MovingText from "./MovingText";

const FloatingPlayer = ({ style }: ViewProps) => {
  const activeTrack = useActiveTrack();
  const lastActiveTrack = useLastActiveTrack();

  const displayeTrack = activeTrack ?? lastActiveTrack;

  if (!displayeTrack) return null;

  //const displayeTrack = activeTrack;

  return (
    <TouchableOpacity activeOpacity={0.9} style={[styles.container, style]}>
      <>
        <Image
          source={{ uri: displayeTrack.artwork }}
          placeholder={{ uri: unknownTrackImageUri }}
          style={styles.image}
          contentFit="cover"
          transition={1000}
        />
        <View style={styles.trackTitleContainer}>
          <MovingText
            style={styles.trackTitle}
            text={displayeTrack.title ?? ""}
            animationThreshold={25}
          ></MovingText>
        </View>
        <View style={styles.trackControlsContainer}>
          <PlayPauseButton iconSize={24} />
          <SkipToNextButton iconSize={22} />
        </View>
      </>
    </TouchableOpacity>
  );
};

export default FloatingPlayer;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#252525",
    padding: 8,
    borderRadius: 12,
    paddingVertical: 10,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  trackTitleContainer: {
    flex: 1,
    overflow: "hidden",
    marginLeft: 10,
  },
  trackTitle: {
    ...defaultStyles.text,
    fontSize: 18,
    paddingLeft: 10,
    fontFamily: "Montserrat-Medium",
  },
  trackControlsContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 20,
    marginRight: 16,
    paddingLeft: 16,
  },
});
