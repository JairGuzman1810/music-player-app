import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableHighlightProps,
  View,
} from "react-native";
import React from "react";
import { PlayList } from "@/helpers/types";
import { defaultStyles } from "@/styles";
import { Image } from "expo-image";
import { unknownTrackImageUri } from "@/constants/images";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "@/constants/theme";

type PlaylistListItemProps = {
  playlist: PlayList;
} & TouchableHighlightProps;

const PlaylistListItem = ({ playlist, ...props }: PlaylistListItemProps) => {
  return (
    <TouchableHighlight activeOpacity={0.8} {...props}>
      <View style={styles.container}>
        <View>
          <Image
            source={{ uri: playlist.artworkPreview }}
            placeholder={{ uri: unknownTrackImageUri }}
            style={styles.playlistArtworkImage}
            contentFit="cover"
            transition={1000}
            priority={"normal"}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Text numberOfLines={1} style={styles.playlistNameText}>
            {playlist.name}
          </Text>
          <AntDesign
            style={{ opacity: 0.5 }}
            name="right"
            size={16}
            color={colors.icon}
          />
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default PlaylistListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    columnGap: 14,
    alignItems: "center",
    paddingRight: 90,
  },
  playlistArtworkImage: {
    borderRadius: 8,
    width: 70,
    height: 70,
  },
  playlistNameText: {
    ...defaultStyles.text,
    fontSize: 17,
    fontFamily: "Montserrat-Medium",
    maxWidth: "80%",
  },
});
