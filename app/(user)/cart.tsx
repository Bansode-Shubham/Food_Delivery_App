import { View, Text , FlatList, SafeAreaView} from "react-native";
import { ThemedText } from "../../components/ThemedText";
import Button from "@/components/Button_react_paper";

import {  useCart } from "../providers/CartProvider";
import CartListItem from "@/components/CartListItem";
import React from "react";


const CartScreen = () => {
  const { items ,total, checkout } = useCart();
  return (
    <SafeAreaView>
   
    <View style={{padding:30}}>
    <ThemedText>Cart Screen</ThemedText>

      <FlatList 
      contentContainerStyle={{padding:10, gap:10}}
       data={items} renderItem={({item}) => <CartListItem cartItem={item} />} />
      <ThemedText>Total: Rs{total.toFixed(2)}</ThemedText>
      <Button onPress={checkout} text="Checkout" />
    </View>
    </SafeAreaView>
  );
};

export default CartScreen;
