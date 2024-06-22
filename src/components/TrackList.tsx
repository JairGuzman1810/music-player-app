/* eslint-disable prettier/prettier */
// Import necessary components and libraries
import { FlatList, View } from "react-native";
import TrackListItem from "./TrackListItem";
import { utilsStyles } from "@/styles";
import { useMemo, useRef } from "react";
import NotFound from "./NotFound";
import { screenPadding } from "@/constants/theme";
import { trackTitleFilter } from "@/helpers/filter";
import TrackPlayer, { Track } from "react-native-track-player";
import { unknownTrackImageUri } from "@/constants/images";
import { useQueue } from "@/store/queue";
import { QueueControls } from "./QueueControls";

// This component creates a divider between items in the list
const ItemDivider = () => (
  <View
    style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }}
  />
);

// Define the type for the props of the TrackList component
type TrackListProps = {
  searchQuery?: string; // The search query to filter tracks
  tracks: Track[]; // The array of tracks to display
  id: string; // The id of the current queue
  hideQueueControls?: boolean;
};

// The main TrackList component
const TrackList = ({
  id,
  searchQuery,
  tracks,
  hideQueueControls = false,
}: TrackListProps) => {
  // A ref to keep track of the current position in the queue
  const queueOffset = useRef(0);

  // Access the queue state from a custom hook
  const { activeQueueId, setActiveQueueId } = useQueue();

  // Filter tracks based on the search query

  const filteredTracks = useMemo(() => {
    if (!searchQuery) {
      return tracks;
    }
    return tracks.filter(trackTitleFilter(searchQuery));
  }, [searchQuery, tracks]);

  // Function to reset TrackPlayer and add tracks in the specified order
  const resetAndAddTracks = async (
    selectedTrack: Track,
    afterTracks: Track[],
    beforeTracks: Track[]
  ) => {
    await TrackPlayer.reset();
    await TrackPlayer.add(selectedTrack);
    await TrackPlayer.add(afterTracks);
    await TrackPlayer.add(beforeTracks);
  };

  // Function to handle track selection
  const handleTrackSelected = async (selectedTrack: Track) => {
    const trackIndex = tracks.findIndex(
      (track) => track.url === selectedTrack.url
    );

    if (trackIndex === -1) {
      return; // If the track is not found, do nothing
    }

    const isChangingQueue = id !== activeQueueId;
    const repeatMode = await TrackPlayer.getRepeatMode();

    if (isChangingQueue || repeatMode === 0) {
      // Queue is changing or repeat mode is off
      if (repeatMode !== 0) {
        const beforeTracks = tracks.slice(0, trackIndex);
        const afterTracks = tracks.slice(trackIndex + 1);
        await resetAndAddTracks(selectedTrack, afterTracks, beforeTracks);
      } else {
        await TrackPlayer.reset();
        await TrackPlayer.add(selectedTrack);
      }
    } else {
      // Queue is not changing and repeat mode is on
      const nextTrackIndex =
        trackIndex - queueOffset.current < 0
          ? tracks.length + trackIndex - queueOffset.current
          : trackIndex - queueOffset.current;

      if (nextTrackIndex === trackIndex) {
        await TrackPlayer.skip(nextTrackIndex);
      } else {
        const beforeTracks = tracks.slice(0, trackIndex);
        const afterTracks = tracks.slice(trackIndex + 1);
        await resetAndAddTracks(selectedTrack, afterTracks, beforeTracks);
      }
    }

    await TrackPlayer.play();
    queueOffset.current = trackIndex;
    setActiveQueueId(id);
  };

  return (
    <FlatList
      data={filteredTracks} // The data to display in the list
      ListHeaderComponent={
        !hideQueueControls ? (
          <QueueControls tracks={tracks} style={{ paddingBottom: 20 }} />
        ) : undefined
      }
      ListFooterComponent={filteredTracks.length > 0 ? <ItemDivider /> : null} // Footer component if there are tracks
      ListEmptyComponent={
        <NotFound title="No Songs Found" image={unknownTrackImageUri} />
      } // Component to display if no tracks are found
      ItemSeparatorComponent={ItemDivider} // Separator component between items
      contentContainerStyle={{
        gap: 5,
        paddingBottom: 128,
        paddingHorizontal: screenPadding.horizontal,
      }} // Styling for the content container
      renderItem={({ item }) => (
        <TrackListItem item={item} onTrackSelected={handleTrackSelected} />
      )} // Render each track item
    />
  );
};

export default TrackList;
