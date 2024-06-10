import { colors } from "@/constants/theme";
import { useEffect, useState } from "react";
import { getColors, ImageColorsResult } from "react-native-image-colors";

const usePlayerBackground = (imageUrl: string) => {
  const [imageColors, setImageColors] = useState<ImageColorsResult | null>(
    // eslint-disable-next-line prettier/prettier
    null
  );

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const result = await getColors(imageUrl, {
          fallback: colors.background,
          cache: true,
          key: imageUrl,
        });
        setImageColors(result);
      } catch (error) {
        console.error("Error fetching image colors:", error);
      }
    };

    fetchColors();
  }, [imageUrl]);

  return { imageColors };
};

export default usePlayerBackground;
