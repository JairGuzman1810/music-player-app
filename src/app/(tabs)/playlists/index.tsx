import { View, Platform } from "react-native";
import React from "react";
import { defaultStyles } from "@/styles";
import Header from "@/components/header";

const PlaylistsScreen = () => {
  return (
    <View style={defaultStyles.container}>
      {Platform.OS === "android" && <Header text="Playlists" />}
    </View>
  );
};

export default PlaylistsScreen;
