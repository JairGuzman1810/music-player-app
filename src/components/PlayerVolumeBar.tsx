import { View, ViewProps } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/theme";
import { Slider } from "react-native-awesome-slider";
import { utilsStyles } from "@/styles";
import useTrackPlayerVolumen from "@/hooks/useTrackPlayerVolumen";

const PlayerVolumeBar = ({ style }: ViewProps) => {
  const { volume, updateVolume } = useTrackPlayerVolumen();
  const progress = useSharedValue(0);
  const min = useSharedValue(0);
  const max = useSharedValue(1);

  progress.value = volume ?? 0;

  return (
    <View style={style}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Ionicons
          name="volume-low"
          size={20}
          color={colors.icon}
          style={{ opacity: 0.8, marginHorizontal: 10 }} // Añade margen a la derecha
        />
        <Slider
          progress={progress}
          minimumValue={min}
          maximumValue={max}
          containerStyle={[utilsStyles.slider]} // Añade márgenes horizontales
          thumbWidth={0}
          renderBubble={() => null}
          theme={{
            minimumTrackTintColor: colors.minimumTrackTintColor,
            maximumTrackTintColor: colors.maximumTrackTintColor,
          }}
          onValueChange={(value) => {
            updateVolume(value);
          }}
        />
        <Ionicons
          name="volume-high"
          size={20}
          color={colors.icon}
          style={{ opacity: 0.8, marginHorizontal: 10 }} // Añade margen a la izquierda
        />
      </View>
    </View>
  );
};

export default PlayerVolumeBar;
