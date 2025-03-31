import { FlatList, ActivityIndicator } from "react-native";

import { ThemedText } from "@/components/ThemedText";

import React from "react";

import { SafeAreaView } from "react-native-safe-area-context";

import ProductListItem from "@/components/ProductList";
import { useProductList } from "@/app/api/product";

export default function MenuScreen() {
  
  const { data: products, error, isLoading } = useProductList(1);
  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <ThemedText>{error.message}</ThemedText>;
  }
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
