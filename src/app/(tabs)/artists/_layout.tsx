import { Platform, View } from "react-native";
import React from "react";
import { defaultStyles } from "@/styles";
import { Stack } from "expo-router";
import { StackScreenWithSearchBar } from "@/constants/layout";

const iosHeaderOptions = {
  ...StackScreenWithSearchBar,
  headerTitle: "Artists",
};

const androidHeaderOptions = {
  headerShown: false,
};

const ArtistsScreenLayout = () => {
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={
            Platform.OS === "ios" ? iosHeaderOptions : androidHeaderOptions
          }
        />
      </Stack>
    </View>
  );
};

export default ArtistsScreenLayout;
