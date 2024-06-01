import React from "react";
import { View, Platform } from "react-native";
import { defaultStyles } from "@/styles";
import { Stack } from "expo-router";
import { StackScreenWithSearchBar } from "@/constants/layout";

const SongsScreenLayout = () => {
  const iosHeaderOptions = {
    ...StackScreenWithSearchBar,
    headerTitle: "Songs",
  };

  const androidHeaderOptions = {
    headerShown: false,
  };

  return (
    <View style={[defaultStyles.container]}>
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

export default SongsScreenLayout;
