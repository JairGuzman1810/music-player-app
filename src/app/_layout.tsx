import { defaultStyles } from "@/styles";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import useSetupTrackPlayer from "@/hooks/useSetupTrackPlayer";
import { useState, useCallback } from "react";
import { useLogTrackPlayerState } from "@/hooks/useLogTrackPlayerState";

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
      <RootNavigation />
      <StatusBar style={"light"} />
    </SafeAreaProvider>
  );
};

const RootNavigation = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default App;
