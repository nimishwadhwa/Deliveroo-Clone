import { View, Text, Image, TextInput, ScrollView } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AdjustmentsVerticalIcon,
  ChevronDownIcon,
} from "react-native-heroicons/solid";
import { MagnifyingGlassIcon, UserIcon } from "react-native-heroicons/outline";
import FeaturedRow from "./components/FeaturedRow";
import Categories from "./components/Categories";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useEffect(() => {
    const query = `*[_type == "featured"]{
      ...,
      restaurents[]->{
        ...,
        dishes[]->,
      },
    }`;
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://3ykb0ji3.api.sanity.io/v2021-10-21/data/query/production?query=${encodeURIComponent(
            query
          )}`
        );
        const result = await response.json();
        setFeaturedCategories(result.result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView className="bg-white pt-5">
      {/* header         */}
      <View className="flex-row pb-3 items-center mx-2 space-x-2">
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now</Text>
          <View className="flex-row items-center">
            <Text className="font-bold text-xl">Current Location</Text>
            <ChevronDownIcon size={20} color="#00ccbb" />
          </View>
        </View>
        <UserIcon size={35} color="#00ccbb" />
      </View>
      {/* search */}
      <View className="flex-row items-center space-x-2 pb-2 mx-2">
        <View className="flex-row space-x-2 flex-1 bg-gray-200 p-3">
          <MagnifyingGlassIcon color="grey" />
          <TextInput placeholder="Restaurents and cuisines" />
        </View>
        <AdjustmentsVerticalIcon color="#00ccbb" />
      </View>
      {/* body */}
      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* categories */}
        <Categories />
        {featuredCategories?.map((category) => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
