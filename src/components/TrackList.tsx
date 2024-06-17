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

// This component creates a divider between items in the list
const ItemDivider = () => (
  <View
    style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }}
  />
);

// Define the type for the props of the TrackList component
type TrackListProps = {
  searchQuery: string; // The search query to filter tracks
  tracks: Track[]; // The array of tracks to display
  id: string; // The id of the current queue
};

// The main TrackList component
const TrackList = ({ id, searchQuery, tracks }: TrackListProps) => {
  // A ref to keep track of the current position in the queue
  const queueOffset = useRef(0);

  // Access the queue state from a custom hook
  const { activeQueueId, setActiveQueueId } = useQueue();

  // Filter tracks based on the search query
  const filteredTracks = useMemo(() => {
    return tracks.filter(trackTitleFilter(searchQuery));
  }, [searchQuery, tracks]);

  // Function to handle track selection
  const handleTrackSelected = async (selectedTrack: Track) => {
    // Find the index of the selected track in the tracks array
    const trackIndex = tracks.findIndex(
      (track) => track.url === selectedTrack.url
    );

    if (trackIndex === -1) return; // If the track is not found, do nothing

    // Check if the queue is changing
    const isChangingQueue = id !== activeQueueId;

    if (isChangingQueue) {
      // If the queue is changing, slice the tracks into before and after the selected track
      const beforeTracks = tracks.slice(0, trackIndex);
      const afterTracks = tracks.slice(trackIndex + 1);

      await TrackPlayer.reset(); // Reset the track player

      // Add tracks to the player in the new order: selected track, after tracks, before tracks
      await TrackPlayer.add(selectedTrack);
      await TrackPlayer.add(afterTracks);
      await TrackPlayer.add(beforeTracks);

      await TrackPlayer.play(); // Start playing the selected track

      // Update the queue offset and active queue ID
      queueOffset.current = trackIndex;
      setActiveQueueId(id);
    } else {
      // If the queue is not changing, calculate the next track index
      const nextTrackIndex =
        trackIndex - queueOffset.current < 0
          ? tracks.length + trackIndex - queueOffset.current
          : trackIndex - queueOffset.current;

      await TrackPlayer.skip(nextTrackIndex); // Skip to the next track
      await TrackPlayer.play(); // Start playing the track
    }
  };

  return (
    <FlatList
      data={filteredTracks} // The data to display in the list
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
