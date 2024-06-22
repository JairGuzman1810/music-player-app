import { Platform, View } from "react-native";
import React from "react";
import { defaultStyles } from "@/styles";
import BackButton from "@/components/BackButton";

// This component creates a divider between items in the list

const PlaylistDetailScreen = () => {
  return (
    <View
      style={[
        defaultStyles.container,
        Platform.OS === "android" && { paddingTop: 40 },
      ]}
    >
      {/* Custom header for Android */}
      {Platform.OS === "android" && <BackButton text="Playlist" />}
    </View>
  );
};

export default PlaylistDetailScreen;
