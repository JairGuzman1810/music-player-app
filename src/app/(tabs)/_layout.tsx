import React from "react";
import { Tabs } from "expo-router";
import { colors, fontSize } from "@/constants/theme";
import { Platform, StyleSheet } from "react-native";
import {
  FontAwesome,
  MaterialCommunityIcons,
  FontAwesome6,
} from "@expo/vector-icons";
import FloatingPlayer from "@/components/FloatingPlayer";
import { BlurView } from "expo-blur";

const TabsNavigation = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          tabBarLabelStyle: { fontSize: fontSize.xs, fontWeight: "500" },
          headerShown: false,
          tabBarStyle: {
            position: "absolute",
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            borderTopWidth: 0,
          },
          tabBarBackground: () => (
            <BlurView
              style={{
                ...StyleSheet.absoluteFillObject,
                overflow: "hidden",
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
                flex: 1,
                justifyContent: "center",
              }}
            />
          ),
        }}
      >
        <Tabs.Screen
          name="favorites"
          options={{
            title: "Favorites",
            tabBarLabelStyle: {
              fontFamily: "Montserrat-Medium",
              fontSize: 12,
            },
            tabBarIcon: ({ color }) => (
              <FontAwesome name="heart" size={20} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="playlists"
          options={{
            title: "Playlists",
            tabBarLabelStyle: {
              fontFamily: "Montserrat-Medium",
              fontSize: 12,
            },
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="playlist-music"
                size={20}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="(songs)"
          options={{
            title: "Songs",
            tabBarLabelStyle: {
              fontFamily: "Montserrat-Medium",
              fontSize: 12,
            },
            tabBarIcon: ({ color }) => (
              <FontAwesome name="music" size={20} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="artists"
          options={{
            title: "Artists",
            tabBarLabelStyle: {
              fontFamily: "Montserrat-Medium",
              fontSize: 12,
            },
            tabBarIcon: ({ color }) => (
              <FontAwesome6 name="users-rectangle" size={20} color={color} />
            ),
          }}
        />
      </Tabs>
      <FloatingPlayer
        style={{
          position: "absolute",
          left: 8,
          right: 8,
          bottom: Platform.OS === "ios" ? 78 : 52,
        }}
      />
    </>
  );
};

export default TabsNavigation;
