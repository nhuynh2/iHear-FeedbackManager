import React, { useState, useEffect, useRef } from "react";
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
  hasOtherVal: boolean;
  clear: boolean;
  itemList: string[];
  onSelect: (value: string) => void;
  boxStyle?: object;
  textStyle?: object;
}

export default function SearchSelect({
  placeholder,
  hasOtherVal,
  clear,
  itemList,
  onSelect,
  boxStyle,
  textStyle,
}: ItemProps) {
  const [inputValue, setInputValue] = useState(""); // Input of user
  const [filteredItems, setFilteredItems] = useState<typeof itemList>([]); // filterd items
  const [showDropdown, setShowDropdown] = useState(false); // options list
  const [isFocused, setIsFocused] = useState(false); // Track if TextInput is focused

  const inputRef = useRef<TextInput>(null);

  const filter = () => {
    if (!isFocused) return;
    if (!inputValue || inputValue.trim() === "" || !hasOtherVal) {
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

  useEffect(() => {
    setShowDropdown(false);
    setIsFocused(false);
    setInputValue("");
    onSelect("");
    inputRef.current?.blur();
    if (Keyboard.isVisible()) Keyboard.dismiss();
  }, [clear]);

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
    inputRef.current?.blur();
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
    inputRef.current?.blur();
    if (Keyboard.isVisible()) Keyboard.dismiss();
  };

  return (
    <View>
      <View style={[styles.inputContainer, boxStyle]}>
        {/* Text Input */}
        <TextInput
          ref={inputRef}
          style={[styles.input, textStyle]}
          placeholder={placeholder}
          value={inputValue}
          onChangeText={handleChangeText}
          onFocus={() => handleFocus()} // ToggleFocus on
          onBlur={() => handleBlur()} // ToggleFocus off
        />
        {/* Show Clear button when there is input */}
        {isFocused && (
          <View style={styles.buttonContainer}>
            {!!inputValue && (
              <TouchableOpacity onPress={clearText}>
                <Ionicons name="close-circle" size={30} color="grey" />
              </TouchableOpacity>
            )}
            {/* Show Colapse button when onFocus */}
            <TouchableOpacity onPress={closeMenu}>
              <Ionicons name="chevron-up-sharp" size={30} color="grey" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {showDropdown && (
        <View style={[styles.dropdown]}>
          <FlatList
            initialNumToRender={5}
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
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  dropdown: {
    opacity: 0.75,
    backgroundColor: "#8cb6ed",
    borderRadius: 5,
    borderColor: "blue",
    borderWidth: 1,
    marginBottom: 15,
    maxHeight: 200, // Limit height for the dropdown
    //zIndex: 2, // Ensure the dropdown appears above other elements
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
});
