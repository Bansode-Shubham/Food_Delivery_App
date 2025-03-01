import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import products from "@/assets/products";
import { Link, useSegments } from "expo-router";

interface Product {
  id: number;
  image: string;
  name: string;
  price: number;
}

const ProductListItem = ({ product }: { product: Product }) => {
  const segment = useSegments();
  console.log(segment);
  return (
    
    <Link href={`/menu/${product.id}`} asChild>
      <Pressable style={styles.Container}>
        <Image
          source={{ uri: product.image }}
          style={styles.img}
          resizeMode="contain"
        />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </Pressable>
    </Link>
  );
};

export default ProductListItem;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 10,
    maxWidth: "50%",
    flex: 1,
  },
  img: {
    width: "100%",
    aspectRatio: 1,
    margin: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
  },
  price: {
    color: "#504c75",
    fontSize: 20,
    fontWeight: "bold",
  },
});
