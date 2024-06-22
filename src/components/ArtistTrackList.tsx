import React, { useMemo } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Artist } from "@/helpers/types";
import TrackList from "./TrackList";
import { generateTrackSongListId } from "@/helpers/miscellaneous";
import { defaultStyles } from "@/styles";
import { fontSize } from "@/constants/theme";
import { Image } from "expo-image";
import { unknownArtistImageUri } from "@/constants/images";
import { QueueControls } from "./QueueControls";
import { trackTitleFilter } from "@/helpers/filter";

type ArtistTrackListProps = {
  searchQueryTrack: string;
  artist: Artist;
};

const ArtistTrackList = ({
  artist,
  searchQueryTrack,
}: ArtistTrackListProps) => {
  const filteredTracks = useMemo(() => {
    return artist.tracks.filter(trackTitleFilter(searchQueryTrack));
  }, [artist.tracks, searchQueryTrack]);

  return (
    <View style={defaultStyles.container}>
      <View style={styles.artistHeaderContainer}>
        <View style={styles.artworkImageContainer}>
          <Image
            source={{ uri: unknownArtistImageUri }}
            style={styles.artistImage}
            contentFit="cover"
          />
        </View>
        <Text style={styles.artistNameText}>{artist.name}</Text>

        {filteredTracks.length > 0 && (
          <QueueControls
            tracks={filteredTracks}
            style={{ marginHorizontal: 24 }}
          />
        )}
      </View>
      <TrackList
        id={generateTrackSongListId(artist.name, searchQueryTrack)}
        tracks={filteredTracks}
        hideQueueControls={true}
      />
    </View>
  );
};

export default ArtistTrackList;

const styles = StyleSheet.create({
  artistHeaderContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  artworkImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 200,
    width: 200, // Adjust width as needed to create a square container
    borderRadius: 100, // Use half of the width for perfect circle on borderRadius
    overflow: "hidden", // Ensure the image clips to the circular border
  },
  artistImage: {
    width: "100%",
    height: "100%",
  },
  artistNameText: {
    ...defaultStyles.text,
    marginTop: 22,
    marginBottom: 15,
    textAlign: "center",
    fontSize: fontSize.lg,
    fontFamily: "Montserrat-Medium",
  },
});
