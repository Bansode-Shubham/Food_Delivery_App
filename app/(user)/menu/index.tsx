import {
 
  FlatList,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import products from "@/assets/products";

// Define the Product type
type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
};
import React from "react";

import { SafeAreaView } from "react-native-safe-area-context";

import ProductListItem from "@/components/ProductList";

export default function MenuScreen() {
  return (
    <>
      <SafeAreaView>
        <FlatList
          data={products}
          renderItem={({ item }) => <ProductListItem product={item} />}
          numColumns={2}
          contentContainerStyle={{ gap: 10, padding: 10 }}
          columnWrapperStyle={{ gap: 10 }}
        />
      </SafeAreaView>
    </>
  );
}
