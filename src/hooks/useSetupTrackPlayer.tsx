import { useEffect, useRef } from "react";
import TrackPlayer, { RepeatMode } from "react-native-track-player";

const setupPlayer = async () => {
  await TrackPlayer.setupPlayer({ maxCacheSize: 1024 * 10 });

  await TrackPlayer.setVolume(0.5);

  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
};

const useSetupTrackPlayer = ({ onLoad }: { onLoad?: () => void }) => {
  const isInit = useRef(false);
  useEffect(() => {
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
