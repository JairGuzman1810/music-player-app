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

  const trackElapsedTime = useMemo(() => {
    const validPosition = isNaN(position) || position < 0 ? 0 : position;
    return formatSecondsToMinutes(validPosition);
  }, [position]);

  const trackRemainingTime = useMemo(() => {
    const validDuration = isNaN(duration) || duration < 0 ? 0 : duration;
    const validPosition = isNaN(position) || position < 0 ? 0 : position;

    const remainingTime = validDuration - validPosition;
    return formatSecondsToMinutes(remainingTime);
  }, [duration, position]);

  return (
    <View style={style}>
      <Slider
        progress={progress}
        minimumValue={min}
        maximumValue={max}
        containerStyle={[utilsStyles.slider, { height: 3 }]}
        renderBubble={() => null}
        thumbWidth={12}
        theme={{
          minimumTrackTintColor: colors.minimumTrackTintColor,
          maximumTrackTintColor: colors.maximumTrackTintColor,
          cacheTrackTintColor: colors.primary,
        }}
        onSlidingStart={() => setIsSliding(true)}
        onValueChange={(value) => {
          progress.value = value;
        }}
        onSlidingComplete={async (value) => {
          setIsSliding(false);
          await TrackPlayer.seekTo(value * duration);
          console.log(value * duration);
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
