import { FlatList, View } from "react-native";

import library from "@/assets/data/library.json";
import TrackListItem from "./TrackListItem";
import { utilsStyles } from "@/styles";
import { useMemo } from "react";
import NotFound from "./NotFound";
import { screenPadding } from "@/constants/theme";
import { trackTitleFilter } from "@/helpers/filter";
import { Track } from "react-native-track-player";

const ItemDivider = () => (
  <View
    style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }}
  />
);

type TrackListProps = {
  searchQuery: string;
};

const TrackList = ({ searchQuery }: TrackListProps) => {
  const filteredTracks = useMemo(() => {
    return library.filter(trackTitleFilter(searchQuery));
  }, [searchQuery]);

  const handleTrackSelected = (track: Track) => {
    console.log(track);
  };

  return filteredTracks.length ? (
    <FlatList
      data={filteredTracks}
      ListFooterComponent={ItemDivider}
      ItemSeparatorComponent={ItemDivider}
      contentContainerStyle={{
        gap: 5,
        paddingBottom: 128,
        paddingHorizontal: screenPadding.horizontal,
      }}
      renderItem={({ item }) => (
        <TrackListItem item={item} onTrackSelected={handleTrackSelected} />
      )}
    />
  ) : (
    <NotFound title="No Songs Found" />
  );
};

export default TrackList;
