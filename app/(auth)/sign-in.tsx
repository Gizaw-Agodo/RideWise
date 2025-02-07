import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { icons, images } from "@/constants";
import InputField from "@/components/inputField";
import CustomButton from "@/components/customButton";
import { Link, useRouter } from "expo-router";
import OAuth from "@/components/oAuth";
import { useSignIn } from "@clerk/clerk-expo";

const SignIn = () => {
  const [form, setform] = useState({
    email: "",
    password: "",
  });

  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) return;
    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
        throw new Error("Error occured");
      }
    } catch (err: any) {
      Alert.alert("Error", err.errors[0]?.longMessage);
    }
  }, [isLoaded, form.email, form.password]);

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
