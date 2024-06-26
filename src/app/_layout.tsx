import { defaultStyles } from "@/styles";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import useSetupTrackPlayer from "@/hooks/useSetupTrackPlayer";
import { useState, useCallback, useEffect } from "react";
import { useLogTrackPlayerState } from "@/hooks/useLogTrackPlayerState";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { colors } from "@/constants/theme";
import { StackScreenWithSearchBar } from "@/constants/layout";
import { Linking, Platform } from "react-native";
import "@/constants/playbackService"; // Import to ensure it's registered

SplashScreen.preventAutoHideAsync();

const App = () => {
  const router = useRouter();
  const [fontsLoaded, fontError] = useFonts({
    "Montserrat-Regular": require("@/assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Bold": require("@/assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-Medium": require("@/assets/fonts/Montserrat-Medium.ttf"),
  });

  const [trackPlayerLoaded, setTrackPlayerLoaded] = useState(false);
  const [appReady, setAppReady] = useState(false);

  const handleTrackPlayerLoaded = useCallback(() => {
    setTrackPlayerLoaded(true);
  }, []);

  const handleDeepLink = useCallback(() => {
    if (appReady) {
      router.navigate("/");
    }
  }, [router, appReady]);

  useEffect(() => {
    const initializeApp = async () => {
      // Wait for fonts and TrackPlayer to load
      if (fontsLoaded && trackPlayerLoaded) {
        await SplashScreen.hideAsync();
        setAppReady(true);
      }
    };

    initializeApp();

    const linkingSubscription = Linking.addEventListener("url", handleDeepLink);

    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink();
      }
    });

    return () => {
      linkingSubscription.remove();
    };
  }, [handleDeepLink, fontsLoaded, trackPlayerLoaded]);

  useSetupTrackPlayer({ onLoad: handleTrackPlayerLoaded });

  useLogTrackPlayerState();

  const onLayoutRootView = useCallback(() => {
    // You can perform any actions here that need to happen after the root view has laid out
    // Example: analytics tracking, additional initialization
  }, []);

  if ((!fontsLoaded && !fontError) || !trackPlayerLoaded) {
    return null; // Or you can render a loading indicator here
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
      {/* Define your stack screens here */}
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
