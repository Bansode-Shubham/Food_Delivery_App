// import { View, StyleSheet, Pressable, ActivityIndicator } from "react-native";
// import React from "react";
// import { ThemedText } from "@/components/ThemedText";
// import { Stack, useLocalSearchParams, useRouter } from "expo-router";

// import Button from "@/components/Button_react_paper";
// import { useCart } from "../../../providers/CartProvider";
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


import { View, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import Button from "@/components/Button_react_paper";
import { useCart } from "../../../providers/CartProvider";
import { PizzaSize } from "@/assets/types";
import { useProduct } from "@/app/api/product";
import RemoteImage from "@/components/RemoteImage";
import React from "react";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductDetailsScreen = () => {
  const { addItem } = useCart();
  const router = useRouter();
  const [selectedSize, setSelectedSize] = React.useState<PizzaSize>("M");

  const { product: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);
  const { data: product, error, isLoading } = useProduct(id);

  const addToCart = () => {
    console.log(`Added to cart and selected size ${selectedSize}`);
    if (!product) return;

    addItem(product, selectedSize);
    router.push("/cart");
  };

  if (isLoading) return <ActivityIndicator />;
  if (error || !product) return <ThemedText>Failed to load product!</ThemedText>;

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
      <ThemedText>Select Size </ThemedText>
      <View style={styles.sizes}>
        {sizes.map((size) => (
          <Pressable
            onPress={() => setSelectedSize(size)}
            key={size}
            style={[
              styles.size,
              { backgroundColor: selectedSize === size ? "white" : "black" },
            ]}
          >
            <ThemedText
              style={[
                styles.sizeText,
                { color: selectedSize === size ? "black" : "white" },
              ]}
            >
              {size}
            </ThemedText>
          </Pressable>
        ))}
      </View>
      <ThemedText style={styles.price}>${product.price}</ThemedText>
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
