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
