// TrackListItem.tsx

import { colors, fontSize } from "@/constants/theme";
import React from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { unknownTrackImageUri } from "@/constants/images";
import { defaultStyles } from "@/styles";
import { Track, useActiveTrack, useIsPlaying } from "react-native-track-player";
import LoaderKit from "react-native-loader-kit";

// Define the type for the item prop

// Define the props type for the TrackListItem component
type TrackListItemProps = {
  item: Track;
  onTrackSelected: (track: Track) => void;
};

const TrackListItem = ({
  item: track,
  onTrackSelected: handleTrackSelected,
}: TrackListItemProps) => {
  const { playing } = useIsPlaying();
  const isActiveTrack = useActiveTrack()?.url === track.url;
  return (
    <TouchableHighlight onPress={() => handleTrackSelected(track)}>
      <View style={styles.container}>
        <Image
          source={{ uri: track.artwork }}
          placeholder={{ uri: unknownTrackImageUri }}
          style={[styles.image, { opacity: isActiveTrack ? 0.6 : 1 }]}
          contentFit="cover"
          transition={1000}
        />
        {isActiveTrack &&
          (playing ? (
            <LoaderKit
              style={styles.trackPlayerIconIndicator}
              name={"LineScaleParty"}
              color={colors.icon}
            />
          ) : (
            <MaterialCommunityIcons
              style={styles.trackPausedIndicator}
              name="play"
              size={28}
              color={colors.icon}
            />
          ))}
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.title,
              { color: isActiveTrack ? colors.primary : colors.text },
            ]}
            numberOfLines={1}
          >
            {track.title}
          </Text>
          {track.artist && <Text style={styles.artist}>{track.artist}</Text>}
        </View>
        <MaterialCommunityIcons
          name="dots-horizontal"
          size={24}
          color={colors.icon}
          style={styles.icon}
        />
      </View>
    </TouchableHighlight>
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
  trackPlayerIconIndicator: {
    position: "absolute",
    top: 16,
    left: 16,
    width: 20,
    height: 20,
  },
  trackPausedIndicator: {
    position: "absolute",
    top: 10,
    left: 12,
  },
});

export default TrackListItem;
