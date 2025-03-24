// import { View, StyleSheet, Pressable, ActivityIndicator } from "react-native";
// import React from "react";
// import { ThemedText } from "@/components/ThemedText";
// import { Stack, useLocalSearchParams, useRouter } from "expo-router";

// import Button from "@/components/Button_react_paper";
// import { useCart } from "../../providers/CartProvider";
// import { PizzaSize } from "@/assets/types";
// import { useProduct } from "@/app/api/product";
// import RemoteImage from "@/components/RemoteImage";

// const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

// /**
//  * ProductListItem is a React functional component that renders a product item
//  * using a View, Image, and Text component. It displays the product's image,
//  * name, and price in a styled container.
//  */

// const ProductListItem = () => {
//   const { addItem } = useCart();
//   const router = useRouter();
//   const [selectedSize, setSelectedSize] = React.useState<PizzaSize>("M");

//   const { id: idString } = useLocalSearchParams();
//   const id = parseFloat(typeof idString === "string" ? idString : idString[0]);
//   const { data: product, error, isLoading } = useProduct(id);

//   const addToCart = () => {
//     console.log(`Added to cart and selected size ${selectedSize}`);
//     if (!product) {
//       return;
//     } else {
//       addItem(product, selectedSize);
//       router.push("/cart");
//     }
//   };
//   if (isLoading) {
//     return <ActivityIndicator />;
//   }
//   if (error || !product) {
//     return <ThemedText>Failed to load product!</ThemedText>;
//   }

//   return (
//     <View>
//       <Stack.Screen options={{ title: product.name }} />
//       <RemoteImage
//         path={product.image}
//         style={styles.img}
//         resizeMode="contain"
//         fallback=""
//       />
//       <ThemedText style={styles.name}>{product.name} </ThemedText>
//       <ThemedText>Select Size </ThemedText>
//       <View style={styles.sizes}>
//         {sizes.map((size) => (
//           <Pressable
//             onPress={() => setSelectedSize(size)}
//             key={size}
//             style={[
//               styles.size,
//               { backgroundColor: selectedSize === size ? "white" : "black" },
//             ]}
//           >
//             <ThemedText
//               style={[
//                 styles.sizeText,
//                 { color: selectedSize === size ? "black" : "white" },
//               ]}
//             >
//               {size}
//             </ThemedText>
//           </Pressable>
//         ))}
//       </View>
//       <ThemedText style={styles.price}>${product.price}</ThemedText>
//       <Button onPress={addToCart} text="Add to cart" />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   Container: {
//     backgroundColor: "#f5f5f5",
//     padding: 10,
//     borderRadius: 10,

//     flex: 1,
//   },
//   sizes: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     padding: 10,
//     marginVertical: 10,
//   },
//   size: {
//     backgroundColor: "white",
//     width: 50,
//     aspectRatio: 1,
//     borderRadius: 25,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   sizeText: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "black",
//   },
//   img: {
//     width: "100%",
//     aspectRatio: 1,
//     margin: 10,
//   },
//   name: {
//     fontSize: 32,
//     fontWeight: "bold",
//     lineHeight: 32,
//   },
//   price: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginTop: 50,
//   },
// });

// export default ProductListItem;

// import { FlatList } from "react-native";

// import { ThemedText } from "@/components/ThemedText";

// // Define the Product type
// type Product = {
//   id: number;
//   name: string;
//   image: string;
//   price: number;
// };
// import React from "react";

// import { SafeAreaView } from "react-native-safe-area-context";

// import ProductListItem from "@/components/ProductList";
// import { useProductList } from "@/app/api/product";
// import { ActivityIndicator } from "react-native-paper";

// export default function MenuScreen() {
//   const { data: products, error, isLoading } = useProductList();
//   if (isLoading) {
//     return <ActivityIndicator />;
//   }
//   if (error) {
//     return <ThemedText>{error.message}</ThemedText>;
//   }

//   return (
//     <>
//       <SafeAreaView>
//         <FlatList
//           data={products}
//           renderItem={({ item }) => <ProductListItem product={item} />}
//           numColumns={2}
//           contentContainerStyle={{ gap: 10, padding: 10 }}
//           columnWrapperStyle={{ gap: 10 }}
//         />
//       </SafeAreaView>
//     </>
//   );
// }

