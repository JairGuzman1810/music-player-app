import { View, Platform } from "react-native";
import React from "react";
import { defaultStyles } from "@/styles";
import Header from "@/components/header";

const FavoritesScreen = () => {
  return (
    <View style={defaultStyles.container}>
      {Platform.OS === "android" && <Header text="Favorites" />}
    </View>
  );
};

export default FavoritesScreen;
