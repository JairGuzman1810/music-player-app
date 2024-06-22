import { StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import { PlayList } from "@/helpers/types";
import { trackTitleFilter } from "@/helpers/filter";
import { defaultStyles } from "@/styles";
import { fontSize } from "@/constants/theme";
import { unknownTrackImageUri } from "@/constants/images";
import { Image } from "expo-image";
import { QueueControls } from "./QueueControls";
import TrackList from "./TrackList";
import { generateTrackSongListId } from "@/helpers/miscellaneous";

type PlaylistTrackListProps = {
  searchQueryTrack: string;
  playlist: PlayList;
};

const PlaylistTrackList = ({
  playlist,
  searchQueryTrack,
}: PlaylistTrackListProps) => {
  const filteredTracks = useMemo(() => {
    return playlist.tracks.filter(trackTitleFilter(searchQueryTrack));
  }, [playlist.tracks, searchQueryTrack]);

  return (
    <View style={defaultStyles.container}>
      <View style={styles.playlistHeaderContainer}>
        <View style={styles.artworkImageContainer}>
          <Image
            source={{ uri: playlist.artworkPreview }}
            placeholder={{ uri: unknownTrackImageUri }}
            style={styles.playlistImage}
            contentFit="cover"
            priority={"high"}
          />
        </View>
        <Text style={styles.playlistNameText}>{playlist.name}</Text>

        {filteredTracks.length > 0 && (
          <QueueControls
            tracks={filteredTracks}
            style={{ marginHorizontal: 24 }}
          />
        )}
      </View>
      <TrackList
        id={generateTrackSongListId(playlist.name, searchQueryTrack)}
        tracks={filteredTracks}
        hideQueueControls={true}
      />
    </View>
  );
};

export default PlaylistTrackList;

const styles = StyleSheet.create({
  playlistHeaderContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  artworkImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 300,
    width: 300, // Adjust width as needed to create a square container
    borderRadius: 20, // Use half of the width for perfect circle on borderRadius
    overflow: "hidden", // Ensure the image clips to the circular border
  },
  playlistImage: {
    width: "100%",
    height: "100%",
  },
  playlistNameText: {
    ...defaultStyles.text,
    marginTop: 22,
    marginBottom: 15,
    textAlign: "center",
    fontSize: fontSize.lg,
    fontFamily: "Montserrat-Medium",
  },
});
