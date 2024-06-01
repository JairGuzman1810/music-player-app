import { colors } from "@/constants/theme";
import { View, Text, StyleSheet } from "react-native";

type NotFoundProps = {
  title: string;
};

const NotFound = ({ title }: NotFoundProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
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
    fontSize: 20,
    color: colors.text,
    fontFamily: "Montserrat-Regular",
  },
});

export default NotFound;
