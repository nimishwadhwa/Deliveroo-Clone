import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import { urlFor } from "../../sanity";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const categoryQuery = `*[_type == "category"]`;
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://3ykb0ji3.api.sanity.io/v2021-10-21/data/query/production?query=${encodeURIComponent(
            categoryQuery
          )}`
        );
        const result = await response.json();
        // console.log(result);
        setCategories(result.result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {categories?.map((category) => (
        <CategoryCard
          key={category._id}
          imgUrl={urlFor(category.image).width(200).url()}
          title={category.name}
        />
      ))}
    </ScrollView>
  );
};

export default Categories;
