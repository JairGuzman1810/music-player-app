import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import TrackPlayer, {
  useIsPlaying,
  useProgress,
} from "react-native-track-player";
import { FontAwesome6 } from "@expo/vector-icons";
import { colors } from "@/constants/theme";

type PlayerControlsProps = {
  style?: ViewStyle;
};

type PlayerButtonProps = {
  style?: ViewStyle;
  iconSize?: number;
};

export const PlayerControls = ({ style }: PlayerControlsProps) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.row}>
        <SkipToPreviousButton />

        <PlayPauseButton iconSize={30} />

        <SkipToNextButton />
      </View>
    </View>
  );
};

export const PlayPauseButton = ({ style, iconSize }: PlayerButtonProps) => {
  const { playing } = useIsPlaying();
  const { duration, position } = useProgress(250);

  const handlePress = async () => {
    try {
      if (playing) {
        await TrackPlayer.pause();
      } else {
        if (duration - position > 0) {
          await TrackPlayer.seekTo(position);
        } else {
          await TrackPlayer.seekTo(0);
        }
        await TrackPlayer.play();
      }
    } catch (error) {
      console.error("Error handling play/pause:", error);
    }
  };

  return (
    <View style={[style, { height: iconSize }]}>
      <TouchableOpacity activeOpacity={0.85} onPress={handlePress}>
        <FontAwesome6
          name={playing ? "pause" : "play"}
          size={iconSize}
          color={colors.text}
        />
      </TouchableOpacity>
    </View>
  );
};

export const SkipToNextButton = ({ iconSize = 30 }: PlayerButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={async () => (
        await TrackPlayer.seekTo(0), TrackPlayer.skipToNext()
      )}
    >
      <FontAwesome6 name="forward" size={iconSize} color={colors.text} />
    </TouchableOpacity>
  );
};

export const SkipToPreviousButton = ({ iconSize = 30 }: PlayerButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={async () => (
        await TrackPlayer.seekTo(0), TrackPlayer.skipToPrevious()
      )}
    >
      <FontAwesome6 name="backward" size={iconSize} color={colors.text} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    alignItems: "center",
  },
});
