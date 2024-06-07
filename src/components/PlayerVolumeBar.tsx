import { useState } from "react";
import { StyleSheet, Text, View, ViewProps } from "react-native";
import { useSharedValue } from "react-native-reanimated";

const PlayerVolumeBar = ({ style }: ViewProps) => {
  const [progress, setProgress] = useState(0);
  const min = useSharedValue(0);
  const max = useSharedValue(1);

  return (
    <View style={style}>
      <View style={{ flexDirection: "row" }}></View>
    </View>
  );
};

export default PlayerVolumeBar;

const styles = StyleSheet.create({});
