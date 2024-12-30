import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomButton from "./customButton";
import { icons } from "@/constants";

const OAuth = () => {
  const handleGoogleSignIn = () => {};
  return (
    <View>
      <View
        className={`flex flex-row justify-center items-center mt-4 gap-x-3`}
      >
        <View className="flex-1 h-[1px] bg-general-100"></View>
        <Text>Or</Text>
        <View className="flex-1 h-[1px] bg-general-100"></View>
      </View>
      <CustomButton
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode="contain"
            className="w-5 h-5 mx-4"
          />
        )}
        title="Log In With Google"
        className="mt-4 w-full shadow-none"
        bgVariant="outline"
        textVariant="primary"
        onPress={handleGoogleSignIn}
      />
    </View>
  );
};

export default OAuth;

const styles = StyleSheet.create({});
