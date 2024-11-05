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

// Define the interface for props
interface CategoryProps {
  categoryList: string[];
  onSelect: (value: string) => void;
  customStyle: object;
}

const sleep = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export default function Category({
  categoryList,
  onSelect,
  customStyle,
}: CategoryProps) {
  const [inputValue, setInputValue] = useState(""); // Input of user
  const [filteredCategories, setFilteredCategories] = useState<string[]>([]); // filterd categories
  const [showDropdown, setShowDropdown] = useState(false); // options list
  const [isFocused, setIsFocused] = useState(false); // Track if TextInput is focused

  const filter = () => {
    //await sleep(500);
    if ((!inputValue || inputValue.trim() === "") && isFocused) {
      setFilteredCategories(categoryList);
      setShowDropdown(true);
    } else if (inputValue && isFocused) {
      let filtered = categoryList.filter((category) =>
        category.toLowerCase().includes(inputValue.toLowerCase())
      );
      if (filtered.length === 0) filtered = ["Other"];
      setFilteredCategories(filtered);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    filter();
  }, [inputValue, isFocused]);

  const toggleFocus = (focused: boolean) => {
    setIsFocused(focused);
    setShowDropdown(focused && (!!inputValue || inputValue.trim() === "")); // Show dropdown if focused
  };

  const handleChangeText = (text: string) => {
    setInputValue(text);
  };

  const handleSelect = (value: string) => {
    setInputValue(value);
    setIsFocused(false);
    setShowDropdown(false);
    onSelect(inputValue);
    Keyboard.dismiss(); // Dismiss the keyboard
  };

  const handleOutsidePress = () => {
    setIsFocused(false);
    setShowDropdown(false); // Close the dropdown
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <>
        <TextInput
          style={customStyle}
          placeholder="Type or select catogory..."
          value={inputValue}
          onChangeText={handleChangeText}
          onFocus={() => toggleFocus(true)} // ToggleFocus on
          onBlur={() => toggleFocus(false)} // ToggleFocus off
        />

        {showDropdown && (
          <View style={[styles.dropdown]}>
            <FlatList
              initialNumToRender={8}
              data={filteredCategories}
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
  dropdown: {
    //position: "relative",
    //top: 0, // Adjust based on your input's position
    //left: 20, // Aligns dropdown with the TextInput
    //right: 20,
    backgroundColor: "#cad7eb",
    borderRadius: 5,
    borderColor: "blue",
    borderWidth: 1,
    maxHeight: 150, // Limit height for the dropdown
    zIndex: 2, // Ensure the dropdown appears above other elements
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
});
