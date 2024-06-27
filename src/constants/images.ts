import unknownTrackImage from "@/assets/unknown_track.png";
import unknownArtistImage from "@/assets/unknown_artist.jpeg";

import { Image } from "react-native";

export const unknownArtistImageUri =
  Image.resolveAssetSource(unknownArtistImage).uri;

export const unknownTrackImageUri =
  Image.resolveAssetSource(unknownTrackImage).uri;
