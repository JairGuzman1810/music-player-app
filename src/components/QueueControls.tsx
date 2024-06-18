import { colors } from "@/constants/theme";
import { defaultStyles } from "@/styles";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
} from "react-native";
import TrackPlayer, { Track } from "react-native-track-player";
import { Ionicons } from "@expo/vector-icons";

type QueueControlsProps = {
  tracks: Track[];
} & ViewProps;

export const QueueControls = ({
  tracks,
  style,
  ...viewProps
}: QueueControlsProps) => {
  const handlePlay = async () => {
    await TrackPlayer.setQueue(tracks);
    await TrackPlayer.play();
  };

  const handleShuffle = async () => {
    const shuffleTracks = [...tracks].sort(() => Math.random() - 0.5);
    await TrackPlayer.setQueue(shuffleTracks);
    await TrackPlayer.play();
  };
  return (
    <View
      style={[{ flexDirection: "row", columnGap: 16 }, style]}
      {...viewProps}
    >
      {/* Play Button */}
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={handlePlay}
        >
          <Ionicons name="play" size={22} color={colors.primary} />
          <Text style={styles.buttonText}>Play</Text>
        </TouchableOpacity>
      </View>
      {/* Shuffle Button */}

      <View style={{ flex: 1 }}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={handleShuffle}
        >
          <Ionicons name="shuffle-sharp" size={22} color={colors.primary} />
          <Text style={styles.buttonText}>Shuffle</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
    backgroundColor: "rgba(47,47,47,0.5)",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 8,
  },
  buttonText: {
    ...defaultStyles.text,
    color: colors.primary,
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Montserrat-Medium",
  },
});
