import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectRestaurent } from "../features/restaurentSlice";
import { XMarkIcon } from "react-native-heroicons/solid";
import * as Progress from "react-native-progress";
import MapView, { Marker } from "react-native-maps";

const DeliveryScreen = () => {
  const navigation = useNavigation();
  const restaurent = useSelector(selectRestaurent);

  return (
    <View className="bg-[#00ccbb] flex-1">
      <SafeAreaView className="z-50">
        <View className="flex-row items-center justify-between p-5">
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <XMarkIcon size={30} color="white" />
          </TouchableOpacity>
          <Text className="font-light text-white text-lg">Order Help</Text>
        </View>
        <View className="bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md">
          <View className="flex-row justify-between">
            <View>
              <Text className="text-lg text-gray-400">Estimated Arrival</Text>
              <Text className="text-4xl font-bold">45-55 Minutes</Text>
            </View>
            <Image
              source={{
                uri: "https://links.papareact.com/fls",
              }}
              className="h-20 w-20"
            />
          </View>
          <Progress.Bar color="#00ccbb" size={30} indeterminate={true} />
          <Text>Your order at {restaurent.title} is being prepared</Text>
        </View>
      </SafeAreaView>
      <MapView
        initialRegion={{
          latitude: restaurent.lat,
          longitude: restaurent.long,
          latitudeDelta: 0.003,
          longitudeDelta: 0.003,
        }}
        className="flex-1 mt-10 z-0"
        mapType="mutedStandard"
      >
        <Marker
          coordinate={{
            latitude: restaurent.lat,
            longitude: restaurent.long,
          }}
          title={restaurent.title}
          description={restaurent.short_description}
          identifier="origin"
          pinColor="#00ccbb"
        />
      </MapView>
      <SafeAreaView className="bg-white flex-row items-center space-x-5 h-24">
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="h-12 w-12 bg-gray-300 p-4 rounded-full ml-5 justify-center"
        />
        <View className="flex-1">
          <Text className="text-lg">Nimish Wadhwa</Text>
          <Text className="text-gray-400">Your Rider</Text>
        </View>
        <Text className="text-[#00ccbb] text-lg mr-5 font-bold">Call</Text>
      </SafeAreaView>
    </View>
  );
};

export default DeliveryScreen;
