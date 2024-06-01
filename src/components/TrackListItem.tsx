// TrackListItem.tsx

import { colors, fontSize } from "@/constants/theme";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { unknownTrackImageUri } from "@/constants/images";
import { defaultStyles } from "@/styles";
import { TrackItem } from "@/types/types";

// Define the type for the item prop

// Define the props type for the TrackListItem component
type TrackListItemProps = {
  item: TrackItem;
};

const TrackListItem = ({ item }: TrackListItemProps) => {
  const isActiveTrack = true;
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: item.artwork }}
        placeholder={{ uri: unknownTrackImageUri }}
        style={[styles.image, { opacity: isActiveTrack ? 1 : 0.6 }]}
        contentFit="cover"
        transition={1000}
      />
      <View style={styles.textContainer}>
        <Text
          style={[
            styles.title,
            { color: isActiveTrack ? colors.text : colors.primary },
          ]}
          numberOfLines={1}
        >
          {item.title}
        </Text>
        {item.artist && <Text style={styles.artist}>{item.artist}</Text>}
      </View>
      <MaterialCommunityIcons
        name="dots-horizontal"
        size={24}
        color={colors.icon}
        style={styles.icon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  textContainer: {
    flex: 1, // Take remaining space
    marginLeft: 10, // Add margin to separate the image and text
  },
  title: {
    ...defaultStyles.text,
    fontSize: fontSize.sm,
    fontFamily: "Montserrat-Medium",
    maxWidth: "90%",
  },
  artist: {
    ...defaultStyles.text,
    fontSize: 14,
    marginTop: 5,
    fontFamily: "Montserrat-Regular",
    color: colors.textMuted,
  },
  icon: {
    marginLeft: "auto", // Push the icon to the right
    marginRight: 10,
  },
});

export default TrackListItem;
