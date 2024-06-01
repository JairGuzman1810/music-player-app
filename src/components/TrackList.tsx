import { FlatList, View } from "react-native";

import library from "@/assets/data/library.json";
import TrackListItem from "./TrackListItem";
import { utilsStyles } from "@/styles";
import { useMemo } from "react";
import { TrackItem } from "@/types/types";
import NotFound from "./NotFound";
import { screenPadding } from "@/constants/theme";

const ItemDivider = () => (
  <View
    style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }}
  />
);

type TrackListProps = {
  searchQuery: string;
};

const TrackList = ({ searchQuery }: TrackListProps) => {
  const filteredLibrary = useMemo(() => {
    return library.filter((track: TrackItem) =>
      // eslint-disable-next-line prettier/prettier
      track.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return filteredLibrary.length ? (
    <FlatList
      data={filteredLibrary}
      ListFooterComponent={ItemDivider}
      ItemSeparatorComponent={ItemDivider}
      contentContainerStyle={{
        gap: 5,
        paddingBottom: 128,
        paddingHorizontal: screenPadding.horizontal,
      }}
      renderItem={({ item }) => <TrackListItem item={item} />}
    />
  ) : (
    <NotFound title="No Songs Found" />
  );
};

export default TrackList;
