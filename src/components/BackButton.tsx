import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons"; // Ensure you have this installed
import { useNavigation } from "@react-navigation/native";
import { colors } from "@/constants/theme";
import { defaultStyles } from "@/styles";

const BackButton = ({ text }: { text: string }) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGoBack} style={styles.backIcon}>
        <AntDesign name="arrowleft" size={24} color={colors.primary} />
        <Text style={styles.back}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  backIcon: {
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  back: {
    ...defaultStyles.text,
    color: colors.primary,
    fontFamily: "Montserrat-Medium",
  },
});

export default BackButton;
