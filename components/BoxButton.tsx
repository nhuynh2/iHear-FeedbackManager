interface BoxButton {
  text: string;
  textColor?: string;
  textSize?: number;
  boxColor?: string;
  width?: number | string;
  height?: number | string;
  style: StyleSheet;
  onPress?: () => {};
}

import React from "react";
import { TouchableOpacity, Text } from "react-native";

const BoxButton: React.FC<BoxButton> = ({
  text,
  textColor,
  textSize,
  boxColor,
  width,
  height,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: `${boxColor}`,
        width: width,
        height: height,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        borderRadius: 8,
        margin: "1%",
      }}
      onPress={onPress}
    >
      <Text
        style={{
          fontSize: textSize,
          color: `${textColor}`,
          textAlign: "center",
          textAlignVertical: "center",
          padding: 8,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default BoxButton;
