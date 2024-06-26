import { useEffect, useRef } from "react";
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  RatingType,
  RepeatMode,
} from "react-native-track-player";

export const setupPlayer = async () => {
  const isInitialized = await TrackPlayer.isServiceRunning();
  if (isInitialized) {
    console.log("Player already initialized");
    return;
  }

  await TrackPlayer.setupPlayer({ maxCacheSize: 1024 * 10 });

  await TrackPlayer.updateOptions({
    android: {
      // This is the default behavior
      appKilledPlaybackBehavior:
        AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
    },
    ratingType: RatingType.Heart,
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.Stop,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.SeekTo,
    ],
  });
  await TrackPlayer.setVolume(0.5);
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
};

const useSetupTrackPlayer = ({ onLoad }: { onLoad?: () => void }) => {
  const isInit = useRef(false);

  useEffect(() => {
    if (isInit.current) {
      return;
    }
    setupPlayer()
      .then(() => {
        isInit.current = true;
        onLoad?.();
      })
      .catch((error) => {
        isInit.current = false;
        console.log(error);
      });
  }, [onLoad]);
};

export default useSetupTrackPlayer;
