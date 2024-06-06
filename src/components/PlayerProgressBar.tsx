import { colors, fontSize } from "@/constants/theme";
import { formatSecondsToMinutes } from "@/helpers/miscellaneous";
import { defaultStyles, utilsStyles } from "@/styles";
import Slider from "@react-native-community/slider";
import { StyleSheet, Text, View, ViewProps } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import TrackPlayer, { useProgress } from "react-native-track-player";

const PlayerProgressBar = ({ style }: ViewProps) => {
  const { duration, position } = useProgress(250);

  const isSliding = useSharedValue(false);
  const progress = useSharedValue(0);
  const min = useSharedValue(0);
  const max = useSharedValue(1);
  const trackElapsedTime = formatSecondsToMinutes(position);
  const trackRemaingTime = formatSecondsToMinutes(duration - position);

  if (!isSliding.value) {
    progress.value = duration > 0 ? position / duration : 0;
  }
  return (
    <View style={style}>
      <Slider
        style={utilsStyles.slider}
        value={progress.value}
        onSlidingStart={() => (isSliding.value = true)}
        minimumTrackTintColor={colors.minimumTrackTintColor}
        maximumTrackTintColor={colors.maximumTrackTintColor}
        minimumValue={min.value}
        maximumValue={max.value}
        thumbTintColor={colors.primary}
        onValueChange={async (value) =>
          await TrackPlayer.seekTo(value * duration)
        }
        onSlidingComplete={async (value) => {
          if (!isSliding.value) return;
          isSliding.value = false;
          await TrackPlayer.seekTo(value * duration);
        }}
      />
      <View style={styles.timeRow}>
        <Text style={styles.timeText}>{trackElapsedTime}</Text>
        <Text style={styles.timeText}>-{trackRemaingTime}</Text>
      </View>
    </View>
  );
};

export default PlayerProgressBar;

const styles = StyleSheet.create({
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginTop: 15,
  },
  timeText: {
    ...defaultStyles.text,
    color: colors.text,
    opacity: 0.75,
    fontSize: fontSize.xs,
    letterSpacing: 0.7,
    fontFamily: "Montserrat-Regular",
  },
});
