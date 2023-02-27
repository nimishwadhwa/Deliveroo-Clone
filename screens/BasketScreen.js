import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { selectRestaurent } from "../features/restaurentSlice";
import {
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from "../features/basketSlice";
import { useNavigation } from "@react-navigation/native";
import { XCircleIcon } from "react-native-heroicons/solid";
import { urlFor } from "../sanity";
import { formatCurrency } from "react-native-format-currency";

const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurent = useSelector(selectRestaurent);
  const items = useSelector(selectBasketItems);
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
  const basketTotal = useSelector(selectBasketTotal);
  const getCurrencyAmount = (amount) => {
    const [valueFormattedWithSymbol] = formatCurrency({
      amount: Number(amount),
      code: "INR",
    });
    return valueFormattedWithSymbol;
  };

  //   const [valueFormattedWithSymbol, valueFormattedWithoutSymbol, symbol] =
  //     formatCurrency({ amount: Number(basketTotal), code: "INR" });
  const dispatch = useDispatch();

  useMemo(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setGroupedItemsInBasket(groupedItems);
  }, [items]);
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100 ">
        <View className="p-5 border-b border-[#00ccbb] bg-white shadow-sm">
          <View>
            <Text className="text-lg text-center font-bold">Basket</Text>
            <Text className="text-center text-gray-400">
              {restaurent.title}
            </Text>
          </View>
          <TouchableOpacity
            onPress={navigation.goBack}
            className="rounded-full absolute right-5 top-5"
          >
            <XCircleIcon color="#00ccbb" size={40}></XCircleIcon>
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image
            source={{
              uri: "https://www.pngitem.com/pimgs/m/3-37779_transparent-delivery-png-delivery-boy-with-bike-png.png",
            }}
            className="w-7 h-7 bg-gray-100 p-4 rounded-full"
          />
          <Text className="flex-1">Deliver in 50-75 minutes</Text>
          <TouchableOpacity>
            <Text className="text-[#00ccbb]">Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View
              key={key}
              className="flex-row items-center space-x-3 bg-white py-2 px-5"
            >
              <Text className="text-[#00ccbb]">{items.length}X</Text>
              <Image
                style={{
                  borderWidth: 1,
                  borderColor: "#f3f3f4",
                }}
                source={{ uri: urlFor(items[0]?.image).url() }}
                className="h-12 w-12 rounded-full"
              />
              <Text className="flex-1">{items[0]?.name}</Text>
              <Text className="flex-1">
                {getCurrencyAmount(items[0]?.price)}
              </Text>
              <TouchableOpacity>
                <Text
                  className="text-[#00ccbb]"
                  onPress={() => dispatch(removeFromBasket({ id: key }))}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <View className="p-5 bg-white mt-5 space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Subtotal</Text>
            <Text className="text-gray-400">
              {getCurrencyAmount(basketTotal)}
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-400">Delivery Fee</Text>
            <Text className="text-gray-400">{getCurrencyAmount(50)}</Text>
          </View>

          <View className="flex-row justify-between">
            <Text>Order Total</Text>
            <Text className="font-bold">
              {getCurrencyAmount(basketTotal + Number(50))}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("PreparingOrderScreen")}
            className="rounded-lg bg-[#00ccbb] p-4"
          >
            <Text className="text-white text-lg font-bold text-center">
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
