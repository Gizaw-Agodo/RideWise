import RideCard from "@/components/rideCard";
import { icons, images } from "@/constants";
import { Ride } from "@/types/type";
import { SignedIn, SignedOut, useAuth, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import GoogleTextInput from "@/components/googleTextInput";
import Map from "@/components/map";
import { useLocationStore } from "@/store";
import * as Location from "expo-location";
const recentRides: Ride[] = [
  {
    origin_address: "Kathmandu, Nepal",
    destination_address: "Pokhara, Nepal",
    origin_latitude: 27.717245,
    origin_longitude: 85.323961,
    destination_latitude: 28.209583,
    destination_longitude: 83.985567,
    ride_time: 391,
    fare_price: 19500.0,
    payment_status: "paid",
    driver_id: 2,
    user_id: "1",
    created_at: "2024-08-12 05:19:20.620007",
    driver: {
      first_name: "David",
      last_name: "Brown",
      car_seats: 5,
    },
  },
  {
    origin_address: "Jalkot, MH",
    destination_address: "Pune, Maharashtra, India",
    origin_latitude: 18.609116,
    origin_longitude: 77.165873,
    destination_latitude: 18.52043,
    destination_longitude: 73.856744,
    ride_time: 491,
    fare_price: 24500.0,
    payment_status: "paid",
    driver_id: 1,
    user_id: "1",
    created_at: "2024-08-12 06:12:17.683046",
    driver: {
      first_name: "James",
      last_name: "Wilson",
      car_seats: 4,
    },
  },
  {
    origin_address: "Zagreb, Croatia",
    destination_address: "Rijeka, Croatia",
    origin_latitude: 45.815011,
    origin_longitude: 15.981919,
    destination_latitude: 45.327063,
    destination_longitude: 14.442176,
    ride_time: 124,
    fare_price: 6200.0,
    payment_status: "paid",
    driver_id: 1,
    user_id: "1",
    created_at: "2024-08-12 08:49:01.809053",
    driver: {
      first_name: "James",
      last_name: "Wilson",
      car_seats: 4,
    },
  },
  {
    origin_address: "Okayama, Japan",
    destination_address: "Osaka, Japan",
    origin_latitude: 34.655531,
    origin_longitude: 133.919795,
    destination_latitude: 34.693725,
    destination_longitude: 135.502254,
    ride_time: 159,
    fare_price: 7900.0,
    payment_status: "paid",
    driver_id: 3,
    user_id: "1",
    created_at: "2024-08-12 18:43:54.297838",
    driver: {
      first_name: "Michael",
      last_name: "Johnson",
      car_seats: 4,
    },
  },
];

export default function Home() {
  const { user } = useUser();

  const loading = false;
  const handleSignOut = () => {};
  const handleDestinationPress = () => {};
  const { setDestinationLocation, setUserLocation } = useLocationStore();

  const [hasPermission, sethasPermission] = useState(false);
  const {signOut} = useAuth()

  useEffect(() => {
    const requestLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        sethasPermission(false);
        return;
      }
      let location = await Location.getCurrentPositionAsync()

      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords?.latitude!,
        longitude: location.coords?.longitude!,
      });

      setUserLocation({
        latitude: location.coords?.latitude,
        longitude: location.coords?.longitude,
        address: `${address[0].name}, ${address[0].region}`,
      });
      sethasPermission(true)
    };
    requestLocation();
  }, []);

  return (
    <SafeAreaView className="h-full bg-general-500">
      <FlatList
        // data={[]}
        data={recentRides}
        renderItem={({ item }) => <RideCard ride={item} />}
        keyExtractor={(item, index) => index.toString()}
        className="px-5"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListEmptyComponent={() => (
          <View className="flex flex-col items-center justify-center">
            {!loading ? (
              <>
                <Text className="text-sm">No recent rides available</Text>
                <Image
                  className="w-40 h-40"
                  resizeMode="contain"
                  source={images.noResult}
                />
              </>
            ) : (
              <ActivityIndicator size="small" color={"#000"} />
            )}
          </View>
        )}
        ListHeaderComponent={() => (
          <>
            <View className="my-5 flex flex-row items-center justify-between">
              <Text> Welcome Gizaw 👋 </Text>
              <TouchableOpacity
                onPress={handleSignOut}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white"
              >
                <Image source={icons.out} className="w-6 h-6" />
              </TouchableOpacity>
            </View>
            <GoogleTextInput
              icon={icons.search}
              containerStyle="bg-white shadow-md shadow-neutral-300"
              handlePress={handleDestinationPress}
            />
            <>
              <Text className="text-xl font-JakartaBold mt-5 mb-3">
                Your current location
              </Text>
              <View className="flex flex-row items-center bg-transparent h-[300px]">
                <Map />
              </View>
            </>

            <Text className="text-xl font-JakartaBold mt-5 mb-3">
              Recent Rides
            </Text>
          </>
        )}
      />
    </SafeAreaView>
  );
}
