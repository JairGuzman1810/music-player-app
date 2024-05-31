import { Platform, View } from "react-native";
import React from "react";
import { defaultStyles } from "@/styles";
import Header from "@/components/header";

const SongsScreen = () => {
  return (
    <View style={defaultStyles.container}>
      {Platform.OS === "android" && <Header text="Songs" />}
    </View>
  );
};

export default SongsScreen;
