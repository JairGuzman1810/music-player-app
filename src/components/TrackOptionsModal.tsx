/* eslint-disable prettier/prettier */
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { defaultStyles, utilsStyles } from "@/styles";
import TrackPlayer, { Track } from "react-native-track-player";
import { useRouter } from "expo-router";
import { useFavorites } from "@/store/library";
import { useQueue } from "@/store/queue";
import { colors } from "@/constants/theme";

const ItemDivider = () => <View style={styles.itemDivider} />;

type TrackOptionsModalProps = {
  visible: boolean;
  position: { top: number; left: number };
  onClose: () => void;
  track: Track;
};

const TrackOptionsModal = ({
  visible,
  position,
  onClose,
  track,
}: TrackOptionsModalProps) => {
  const router = useRouter();
  const isFavorite = track.rating === 1;

  const { toggleTrackFavorite } = useFavorites();
  const { activeQueueId } = useQueue();

  const handleFavoriteToggle = async () => {
    onClose();
    toggleTrackFavorite(track);
    const queue = await TrackPlayer.getQueue();

    if (isFavorite) {
      const trackToRemoveIndex = queue.findIndex(
        (queueTrack) => queueTrack.url === track.url
      );

      if (trackToRemoveIndex !== -1) {
        await TrackPlayer.remove(trackToRemoveIndex);
      }
    } else {
      if (activeQueueId?.startsWith("favorites")) {
        await TrackPlayer.add(track);
      }
    }
  };

  const handleAddToPlaylist = () => {
    router.push({
      pathname: "(modals)/addToPlaylist",
      params: { trackUrl: track.url },
    });
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.modalOverlay} onPress={onClose}>
        <View
          style={[
            styles.modalContent,
            { top: position.top, left: position.left },
          ]}
        >
          <TouchableOpacity
            style={styles.optionRow}
            onPress={handleFavoriteToggle}
          >
            <Text style={styles.modalOption}>
              {isFavorite ? "Remove from favorites" : "Add to favorites"}
            </Text>
            <Ionicons
              name={isFavorite ? "star" : "star-outline"}
              size={20}
              color={colors.icon}
              style={styles.optionIcon}
            />
          </TouchableOpacity>
          <ItemDivider />
          <TouchableOpacity
            style={styles.optionRow}
            onPress={handleAddToPlaylist}
          >
            <Text style={styles.modalOption}>Add to playlist</Text>
            <Ionicons
              name="add"
              size={20}
              color={colors.icon}
              style={styles.optionIcon}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
  },
  modalContent: {
    position: "absolute",
    backgroundColor: "#252525",
    paddingHorizontal: 15,
    borderRadius: 5,
    elevation: 5,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    justifyContent: "space-between",
  },
  optionIcon: {
    marginLeft: 10,
  },
  modalOption: {
    ...defaultStyles.text,
    fontSize: 16,
    fontFamily: "Montserrat-Medium",
  },
  itemDivider: {
    ...utilsStyles.itemSeparator,
    marginHorizontal: -15, // Negative margin to counteract the padding of modalContent
  },
});

export default TrackOptionsModal;
