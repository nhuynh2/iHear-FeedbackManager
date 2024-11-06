// CustomButton.js
import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

// Parameters to pass from parent component
interface ItemProps {
  title: string;
  boxStyle?: object;
  textStyle?: object;
  onPress: () => void;
  disabled?: boolean;
}

export default function CustomButton({
  title,
  onPress,
  boxStyle,
  textStyle,
  disabled,
}: ItemProps) {
  return (
    <TouchableOpacity
      style={[styles.box, boxStyle]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: {
    paddingVertical: 15,
    backgroundColor: "#4c669f", // Default button color
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 4 }, // Shadow offset
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 4, // Shadow blur radius
    elevation: 5, // Android shadow
  },
  text: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
});
