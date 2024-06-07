/* eslint-disable prettier/prettier */
import { useState, useEffect, useMemo } from "react";
import { colors, fontSize } from "@/constants/theme";
import { formatSecondsToMinutes } from "@/helpers/miscellaneous";
import { defaultStyles, utilsStyles } from "@/styles";
import { StyleSheet, Text, View, ViewProps } from "react-native";
import { Slider } from "react-native-awesome-slider";
import { useSharedValue } from "react-native-reanimated";
import TrackPlayer, { useProgress } from "react-native-track-player";

const PlayerProgressBar = ({ style }: ViewProps) => {
  const { duration, position } = useProgress(250);

  const [isSliding, setIsSliding] = useState(false);
  const progress = useSharedValue(0);
  const min = useSharedValue(0);
  const max = useSharedValue(1);

  useEffect(() => {
    if (!isSliding) {
      progress.value = duration > 0 ? position / duration : 0;
    }
  }, [isSliding, position, duration, progress]);

  const trackElapsedTime = useMemo(
    () => formatSecondsToMinutes(position),
    [position]
  );
  const trackRemainingTime = useMemo(
    () => formatSecondsToMinutes(duration - position),
    [duration, position]
  );

  return (
    <View style={style}>
      <Slider
        progress={progress}
        minimumValue={min}
        maximumValue={max}
        containerStyle={utilsStyles.slider}
        thumbWidth={0}
        renderBubble={() => null}
        theme={{
          minimumTrackTintColor: colors.minimumTrackTintColor,
          maximumTrackTintColor: colors.maximumTrackTintColor,
        }}
        onSlidingStart={() => setIsSliding(true)}
        onValueChange={(value) => {
          progress.value = value;
        }}
        onSlidingComplete={async (value) => {
          setIsSliding(false);
          await TrackPlayer.seekTo(value * duration);
        }}
      />
      <View style={styles.timeRow}>
        <Text style={styles.timeText}>{trackElapsedTime}</Text>
        <Text style={styles.timeText}>-{trackRemainingTime}</Text>
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
    marginTop: 20,
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
