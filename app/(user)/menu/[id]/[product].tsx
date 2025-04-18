import { View, StyleSheet, ActivityIndicator } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import Button from "@/components/Button_react_paper";
import { useCart } from "../../../providers/CartProvider";
import { useProduct } from "@/app/api/product";
import RemoteImage from "@/components/RemoteImage";
import React from "react";

const ProductDetailsScreen = () => {
  const { addItem } = useCart();
  const router = useRouter();
  const { product: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);
  const { data: product, error, isLoading } = useProduct(id);
   
 
 
 
  
  const addToCart = () => {
    if (!product) return;
    addItem(product);
    console.log(product,"product");
    console.log(product.id,"product.id");
    console.log(product.restaurant_id,"product.restaurant_id");
    router.push("/cart");
  };

  if (isLoading) return <ActivityIndicator />;
  if (error || !product)
    return <ThemedText>Failed to load product!</ThemedText>;

  return (
    <View>
      <Stack.Screen options={{ title: product.name }} />
      <RemoteImage
        path={product.image}
        style={styles.img}
        resizeMode="contain"
        fallback=""
      />
      <ThemedText style={styles.name}>{product.name} </ThemedText>
      <ThemedText style={styles.price}>Rs{product.price}</ThemedText>
      <Button onPress={addToCart} text="Add to cart" />
    </View>
  );
};

const styles = StyleSheet.create({
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
  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    marginVertical: 10,
  },
  size: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  sizeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 50,
  },
});

export default ProductDetailsScreen;
