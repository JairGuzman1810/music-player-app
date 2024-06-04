/* eslint-disable prettier/prettier */
import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  Easing,
  StyleProps,
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export type MovingTextProps = {
  text: string;
  animationThreshold: number;
  style?: StyleProps;
};

const MovingText = ({ text, animationThreshold, style }: MovingTextProps) => {
  const translateX = useSharedValue(0);
  const shouldAnimate = text.length >= animationThreshold;
  const textWidth = text.length * 10; // Ajustar según sea necesario para el ancho del texto
  const containerWidth = 200; // Ancho del contenedor, ajusta según sea necesario
  const padding = 50; // Espacio de padding entre los textos duplicados

  useEffect(() => {
    if (!shouldAnimate) return;

    translateX.value = withRepeat(
      withTiming(-textWidth - padding, {
        duration: 5000,
        easing: Easing.linear,
      }),
      -1,
      false
    );

    return () => {
      cancelAnimation(translateX);
      translateX.value = 0;
    };
  }, [translateX, text, animationThreshold, shouldAnimate, textWidth, padding]);

  const animatedStyle = useAnimatedStyle(() => {
    return { transform: [{ translateX: translateX.value }] };
  });

  return (
    <View
      style={{
        flexDirection: "row",
        overflow: "hidden",
        width: containerWidth,
      }}
    >
      <Animated.Text
        numberOfLines={1}
        style={[
          style,
          animatedStyle,
          shouldAnimate && { width: textWidth * 2 + padding, paddingLeft: 16 },
        ]}
      >
        {text}
        {" ".repeat(padding / 5)}
        {text} {/* Duplica el texto con padding en medio */}
      </Animated.Text>
    </View>
  );
};

export default MovingText;
