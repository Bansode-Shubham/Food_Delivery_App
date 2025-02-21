import { View, Text , FlatList, SafeAreaView } from "react-native";
import { ThemedText } from "../../components/ThemedText";

import {  useCart } from "../providers/CartProvider";
import CartListItem from "@/components/CartListItem";
import React from "react";


const CartScreen = () => {
  const { items } = useCart();
  return (
    <SafeAreaView>
   
    <View style={{paddingTop:50}}>
    <ThemedText>Cart Screen</ThemedText>

      <FlatList 
      contentContainerStyle={{padding:10, gap:10}}
       data={items} renderItem={({item}) => <CartListItem cartItem={item} />} />
      
    </View>
    </SafeAreaView>
  );
};

export default CartScreen;
