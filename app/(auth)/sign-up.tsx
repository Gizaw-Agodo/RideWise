import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { icons, images } from "@/constants";
import InputField from "@/components/inputField";
import CustomButton from "@/components/customButton";
import { Link, useRouter } from "expo-router";
import OAuth from "@/components/oAuth";
import { useSignUp } from "@clerk/clerk-expo";
import { ReactNativeModal } from "react-native-modal";
const SignUp = () => {
  const [form, setform] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const router = useRouter();

  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setVerification({ ...verification, state: "pending" });
    } catch (err: any) {
      Alert.alert("Error", err?.errors[0]?.longMessage);
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (signUpAttempt.status === "complete") {
        // create database user later

        await setActive({ session: signUpAttempt.createdSessionId });
        setVerification({ ...verification, state: "success" }); // router.replace("/");
      } else {
        setVerification({
          ...verification,
          error: "Verification failed",
          state: "failed",
        });

        throw new Error("Verification failed");
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        error: err?.errors[0]?.longMessage,
        state: "failed",
      });

      Alert.alert("Error", err?.errors[0]?.longMessage);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white w-full h-[250px] relative">
        <Image source={images.signUpCar} className="w-full h-[250px] z-0" />
        <Text className="absolute text-black text-2xl font-JakartaSemiBold bottom-5 left-5">
          Create your account
        </Text>
      </View>

      <View className="p-5">
        <InputField
          label="Name"
          placeholder="Enter your name"
          icon={icons.person}
          value={form.name}
          onChangeText={(value) => setform({ ...form, name: value })}
        />

        <InputField
          label="Email"
          placeholder="Enter your email"
          icon={icons.email}
          value={form.email}
          onChangeText={(value) => setform({ ...form, email: value })}
          textContentType="emailAddress"
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
          title="Sign Up"
          onPress={onSignUpPress}
          className="mt-6"
        />

        <OAuth />

        {/* oauth */}
        <Link href={"/(auth)/sign-in"} className="text-lg mt-5 text-center ">
          <Text>Already have an account ? </Text>
          <Text className="text-primary-500 ml-3">Log In</Text>
        </Link>
      </View>

      {/* pending modal */}
      <ReactNativeModal
        isVisible={verification.state === "pending"}
        onModalHide={() => {
          if (verification.state === "success") {
            setShowSuccessModal(true);
          }
        }}
      >
        <View className="bg-white rounded-2xl py-7 px-7 min-h-[250px]">
          <Text className="font-JakartaExtraBold text-2xl mb-2">
            Verification
          </Text>
          <Text className="font-Jakarta mb-5">
            We have send verification email to {form.email}
          </Text>
          <InputField
            label="Code"
            icon={icons.lock}
            placeholder="12345.."
            value={verification.code}
            keyboardType="numeric"
            onChangeText={(code) => {
              setVerification({ ...verification, code: code });
            }}
          />
          {verification.error && (
            <Text className="text-red-500 text-sm mt-1">
              {verification.error}
            </Text>
          )}
          <CustomButton
            title="Verify Email"
            onPress={onVerifyPress}
            className="mt-5 bg-success-500"
          />
        </View>
      </ReactNativeModal>

      {/* verification modal  */}
      <ReactNativeModal isVisible={showSuccessModal}>
        <View className="bg-white px-7 py-9 rounded-2xl min-h-[250px]">
          <Image
            source={images.check}
            className="w-[110px] h-[110px] mx-auto my-5"
          />
          <Text className="text-center text-3xl font-JakartaSemiBold">
            Verified
          </Text>
          <Text className="text-base text-gray-400 font-Jakarta text-center">
            You have successfuly verified your account !
          </Text>
          <CustomButton
            title="Browse Home"
            className="mt-6"
            onPress={() => router.replace("/(root)/(tabs)/home")}
          />
        </View>
      </ReactNativeModal>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
