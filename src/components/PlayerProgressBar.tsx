/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useMemo } from "react";
import { colors, fontSize } from "@/constants/theme";
import { formatSecondsToMinutes } from "@/helpers/miscellaneous";
import { defaultStyles, utilsStyles } from "@/styles";
import Slider from "@react-native-community/slider";
import { StyleSheet, Text, View, ViewProps } from "react-native";
import TrackPlayer, { useProgress } from "react-native-track-player";

const PlayerProgressBar = ({ style }: ViewProps) => {
  const { duration, position } = useProgress(250);

  const [isSliding, setIsSliding] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isSliding) {
      setProgress(duration > 0 ? position / duration : 0);
    }
  }, [isSliding, position, duration]);

  const min = 0;
  const max = 1;

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
        style={utilsStyles.slider}
        value={progress}
        onSlidingStart={() => setIsSliding(true)}
        minimumTrackTintColor={colors.minimumTrackTintColor}
        maximumTrackTintColor={colors.maximumTrackTintColor}
        minimumValue={min}
        maximumValue={max}
        thumbTintColor={colors.primary}
        onValueChange={(value) => setProgress(value)}
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
