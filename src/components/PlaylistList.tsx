import { PlayList } from "@/helpers/types";
import { utilsStyles } from "@/styles";
import { FlatList, View } from "react-native";

import { screenPadding } from "@/constants/theme";
import NotFound from "./NotFound";
import { unknownTrackImageUri } from "@/constants/images";
import PlaylistListItem from "./PlaylistListItem";

const ItemDivider = () => (
  <View
    style={{
      ...utilsStyles.itemSeparator,
      marginVertical: 12,
      marginLeft: 50,
    }}
  />
);

type PlaylistListProps = {
  playlist: PlayList[];
  onPlaylistPress: (playlist: PlayList) => void;
};

const PlaylistList = ({
  playlist,
  onPlaylistPress: handlePlaylistPress,
}: PlaylistListProps) => {
  return (
    <FlatList
      data={playlist} // The data to display in the list
      ListFooterComponent={playlist.length > 0 ? ItemDivider : null} // Footer component if there are tracks
      ListEmptyComponent={
        <NotFound title="No Playlist Found" image={unknownTrackImageUri} />
      } // Component to display if no tracks are found
      ItemSeparatorComponent={ItemDivider} // Separator component between items
      contentContainerStyle={{
        paddingTop: 10,
        gap: 5,
        paddingBottom: 128,
        paddingHorizontal: screenPadding.horizontal,
      }} // Styling for the content container
      renderItem={({ item: playlist }) => {
        return (
          <PlaylistListItem
            playlist={playlist}
            onPress={() => handlePlaylistPress(playlist)}
          />
        );
      }} // Render each track item
    />
  );
};

export default PlaylistList;
