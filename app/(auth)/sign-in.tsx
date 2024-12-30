import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { icons, images } from "@/constants";
import InputField from "@/components/inputField";
import CustomButton from "@/components/customButton";
import { Link } from "expo-router";
import OAuth from "@/components/oAuth";

const SignIn = () => {
  const [form, setform] = useState({
    email: "",
    password: "",
  });

  const onSignInPress = () => {};

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white w-full h-[250px] relative">
        <Image source={images.signUpCar} className="w-full h-[250px] z-0" />
        <Text className="absolute text-black text-2xl font-JakartaSemiBold bottom-5 left-5">
          Welcome 👋
        </Text>
      </View>

      <View className="p-5">
        <InputField
          label="Email"
          placeholder="Enter your email"
          icon={icons.email}
          value={form.email}
          onChangeText={(value) => setform({ ...form, email: value })}
        />

        <InputField
          label="Password"
          placeholder="Enter your password"
          icon={icons.lock}
          value={form.password}
          secureTextEntry={true}
          onChangeText={(value) => setform({ ...form, password: value })}
        />

        <CustomButton
          title="Sign In"
          onPress={onSignInPress}
          className="mt-6"
        />

        <OAuth />

        {/* oauth */}
        <Link href={"/(auth)/sign-up"} className="text-lg mt-5 text-center ">
          <Text>Do'nt have an account ? </Text>
          <Text className="text-primary-500 ml-3">Sign Up</Text>
        </Link>
      </View>

      {/* verification modal  */}
    </ScrollView>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
