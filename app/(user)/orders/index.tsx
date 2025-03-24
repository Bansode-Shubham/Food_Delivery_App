import { ThemedText } from "@/components/ThemedText";
import { ActivityIndicator, SafeAreaView } from "react-native";

import { FlatList } from "react-native";
import OrderListItem from "@/components/OrderListItem";
import { useMyOrderList } from "@/app/api/orders";

export default function OrdersScreen() {
  const { data: orders, isLoading, error } = useMyOrderList();
  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <ThemedText>{error.message}</ThemedText>;
  }
  return (
    <SafeAreaView>
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderListItem orderItem={item} />}
      />
    </SafeAreaView>
  );
}
