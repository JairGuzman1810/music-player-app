import { colors } from "@/constants/theme";
import { defaultStyles } from "@/styles";
import { Image } from "expo-image";
import { View, Text, StyleSheet } from "react-native";

type NotFoundProps = {
  title: string;
  image: string;
};

const NotFound = ({ title, image }: NotFoundProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <Image source={{ uri: image }} style={styles.image} contentFit="cover" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    ...defaultStyles.text,
    fontSize: 20,
    color: colors.textMuted,
    textAlign: "center",
    marginTop: 40,
    fontFamily: "Montserrat-Regular",
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginTop: 40,
    opacity: 0.3,
  },
});

export default NotFound;