// import { FlatList } from "react-native";
// import { ThemedText } from "@/components/ThemedText";
// import React from "react";
// import { SafeAreaView } from "react-native-safe-area-context";
// import ProductListItem from "@/components/ProductList";
// import { useRouter, useLocalSearchParams } from "expo-router";
// import { useProductList } from "@/app/api/product";
// import { ActivityIndicator } from "react-native-paper";

// export default function MenuScreen() {
//   const { id: restaurantId } = useLocalSearchParams(); // Capture selected restaurant ID
//   const { data: products, error, isLoading } = useProductList(Number(restaurantId));

//   if (isLoading) {
//     return <ActivityIndicator />;
//   }

//   if (error) {
//     return <ThemedText>{error.message}</ThemedText>;
//   }

//   return (
//     <SafeAreaView>
//       <FlatList
//         data={products}
//         renderItem={({ item }) => <ProductListItem product={item} />}
//         numColumns={2}
//         contentContainerStyle={{ gap: 10, padding: 10 }}
//         columnWrapperStyle={{ gap: 10 }}
//       />
//     </SafeAreaView>
//   );
// }

// import { FlatList } from "react-native";
// import { useLocalSearchParams } from "expo-router"; // ✅ Use this for params
// import { ThemedText } from "@/components/ThemedText";
// import ProductListItem from "@/components/ProductList";
// import { useProductList } from "@/app/api/product";
// import { ActivityIndicator } from "react-native-paper";

// export default function MenuScreen() {
//   const { restaurantId } = useLocalSearchParams(); // ✅ Extract restaurant ID
//   const { data: products, error, isLoading } = useProductList(Number(restaurantId));

//   if (isLoading) return <ActivityIndicator />;
//   if (error) return <ThemedText>{error.message}</ThemedText>;

//   return (
//     <>
//       <FlatList
//         data={products}
//         renderItem={({ item }) => <ProductListItem product={item} />}
//         numColumns={2}
//         contentContainerStyle={{ gap: 10, padding: 10 }}
//         columnWrapperStyle={{ gap: 10 }}
//       />
//     </>
//   );
// }

// import { FlatList } from "react-native";
// import { useLocalSearchParams } from "expo-router"; // ✅ Updated for dynamic param
// import { ThemedText } from "@/components/ThemedText";
// import ProductListItem from "@/components/ProductList";
// import { useProductList } from "@/app/api/product";
// import { ActivityIndicator } from "react-native-paper";

// export default function MenuScreen() {
//   const { id: restaurantId } = useLocalSearchParams(); // ✅ Extract restaurant ID
//   console.log("Received Restaurant ID:", restaurantId); // 🟠 Debug Log
//   const { data: products, error, isLoading } = useProductList(Number(restaurantId));
//   console.log(products)

//   if (isLoading) return <ActivityIndicator />;
//   if (error) return <ThemedText>{error.message}</ThemedText>;

//   return (
//     <>
//       <FlatList
//         data={products}
//         renderItem={({ item }) => <ProductListItem product={item} />}
//         numColumns={2}
//         contentContainerStyle={{ gap: 10, padding: 10 }}
//         columnWrapperStyle={{ gap: 10 }}
//       />
//     </>
//   );
// }

import { FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router"; // ✅ Correctly Extract Restaurant ID
import { ThemedText } from "@/components/ThemedText";
import ProductListItem from "@/components/ProductList";
import { useProductList } from "@/app/api/product";
import { ActivityIndicator } from "react-native-paper";

export default function MenuScreen() {
  const { id: restaurantId } = useLocalSearchParams(); // ✅ Extract Restaurant ID

  const {
    data: products,
    error,
    isLoading,
  } = useProductList(Number(restaurantId));

  if (isLoading) return <ActivityIndicator />;
  if (error) return <ThemedText>{error.message}</ThemedText>;

  if (!products || products.length === 0) {
    return <ThemedText>No products found for this restaurant.</ThemedText>;
  }

  return (
    <>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
      />
    </>
  );
}
