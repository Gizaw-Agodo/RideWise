import { Text, View } from "react-native";
import React, { FC } from "react";
import { GoogleInputProps } from "@/types/type";

const GoogleTextInput: React.FC<GoogleInputProps> = ({
  icon,
  containerStyle,
  handlePress,
}) => {
  return (
    <View
      className={`flex flex-row items-center justify-center relative z-50 rounded-xl mb-5 ${containerStyle}`}
    >
      <Text>GoogleTextInput</Text>
    </View>
  );
};

export default GoogleTextInput;
