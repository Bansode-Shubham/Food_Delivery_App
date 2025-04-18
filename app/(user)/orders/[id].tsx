

import React from "react";
import { View, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { ThemedText } from "../../../components/ThemedText";
import OrderListItem from "../../../components/OrderListItem";
import OrderItemListItem from "../../../components/OrderItemListItem";
// Adjust the import path as needed
import { useOrderDetails } from "@/app/api/orders";
import { useUpdateOrderSubscription } from "@/app/api/orders/subscriptions";

const OrderDetailScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);

  useUpdateOrderSubscription(id);

  const { data: order, isLoading, error } = useOrderDetails(id);
  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <ThemedText>{error.message}</ThemedText>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order #${order.id}` }} />

      <OrderListItem orderItem={order} />

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ gap: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    gap: 10,
  },
});

export default OrderDetailScreen;
