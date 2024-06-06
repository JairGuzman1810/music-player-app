/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import React, { useEffect } from "react";
import { Text } from "react-native";
import Animated, {
  Easing,
  StyleProps,
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export type MovingTextProps = {
  text: string;
  animationThreshold: number;
  style?: StyleProps;
};

export const MovingText = ({
  text,
  animationThreshold,
  style,
}: MovingTextProps) => {
  const translateX = useSharedValue(0);
  const shouldAnimate = text.length >= animationThreshold;

  const textWidth = text.length * 4.4;

  useEffect(() => {
    if (!shouldAnimate) return;

    translateX.value = withDelay(
      1000,
      withRepeat(
        withTiming(-textWidth, {
          duration: 5000,
          easing: Easing.linear,
        }),
        -1,
        true
      )
    );

    return () => {
      cancelAnimation(translateX);
      translateX.value = 0;
    };
  }, [translateX, text, animationThreshold, shouldAnimate, textWidth]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return shouldAnimate ? (
    <Animated.Text
      numberOfLines={1}
      style={[
        style,
        animatedStyle,
        {
          width: 9999, // preventing the ellipsis from appearing
          paddingLeft: 16, // avoid the initial character being barely visible
        },
      ]}
    >
      {text}
    </Animated.Text>
  ) : (
    <Text numberOfLines={1} style={style}>
      {text}
    </Text>
  );
};
