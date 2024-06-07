import { useCallback, useEffect, useState } from "react";
import TrackPlayer from "react-native-track-player";

const useTrackPlayerVolumen = () => {
  const [volume, setVolumen] = useState<number | undefined>(undefined);

  const getVolume = useCallback(async () => {
    const currentVolume = await TrackPlayer.getVolume();
    setVolumen(currentVolume);
  }, []);

  const updateVolume = useCallback(async (newVolume: number) => {
    if (newVolume < 0 || newVolume > 1) return;

    setVolumen(newVolume);

    await TrackPlayer.setVolume(newVolume);
  }, []);

  useEffect(() => {
    getVolume();
  }, [getVolume]);

  return { volume, updateVolume };
};

export default useTrackPlayerVolumen;
