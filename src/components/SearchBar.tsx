// /components/CustomSearchBar.tsx

import { useState } from "react";
import { StyleSheet } from "react-native";
import { colors } from "@/constants/theme";
import { SearchBar } from "@rneui/themed";

type CustomSearchBarProps = {
  placeholder: string;
  onChangeSearch: (query: string) => void;
};

const CustomSearchBar = ({
  onChangeSearch,
  placeholder,
}: CustomSearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    onChangeSearch(query);
  };
  return (
    <SearchBar
      placeholder={placeholder}
      onChangeText={handleSearchChange}
      value={searchQuery}
      selectionColor={colors.primary}
      containerStyle={styles.searchContainer}
      inputContainerStyle={styles.searchInputContainer}
      inputStyle={styles.searchInput}
    />
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: colors.background,
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
    marginHorizontal: 10,
  },
  searchInputContainer: {
    backgroundColor: "#1c1a1e",
    borderRadius: 10,
    height: 40,
  },
  searchInput: {
    fontSize: 16,
    fontFamily: "Montserrat-Regular",
    color: colors.text,
  },
});

export default CustomSearchBar;
