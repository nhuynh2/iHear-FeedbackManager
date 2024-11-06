import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Parameters to pass from parent component
interface ItemProps {
  placeholder: string;
  allowDefault: boolean;
  itemList: string[];
  onSelect: (value: string) => void;
  customStyle: object;
}

export default function SearchSelect({
  placeholder,
  allowDefault,
  itemList,
  onSelect,
  customStyle,
}: ItemProps) {
  const [inputValue, setInputValue] = useState(""); // Input of user
  const [filteredItems, setFilteredItems] = useState<typeof itemList>([]); // filterd items
  const [showDropdown, setShowDropdown] = useState(false); // options list
  const [isFocused, setIsFocused] = useState(false); // Track if TextInput is focused

  const filter = () => {
    if (!isFocused) return;
    if (!inputValue || inputValue.trim() === "" || !allowDefault) {
      setFilteredItems(itemList);
    } else {
      const filtered = itemList.filter((item) =>
        item.toLowerCase().includes(inputValue.toLowerCase())
      );
      if (filtered.length === 0) {
        setFilteredItems([itemList[itemList.length - 1]]);
      } else {
        setFilteredItems(filtered);
      }
    }
    setShowDropdown(true);
  };

  useEffect(() => {
    filter();
  }, [inputValue, isFocused]);

  const clearText = () => {
    setShowDropdown(false);
    setInputValue("");
    onSelect("");
  };

  const closeMenu = () => {
    setShowDropdown(false);
    setIsFocused(false);
    setInputValue(inputValue);
    onSelect(inputValue);
    if (Keyboard.isVisible()) Keyboard.dismiss();
  };

  const handleFocus = () => {
    setIsFocused(true);
    setShowDropdown(isFocused && (!!inputValue || inputValue.trim() === "")); // Show dropdown if focused
  };

  const handleBlur = () => {
    setIsFocused(false);
    setShowDropdown(false); // Show dropdown if focused
    setInputValue(inputValue);
    onSelect(inputValue);
    if (Keyboard.isVisible()) Keyboard.dismiss();
  };

  const handleChangeText = (value: string) => {
    setInputValue(value);
    onSelect(value);
  };

  const handleSelect = (value: string) => {
    setIsFocused(false);
    setShowDropdown(false);
    setInputValue(value);
    onSelect(value);
    if (Keyboard.isVisible()) Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handleBlur}>
      <>
        <View style={styles.container}>
          {/* Text Input */}
          <TextInput
            style={[
              customStyle,
              {
                flex: 1,
              },
            ]}
            placeholder={placeholder}
            value={inputValue}
            onChangeText={handleChangeText}
            onFocus={() => handleFocus()} // ToggleFocus on
            onBlur={() => handleBlur()} // ToggleFocus off
          />
          {/* Show Clear button when there is input */}
          {isFocused && (
            <>
              {!!inputValue && (
                <TouchableOpacity
                  onPress={clearText}
                  style={styles.clearButton}
                >
                  <Ionicons name="close-circle" size={30} color="grey" />
                </TouchableOpacity>
              )}
              {/* Show Colapse button when onFocus */}
              <TouchableOpacity onPress={closeMenu} style={styles.clearButton}>
                <Ionicons name="chevron-up-sharp" size={30} color="grey" />
              </TouchableOpacity>
            </>
          )}
        </View>

        {showDropdown && (
          <View style={[styles.dropdown]}>
            <FlatList
              initialNumToRender={8}
              data={filteredItems}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleSelect(item)}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  dropdown: {
    opacity: 0.75,
    backgroundColor: "#8cb6ed",
    borderRadius: 5,
    borderColor: "blue",
    borderWidth: 1,
    marginBottom: 15,
    maxHeight: 200, // Limit height for the dropdown
    zIndex: 2, // Ensure the dropdown appears above other elements
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  clearButton: {
    marginLeft: 6,
    marginBottom: 12,
  },
});
