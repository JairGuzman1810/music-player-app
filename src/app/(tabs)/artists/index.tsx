import { View, Platform } from "react-native";
import React from "react";
import { defaultStyles } from "@/styles";
import Header from "@/components/header";

const ArtistsScreen = () => {
  return (
    <View style={defaultStyles.container}>
      {Platform.OS === "android" && <Header text="Artists" />}
    </View>
  );
};

export default ArtistsScreen;
