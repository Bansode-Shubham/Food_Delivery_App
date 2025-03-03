import { View, Text, Image, StyleSheet,Pressable, ActivityIndicator } from "react-native";
import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import products from "@/assets/products";
import Button from "@/components/Button_react_paper";
import {useCart} from "../../providers/CartProvider";
import { PizzaSize } from "@/assets/types";
import { useProduct } from "@/app/api/product";


const sizes:PizzaSize[] =['S','M','L','XL'];

/**
 * ProductListItem is a React functional component that renders a product item
 * using a View, Image, and Text component. It displays the product's image,
 * name, and price in a styled container.
 */



const ProductListItem = () => {
   const { id: idString } = useLocalSearchParams();
    const id = parseFloat(typeof idString === "string" ? idString : idString[0]);
    const { data: product, error, isLoading } = useProduct(id);

  const router = useRouter();
  const addToCart = () => {
  
    if(!product){
      return;

    }
    else{
     
      router.push(`/create?id=${id}`); 

    }
  };



if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error || !product) {
    return <ThemedText>Failed to load product!</ThemedText>;
  }






  return (
   
    <View>
    <Stack.Screen options={{ title: product.name }} />
    <Image source={{uri:product.image}} style={styles.img} resizeMode="contain" />
    <ThemedText style={styles.name}>{product.name} </ThemedText>
    
  
    <ThemedText style={styles.price}>${product.price}</ThemedText>
    <Button onPress={addToCart} text="Edit the product details" />
  </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 10,
   
    flex: 1,
  },
  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    marginVertical: 10,

  },
  size:{
    backgroundColor: "white",
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    
  },
  sizeText:{
    fontSize: 20,
    fontWeight: "bold",
    color:"black",
    
  },
  img: {
    width: "100%",
    aspectRatio: 1,
    margin: 10,
  },
  name: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
  },
  price: {
   
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 50,
  },
});

export default ProductListItem;
