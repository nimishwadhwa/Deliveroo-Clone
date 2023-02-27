import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import RestaurentCard from "./RestaurentCard";

const FeaturedRow = ({ id, title, description }) => {
  const [restaurents, setRestaurents] = useState([]);
  useEffect(() => {
    const restaurentQuery = `*[_type == "featured" && _id=="${id}"]{
          ...,
          restaurents[]->{
            ...,
            dishes[]->,
            type->{
              name
            }
          },
        }[0]`;
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://3ykb0ji3.api.sanity.io/v2021-10-21/data/query/production?query=${encodeURIComponent(
            restaurentQuery
          )}`
        );

        const result = await response.json();
        setRestaurents(result.result.restaurents);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon color="#00ccbb" />
      </View>
      <Text className="text-xs text-gray-500 px-4">{description}</Text>
      <ScrollView
        className="pt-4"
        contentContainerStyle={{ paddingHorizontal: 15 }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {/* restaurent cards */}
        {restaurents?.map((restaurent) => (
          <RestaurentCard
            key={restaurent._id}
            id={restaurent._id}
            imgUrl={restaurent.image}
            title={restaurent.name}
            rating={restaurent.rating}
            genre={restaurent.type?.name}
            address={restaurent.address}
            short_description={restaurent.short_description}
            dishes={restaurent.dishes}
            long={restaurent.long}
            lat={restaurent.lat}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
