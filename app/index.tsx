import { Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect } from "expo-router";

const Home = () => {
  return <Redirect href={"/(auth)/welcome"} />;
  return (
    <SafeAreaView>
      <View className="flex items-center justify-center bg-blue-400 h-full">
        <Text>Home lorem500</Text>
      </View>
    </SafeAreaView>
  );
};

export default Home;
