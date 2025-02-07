import { Image, Text, View } from "react-native";
import React from "react";
import { ImageSourcePropType } from "react-native";

interface TabIconProps {
  icon: ImageSourcePropType;
  focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ icon, focused }) => {
  return (
    <View
      className={`rounded-full w-12 h-12 items-center justify-center ${focused ? "bg-general-400" : ""}`}
    >
      <Image
        source={icon}
        tintColor="white"
        resizeMode="contain"
        className="w-9 h-9"
      />
    </View>
  );
};

export default TabIcon;
