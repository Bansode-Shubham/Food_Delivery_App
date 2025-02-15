import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
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
import Button from "../../../components/Button_react_paper";
import Banner from "../../../components/Banner";
import Icons from "../../../components/icons";
import Menu from "../../../components/menu";
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
