import { defaultStyles } from "@/styles";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import useSetupTrackPlayer from "@/hooks/useSetupTrackPlayer";
import { useState, useCallback } from "react";
import { useLogTrackPlayerState } from "@/hooks/useLogTrackPlayerState";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { colors } from "@/constants/theme";
import { StackScreenWithSearchBar } from "@/constants/layout";
import { Platform } from "react-native";

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [fontsLoaded, fontError] = useFonts({
    "Montserrat-Regular": require("@/assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Bold": require("@/assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-Medium": require("@/assets/fonts/Montserrat-Medium.ttf"),
  });

  const [trackPlayerLoaded, setTrackPlayerLoaded] = useState(false);

  const handleTrackPlayerLoaded = useCallback(() => {
    setTrackPlayerLoaded(true);
  }, []);

  useSetupTrackPlayer({ onLoad: handleTrackPlayerLoaded });

  useLogTrackPlayerState();

  const onLayoutRootView = useCallback(async () => {
    if ((fontsLoaded || fontError) && trackPlayerLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError, trackPlayerLoaded]);

  if ((!fontsLoaded && !fontError) || !trackPlayerLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider
      style={defaultStyles.container}
      onLayout={onLayoutRootView}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <RootNavigation />
        <StatusBar style={"light"} />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

const iosHeaderOptions = {
  ...StackScreenWithSearchBar,
  headerStyle: {
    backgroundColor: colors.background,
  },
  headerTitle: "Add to playlist",
  headerTitleStyle: {
    fontFamily: "Montserrat-Medium",
    color: colors.text,
  },
};

const androidHeaderOptions = {
  headerShown: false,
};

const RootNavigation = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="player"
        options={{
          presentation: "card",
          gestureEnabled: true,
          gestureDirection: "vertical",
          animationDuration: 400,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(modals)/addToPlaylist"
        options={{
          ...(Platform.OS === "ios" ? iosHeaderOptions : androidHeaderOptions),
          presentation: Platform.select({
            ios: "transparentModal",
            android: "containedTransparentModal",
          }),
          gestureEnabled: true,
          gestureDirection: "vertical",
          animationDuration: 100,
          animation: "slide_from_bottom",
        }}
      />
    </Stack>
  );
};

export default App;
