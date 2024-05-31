import { colors } from "@/constants/theme";
import React from "react";
import { Text, StyleSheet } from "react-native";

type HeaderProps = {
  text: string;
};
// Custom IOSStyledText component
const Header = ({ text }: HeaderProps) => {
  return <Text style={styles.iosText}>{text}</Text>;
};

// Styles
const styles = StyleSheet.create({
  iosText: {
    fontSize: 28,
    color: colors.text, // Default text color, can be customized or use colors from your theme
    fontWeight: "600", // iOS typically uses a semi-bold font weight
    padding: 10,
    paddingTop: 40,
  },
});

export default Header;
